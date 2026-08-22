/// <reference types="web-bluetooth" />

"use client";

import {
  getOssmStateLabel,
  isOssmBleBrowserSupported,
  isOssmMenuState,
  isOssmPlayingState,
  isOssmPreflightState,
  ossmBleCharacteristicUuid,
  ossmBleServiceUuid,
  ossmControlCommands,
  ossmControlModes,
  type OssmControlParameter,
  ossmStrokePatterns,
} from "@repo/schemas/ossm-control";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { Slider } from "@repo/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { cn } from "@repo/ui/utils";
import { captureDocsEvent } from "@repo/docs-kit/instrumentation-client";
import { AlertCircle, Gauge } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const OssmBleControllerCard = () => {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [serviceUUID] = useState(ossmBleServiceUuid);
  const [characteristicUUID] = useState(ossmBleCharacteristicUuid);
  const [, setReadings] = useState<string[]>([]);
  const [server, setServer] = useState<BluetoothRemoteGATTServer | null>(null);
  const [strokeValue, setStrokeValue] = useState<number>(50);
  const [sensationValue, setSensationValue] = useState<number>(50);
  const [depthValue, setDepthValue] = useState<number>(50);
  const [patternValue, setPatternValue] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [currentState, setCurrentState] = useState<string>("");

  const connectBluetooth = async () => {
    captureDocsEvent("docs_tool_used", {
      action: "started",
      tool_key: "ossm-ble-controller",
    });
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          {
            services: [serviceUUID],
          },
        ],
      });
      console.log("Device selected:", device);

      setDevice(device);
      device.addEventListener("gattserverdisconnected", () => {
        setDevice(null);
        setServer(null);
        console.log("Device disconnected");
      });

      console.log("Connecting to GATT server...");
      if (!device.gatt) {
        throw new Error("No GATT server found");
      }
      const server = await device.gatt.connect();
      console.log("GATT server connected:", server);
      setServer(server);

      if (server) {
        console.log("Getting primary service...");
        const service = await server.getPrimaryService(serviceUUID);
        console.log("Primary service:", service);

        console.log("Getting characteristic...");
        const characteristic =
          await service.getCharacteristic(characteristicUUID);
        console.log("Characteristic:", characteristic);

        await characteristic.startNotifications();
        characteristic.addEventListener(
          "characteristicvaluechanged",
          handleCharacteristicValueChanged,
        );
      }
      captureDocsEvent("docs_tool_used", {
        action: "completed",
        tool_key: "ossm-ble-controller",
      });
    } catch (error) {
      console.error("Error connecting:", error);
      captureDocsEvent("docs_tool_used", {
        action: "failed",
        tool_key: "ossm-ble-controller",
      });
    }
  };

  const handleCharacteristicValueChanged = (event: Event) => {
    // First cast to unknown, then to the specific type
    const characteristic =
      event.target as unknown as BluetoothRemoteGATTCharacteristic;
    const value = characteristic.value;
    if (value) {
      // Raw value
      console.log("Raw DataView:", value);

      // Try as text
      const text = new TextDecoder().decode(value.buffer as ArrayBuffer);

      // Try parsing as JSON and update state values
      try {
        const jsonObj = JSON.parse(text);
        if (jsonObj.state) setCurrentState(jsonObj.state);
        if (jsonObj.speed !== undefined) setSpeed(jsonObj.speed);
        if (jsonObj.stroke !== undefined) setStrokeValue(jsonObj.stroke);
        if (jsonObj.sensation !== undefined)
          setSensationValue(jsonObj.sensation);
        if (jsonObj.depth !== undefined) setDepthValue(jsonObj.depth);
        if (jsonObj.pattern !== undefined) setPatternValue(jsonObj.pattern);
      } catch {
        // If parsing fails, continue with existing behavior
      }

      // Create a timestamp
      const timestamp = new Date().toLocaleTimeString();

      // Add the new reading to the readings array
      setReadings((prev) => [...prev, `[${timestamp}] ${text}`].slice(-100)); // Keep only last 100 readings
    }
  };

  const sendMessage = async (message: string) => {
    if (!server) {
      console.log("No BLE connection");
      return;
    }

    try {
      const service = await server.getPrimaryService(serviceUUID);
      const characteristic =
        await service.getCharacteristic(characteristicUUID);

      // Convert string to Uint8Array
      const encoder = new TextEncoder();
      const data = encoder.encode(message);

      await characteristic.writeValue(data);
      console.log("Sent message:", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleValueChange = useDebouncedCallback(
    async (type: OssmControlParameter["commandType"], value: number) => {
      const command = ossmControlCommands.setValue(type, value);
      await sendMessage(command);
    },
    250,
  );

  const isConnected = device !== null;
  const isInPreflight = isOssmPreflightState(currentState);
  const isPlaying = isOssmPlayingState(currentState, isConnected);
  const isInMenu = isOssmMenuState(currentState, isConnected);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        {/* Drone Image Section with Status */}
        <div className="relative h-[300px] w-full">
          <div className="from-primary/20 to-background absolute inset-0 bg-linear-to-b">
            <div className="flex size-full items-center justify-center bg-black/10">
              <span className="text-foreground/70 text-5xl font-semibold tracking-[0.2em]">
                OSSM
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <Badge
            variant="secondary"
            className="absolute top-4 left-4 flex cursor-pointer items-center gap-2"
            onClick={!device ? connectBluetooth : undefined}
          >
            <div
              className={`size-2 rounded-full ${device ? "bg-green-500" : "bg-red-500"}`}
            />
            {device ? getOssmStateLabel(currentState) : "Click to Connect"}
          </Badge>

          {/* Speed Indicator */}
          <div
            className={cn(
              "text-background absolute top-4 right-4 flex items-center gap-2 rounded-md bg-black/50 px-3 py-1.5 transition-opacity",
              isPlaying ? "opacity-100" : "opacity-0",
            )}
          >
            <Gauge className="size-4" />
            <span className="text-sm font-medium">{speed}%</span>
          </div>

          {/* Stop Button */}
          <Button
            variant="destructive"
            size="lg"
            className={cn(
              "absolute right-4 bottom-4 font-bold transition-opacity",
              isPlaying ? "opacity-100" : "opacity-0",
            )}
            onClick={() => sendMessage(ossmControlCommands.goMenu)}
          >
            STOP
          </Button>
        </div>

        {/* Control Tabs */}
        <CardContent className={cn("p-0", isPlaying ? "" : "hidden")}>
          <Tabs defaultValue="stroke" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stroke">Stroke</TabsTrigger>
              <TabsTrigger value="depth">Depth</TabsTrigger>
              <TabsTrigger value="sensation">Sensation</TabsTrigger>
              <TabsTrigger value="pattern">Pattern</TabsTrigger>
            </TabsList>

            <div className="p-4">
              <TabsContent value="stroke">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-2xl font-bold">{strokeValue}%</div>
                  <div className="flex flex-1 flex-col gap-2">
                    <Slider
                      value={[strokeValue]}
                      onValueChange={([value]) => {
                        setStrokeValue(value);
                        handleValueChange("stroke", value);
                      }}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="depth">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-2xl font-bold">{depthValue}%</div>
                  <div className="flex flex-1 flex-col gap-2">
                    <Slider
                      value={[depthValue]}
                      onValueChange={([value]) => {
                        setDepthValue(value);
                        handleValueChange("depth", value);
                      }}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sensation">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-2xl font-bold">
                    {sensationValue}%
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <Slider
                      value={[sensationValue]}
                      onValueChange={([value]) => {
                        setSensationValue(value);
                        handleValueChange("sensation", value);
                      }}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pattern">
                <Select
                  value={patternValue.toString()}
                  onValueChange={(value) => {
                    setPatternValue(parseInt(value));
                    handleValueChange("pattern", parseInt(value));
                  }}
                >
                  <SelectTrigger className="py-6 text-left">
                    <SelectValue placeholder="Select a pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    {ossmStrokePatterns.map((pattern) => (
                      <SelectItem
                        key={pattern.id}
                        value={pattern.id.toString()}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-medium">{pattern.name}</div>
                          <div className="text-muted-foreground text-xs">
                            {pattern.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>

        <CardContent className={cn("p-0", isInMenu ? "" : "hidden")}>
          <div className="flex flex-col flex-wrap gap-4 p-4 md:flex-row">
            {ossmControlModes.map((mode) => (
              <Button
                className="flex-1 py-8"
                key={mode.command}
                onClick={() => sendMessage(mode.command)}
                variant={"outline"}
              >
                <div className="flex flex-col gap-1">
                  <div className="font-medium">{mode.label}</div>
                  <div className="text-muted-foreground text-xs text-wrap">
                    {mode.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>

        <CardContent className={cn("p-0", isInPreflight ? "" : "hidden")}>
          <div className="flex flex-col gap-4 p-4">
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>Attention Required</AlertTitle>
              <AlertDescription>
                The device needs your attention. Please check the device status.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const checkBrowserSupport = (): boolean => {
  if (typeof window === "undefined") return false;
  return isOssmBleBrowserSupported({
    hasBluetooth: "bluetooth" in navigator,
    userAgent: navigator.userAgent,
  });
};

export function OssmBleController() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(checkBrowserSupport());
  }, []);

  if (!isSupported) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Browser Not Supported</AlertTitle>
        <AlertDescription>
          Web Bluetooth is only supported in Chromium-based browsers (Chrome,
          Edge, etc.). Please switch to a supported browser to use this feature.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div data-device-output="">
      <Alert className="mb-4">
        <AlertCircle className="size-4" />
        <AlertTitle>Beta Testing Only</AlertTitle>
        <AlertDescription>
          This experimental controller uses the legacy OSSM BLE channels. Keep
          the emergency stop within reach and do not leave the machine
          unattended.
        </AlertDescription>
      </Alert>
      <OssmBleControllerCard />
    </div>
  );
}

export default OssmBleController;
