"use client";

import { useEffect, useMemo, useState } from "react";

import { useEspWebToolsDialogCustomization } from "@repo/device-tools/esp-dialog-customization";
import { loadEspWebTools } from "@repo/device-tools/esp-web-tools-loader";
import {
  captureDocsEvent,
  captureFirmwareFlashResult,
} from "@repo/docs-kit/instrumentation-client";

const DEVICE_CONFIGS = {
  dtt: {
    name: "DTT",
    description:
      "Flash your Deepthroat Trainer with an approved firmware release.",
    connectInstructions:
      "Connect your Deepthroat Trainer to your computer via USB-C",
    hardwareVariants: ["v1", "v2"],
    autoDetectHardware: true,
  },
  lkbx: {
    name: "LKBX",
    description:
      "Flash your Chastity Lockbox with an approved firmware release.",
    connectInstructions:
      "Connect your Chastity Lockbox to your computer via USB-C",
    hardwareVariants: ["default", "r2", "r8"],
    autoDetectHardware: true,
  },
  ossm: {
    name: "OSSM",
    description:
      "Flash your Open Source Sex Machine with an approved firmware release.",
    connectInstructions: "Connect your OSSM to your computer via USB-C",
    hardwareVariants: ["v1", "v2"],
    autoDetectHardware: true,
  },
  radr: {
    name: "RADR",
    description:
      "Flash your RADR wireless remote with an approved firmware release.",
    connectInstructions: "Connect your RADR to your computer via USB-C",
    hardwareVariants: ["default"],
  },
};

const CHANNEL_LABELS = {
  production: "Production (Stable)",
  beta: "Beta",
  alpha: "Alpha",
  dev: "Dev (Latest)",
};

const LKBX_HARDWARE_IDENTITIES = {
  r2: {
    efuseTuples: [
      { psramCapacityCode: 1, pinPowerSelection: 0 },
      { psramCapacityCode: 2, pinPowerSelection: 0 },
    ],
    label: "R2 — 2 MB Quad PSRAM",
  },
  r8: {
    efuseTuples: [{ psramCapacityCode: 1, pinPowerSelection: 1 }],
    label: "R8 — 8 MB Octal PSRAM",
  },
};

const FLASH_HARDWARE_IDENTITIES = {
  v1: { flashSizeBytes: 4 * 1024 * 1024, label: "V1 — 4 MB flash" },
  v2: { flashSizeBytes: 16 * 1024 * 1024, label: "V2 — 16 MB flash" },
};

const LKBX_LEGACY_UNIVERSAL_RELEASE = {
  channel: "production",
  version: "1.21.18",
  releaseId: "9b757276-d2fd-46aa-b68a-4d6db0577046",
  buildSha: "b4b4bf47d1cf0d9bfcd315228c13a7747d054caa",
};

const isLaterFirmwareVersion = (candidate, baseline) => {
  const candidateMatch = /^(\d+)\.(\d+)\.(\d+)/.exec(candidate);
  const baselineMatch = /^(\d+)\.(\d+)\.(\d+)/.exec(baseline);
  if (!candidateMatch || !baselineMatch) return false;
  for (let index = 1; index <= 3; index += 1) {
    const difference =
      Number(candidateMatch[index]) - Number(baselineMatch[index]);
    if (difference !== 0) return difference > 0;
  }
  return false;
};

