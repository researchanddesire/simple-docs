# Offline Mode

Your Chastity Lockbox is designed to function both online and offline. This guide explains what works without WiFi, what requires connectivity, and how the device handles transitions between online and offline states.

!!! info
    For firmware/hardware details (storage persistence, dashboard sync payloads, and reconnection timing), see the developer docs: https://dev.researchanddesire.com/lockbox/hardware/state-and-sync/

## What works offline

These features function fully without any internet connection:

| Feature | Offline behavior |
|---------|-----------------|
| Timed locks | Timer continues counting down locally |
| Lock/unlock mechanism | Physical lock engages and releases |
| Menu navigation | All menus accessible |
| Button controls | Full functionality |
| Sleep modes | Automatic and manual sleep work |
| Emergency unlock | Can be used locally (if enabled) |
| State persistence | Lock state survives restarts |

!!! tip
    If you're going somewhere without WiFi, your lock will continue working. The timer runs on the device itself, not on a server.

## What requires WiFi

These features need an active WiFi connection:

| Feature | Why WiFi is needed |
|---------|-------------------|
| Pairing | Device must register with dashboard server |
| Firmware updates | Downloads from update server |
| Dashboard sync | Receives keyholder commands |
| Time synchronization | Gets accurate time from NTP server |
| Activity logging | Sends events to dashboard |
| Public voting | Receives vote updates |
| Keyholder unlock | Remote unlock commands |

## Time display when offline

When your device isn't connected to WiFi and hasn't synchronized time, the lock screen shows:

> "Connect Wi-Fi to see time remaining"

!!! warning
    Without time sync, the device cannot display accurate remaining time. However, the lock timer itself still runs correctly based on the configured duration.

### Why this happens

The device needs to know the current time to calculate "time remaining." Without an NTP sync:
- The device knows the lock duration
- The device doesn't know what time it is now
- Therefore, it can't calculate remaining time

Once WiFi connects and time syncs, the display updates to show accurate remaining time.

## Local play mode

When you start a lock directly on the device (not from the dashboard), it operates in "local play" mode:

### Local play characteristics

- Lock duration is stored locally on device
- Timer runs independently of server
- No keyholder involvement required
- Lock ends when timer expires

### Dashboard locks

When a lock is started from the dashboard:

- Settings sync to device over WiFi
- Break schedules are received
- Emergency unlock can be remotely disabled
- Keyholder can modify lock remotely

!!! info
    Local locks (started on device) cannot be modified from the dashboard. Dashboard locks can be modified by your keyholder even when you're offline—the changes sync when you reconnect.

## State persistence

Your device preserves its state across:

- Restarts
- Power cycles
- WiFi disconnections
- Deep sleep

The following data persists:

- Lock state (locked/unlocked)
- Lock end time
- Session settings
- WiFi credentials
- Calibration data

!!! note
    Even if your device loses power completely, it will return to its locked state when powered on.

## WiFi reconnection behavior

When WiFi disconnects during operation:

1. **Immediate**: Device continues operating normally
2. **Automatically**: The device retries the connection on its own
3. **On reconnection**: Syncs state with dashboard

### Manual WiFi setup

You can reconfigure WiFi at any time through:
- Main Menu → Settings → WiFi Settings
- Lock Menu → WiFi Settings (while locked)

This opens the configuration portal without affecting your lock state.

## Offline scenarios

### Scenario 1: WiFi goes down during lock

- Lock timer continues normally
- "Connecting" indicator shows on status bar
- Auto-reconnect attempts run automatically in the background
- Lock unlocks when timer expires (no WiFi needed)

### Scenario 2: Starting lock without WiFi

- Navigate to Lock in menu
- Set duration with encoder
- Press Enter to confirm
- Lock engages locally
- Time display shows "Connect Wi-Fi to see time remaining"
- Timer still counts down correctly

### Scenario 3: Travel to location without WiFi

- Device works normally
- Dashboard cannot send commands
- Local emergency unlock still available (if enabled)
- On return to WiFi, state syncs automatically

### Scenario 4: Deep sleep disconnects WiFi

- WiFi disconnects in deep sleep (power saving)
- Lock state unchanged
- On wake, WiFi reconnects automatically
- Pending dashboard commands received

## Dashboard sync

When online, your device keeps in sync with the dashboard—sending updates such as lock state changes and receiving commands such as lock, unlock, and break schedule updates. Commands typically arrive within seconds when online.

!!! info
    For the exact data sent and received and the underlying protocol, see the developer docs: https://dev.researchanddesire.com/lockbox/hardware/state-and-sync/

## Troubleshooting offline issues
!!! note "Time remaining not showing"
    Connect to WiFi to sync time. The lock is still running—you just can't see the countdown until time syncs.

!!! note "Can't receive keyholder commands"
    Your device must be online to receive dashboard commands. Check WiFi connection status in the status bar.

!!! note "Lock ended but dashboard still shows locked"
    The dashboard updates when your device reconnects. Connect to WiFi and the status will sync.

!!! note "WiFi won't reconnect automatically"
    Go to Settings → WiFi Settings to manually reconnect. Your lock state is unaffected.

## Related guides
**[WiFi Setup](../quick-start/wifi-setup.md)**

How to connect your device to WiFi.
**[Sleep Mode](../device-states/sleep-mode.md)**

How sleep affects WiFi connectivity.
**[Status Symbols](../using/symbols.md)**

Understanding the WiFi status indicator.
**[Online Status](../support/online-status.md)**

How to verify your device is online.
