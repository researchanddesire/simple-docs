# Offline Mode

Your Deepthroat Trainer can operate offline using cached session data. While some features require connectivity, you can still train when Wi-Fi isn't available.

## What works offline

With Software 2.0+, the trainer stores the last downloaded session locally:

| Feature | Offline Support |
|---------|-----------------|
| **Training sessions** | Yes — uses cached session |
| **Position tracking** | Yes — fully functional |
| **LED feedback** | Yes — fully functional |
| **On-device grades** | Yes — displayed after segments |
| **Calibration** | Yes — stored locally for the session |

## What requires connectivity

| Feature | Why |
|---------|-----|
| **Uploading results** | Grades and stats need to sync to the dashboard |
| **Downloading new sessions** | Template changes require a fresh download |
| **Firmware updates** | OTA updates need internet access |
| **Cloud calibration sync** | Toy calibration data stored remotely |
| **Leaderboard updates** | Points aren't recorded until sync |

!!! warning
    Offline sessions are **not saved** to your dashboard until you reconnect. If the device loses power before syncing, that session's results may be lost.

## How offline playback works

### Automatic caching
When you fetch settings while online:
1. The session is downloaded from the dashboard
2. A copy is saved to local storage (SPIFFS)
3. This cached copy is available for offline use

### Starting an offline session
1. Power on the trainer
2. If offline, you'll see "You're offline, your grades may not be saved."
3. Press the button to continue with cached settings
4. Train normally — everything works locally

!!! note
    The cached session is your **last downloaded** session. To train a different template offline, download it while online first.

## Preparing for offline training

Before going offline:

### Step 1: Connect to Wi-Fi

Ensure your trainer connects to the internet successfully.

### Step 2: Select your template

Choose the template you want to train with on the dashboard.

### Step 3: Fetch settings

Start a session on the trainer to download the latest settings. You can exit after fetching — the data is now cached.

### Step 4: Verify the cache

Optionally, disconnect Wi-Fi and start a session to confirm offline mode works.

## Syncing results when back online

When you reconnect to Wi-Fi:
1. Power on the trainer
2. The device will sync pending results automatically
3. Check your dashboard to confirm the session appeared

!!! info
    Currently, offline sessions sync on the next online session start. Future firmware may add background sync.

## Limitations

### Session storage
The trainer stores **one** cached session at a time. Downloading a new session overwrites the previous cache.

### Results not saved
Results from offline training are calculated on-device but not persisted. They're shown during the session but may be lost if:
- The device loses power before reconnecting
- You download a new session before syncing

### Segment limits
Offline playback uses the same segment limits as online mode (up to 100 effective segments with Ultra).

## Best practices

!!! tip
    **Plan ahead**: Download your intended session while online before traveling or going somewhere without Wi-Fi.

    - Keep the trainer charged — losing power loses unsaved results
    - Don't update templates while offline (changes won't apply until re-downloaded)
    - Reconnect when possible to sync results and get updates

## Troubleshooting
!!! note "Offline mode won't start"
    - Ensure you've previously downloaded a session while online
    - The cache may be empty if this is a new device or after a reset
    - Try connecting to Wi-Fi first, then disconnect

!!! note "Results didn't sync after reconnecting"
    - Start a new session while online to trigger sync
    - Check your dashboard — results may take a moment to appear
    - If still missing, the results may not have been stored before power-off

!!! note "Wrong template loads offline"
    The offline cache uses your last downloaded session. To change templates offline:
    1. Reconnect to Wi-Fi
    2. Start a session with the desired template
    3. Disconnect and continue offline

## Future improvements

Offline session syncing (storing multiple sessions for later upload) is planned for a future firmware release. See the <a href="/dtt/software-2.0-preview">Software 2.0 Preview</a> for upcoming features.

## Related guides
**[Wi-Fi Setup](../quick-start/pairing/wifi-setup.md)**

Connect your trainer to Wi-Fi.
**[Checking Results](../quick-start/checking-results.md)**

View your synced session results.
