# Calibration

<iframe
  
  src="https://www.loom.com/embed/481662e9ed284264b539d9e5fe4ac691"
  title="How to calibrate your lockbox"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
!!! note "Video transcript"
    0:00 Hey there! If you're here, it's likely because you're seeing this calibration message on your chastity lockbox. This can happen if your device has been reflashed, or if calibration, for some reason, has been reset.

    0:11 This is no problem, all you need to do is simply tell it, or follow the instructions on screen. So right here it's asking me to hold the right button to calibrate.

    0:21 That identifies which pin is the right button, and then it'll calibrate the motor.

## What is calibration?

Calibration is an automatic process that teaches your Chastity Lockbox how it's assembled and how it should function. This step ensures your device operates correctly and safely.

## When does calibration happen?

!!! tip
    Your Chastity Lockbox arrives pre-calibrated and ready to use out of the box.

You'll only encounter the calibration screen in these situations:

1. **After flashing firmware** — If you've updated your device's software, calibration runs once automatically
2. **After a factory reset** — Resetting the device clears the stored calibration data

## What does calibration configure?

Calibration automatically detects and sets three critical parameters:

| Setting | Purpose |
|---------|---------|
| **Motor orientation** | Determines which direction the motor turns to lock and unlock |
| **Lock detection** | Teaches the device how to verify when it's securely locked |
| **Motor power level** | Sets optimal power for secure locking while minimizing battery drain |

## Encountering the calibration screen

### Step 1: Button calibration

The device displays "Calibrating" and asks you to hold the Enter button. This identifies which physical pin corresponds to which button—some hardware variants have different configurations.

Press and hold the Enter/Lock button (the right button) until the device acknowledges it.

### Step 2: Motor calibration

The device displays "Calibrating Motor" and automatically tests the locking mechanism:

1. The motor attempts to lock
2. Sensors verify the lock position
3. The motor attempts to unlock
4. Sensors verify the unlock position

This determines if the motor direction needs to be inverted for your hardware.

!!! warning
    Do not turn off the device during motor calibration. The process takes approximately 6 seconds.

### Step 3: Automatic restart

After calibration completes successfully, the device automatically restarts and returns to normal operation.

!!! success
    You won't see the calibration screen again unless you reflash the firmware or perform a factory reset.

## Calibration failures

If calibration fails (motor doesn't reach expected positions), the device may:
- Retry calibration automatically
- Display an error requiring manual intervention
- Need to be reflashed via the web flasher

!!! note
    If you're having trouble with calibration or your device isn't responding as expected, contact customer support at support@researchanddesire.com.
