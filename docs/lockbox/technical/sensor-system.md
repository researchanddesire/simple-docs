---
title: "Sensor System"
description: "Technical documentation for the lock detection and backplate sensors in your Chastity Lockbox"
---

Your Chastity Lockbox uses multiple sensors to detect lock state and backplate position. This guide explains how the sensor system works and what the device monitors.

## Sensor overview

Your device has two types of sensors:

| Sensor type | Quantity | Purpose |
|-------------|----------|---------|
| TMR sensors | 3 | Detect locking paddle position |
| Hall effect sensors | 2 | Detect backplate presence |

## TMR sensors (paddle detection)

Three TMR (Tunnel Magnetoresistance) sensors detect whether the locking paddle is in the locked or unlocked position.

### How they work

- Sensors detect the magnetic field from the paddle
- When paddle is in locked position, sensors read LOW
- When paddle is unlocked, sensors read HIGH

### Detection logic

The device considers the paddle **locked** when:

```
(TMR1 AND TMR2 AND TMR3) OR 
(TMR1 AND TMR2) OR 
(TMR1 AND TMR3) OR 
(TMR2 AND TMR3)
```

!!! info
Any two of three sensors detecting the locked position is sufficient. This provides redundancy—if one sensor fails, lock detection still works.

### Why three sensors?

- **Redundancy**: Two-of-three voting ensures reliable detection
- **Fault tolerance**: Single sensor failure doesn't break lock detection
- **Accuracy**: Multiple sensors reduce false readings

## Hall effect sensors (backplate detection)

Two Hall effect sensors detect whether the backplate is properly attached.

### How they work

- Sensors detect magnets embedded in the backplate
- When backplate is attached, at least one sensor reads LOW
- When backplate is removed, both sensors read HIGH

### Detection logic

The device considers the backplate **closed** when:

```
Hall1 OR Hall2
```

Either sensor detecting the backplate magnet is sufficient.

!!! warning
The device will not allow locking if the backplate is not detected. This is a safety feature to prevent locking without proper closure.

## Sensor verification during operations

### Lock operation

When you initiate a lock:

1. Motor drives paddle to lock position
2. Device waits up to 2 seconds for paddle to reach position
3. TMR sensors verify paddle is locked
4. Hall sensors verify backplate is closed
5. If all checks pass → Lock confirmed
6. If checks fail → Error displayed

### Unlock operation

When the device unlocks:

1. Motor drives paddle to unlock position
2. Device waits up to 2 seconds for paddle to move
3. TMR sensors verify paddle is unlocked
4. If check passes → Unlock confirmed
5. If check fails → E-LOCK-2 error displayed

## Error conditions

| Error | Condition | Sensors involved |
|-------|-----------|-----------------|
| E-LOCK-1 | Cannot lock | TMR sensors don't detect locked position |
| E-LOCK-2 | Cannot unlock | TMR sensors still detect locked position |
| E-LOCK-3 | No backplate | Hall sensors don't detect backplate |

!!! tip
Most sensor errors are caused by physical obstruction. Check that nothing is blocking the paddle movement and that the backplate is properly seated.

## Activity logging

When connected to WiFi, your device periodically reports sensor states to the dashboard:

### Reported data

| Field | Description |
|-------|-------------|
| tmr1, tmr2, tmr3 | Individual TMR sensor states |
| hall1, hall2 | Individual Hall sensor states |
| isPaddleLocked | Computed paddle lock state |
| isBackplateClosed | Computed backplate state |
| currentState | Device state machine position |
| batteryPercent | Current battery level |
| isCharging | USB power connected |

### When logs are sent

- On state changes (lock/unlock events)
- On sensor state changes
- Periodically during active sessions

!!! info
This telemetry helps your keyholder monitor device status and allows support to diagnose issues remotely.

## Current monitoring

An INA219 current sensor monitors motor current during lock/unlock operations:

### Purpose

- Detect when motor has completed movement
- Prevent motor damage from stalling
- Verify proper operation

### Current limits

If average current exceeds 50mA for an extended period during motor operation, the motor stops automatically to prevent damage.

## Sensor status in UI

The lock icon in the status bar reflects sensor state:

| Lock icon | Paddle state | Indicator dot | Backplate state |
|-----------|--------------|---------------|-----------------|
| Locked | Paddle in lock position | Green | Backplate detected |
| Locked | Paddle in lock position | Yellow | Backplate not detected |
| Unlocked | Paddle in unlock position | Green | Backplate detected |
| Unlocked | Paddle in unlock position | Yellow | Backplate not detected |

See [Status Symbols](../using/symbols) for detailed icon descriptions.

## Troubleshooting sensor issues

<AccordionGroup>
??? note "E-LOCK-1: Could Not Lock"

The TMR sensors don't detect the paddle in locked position. Check:
- Nothing blocking the paddle
- Backplate is properly seated
- Try recalibrating if issue persists

??? note "E-LOCK-2: Could Not Unlock"

The TMR sensors still detect the paddle as locked. Check:
- Nothing preventing paddle movement
- Device has sufficient battery
- Contact support if motor sounds but paddle doesn't move

??? note "E-LOCK-3: No Backplate"

The Hall sensors don't detect the backplate. Check:
- Backplate is fully seated and clicks into place
- Clean contact area between device and backplate
- Move away from strong magnetic sources

??? note "Yellow backplate indicator"

The backplate indicator shows yellow when Hall sensors don't detect the backplate. Ensure the backplate is fully attached before locking.

</AccordionGroup>

## Technical specifications

### TMR sensors

| Parameter | Value |
|-----------|-------|
| Pins | 17, 18, 21 |
| Active state | LOW when paddle detected |
| Voting | 2 of 3 required |

### Hall effect sensors

| Parameter | Value |
|-----------|-------|
| Pins | 6, 15 |
| Active state | LOW when magnet detected |
| Voting | 1 of 2 required |

### Current sensor (INA219)

| Parameter | Value |
|-----------|-------|
| I2C pins | SDA: 9, SCL: 10 |
| Current limit | 50mA average |
| Monitoring period | During motor operations |

## Related guides

<CardGroup cols={2}>
<Card title="Device Errors" icon="triangle-exclamation" href="../errors/introduction">
Troubleshooting error codes.
</Card>

<Card title="Status Symbols" icon="display" href="../using/symbols">
Understanding lock and backplate indicators.
</Card>

<Card title="Calibration" icon="sliders" href="../device-states/calibration">
How calibration configures sensors.
</Card>
</CardGroup>