const hasSeparateFlashParts = (build) => {
  if (
    !["ESP32", "ESP32-S3"].includes(build?.chipFamily) ||
    !Array.isArray(build.parts)
  ) {
    return false;
  }
  const parts = build.parts.map((part) => {
    if (
      !part ||
      typeof part.path !== "string" ||
      !Number.isSafeInteger(part.offset) ||
      part.offset < 0
    ) {
      return null;
    }
    if (part.path.startsWith("data:")) {
      return part.offset === 0xe000 &&
        /^data:application\/octet-stream;base64,[A-Za-z0-9+/]+={0,2}$/.test(
          part.path,
        )
        ? { ...part, filename: "boot_app0.bin" }
        : null;
    }
    try {
      const url = new URL(part.path, "https://firmware.invalid");
      const filename = decodeURIComponent(url.pathname.split("/").at(-1));
      if (
        !["https:", "http:"].includes(url.protocol) ||
        !filename ||
        /(?:web[-_]?(?:flasher|installer)|merged).*\.bin$/i.test(filename)
      ) {
        return null;
      }
      return { ...part, filename };
    } catch {
      return null;
    }
  });
  if (
    parts.some((part) => !part) ||
    new Set(parts.map((part) => part.offset)).size !== parts.length ||
    new Set(parts.map((part) => part.filename)).size !== parts.length
  ) {
    return false;
  }
  // Core parts stay separate so a merged image can never overwrite the NVS gap.
  return [
    ["bootloader.bin", build.chipFamily === "ESP32" ? 0x1000 : 0],
    ["partitions.bin", 0x8000],
    ["boot_app0.bin", 0xe000],
    ["firmware.bin", 0x10000],
  ].every(([filename, offset]) =>
    parts.some((part) => part.filename === filename && part.offset === offset),
  );
};

const isInstallManifest = (value) =>
  value &&
  typeof value === "object" &&
  typeof value.name === "string" &&
  typeof value.version === "string" &&
  Array.isArray(value.builds) &&
  value.builds.length > 0 &&
  value.builds.every(hasSeparateFlashParts);

const automaticLkbxTargets = (catalogs) => {
  const defaultTargets = catalogs.default?.targets ?? [];
  const r2Targets = catalogs.r2?.targets ?? [];
  const r8Targets = catalogs.r8?.targets ?? [];
  const legacyUniversal = defaultTargets.find(
    (target) =>
      target.channel === LKBX_LEGACY_UNIVERSAL_RELEASE.channel &&
      target.version === LKBX_LEGACY_UNIVERSAL_RELEASE.version &&
      target.releaseId === LKBX_LEGACY_UNIVERSAL_RELEASE.releaseId &&
      target.buildSha.toLowerCase() === LKBX_LEGACY_UNIVERSAL_RELEASE.buildSha,
  );
  const legacyUniversalTarget = legacyUniversal
    ? {
        ...legacyUniversal,
        displayVersion: "v1.21.18 — Universal R2/R8",
        legacyUniversal: true,
        selectionKey: `legacy:${legacyUniversal.releaseId}:${legacyUniversal.buildSha.toLowerCase()}`,
      }
    : null;

  return Object.keys(CHANNEL_LABELS).flatMap((channel) => {
    const r2 = r2Targets.find((target) => target.channel === channel);
    const r8 = r8Targets.find(
      (target) =>
        target.channel === channel &&
        target.version === r2?.version &&
        target.buildSha.toLowerCase() === r2?.buildSha.toLowerCase(),
    );
    const channelTargets = [];
    const pairIsSelectable =
      r2 &&
      r8 &&
      (channel !== "production" ||
        !legacyUniversal ||
        isLaterFirmwareVersion(r2.version, legacyUniversal.version));
    if (pairIsSelectable) {
      channelTargets.push({
        channel,
        version: r2.version,
        displayVersion: `v${r2.version}`,
        selectionKey: `automatic:${channel}:${r2.version}:${r2.buildSha.toLowerCase()}`,
        automaticVariants: { r2, r8 },
      });
    } else if (channel === "production" && legacyUniversalTarget) {
      channelTargets.push(legacyUniversalTarget);
    }
    return channelTargets;
  });
};

const targetSelectionKey = (target) =>
  target.selectionKey ??
  `release:${target.channel}:${target.releaseId}:${target.buildSha.toLowerCase()}`;

