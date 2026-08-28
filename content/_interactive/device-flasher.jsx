"use client";

import { useEffect, useMemo, useState } from "react";

import { useEspWebToolsDialogCustomization } from "@repo/device-tools/esp-dialog-customization";
import { loadEspWebTools } from "@repo/device-tools/esp-web-tools-loader";
import { captureDocsEvent } from "@repo/docs-kit/instrumentation-client";

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
    hardwareVariants: ["default"],
  },
  ossm: {
    name: "OSSM",
    description:
      "Flash your Open Source Sex Machine with an approved firmware release.",
    connectInstructions: "Connect your OSSM to your computer via USB-C",
    hardwareVariants: ["default"],
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
 * @param {{ device?: "dtt" | "lkbx" | "ossm" | "radr" }} props
 */
export const DeviceFlasher = ({ device = "ossm" }) => {
  const config = DEVICE_CONFIGS[device] || DEVICE_CONFIGS.ossm;
  const normalizedDevice = DEVICE_CONFIGS[device] ? device : "ossm";
  const [catalogs, setCatalogs] = useState({});
  const [selectedHardwareVariant, setSelectedHardwareVariant] = useState(
    config.hardwareVariants[0],
  );
  const [selectedChannel, setSelectedChannel] = useState("production");
  const [catalogLoadAttempt, setCatalogLoadAttempt] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [catalogError, setCatalogError] = useState(null);
  const [webSerialSupported, setWebSerialSupported] = useState(null);

  useEspWebToolsDialogCustomization(normalizedDevice);

  useEffect(() => {
    setWebSerialSupported("serial" in navigator);
    void loadEspWebTools().catch((error) => {
      console.error("Failed to load ESP Web Tools", error);
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setCatalogError(null);
    setCatalogs({});
    setSelectedHardwareVariant(config.hardwareVariants[0]);
    setSelectedChannel(requestedTrack());

    const loadCatalogs = async () => {
      try {
        const entries = await Promise.all(
          config.hardwareVariants.map(async (hardwareVariant) => {
            const response = await fetch(
              catalogUrl(normalizedDevice, hardwareVariant),
              { signal: controller.signal },
            );
            if (!response.ok)
              throw new Error("Firmware catalog request failed");
            const catalog = await response.json();
            if (!isCatalog(catalog))
              throw new Error("Invalid firmware catalog");
            return [hardwareVariant, catalog];
          }),
        );
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

  const targets = catalogs[selectedHardwareVariant]?.targets ?? [];
  const selectedTarget = useMemo(
    () =>
      targets.find(({ channel }) => channel === selectedChannel) ?? targets[0],
    [selectedChannel, targets],
  );

  useEffect(() => {
    if (!selectedTarget) return;
    setSelectedChannel(selectedTarget.channel);
  }, [selectedTarget]);

  const selectHardwareVariant = (hardwareVariant) => {
    setSelectedHardwareVariant(hardwareVariant);
    const nextTargets = catalogs[hardwareVariant]?.targets ?? [];
    const preferredTrack = requestedTrack();
    setSelectedChannel(
      nextTargets.some(({ channel }) => channel === preferredTrack)
        ? preferredTrack
        : nextTargets[0]?.channel || "production",
    );
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

      {config.hardwareVariants.length > 1 && (
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
            <option value="v1">V1 — Universal (4 MB)</option>
            <option value="v2" disabled={!catalogs.v2?.targets?.length}>
              V2 — 16 MB hardware
              {!isLoading && !catalogs.v2?.targets?.length
                ? " (Unavailable)"
                : ""}
            </option>
          </select>
        </div>
      )}

      {normalizedDevice === "dtt" && selectedHardwareVariant === "v2" && (
        <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
          V2 requires confirmed 16 MB DTT hardware. If you are unsure, use the
          universal V1 image.
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
          value={selectedTarget?.channel ?? ""}
          onChange={(event) => setSelectedChannel(event.target.value)}
          disabled={isLoading || targets.length === 0}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:disabled:bg-zinc-950"
        >
          {targets.map((target) => (
            <option key={target.channel} value={target.channel}>
              {CHANNEL_LABELS[target.channel] || target.channel} — v
              {target.version}
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
            No approved firmware with a verified web installer is available for
            this hardware.
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
          webSerialSupported !== false &&
          selectedTarget && (
            <div
              onClick={() =>
                captureDocsEvent("docs_tool_used", {
                  action: "started",
                  tool_key: "firmware-flasher",
                })
              }
              dangerouslySetInnerHTML={{
                __html: `<esp-web-install-button manifest="${selectedTarget.manifestUrl}">
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
