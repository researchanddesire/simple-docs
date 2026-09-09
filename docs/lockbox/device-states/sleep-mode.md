# Sleep Mode

## Overview

Your Chastity Lockbox includes multiple power-saving states to help conserve battery life while maintaining the functionality you need.

| State | Timeout | Screen | WiFi | Best for |
|-------|---------|--------|------|----------|
| Idle | 30 seconds | Dimmed (10%) | Connected | Short pauses |
| Pseudo-sleep | 2 minutes | Off | Connected | Daily use |
| Deep sleep | 10 minutes | Off | Disconnected | Extended battery saving |

## Automatic power management

Your device automatically progresses through power states based on inactivity:

1. **Active** — Full brightness, all features enabled
2. **Idle (30 seconds)** — Screen dims to approximately 10% brightness
3. **Pseudo-sleep (2 minutes)** — Screen turns off, WiFi stays connected
4. **Deep sleep (10 minutes)** — WiFi disconnects, minimal power use

!!! tip
    Any button press or encoder turn resets the timer and returns the device to active mode. The first interaction wakes the device; you may need to press again to perform your intended action.

## Automatic sleep (idle and pseudo-sleep)

Automatic sleep activates on its own during short periods of inactivity. You don't need to do anything—the device handles power management intelligently.

**What happens in automatic sleep:**
- The screen dims after 30 seconds, then turns off after 2 minutes
- WiFi stays connected for keyholder communication
- Lock timers continue running normally
- The device wakes instantly when you interact with it

!!! info
    When connected to USB power (charging), the device will not enter deep sleep. It stays in pseudo-sleep at most, ensuring your keyholder can always send commands.

## Deep sleep

Deep sleep provides maximum power savings. It activates automatically after 10 minutes of inactivity (when not charging), or you can activate it manually from the menu.

**What happens in deep sleep:**
- Screen, WiFi, Bluetooth, and most sensors turn off
- The locked or unlocked state remains unchanged
- Remote communication with keyholders is disabled
- The device uses minimal power

### Manual deep sleep

### Step 1: Enter deep sleep

Navigate to the menu and select **Sleep**, then press Enter to confirm.

### Step 2: Wake the device

Press the Enter button (or Back button, depending on hardware) to exit deep sleep and restore full functionality.

!!! success
    The device will boot up and reconnect to WiFi automatically.

!!! warning
    While in deep sleep, you won't receive updates or commands from your keyholder. Only use manual sleep when you're certain you won't need remote access.

### Automatic wake for timers

If you have an active timed lock, your device calculates an optimal wake time to ensure it's awake before the lock expires. You don't need to worry about missing your unlock.

## When to use manual deep sleep

Manual deep sleep is appropriate for specific situations where power conservation takes priority over connectivity:

- **Long trips** where you might need to unlock midway but won't have charging access
- **Extended time away from power** such as camping or travel
- **Storage** when not using the device for several days

!!! note
    For regular daily use, automatic sleep handles power management effectively. Most users never need to activate deep sleep manually.

## Best practices
!!! note "Maximize battery life"
    - Keep the device plugged in when you're at home
    - Automatic sleep handles daily power management effectively
    - Reserve manual deep sleep for situations where you genuinely need extended battery life

!!! note "Stay connected to your keyholder"
    - Avoid manual deep sleep if your keyholder may need to send commands
    - Communicate with your keyholder before entering manual deep sleep
    - Remember that automatic sleep (including pseudo-sleep) maintains full connectivity
