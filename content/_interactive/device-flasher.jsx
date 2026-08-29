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
    psramCapacityCode: 2,
    pinPowerSelection: 0,
    label: "R2 — 2 MB Quad PSRAM",
  },
  r8: {
    psramCapacityCode: 1,
    pinPowerSelection: 1,
    label: "R8 — 8 MB Octal PSRAM",
  },
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

const isInstallManifest = (value) =>
  value &&
  typeof value === "object" &&
  typeof value.name === "string" &&
  typeof value.version === "string" &&
  Array.isArray(value.builds) &&
  value.builds.length > 0 &&
  value.builds.every(
    (build) =>
      build &&
      typeof build.chipFamily === "string" &&
      Array.isArray(build.parts) &&
      build.parts.length > 0,
  );

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
    const pairSupersedesLegacy =
      r2 &&
      r8 &&
      (channel !== "production" ||
        !legacyUniversal ||
        isLaterFirmwareVersion(r2.version, legacyUniversal.version));
    if (pairSupersedesLegacy) {
      channelTargets.push({
        channel,
        version: r2.version,
        displayVersion: `v${r2.version}`,
        selectionKey: `automatic:${channel}:${r2.version}:${r2.buildSha.toLowerCase()}`,
        automaticVariants: { r2, r8 },
      });
    }
    if (channel === "production" && legacyUniversalTarget) {
      channelTargets.push(legacyUniversalTarget);
    }
    return channelTargets;
  });
};

const targetSelectionKey = (target) =>
  target.selectionKey ??
  `release:${target.channel}:${target.releaseId}:${target.buildSha.toLowerCase()}`;

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
    return manifest.builds.map((build) => ({
      ...build,
      rad_hardware_variant: variant,
      rad_psram_cap: identity.psramCapacityCode,
      rad_pin_power_selection: identity.pinPowerSelection,
    }));
  });
  const version =
    manifests.r2.version === manifests.r8.version
      ? manifests.r2.version
      : `R2 ${manifests.r2.version} / R8 ${manifests.r8.version}`;
  const manifest = {
    name: `LKBX ${target.channel} — automatic R2/R8 detection`,
    version,
    improv: false,
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

const readHardwareDetection = (value) => {
  if (
    !value ||
    typeof value !== "object" ||
    value.deviceType !== "lkbx" ||
    typeof value.supported !== "boolean" ||
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
  const track = queryTrack();
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
  const [catalogs, setCatalogs] = useState({});
  const [selectedHardwareVariant, setSelectedHardwareVariant] = useState(
    config.hardwareVariants[0],
  );
  const [selectedTargetKey, setSelectedTargetKey] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(requestedTrack);
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
      const detection = readHardwareDetection(event.detail);
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
    setCatalogs({});
    setSelectedHardwareVariant(config.hardwareVariants[0]);
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
        const nextCatalogs = Object.fromEntries(entries);
        setCatalogs(nextCatalogs);
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

  const targets = useMemo(
    () =>
      config.autoDetectHardware
        ? automaticLkbxTargets(catalogs)
        : (catalogs[selectedHardwareVariant]?.targets ?? []),
    [catalogs, config, selectedHardwareVariant],
  );
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
        const manifestUrl = await automaticLkbxManifest(
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
        console.error("Failed to prepare automatic LKBX manifest", error);
        setPreparedAutomaticManifestError({
          targetKey: activeTargetKey,
          message:
            "Matching R2 and R8 installers could not be prepared. No firmware will be written.",
        });
      }
    };
    void prepareManifest();
    return () => controller.abort();
  }, [activeTargetKey, config, selectedTarget]);

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

  const selectHardwareVariant = (hardwareVariant) => {
    setSelectedHardwareVariant(hardwareVariant);
    setSelectedTargetKey("");
    setSelectedChannel(requestedTrack());
  };

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

      {config.hardwareVariants.length > 1 && !config.autoDetectHardware && (
        <div className="mb-4 flex flex-col gap-1.5">
          <label
            htmlFor={`${normalizedDevice}-hardware`}
            className="text-sm font-medium text-zinc-500 dark:text-zinc-400"
          >
            Hardware
          </label>
          <select
            id={`${normalizedDevice}-hardware`}
            aria-label="Hardware"
            value={selectedHardwareVariant}
            onChange={(event) => selectHardwareVariant(event.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <option value="v1">
              {normalizedDevice === "ossm"
                ? "V1 — Universal (4 MB, Bluetooth disabled)"
                : "V1 — Universal (4 MB)"}
            </option>
            <option value="v2" disabled={!catalogs.v2?.targets?.length}>
              V2 — 16 MB hardware
              {!isLoading && !catalogs.v2?.targets?.length
                ? " (Unavailable)"
                : ""}
            </option>
          </select>
        </div>
      )}

      {(normalizedDevice === "dtt" || normalizedDevice === "ossm") &&
        selectedHardwareVariant === "v2" && (
          <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
            V2 requires confirmed 16 MB {config.name} hardware. If you are
            unsure, use the 4 MB V1 image.
            {normalizedDevice === "ossm"
              ? " OSSM V1 omits Bluetooth to fit safely."
              : ""}
          </div>
        )}

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
                LKBX_HARDWARE_IDENTITIES[hardwareDetection.hardwareVariant]
                  .label
              }
              {hardwareDetection.macAddress
                ? ` (${hardwareDetection.macAddress})`
                : ""}
              . The matching installer was selected automatically.
            </>
          ) : hardwareDetection?.supported === false ? (
            <>
              Unsupported PSRAM identity: capacity code{" "}
              {hardwareDetection.psramCapacityCode}, power selection{" "}
              {hardwareDetection.pinPowerSelection}. Nothing was written.
            </>
          ) : (
            <>
              R2/R8 selection is automatic. After you choose the USB device, the
              flasher reads its factory PSRAM identity before writing.
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
              Preparing automatic R2/R8 detection...
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
              dangerouslySetInnerHTML={{
                __html: `<esp-web-install-button manifest="${installerManifestUrl}">
                  <button slot="activate" style="background-color: #8b5cf6; color: white; padding: 10px 24px; border-radius: 9999px; font-weight: 500; border: none; cursor: pointer;">Connect &amp; Flash</button>
                </esp-web-install-button>`,
              }}
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