const automaticFlashTargets = (catalogs, device) =>
  Object.keys(CHANNEL_LABELS).flatMap((channel) => {
    const entries = Object.keys(FLASH_HARDWARE_IDENTITIES).flatMap(
      (variant) => {
        const release = catalogs[variant]?.targets.find(
          (target) => target.channel === channel,
        );
        return release ? [[variant, release]] : [];
      },
    );
    if (entries.length === 0) return [];

    // V1 and V2 have independent approved releases, unlike Lockbox R2/R8.
    const versions = entries.map(
      ([variant, release]) =>
        `${FLASH_HARDWARE_IDENTITIES[variant].flashSizeBytes / (1024 * 1024)} MB v${release.version}`,
    );
    return [
      {
        channel,
        version: versions.join(" / "),
        displayVersion: versions.join(" / "),
        selectionKey: `automatic:${device}:${channel}:${entries
          .map(
            ([variant, release]) => `${variant}:${targetSelectionKey(release)}`,
          )
          .join(":")}`,
        automaticVariants: Object.fromEntries(entries),
      },
    ];
  });

const automaticFlashManifest = async (device, target, signal) => {
  const builds = await Promise.all(
    Object.entries(target.automaticVariants).map(async ([variant, release]) => {
      const response = await fetch(release.manifestUrl, { signal });
      if (response.status === 404) {
        const unavailable = await response.json();
        if (unavailable.code === "WEB_FLASH_PARTS_UNAVAILABLE") return [];
      }
      if (!response.ok) throw new Error(`${variant} manifest request failed`);
      const manifest = await response.json();
      const { flashSizeBytes } = FLASH_HARDWARE_IDENTITIES[variant];
      if (
        !isInstallManifest(manifest) ||
        manifest.version !== release.version ||
        manifest.rad_flash_context?.device_type !== device ||
        manifest.rad_flash_context?.hardware_variant !== variant ||
        manifest.rad_flash_context?.channel !== target.channel ||
        manifest.builds.some(
          (build) =>
            build.chipFamily !== "ESP32" ||
            (build.rad_hardware_variant !== undefined &&
              build.rad_hardware_variant !== variant) ||
            (build.rad_flash_size_bytes !== undefined &&
              build.rad_flash_size_bytes !== flashSizeBytes) ||
            // Cached V2 manifests from before detection used static 4 MB parts.
            (variant === "v2" &&
              (build.rad_hardware_variant !== variant ||
                build.rad_flash_size_bytes !== flashSizeBytes ||
                build.parts.some(
                  (part) =>
                    typeof part.md5 !== "string" ||
                    !/^[0-9a-f]{32}$/i.test(part.md5),
                ))),
        )
      ) {
        throw new Error(`${variant} manifest identity is invalid`);
      }
      return manifest.builds.map((build) => ({
        ...build,
        rad_hardware_variant: variant,
        rad_flash_size_bytes: flashSizeBytes,
      }));
    }),
  );
  const availableBuilds = builds.flat();
  if (availableBuilds.length === 0) {
    throw new Error("No approved installers are available for this channel");
  }
  const manifest = {
    name: `${DEVICE_CONFIGS[device].name} ${target.channel} — automatic flash detection`,
    version: target.version,
    new_install_improv_wait_time: 0,
    new_install_prompt_erase: true,
    rad_flash_baud_rate: target.channel === "alpha" ? 460800 : 115200,
    rad_flash_context: {
      device_type: device,
      hardware_variant: "auto",
      channel: target.channel,
    },
    builds: availableBuilds,
  };
  return `data:application/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(manifest),
  )}`;
};

