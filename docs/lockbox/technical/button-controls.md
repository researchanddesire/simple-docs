# Button Controls

Your Chastity Lockbox has two physical buttons and a rotary encoder dial for navigation and control. This guide covers all input methods and their functions across different device states.

## Physical controls

Your device has three input methods:

| Control | Location | Primary function |
|---------|----------|-----------------|
| Enter/Lock button | Right side | Confirm selections, start locks |
| Back button | Left side | Cancel, go back, exit menus |
| Rotary encoder | Center dial | Navigate menus, set timer duration |

## Enter/Lock button

The Enter button is your primary action button. Its function varies based on context:

### Standard actions

| Input | Action |
|-------|--------|
| Click | Confirm selection, advance to next screen |
| Double-click | Same as click (for accessibility) |
| Long press | Context-specific action (e.g., confirm calibration) |

### While device is locked

When your device is in a locked state, pressing the Enter button opens the lock menu where you can access options like Sleep, WiFi Settings, Take a Break, and Emergency Unlock.

## Back button

The Back button navigates backward through menus and cancels operations:

| Input | Action |
|-------|--------|
| Click | Go back one screen, cancel current operation |
| Double-click | Same as click (for accessibility) |
| Long press | Reserved for future use |

!!! tip
    If you're ever unsure where you are in the menu, pressing the Back button will return you to the previous screen without making changes.

## Hard reset

If your device becomes unresponsive, you can force a restart using the hard reset procedure.

### Step 1: Press and hold the Enter button

Press and hold the Enter/Lock button continuously.

### Step 2: Wait 10 seconds

Keep holding for a full 10 seconds. The device will restart automatically.

### Step 3: Release and wait

Release the button and wait for the device to complete its boot sequence.

!!! success
    Your device should display the startup screen and return to normal operation.

!!! warning
    The hard reset is for unresponsive devices only. Your lock state is preserved through restarts, so you won't lose your session.

## Hard reboot with resync

If your device is having sync issues with the dashboard—such as locks not applying correctly or unexpected unlocks—use a hard reboot to force a full resync.

### Step 4: Ensure device is charged

Connect your device to power or verify it has sufficient battery.

### Step 5: Press and hold the Enter button

Press and hold the **Enter/Lock** button continuously.

### Step 6: Wait 10 seconds

Keep holding for a full 10 seconds. The device will restart.

### Step 7: Wait for resync

After restarting, the device reconnects to WiFi and resyncs with the dashboard, pulling the latest lock state from the server.

!!! success
    Your lock state should now match what's shown on the dashboard.

!!! tip
    Use this procedure when your device and dashboard seem out of sync—for example, if the device shows a different lock state than the dashboard, or if lock commands aren't being applied.

## Rotary encoder (dial)

The rotary encoder dial in the center of the device is used for navigation and value selection:

### In menus

- **Turn clockwise**: Move down through menu options
- **Turn counter-clockwise**: Move up through menu options

The currently selected option is highlighted on screen.

### In timer configuration

When setting a lock duration, the encoder controls the time value:

- **Turn clockwise**: Decrease duration
- **Turn counter-clockwise**: Increase duration

!!! info
    The encoder has acceleration enabled in timer mode—turning faster increases the rate of change, making it quicker to reach longer durations.

## Button behavior during idle states

Your device conserves power by entering idle states after periods of inactivity. Button behavior changes slightly:

| Idle state | Button press effect |
|------------|-------------------|
| Screen dimmed (30s) | Wakes device, action is ignored |
| Screen off (2min) | Wakes device, action is ignored |
| Deep sleep (10min) | Wakes device from sleep |

!!! note
    When waking from any idle state, the first button press only wakes the device. Press again to perform the intended action.

## Context-specific behaviors

### Main menu

- **Encoder**: Select between Lock, Lock Forever, Settings, Sleep
- **Enter**: Activate selected option
- **Back**: No action (already at top level)

### Settings menu

- **Encoder**: Navigate settings options
- **Enter**: Activate selected setting
- **Back**: Return to main menu

### Lock timer configuration

- **Encoder**: Adjust lock duration (30 seconds to 1000 years)
- **Enter**: Confirm duration and start lock
- **Back**: Cancel and return to main menu

### While locked

- **Enter**: Open lock menu
- **Back**: No action (prevents accidental menu access)

### Lock menu (while locked)

- **Encoder**: Navigate options
- **Enter**: Activate selected option
- **Back**: Close menu and return to lock screen

## Troubleshooting
!!! note "Buttons don't respond"
    The device may be in an idle state. Press any button once to wake it, then try again.

!!! note "Button presses but doesn't register"
    If a button physically clicks but the device doesn't respond to that specific button (while other buttons work normally), this may indicate hardware failure.

    **To confirm hardware failure:**
    1. Verify the device isn't in an idle state—press another button first to wake it
    2. Try a hard reset by holding the Enter/Lock button for 10 seconds (if that button still works)
    3. If the hard reset button is the one that failed, let the battery fully drain, then recharge and test again

    **If the issue persists after these steps**, the button has likely failed and requires replacement. Contact support at [support@researchanddesire.com](mailto:support@researchanddesire.com) with a description of the issue.

!!! note "Device is completely unresponsive"
    Try the hard reset: hold the Enter button for 10 seconds. If that doesn't work, connect the device to power and try again.

    If freezing persists after multiple hard resets, reflash the firmware using the <a href="../support/flashing">web flasher</a>. When flashing, do not check the "Erase device" box to preserve your settings and lock state.

!!! note "Encoder skips options"
    Turn the dial more slowly. The encoder has acceleration, so fast turns can skip multiple options.

!!! note "Wrong button activates"
    After a firmware flash, calibration ensures buttons are correctly mapped. If buttons seem swapped, contact support to recalibrate.

## Related guides
**[Menu Structure](menu-structure.md)**

Complete guide to all menus and navigation paths.
**[Timer Duration Limits](timer-duration-limits.md)**

Understand the full range of lock durations available.
**[Restarting Device](../device-states/restarting.md)**

Standard restart procedures and troubleshooting.
**[Sleep Mode](../device-states/sleep-mode.md)**

How idle states and sleep affect your device.
