---
title: "Idle and Power States"
description: "Technical details on power management, idle timeouts, and battery conservation on your Chastity Lockbox"
---

Your Chastity Lockbox automatically manages power consumption through a series of idle states. This guide explains the technical details of how these states work and what triggers transitions between them.

## Idle state progression

After any user interaction, the device progresses through idle states based on inactivity time:

| State | Timeout | Backlight | WiFi | Power use |
|-------|---------|-----------|------|-----------|
| Active | — | Full (100%) | Connected | Normal |
| Idle | 30 seconds | Dimmed (10%) | Connected | Reduced |
| Pseudo-sleep | 2 minutes | Off | Connected | Low |
| Deep sleep | 10 minutes | Off | Disconnected | Minimal |

!!! info
These timeouts are cumulative. Deep sleep occurs 10 minutes after the last interaction, not 10 minutes after pseudo-sleep begins.

## Active state

When you're actively using your device:

- **Backlight brightness**: 100% (value: 255)
- **All sensors**: Active and monitoring
- **WiFi**: Connected and syncing
- **Motor controller**: Ready for commands

Any button press or encoder turn keeps the device in the active state and resets the idle timer.

## Idle state (30 seconds)

After 30 seconds of no interaction:

- **Backlight brightness**: Dimmed to approximately 10% (value: 24)
- **Sensors**: Active
- **WiFi**: Still connected
- **Motor controller**: Cleared (not actively driving)

!!! tip
The dimmed screen is still readable. This state saves power while keeping the display visible if you glance at your device.

### Wake from idle

Any of these actions return the device to active state:
- Press any button
- Turn the encoder
- USB cable connected or disconnected

## Pseudo-sleep state (2 minutes)

After 2 minutes of no interaction:

- **Backlight brightness**: Off (value: 0)
- **Screen**: Still powered, just dark
- **WiFi**: Still connected—keyholder commands work
- **Motor controller**: Cleared
- **Current sensor (INA219)**: Enters power-save mode

!!! note
This is the deepest sleep state while charging. When connected to USB power, your device will not enter deep sleep, ensuring it stays connected to receive keyholder commands.

### Wake from pseudo-sleep

Same triggers as idle state wake. The first interaction wakes the device; you may need to press again to perform your intended action.

## Deep sleep state (10 minutes)

After 10 minutes of no interaction (and not charging):

- **Backlight**: Off
- **Screen**: Sleep mode
- **WiFi**: Disconnected
- **Bluetooth**: Off
- **Most peripherals**: Powered down

!!! warning
In deep sleep, your device cannot receive keyholder commands until it wakes up. Lock timers continue to run internally.

### Deep sleep restrictions

Deep sleep only activates when **all** of these conditions are true:
- Device has been inactive for 10 minutes
- Device is **not** connected to USB power
- Device is not in certain protected states (calibration, WiFi setup)

### Wake from deep sleep

- Press the Enter button (if on pins ≤21) or Back button
- Automatic timer wake if a lock timer is nearing completion

!!! info
When a timed lock has less than the pseudo-sleep timeout remaining, the device automatically stays awake to handle the unlock.

## Charging behavior

When your device is connected to USB power:

| Condition | Maximum sleep depth |
|-----------|-------------------|
| Charging | Pseudo-sleep only |
| Not charging | Full deep sleep |

This ensures your device remains reachable for dashboard commands while charging, while maximizing battery life when on battery power.

## Timer-based wake

For timed locks, your device calculates an optimal wake time:

```
sleepDuration = max(remainingTimeMs - PSEUDO_SLEEP_TIMEOUT, 0)
```

This means the device will wake from deep sleep before your lock timer expires, ensuring you don't miss the unlock.

## Power consumption

Approximate current draw in each state:

| State | Estimated current |
|-------|------------------|
| Active | ~80-100mA |
| Idle | ~40-60mA |
| Pseudo-sleep | ~20-30mA |
| Deep sleep | ~0.5-2mA |

!!! tip
For maximum battery life during extended locks, keep the device off the charger when not needed. It will automatically enter deep sleep and wake for important events.

## Interaction tracking

Every user interaction resets the idle timer. Tracked interactions include:

- Button presses (Enter, Back)
- Encoder rotation
- USB power state changes
- Sensor state changes (while actively monitoring)

## Technical reference

### Constants

```
IDLE_TIMEOUT = 30000         // 30 seconds
PSEUDO_SLEEP_TIMEOUT = 120000  // 2 minutes
SLEEP_TIMEOUT = 600000       // 10 minutes
```

### LED PWM values

```
Active:       255 (100%)
Idle:         24  (~10%)
Pseudo-sleep: 0   (off)
Deep sleep:   0   (off)
```

## Related guides

<CardGroup cols={2}>
<Card title="Sleep Mode" icon="moon" href="../device-states/sleep-mode">
User-friendly guide to automatic and manual sleep modes.
</Card>

<Card title="Button Controls" icon="hand-pointer" href="./button-controls">
How button presses wake the device and their functions.
</Card>

<Card title="Offline Mode" icon="wifi-slash" href="./offline-mode">
What happens when deep sleep disconnects WiFi.
</Card>
</CardGroup>