const automaticLkbxManifest = async (target, signal) => {
  const entries = await Promise.all(
    Object.entries(target.automaticVariants).map(async ([variant, release]) => {
      const response = await fetch(release.manifestUrl, { signal });
      if (!response.ok) throw new Error(`${variant} manifest request failed`);
      const manifest = await response.json();
      if (
        !isInstallManifest(manifest) ||
        manifest.version !== release.version ||
        manifest.rad_flash_context?.device_type !== "lkbx" ||
        manifest.rad_flash_context?.hardware_variant !== variant ||
        manifest.rad_flash_context?.channel !== target.channel
      ) {
        throw new Error(`${variant} manifest identity is invalid`);
      }
      return [variant, manifest];
    }),
  );
  const manifests = Object.fromEntries(entries);
  const builds = entries.flatMap(([variant, manifest]) => {
    const identity = LKBX_HARDWARE_IDENTITIES[variant];
    const identityFreeBuilds = manifest.builds.map(
      ({
        rad_hardware_variant: _hardwareVariant,
        rad_psram_cap: _psramCapacityCode,
        rad_pin_power_selection: _pinPowerSelection,
        ...build
      }) => build,
    );
    const uniqueBuilds = [
      ...new Map(
        identityFreeBuilds.map((build) => [JSON.stringify(build), build]),
      ).values(),
    ];
    return uniqueBuilds.flatMap((build) =>
      identity.efuseTuples.map(({ psramCapacityCode, pinPowerSelection }) => ({
        ...build,
        rad_hardware_variant: variant,
        rad_psram_cap: psramCapacityCode,
        rad_pin_power_selection: pinPowerSelection,
      })),
    );
  });
  const version =
    manifests.r2.version === manifests.r8.version
      ? manifests.r2.version
      : `R2 ${manifests.r2.version} / R8 ${manifests.r8.version}`;
  const manifest = {
    name: `LKBX ${target.channel} — automatic R2/R8 detection`,
    version,
    new_install_improv_wait_time: 0,
    new_install_prompt_erase: true,
    rad_flash_baud_rate: 115200,
    rad_flash_context: {
      device_type: "lkbx",
      hardware_variant: "auto",
      channel: target.channel,
    },
    builds,
  };
  return `data:application/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(manifest),
  )}`;
};

const readHardwareDetection = (value, expectedDevice) => {
  if (
    !value ||
    typeof value !== "object" ||
    value.deviceType !== expectedDevice ||
    typeof value.supported !== "boolean"
  ) {
    return null;
  }
  if (expectedDevice === "dtt" || expectedDevice === "ossm") {
    if (
      value.flashSizeBytes !== undefined &&
      (!Number.isInteger(value.flashSizeBytes) || value.flashSizeBytes <= 0)
    )
      return null;
    if (
      value.supported &&
      (!Object.hasOwn(FLASH_HARDWARE_IDENTITIES, value.hardwareVariant) ||
        FLASH_HARDWARE_IDENTITIES[value.hardwareVariant].flashSizeBytes !==
          value.flashSizeBytes)
    )
      return null;
    return value;
  }
  if (
    expectedDevice !== "lkbx" ||
    !Number.isInteger(value.psramCapacityCode) ||
    !Number.isInteger(value.pinPowerSelection)
  ) {
    return null;
  }
  if (
    value.supported &&
    !Object.hasOwn(LKBX_HARDWARE_IDENTITIES, value.hardwareVariant)
  ) {
    return null;
  }
  return value;
};

const FLASH_PHASES = new Set([
  "initializing",
  "preparing",
  "erasing",
  "writing",
  "finished",
  "error",
  "totalMs",
]);

const readFlashResult = (value, expectedDevice) => {
  if (!value || typeof value !== "object") return null;
  if (
    value.deviceType !== expectedDevice ||
    typeof value.hardwareVariant !== "string" ||
    !["production", "beta", "alpha", "dev"].includes(value.channel) ||
    !Number.isFinite(value.payloadBytes) ||
    !Number.isFinite(value.requestedBaudRate) ||
    !Number.isFinite(value.effectiveBaudRate) ||
    typeof value.fallbackUsed !== "boolean" ||
    !["success", "failure"].includes(value.outcome) ||
    !value.phaseTimings ||
    typeof value.phaseTimings !== "object"
  ) {
    return null;
  }
  const phaseTimings = Object.fromEntries(
    Object.entries(value.phaseTimings).filter(
      ([phase, duration]) =>
        FLASH_PHASES.has(phase) && Number.isFinite(duration),
    ),
  );
  return {
    device_type: value.deviceType,
    hardware_variant: value.hardwareVariant,
    channel: value.channel,
    payload_bytes: value.payloadBytes,
    requested_baud: value.requestedBaudRate,
    effective_baud: value.effectiveBaudRate,
    fallback_used: value.fallbackUsed,
    phase_timings: phaseTimings,
    outcome: value.outcome,
    ...(typeof value.errorCategory === "string"
      ? { error_category: value.errorCategory }
      : {}),
  };
};

