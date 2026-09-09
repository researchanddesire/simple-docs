# LED Feedback System

Your Deepthroat Trainer uses a strip of RGB LEDs to provide instant visual feedback during training. The colors indicate your current position relative to the target zone, helping you adjust in real-time without looking at the display.

## LED colors during training

| Color | Meaning | Action |
|-------|---------|--------|
| **Green** | In the target zone | Hold this position — you're doing great |
| **Yellow** | Ahead of target | Move deeper to reach the target zone |
| **Red** | Behind target | You've gone too deep or lost position |

!!! tip
    Keep your focus on maintaining green. The LED provides faster feedback than reading the display, making it easier to stay in rhythm.

## Position states explained

The trainer continuously monitors your position and categorizes it into three states:

### In Window (Green)
Your current position is within the target window defined by your training segment. This is where you want to be.

- For **Repetition** and **Bounce** modes: You're matching the target movement pattern
- For **Endurance** mode: You're holding at the correct depth
- For **Freeform** mode: You're maintaining the target RPM range

### Ahead (Yellow)
You're shallower than the target position. The trainer is waiting for you to move deeper.

- In paced modes, this often means you're moving faster than the target
- Slow down and let the target catch up to your position

### Behind (Red)
You've moved past the target zone, typically too deep. 

- In paced modes, this means you've moved ahead of the target timing
- Pull back and re-sync with the target pattern

## LED colors at other times

| Context | Color | Meaning |
|---------|-------|---------|
| Welcome/Idle | Blue | Device is ready and waiting |
| Session Complete | Magenta | Training finished — well done! |
| Failed Segment | Red | Segment failed (if Pass/Fail enabled) |
| Grade Display | Green/Yellow/Red | Reflects your grade percentage |

## Grade screen colors

After completing a segment, the LED color reflects your performance:

| Grade | LED Color |
|-------|-----------|
| 70% and above | Green |
| 40% – 69% | Yellow |
| Below 40% | Red |

!!! note
    A grade of exactly 69% shows green as a special case (Nice!).

## Using LED feedback effectively

### During Repetition Mode
Watch for the LED to stay green throughout each rep. If it flickers to yellow or red, adjust your pace to better match the on-screen target.

### During Endurance Mode
The LED should remain solid green while holding position. Any flicker indicates you're drifting out of the target zone.

### During Freeform Mode
Green indicates you're maintaining the target RPM. Yellow or red means you need to adjust your pace.

### During Bounce Mode
Since Bounce requires controlled movement in both directions, watch for the LED to stay green through both the insertion and withdrawal phases.

## Troubleshooting
!!! note "LED doesn't light up during training"
    - Check that the device is powered on and not in a menu screen
    - The LED only activates during active training segments
    - Try power-cycling the device

!!! note "LED flickers rapidly between colors"
    You're moving near the boundary of the target zone. Try to settle into a more stable position well within the zone rather than at its edge.

!!! note "LED stays one color regardless of movement"
    - Ensure calibration was completed correctly
    - The sensor may not be detecting movement — check toy positioning
    - Try recalibrating from the settings

## Related guides
**[Training Modes](../training-modes/index.md)**

Learn how each training mode uses position feedback.
