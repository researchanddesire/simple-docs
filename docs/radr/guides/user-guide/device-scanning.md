# Device Scanning

This guide explains how RADR discovers nearby Bluetooth devices and establishes connections.

## Automatic Scanning

When you power on RADR, it automatically scans for nearby supported Bluetooth devices.

### Scan Behavior

- **Duration:** 5 seconds
- **LED Indicator:** Blue pulsing during scan
- **Status Message:** "Searching for nearby devices..."

During the scan:
1. RADR broadcasts as "OSSM-REMOTE" with high transmit power (9 dBm)
2. It searches for devices advertising supported service UUIDs
3. Discovered devices are added to the device list

## Manual Scanning

To start a manual scan:

1. From the main menu, select **Device Search**
2. RADR scans for 5 seconds
3. After scanning, the device list appears

!!! tip
    Use manual scanning when you've powered on a new device after RADR's initial boot scan.

## Device List

After scanning, the device list shows all discovered devices:

- Devices are shown by their advertised Bluetooth name
- If a device has no name, it appears as "Unknown Device"
- The list is scrollable if multiple devices are found

### Navigating the Device List

| Control | Action |
|---------|--------|
| Right Encoder | Scroll through devices |
| Right Button | Connect to selected device |
| Left Button | Cancel and return to main menu |

## Connecting to a Device

When you select a device from the list, RADR initiates a connection:

### Connection Status Messages

You'll see these status messages in sequence:

1. **"Initializing connection..."** — Setting up the connection process
2. **"Checking existing connections..."** — Verifying no conflicts
3. **"Attempting fast reconnect..."** — Trying quick reconnection if previously paired
4. **"Creating new connection..."** — Establishing a new Bluetooth connection
5. **"Connecting to [address]..."** — Connecting to the specific device
6. **"Connected! Setting up device..."** — Connection established, configuring
7. **"Discovering device capabilities..."** — Reading device features
8. **"Device ready!"** — Connection complete, entering control mode

!!! info
    RADR uses optimized Bluetooth connection settings for responsive, low-latency control. The exact connection parameters are documented in the developer docs: [BLE Protocol](https://dev.researchanddesire.com/radr/communication/ble/).

## Connection Failures

If connection fails, you'll see:

- **"Connection failed, please try again."** — General connection failure
- **"Connection limit reached!"** — Too many active BLE connections
- **"Device service not found!"** — Device doesn't have expected services

### Troubleshooting Connection Issues
!!! note "Device doesn't appear in scan"
    - Ensure the device is powered on and in pairing mode
    - Move within 1–2 meters for initial pairing
    - Close any phone apps that might be connected to the device
    - Power-cycle both RADR and the target device

!!! note "Connection fails repeatedly"
    - Ensure no other app or controller is connected
    - Power-cycle the target device
    - Move closer to reduce interference
    - For OSSM: Ensure firmware is 2.0.0 or higher

!!! note "Connection drops frequently"
    - Stay within Bluetooth range (typically 10 meters indoors)
    - Reduce interference from WiFi routers and other Bluetooth devices
    - Keep phone apps closed to prevent connection stealing

## One Device at a Time

!!! warning
    RADR can only connect to **one device at a time**. To switch to a different device, you must first disconnect from the current device.

To disconnect and switch devices:

1. From the control screen, press left button to access the menu (when paused)
2. Navigate back to the main menu
3. Start a new device search

## Supported Devices

RADR automatically recognizes supported devices by their Bluetooth identifiers, so there's nothing for you to configure. Support for new Bluetooth toys is added over time and delivered through firmware updates, so keeping RADR updated unlocks compatibility with more devices.

!!! info
    For the technical details of how RADR identifies devices (service UUIDs and the on-device registry), see the developer docs: [BLE Protocol](https://dev.researchanddesire.com/radr/communication/ble/).

### Supported Device Types

| Device Type | Control Interface |
|-------------|-------------------|
| OSSM | Full control (Speed, Depth, Sensation, Stroke, Patterns) |
| Lovense | Vibration-only control (0–16 levels) |
| Buttplug.io devices | Varies by device capabilities |

## Reconnection Behavior

If RADR loses connection to a device:

1. RADR automatically attempts to reconnect within 2–5 seconds
2. For OSSM: The machine gradually ramps down for safety
3. If reconnection fails, return to the main menu and rescan

!!! info
    RADR remembers recently connected devices and attempts fast reconnection when possible.

## Tips

!!! tip
    For reliable connections, ensure only RADR is attempting to connect to your device. Close phone apps and other controllers.

!!! tip
    If a device appears as "Unknown Device," it's still safe to connect—the control interface will be determined by the device's capabilities.

!!! tip
    Keep RADR firmware updated to ensure compatibility with the latest devices.
