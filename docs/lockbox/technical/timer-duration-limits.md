# Timer Duration Limits

When setting a timed lock on your Chastity Lockbox, you can choose durations ranging from 30 seconds to over 1000 years. This guide explains how the timer system works and the available duration ranges.

## Duration range overview

| Minimum | Maximum |
|---------|---------|
| 30 seconds | 1000 years |

!!! info
    The timer uses millisecond precision internally, supporting extremely precise timing for any duration within this range.

## Setting the duration

When you select **Lock** from the main menu, the timer configuration screen appears:

1. **Rotate the encoder** to adjust the duration
2. A visual arc indicator shows your position within the current unit range
3. The duration displays in human-readable format (e.g., "10 minutes", "3 days")
4. **Press Enter** to confirm and start the lock

### Default starting value

The timer starts at **10 minutes** by default, positioned in the minutes range for quick adjustment.

## Duration units and increments

The encoder maps to different time units depending on the current value. As you increase the duration, the unit automatically changes:

### Seconds (30–120 seconds)

| Range | Increment | Example values |
|-------|-----------|----------------|
| 30–120 seconds | 1 second | 30s, 31s, 32s... 120s |

### Minutes (1–120 minutes)

| Range | Increment | Example values |
|-------|-----------|----------------|
| 1–120 minutes | 1 minute | 1 min, 2 min... 120 min |

### Hours (2–24 hours)

| Range | Increment | Example values |
|-------|-----------|----------------|
| 2–24 hours | 1 hour | 2h, 3h, 4h... 24h |

### Days (1–30 days)

| Range | Increment | Example values |
|-------|-----------|----------------|
| 1–30 days | 1 day | 1 day, 2 days... 30 days |

### Weeks (4–8 weeks)

| Range | Increment | Example values |
|-------|-----------|----------------|
| 4–8 weeks | 1 week | 4 weeks, 5 weeks... 8 weeks |

### Months (2–12 months)

| Range | Increment | Example values |
|-------|-----------|----------------|
| 2–12 months | 1 month | 2 months, 3 months... 12 months |

### Years (1–1000 years)

| Range | Increment | Example values |
|-------|-----------|----------------|
| 1–1000 years | 1 year | 1 year, 2 years... 1000 years |

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

## Time calculations

Internally, durations are stored in milliseconds using these conversions:

| Unit | Milliseconds |
|------|--------------|
| 1 second | 1,000 |
| 1 minute | 60,000 |
| 1 hour | 3,600,000 |
| 1 day | 86,400,000 |
| 1 week | 604,800,000 |
| 1 month | 2,629,746,000 (~30.44 days) |
| 1 year | 31,556,952,000 (~365.24 days) |

!!! note
    Month and year calculations use average lengths to account for varying month lengths and leap years.

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
**[Quick Start](../quick-start/)**

Learn how to start your first lock.
**[Permalock Mode](../device-states/permalock)**

Indefinite locks without time limits.
**[Button Controls](./button-controls)**

How to use the encoder for timer selection.
**[Hiding Time](../using/hiding-time)**

Hide the remaining time for added mystery.
