---
title: "Error Codes and Messages"
description: "Understanding and resolving error messages on your trainer"
---

When your trainer encounters an issue, it displays an error code or message on screen. This guide explains what each error means and how to resolve it.

## Network Errors

### E-DTT-1: No Internet

**Message**: "No internet. Check firewall and router."

**Cause**: The device connected to Wi-Fi but cannot reach the R+D server.

**Solutions**:
1. Check your router's firewall settings
2. Ensure the device isn't blocked in access control
3. Try connecting via mobile hotspot to test

<Card title="Full E-DTT-1 Guide" icon="wifi-exclamation" href="/dtt/errors/e-dtt-1">
Detailed troubleshooting steps for this error.
</Card>

## Calibration Errors

These messages appear during the calibration process:

### "Start and end location too close"

**Cause**: The two positions you captured during calibration are too close together. The trainer requires at least 0.8 cm (about 0.3 inches) of range between your minimum and maximum positions.

**Solutions**:
1. Press the button to retry calibration
2. When setting your **minimum position** (closest/deepest point), go as deep as you comfortably can
3. When setting your **maximum position** (rest/start point), pull back to your natural resting position
4. Ensure you hold steady at each position before pressing the button—movement during capture can cause inaccurate readings
5. Make sure the sensor has a clear view of the toy (nothing blocking)

!!! tip
A larger range between positions gives you more room for accurate tracking and graduated training segments. Aim for at least 5–10 cm of usable range if possible.

<Card title="Calibration Guide" icon="ruler" href="/dtt/technical/calibration">
Detailed instructions for proper calibration technique.
</Card>

### "Error sending results" (with code)

**Cause**: The device attempted to upload calibration or session data but couldn't reach the server. This is expected when training offline.

**Solutions**:
- If training offline intentionally, this message is informational—press the button to continue
- If you expected to be online, check your Wi-Fi connection
- Results will sync when you reconnect to the internet

!!! note
Error codes like "69 0" are internal status codes. When offline, these errors don't prevent training—they simply indicate that data couldn't be uploaded at that moment.

## Training Errors

These messages may appear during or before training segments:

### "Speed too high"

**Cause**: Your movement speed exceeded what the segment expected.

**Solutions**:
- Slow down your movements
- Match the on-screen target pace more closely
- This is feedback, not a fatal error — adjust and continue

### "Speed too low" / "Training speed too slow"

This error has different causes depending on when it appears:

#### During training segments

**Cause**: Your movement speed is below the expected range for the current segment.

**Solutions**:
- Increase your movement pace
- Check if the segment expects faster movement (e.g., high RPM Freeform)
- This is feedback, not a fatal error — adjust and continue

#### Immediately after calibration / at startup

**Cause**: If this error appears right after calibration (when the device measures tip position and depth) and causes the device to loop between "training complete" and "error training speed too slow," this typically indicates a firmware bug on older software versions.

**Symptoms**:
- Device completes calibration (measuring tip and maximum depth)
- Error appears immediately before training can begin
- Device cycles between "training complete" and "speed too slow" messages
- You cannot select other training modes
- Only power cycling stops the loop

**Solutions**:
1. **Connect to Wi-Fi** — the device will automatically download and install firmware updates when online
2. Long-press during startup to enter Wi-Fi setup mode
3. After connecting, the device should update and restart
4. Try starting a session again after the update completes

<Card title="Wi-Fi Setup" icon="wifi" href="/dtt/quick-start/pairing/wifi-setup">
Connect your trainer to receive firmware updates.
</Card>

!!! note
This error loop was fixed in a firmware update. If you haven't connected your trainer to Wi-Fi recently, updating the firmware should resolve this issue.

### "Invalid Range"

**Cause**: The segment parameters result in an invalid training range.

**Solutions**:
- This typically indicates a configuration issue
- Check your template settings in the dashboard
- Ensure start and end positions are valid

### "Small window"

**Cause**: The target window is too small for reliable tracking.

**Solutions**:
- Increase the target window size in your template
- The minimum effective window depends on sensor resolution

## System Errors

### "Segment is nullptr" / "ERROR"

**Cause**: Internal error — the trainer couldn't load segment data.

**Solutions**:
1. Press the button to reset
2. Power cycle the device
3. Check your template has valid segments
4. Try re-downloading settings from the dashboard

!!! warning
If this error persists, contact support with your Trainer ID and steps to reproduce.

## Pass/Fail Messages

When Pass/Fail mode is enabled on a segment:

### "Failed" Screen

**Content**: Shows "Failed" with attempt count (e.g., "Attempt 1/3")

**Meaning**: Your score was below the required threshold for this segment.

**What happens**:
- Press the button to retry the segment
- You have 3 attempts before the three-strikes penalty

### "YOU FAIL - 3 failed attempts"

**Meaning**: You've failed the same segment three consecutive times.

**What happens**:
- The entire training session restarts from the beginning
- This is the "three-strikes" rule

!!! tip
If a segment is too difficult, adjust the pass threshold in your template settings on the dashboard.

### Custom Failure Messages

Templates can include custom failure messages (up to 80 characters) that display when you fail a segment. These are set by the template creator.

## Grade Messages

These aren't errors, but feedback messages shown after completing a segment:

| Grade | Message |
|-------|---------|
| 100% | "PERFECT!" |
| 90%+ | "Great job! Gold star!" |
| 80%+ | "Ribbit! Froggy proud!" |
| 70%+ | "So cool, well done!" |
| 69% | "Nice." |
| 60%+ | "You're doing great" |
| 50%+ | "Keep hopping!" |
| 40%+ | "Arrgh! Try again!" |
| 30%+ | "Boo! Ghostly effort!" |
| 20%+ | "Bombing out is not fun" |
| \<20% | "Oh poop! Next time" |

## Provisioning Errors

These only appear during initial device setup (factory/repair):

### "Failed to get trainer ID"

**Cause**: Provisioning server communication failed.

**Solutions**:
- Ensure internet connection
- Try again
- Contact support if persistent

## General Troubleshooting

<AccordionGroup>
??? note "Device shows error then freezes"

1. Try pressing the button to dismiss
2. If unresponsive, power cycle the device (switch off/on)
3. If the issue repeats, note the error and contact support

??? note "Error appears immediately after power-on"

- Wait for the device to complete startup
- Check Wi-Fi connection
- Try connecting to a different network

??? note "Errors during training"

- Training-related errors are usually feedback, not failures
- Adjust your technique or template settings
- Check that calibration completed correctly

</AccordionGroup>

## Contact Support

If you encounter an error not listed here or need additional help:

- Note the exact error message or code
- Include your Trainer ID
- Describe what you were doing when the error appeared

<Card title="Contact Support" icon="envelope" href="mailto:support@researchanddesire.com">
Email: support@researchanddesire.com
</Card>