const QUERY_TRACKS = new Set(["beta", "alpha", "dev"]);

const queryTrack = () => {
  const track = new URLSearchParams(window.location.search).get("track");
  return QUERY_TRACKS.has(track) ? track : null;
};

const requestedTrack = () => queryTrack() || "production";

const isCatalog = (value) =>
  value &&
  typeof value === "object" &&
  value.protocolVersion === 1 &&
  Array.isArray(value.targets) &&
  value.targets.every(
    (target) =>
      target &&
      typeof target.channel === "string" &&
      typeof target.version === "string" &&
      typeof target.releaseId === "string" &&
      typeof target.buildSha === "string" &&
      typeof target.manifestUrl === "string",
  );

const catalogUrl = (device, hardwareVariant) => {
  const configuredOrigin =
    process.env.NEXT_PUBLIC_FIRMWARE_CONTROL_PLANE_ORIGIN?.trim();
  const url = new URL(
    "/api/firmware/v1/web-flasher/catalog",
    configuredOrigin || window.location.origin,
  );
  const searchParams = new URLSearchParams({
    deviceType: device,
    hardwareVariant,
  });
  // Keep channel aliases in both capacity catalogs: deduplicating each lane
  // separately can hide an approved counterpart for the selected channel.
  const track =
    queryTrack() ||
    (device === "dtt" || device === "ossm" ? "production" : null);
  if (track) searchParams.set("track", track);
  url.search = searchParams.toString();
  return url.toString();
};

/**
 * @param {{ device?: "dtt" | "lkbx" | "ossm" | "radr", onFlashResult?: (result: ReturnType<typeof readFlashResult>) => void }} props
 */
