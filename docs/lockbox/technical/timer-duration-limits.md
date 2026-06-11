# Timer Duration Limits

When setting a timed lock on your Chastity Lockbox, you can choose durations ranging from 30 seconds to over 1000 years. This guide explains how the timer system works and the available duration ranges.

!!! info
    For firmware/hardware details (internal time storage, unit conversion constants, and the encoder unit-range mapping), see the developer docs: https://dev.researchanddesire.com/lockbox/hardware/state-and-sync/

## Duration range overview

| Minimum | Maximum |
|---------|---------|
| 30 seconds | 1000 years |

!!! info
    The timer supports precise timing for any duration within this range.

## Setting the duration

When you select **Lock** from the main menu, the timer configuration screen appears:

1. **Rotate the encoder** to adjust the duration
2. A visual arc indicator shows your position within the current unit range
3. The duration displays in human-readable format (e.g., "10 minutes", "3 days")
4. **Press Enter** to confirm and start the lock

### Default starting value

The timer starts at **10 minutes** by default, positioned in the minutes range for quick adjustment.

## Duration units

As you increase the duration, the display steps through larger units—seconds, minutes, hours, days, weeks, months, and years—up to the 1000-year maximum. Turn the encoder to move within and between these units.

!!! warning
    Extremely long durations are technically supported but not recommended. Consider using **Lock Forever** mode with keyholder control for indefinite locks instead of setting multi-year timers.

## Visual arc indicator

The timer screen displays a semicircular arc that indicates your position within the current unit range:

- **Empty arc**: At the minimum of the current unit
- **Full arc**: At the maximum of the current unit
- **Partial fill**: Shows relative position

The arc resets when you cross into a new unit range (e.g., from minutes to hours).

## Encoder acceleration

The encoder has acceleration enabled for timer configuration:

- **Slow turns**: Precise, single-increment changes
- **Fast turns**: Larger jumps to quickly reach your target

!!! tip
    For very long durations, turn the encoder quickly to move through the ranges faster, then slow down to fine-tune.

## Display format

The timer display adapts based on duration:

| Duration | Display format |
|----------|---------------|
| Under 1 hour | MM:SS (e.g., "05:30") |
| 1–24 hours | Xh MM:SS (e.g., "2h 30:00") |
| 1–30 days | Xd Xh MM:SS (e.g., "3d 5h 30:00") |
| Over 30 days | Simplified (e.g., "2 months") |

## Dashboard vs device timers

When using the dashboard to create locks:

- **Dashboard**: May offer different duration presets and options
- **Device**: Uses the encoder-based system described here
- Both sync when connected to WiFi

!!! info
    Locks created from the dashboard are received by your device and display the remaining time using the same format.

## Related guides
**[Quick Start](../quick-start/index.md)**

Learn how to start your first lock.
**[Permalock Mode](../device-states/permalock.md)**

Indefinite locks without time limits.
**[Button Controls](button-controls.md)**

How to use the encoder for timer selection.
**[Hiding Time](../using/hiding-time.md)**

Hide the remaining time for added mystery.
