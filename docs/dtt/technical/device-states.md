# Device States and Screens

Your Deepthroat Trainer moves through various states during operation, each with its own display screen. Understanding these states helps you navigate the device and troubleshoot any issues.

## Startup sequence

When you power on your trainer, it goes through these states:

### Welcome Screen
- Displays your **Trainer ID** (5-character alphanumeric code)
- Shows Wi-Fi connection status
- **Timeout**: 15 seconds before auto-advancing

!!! info
    Write down your Trainer ID — you'll need it to pair the device with your dashboard account.

### Preflight Checks
After the welcome screen, the device runs system checks:
- Verifies Wi-Fi connection
- Checks if device is paired
- Looks for available updates

The screen shows "Getting ready..." while these checks complete.

## Wi-Fi Configuration

### Wi-Fi Setup Screen
Displayed when entering Wi-Fi configuration mode:
- Shows a QR code for easy connection
- Displays "Connect to 'Trainer Setup'"
- **Enter via**: Long press during welcome screen

!!! tip
    The WiFi configuration portal has a 400-second timeout. If it expires, the device will restart.

## Pairing State

If your device isn't paired to a dashboard account:
- Displays a QR code linking to dashboard settings
- Shows "Pair me for more settings and fun!"
- Press the button to skip and continue offline

## Update State

When a firmware update is available:
- Displays "Updating" with a progress indicator
- Shows "Thanks for waiting! You're almost ready to play."
- The device will restart automatically after updating

!!! warning
    Do not power off the device during an update. Wait for it to complete and restart automatically.

## Play Flow States

### Pre-Session Screens

| Screen | Description |
|--------|-------------|
| **Preflight** | "Getting ready..." — checks connectivity and settings |
| **Fetch Settings** | "I'm getting your settings from the dashboard." |
| **Load Settings** | "You're offline, your grades may not be saved." (offline mode) |
| **Bad Health Check** | Error E-DTT-1 — see <a href="/dtt/errors/e-dtt-1">troubleshooting guide</a> |

### Calibration Screens

| Screen | Description |
|--------|-------------|
| **Calibration Min** | Capture minimum (closest) position — press button when ready |
| **Calibration Max** | Capture maximum (rest) position — press button when ready |

!!! note
    Calibration captures 100 samples at each position for accuracy. Hold steady while pressing the button.

### Session Details

Before training begins, you'll see information screens:

| Screen | Content | Timeout |
|--------|---------|---------|
| **Session Details** | Session name, total segments | 10 seconds |
| **Toy Details** | Assigned toy name and settings | 10 seconds |
| **Segment Details** | Current segment name and parameters | 10 seconds |

!!! tip
    In Hands-Free Mode (Ultra), these screens advance automatically. Otherwise, press the button to continue.

### Training Screens

| Screen | Description |
|--------|-------------|
| **Countdown** | "Starting in 3... 2... 1... Good Luck!" |
| **Active Training** | Real-time display showing position, target, and progress |
| **Grade** | Your score and performance feedback (timeout: 30 seconds) |

### Pass/Fail Screens (if enabled)

| Screen | Description | Timeout |
|--------|-------------|---------|
| **Failed** | Shows "Failed" with attempt count (e.g., "Attempt 1/3") | Press to retry |
| **Three Strikes** | "YOU FAIL - 3 failed attempts" — session restarts | 5 seconds |

### Session Complete

| Screen | Description |
|--------|-------------|
| **Final Page** | "Well done! You finished the session." (timeout: 10 seconds) |

The LED turns magenta on the final page to celebrate completion.

## Error States

| Error | Screen Content |
|-------|----------------|
| **E-DTT-1** | "No internet. Check firewall and router." |
| **Segment Error** | "ERROR" header with reset option |

See the <a href="/dtt/technical/error-codes">Error Codes</a> guide for detailed troubleshooting.

## State diagram overview

```
Power On → Welcome → Preflight → [Update if available]
                              → [Pairing if needed]
                              → Play Preflight → Fetch/Load Settings
                                              → Calibration (if needed)
                                              → Session Details
                                              → Countdown → Training
                                              → Grade → [Next Segment or Final]
```

## Button actions by state

| State | Short Press | Long Press |
|-------|-------------|------------|
| Welcome | Start preflight | Enter Wi-Fi setup |
| Session Details | Next screen | Skip to training |
| Segment Details | Start segment | Skip to training |
| Grade | Next segment | — |
| Failed | Retry segment | — |
| Final | Play again | — |

## Related guides
**[Button Controls](button-controls.md)**

Complete guide to button interactions.
**[Error Codes](error-codes.md)**

Troubleshoot error messages.