export const DeviceFlasher = ({ device = "ossm", onFlashResult }) => {
  const config = DEVICE_CONFIGS[device] || DEVICE_CONFIGS.ossm;
  const normalizedDevice = DEVICE_CONFIGS[device] ? device : "ossm";
  const [catalogs, setCatalogs] = useState(null);
  const [selectedTargetKey, setSelectedTargetKey] = useState("");
  // Keep SSR and the first hydrated render identical; the effect below applies
  // any browser-only track override once window is available.
  const [selectedChannel, setSelectedChannel] = useState("production");
  const [catalogLoadAttempt, setCatalogLoadAttempt] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [catalogError, setCatalogError] = useState(null);
  const [webSerialSupported, setWebSerialSupported] = useState(null);
  const [preparedAutomaticManifest, setPreparedAutomaticManifest] =
    useState(null);
  const [preparedAutomaticManifestError, setPreparedAutomaticManifestError] =
    useState(null);
  const [hardwareDetection, setHardwareDetection] = useState(null);

  useEspWebToolsDialogCustomization(normalizedDevice);

  useEffect(() => {
    setWebSerialSupported("serial" in navigator);
    void loadEspWebTools().catch((error) => {
      console.error("Failed to load ESP Web Tools", error);
    });
  }, []);

  useEffect(() => {
    const recordFlashResult = (event) => {
      const result = readFlashResult(event.detail, normalizedDevice);
      if (!result) return;
      if (onFlashResult) onFlashResult(result);
      else captureFirmwareFlashResult(result);
    };
    window.addEventListener("rad-web-flash-event", recordFlashResult);
    return () =>
      window.removeEventListener("rad-web-flash-event", recordFlashResult);
  }, [normalizedDevice, onFlashResult]);

  useEffect(() => {
    setHardwareDetection(null);
    const recordHardwareDetection = (event) => {
      const detection = readHardwareDetection(event.detail, normalizedDevice);
      if (detection) setHardwareDetection(detection);
    };
    window.addEventListener(
      "rad-web-flash-device-detected",
      recordHardwareDetection,
    );
    return () =>
      window.removeEventListener(
        "rad-web-flash-device-detected",
        recordHardwareDetection,
      );
  }, [normalizedDevice]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setCatalogError(null);
    setCatalogs(null);
    setSelectedTargetKey("");
    setSelectedChannel(requestedTrack());

    const loadCatalogs = async () => {
      try {
        const loadCatalog = async (hardwareVariant) => {
          const response = await fetch(
            catalogUrl(normalizedDevice, hardwareVariant),
            { signal: controller.signal },
          );
          if (!response.ok) throw new Error("Firmware catalog request failed");
          const catalog = await response.json();
          if (!isCatalog(catalog)) throw new Error("Invalid firmware catalog");
          return [hardwareVariant, catalog];
        };
        const entries = config.autoDetectHardware
          ? (
              await Promise.allSettled(config.hardwareVariants.map(loadCatalog))
            ).flatMap((result) =>
              result.status === "fulfilled" ? [result.value] : [],
            )
          : await Promise.all(config.hardwareVariants.map(loadCatalog));
        if (entries.length === 0) {
          throw new Error("No firmware catalog request succeeded");
        }
        if (controller.signal.aborted) return;
        setCatalogs({
          device: normalizedDevice,
          variants: Object.fromEntries(entries),
        });
        captureDocsEvent("docs_tool_used", {
          action: "completed",
          tool_key: "firmware-flasher-catalog",
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Failed to load firmware catalogs", error);
        setCatalogError(
          "Approved firmware releases could not be loaded. Please try again.",
        );
        captureDocsEvent("docs_tool_used", {
          action: "failed",
          tool_key: "firmware-flasher-catalog",
        });
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void loadCatalogs();
    return () => controller.abort();
  }, [catalogLoadAttempt, config, normalizedDevice]);

  const targets = useMemo(() => {
    if (catalogs?.device !== normalizedDevice) return [];
    if (config.autoDetectHardware) {
      return normalizedDevice === "lkbx"
        ? automaticLkbxTargets(catalogs.variants)
        : automaticFlashTargets(catalogs.variants, normalizedDevice);
    }
    return catalogs.variants[config.hardwareVariants[0]]?.targets ?? [];
  }, [catalogs, config, normalizedDevice]);
  const selectedTarget = useMemo(() => {
    if (selectedTargetKey) {
      return (
        targets.find(
          (target) => targetSelectionKey(target) === selectedTargetKey,
        ) ?? null
      );
    }
    return targets.find(({ channel }) => channel === selectedChannel) ?? null;
  }, [selectedChannel, selectedTargetKey, targets]);
  const activeTargetKey = selectedTarget
    ? targetSelectionKey(selectedTarget)
    : "";
  const selectedChannelValue = selectedTarget
    ? activeTargetKey
    : `unavailable:${selectedChannel}`;

  useEffect(() => {
    setPreparedAutomaticManifest(null);
    setPreparedAutomaticManifestError(null);
    setHardwareDetection(null);
    if (!config.autoDetectHardware || !selectedTarget?.automaticVariants)
      return;
    const controller = new AbortController();
    const prepareManifest = async () => {
      try {
        const manifestUrl =
          normalizedDevice === "lkbx"
            ? await automaticLkbxManifest(selectedTarget, controller.signal)
            : await automaticFlashManifest(
                normalizedDevice,
                selectedTarget,
                controller.signal,
              );
        if (controller.signal.aborted) return;
        setPreparedAutomaticManifest({
          targetKey: activeTargetKey,
          manifestUrl,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Failed to prepare automatic firmware manifest", error);
        setPreparedAutomaticManifestError({
          targetKey: activeTargetKey,
          message:
            normalizedDevice === "lkbx"
              ? "Matching R2 and R8 installers could not be prepared. No firmware will be written."
              : "Matching 4 MB and 16 MB installers could not be prepared. No firmware will be written.",
        });
      }
    };
    void prepareManifest();
    return () => controller.abort();
  }, [activeTargetKey, config, normalizedDevice, selectedTarget]);

  const automaticManifestUrl =
    preparedAutomaticManifest?.targetKey === activeTargetKey
      ? preparedAutomaticManifest.manifestUrl
      : null;
  const automaticManifestError =
    preparedAutomaticManifestError?.targetKey === activeTargetKey
      ? preparedAutomaticManifestError.message
      : null;

  const installerManifestUrl = selectedTarget?.legacyUniversal
    ? selectedTarget.manifestUrl
    : config.autoDetectHardware
      ? automaticManifestUrl
      : selectedTarget?.manifestUrl;

  // Hardware status updates must not replace the connected custom element.
  const installerMarkup = useMemo(
    () => ({
      __html: `<esp-web-install-button manifest="${installerManifestUrl}">
                  <button slot="activate" style="background-color: #8b5cf6; color: white; padding: 10px 24px; border-radius: 9999px; font-weight: 500; border: none; cursor: pointer;">Connect &amp; Flash</button>
                </esp-web-install-button>`,
    }),
    [installerManifestUrl],
  );

  const selectTarget = (targetKey) => {
    const target = targets.find(
      (candidate) => targetSelectionKey(candidate) === targetKey,
    );
    setSelectedTargetKey(targetKey);
    if (target) setSelectedChannel(target.channel);
  };

  return (
    <div
      className="not-prose mx-auto max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900"
      data-device-output=""
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {config.name} Web Flasher
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {config.description}
        </p>
      </div>

      {config.autoDetectHardware && selectedTarget?.legacyUniversal && (
        <div className="mb-4 rounded-lg border border-sky-300 bg-sky-50 p-3 text-sm text-sky-900 dark:border-sky-700 dark:bg-sky-900/20 dark:text-sky-200">
          LKBX production v1.21.18 is universal for R2 and R8 hardware. It
          flashes directly without hardware detection.
        </div>
      )}

      {config.autoDetectHardware && selectedTarget?.automaticVariants && (
        <div
          className={`mb-4 rounded-lg border p-3 text-sm ${
            hardwareDetection?.supported === true
              ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200"
              : hardwareDetection?.supported === false
                ? "border-red-300 bg-red-50 text-red-900 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200"
                : "border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-700 dark:bg-sky-900/20 dark:text-sky-200"
          }`}
          aria-live="polite"
        >
          {hardwareDetection?.supported === true ? (
            <>
              Detected{" "}
              {
                (normalizedDevice === "lkbx"
                  ? LKBX_HARDWARE_IDENTITIES
                  : FLASH_HARDWARE_IDENTITIES)[
                  hardwareDetection.hardwareVariant
                ].label
              }
              {hardwareDetection.macAddress
                ? ` (${hardwareDetection.macAddress})`
                : ""}
              . The matching installer was selected automatically.
            </>
          ) : hardwareDetection?.supported === false ? (
            normalizedDevice === "lkbx" ? (
              <>
                Unsupported PSRAM identity: capacity code{" "}
                {hardwareDetection.psramCapacityCode}, power selection{" "}
                {hardwareDetection.pinPowerSelection}. Nothing was written.
              </>
            ) : (
              <>
                No matching installer is available for the detected flash
                capacity
                {hardwareDetection.flashSizeBytes
                  ? ` (${hardwareDetection.flashSizeBytes / (1024 * 1024)} MB)`
                  : " (unknown)"}
                . Nothing was written.
              </>
            )
          ) : normalizedDevice === "lkbx" ? (
            <>
              R2/R8 selection is automatic. After you choose the USB device, the
              flasher reads its factory PSRAM identity before writing.
            </>
          ) : (
            <>
              4 MB / 16 MB selection is automatic. After you choose the USB
              device, the flasher reads its physical flash capacity and selects
              the approved V1 or V2 installer before writing. If a matching
              build is unavailable, nothing will be written.
              {normalizedDevice === "ossm"
                ? " OSSM V1 omits Bluetooth to fit in 4 MB."
                : ""}
            </>
          )}
        </div>
      )}

      <div className="mb-4 flex flex-col gap-1.5">
        <label
          htmlFor={`${normalizedDevice}-channel`}
          className="text-sm font-medium text-zinc-500 dark:text-zinc-400"
        >
          Approved channel
        </label>
        <select
          id={`${normalizedDevice}-channel`}
          aria-label="Approved channel"
          value={selectedChannelValue}
          onChange={(event) => selectTarget(event.target.value)}
          disabled={isLoading || targets.length === 0}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:disabled:bg-zinc-950"
        >
          {!selectedTarget && (
            <option value={selectedChannelValue} disabled>
              {CHANNEL_LABELS[selectedChannel] || selectedChannel} — unavailable
            </option>
          )}
          {targets.map((target) => (
            <option
              key={targetSelectionKey(target)}
              value={targetSelectionKey(target)}
            >
              {CHANNEL_LABELS[target.channel] || target.channel} —{" "}
              {target.displayVersion || `v${target.version}`}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 pt-2">
        {isLoading && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Loading approved firmware...
          </p>
        )}
        {catalogError && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 dark:border-red-700 dark:bg-red-900/20">
            <p className="font-medium text-red-800 dark:text-red-300">
              Firmware Not Available
            </p>
            <p className="text-sm text-red-700 dark:text-red-400">
              {catalogError}
            </p>
            <button
              type="button"
              onClick={() => setCatalogLoadAttempt((attempt) => attempt + 1)}
              className="mt-2 rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950"
            >
              Retry
            </button>
          </div>
        )}
        {!isLoading && !catalogError && targets.length === 0 && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
            No approved firmware is available for this hardware.
          </div>
        )}
        {!isLoading &&
          !catalogError &&
          targets.length > 0 &&
          !selectedTarget && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
              No approved {CHANNEL_LABELS[selectedChannel] || selectedChannel}{" "}
              firmware is available for this hardware. Choose an available
              channel or specify an approved track in the URL.
            </div>
          )}
        {webSerialSupported === false && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300">
            This browser cannot connect over USB. Open this page in Chrome or
            Edge on a desktop computer.
          </div>
        )}
        {!isLoading &&
          !catalogError &&
          config.autoDetectHardware &&
          selectedTarget?.automaticVariants &&
          !installerManifestUrl &&
          !automaticManifestError && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Preparing automatic{" "}
              {normalizedDevice === "lkbx" ? "R2/R8" : "4 MB / 16 MB"}{" "}
              detection...
            </p>
          )}
        {automaticManifestError && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300">
            {automaticManifestError}
          </div>
        )}
        {!isLoading &&
          !catalogError &&
          webSerialSupported !== false &&
          installerManifestUrl && (
            <div
              onClick={() =>
                captureDocsEvent("docs_tool_used", {
                  action: "started",
                  tool_key: "firmware-flasher",
                })
              }
              dangerouslySetInnerHTML={installerMarkup}
            />
          )}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800/50">
        <p className="font-medium text-zinc-800 dark:text-zinc-200">
          Instructions:
        </p>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>{config.connectInstructions}</li>
          <li>Select an available approved channel</li>
          <li>Click the "Connect & Flash" button</li>
          <li>Select your {config.name} from the device list</li>
          <li>Wait for the flash to complete</li>
        </ol>
      </div>
    </div>
  );
};
