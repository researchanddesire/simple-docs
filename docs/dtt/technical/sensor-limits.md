# Sensor Specifications

The Deepthroat Trainer uses an ultrasonic distance sensor to measure toy position in real-time. Understanding the sensor's capabilities and limits helps you get the most accurate training results.

## Sensor range

| Specification | Value |
|---------------|-------|
| **Maximum range** | 22.5 cm (approximately 9 inches) |
| **Dead zone** | 1.7 cm (approximately 0.67 inches) |
| **Effective usable range** | 20.8 cm (approximately 8.2 inches) |
| **Minimum stroke length** | 0.8 cm (approximately 0.3 inches) |

!!! info
    The dead zone is the area closest to the sensor where it cannot accurately detect position changes. Objects within this zone may not register correctly.

## How the sensor works

The distance sensor continuously samples your position and processes the data to provide smooth, accurate readings:

- **Sample rate**: 40 samples are averaged to reduce noise
- **Speed calculation**: Based on position changes over time
- **Direction detection**: Tracks whether you're moving toward or away from the sensor

!!! note
    The sensor uses a circular buffer of recent readings. Sudden, jerky movements may take a moment to register accurately as the buffer updates.

## Position measurement

Positions are measured in centimeters from the sensor:

- **Start position**: Typically the "rest" position, further from the sensor
- **End position**: The target depth, closer to the sensor
- **Target window**: The acceptable range around the target position

For training accuracy, positions are clamped to valid ranges:
- Minimum detectable position: 1.7 cm (dead zone boundary)
- Maximum detectable position: 22.5 cm

## Calibration

Calibration captures two key positions:

1. **Minimum position**: The closest comfortable depth (100 samples averaged)
2. **Maximum position**: The rest/start position (100 samples averaged)

!!! tip
    For best results, hold steady during calibration. The trainer captures 100 samples at each position to ensure accurate measurements.

### Toy calibration vs device calibration

- **Device calibration**: Sets the overall sensor range for your setup
- **Toy calibration**: Stored in the cloud, remembers settings for specific toys

When using cloud calibration (Software 2.0+), calibration data is stored per-toy and synced across sessions.

## Limitations

### Dead zone
Objects within 1.7 cm of the sensor cannot be accurately measured. Training segments are automatically adjusted to respect this limit.

### Maximum range
The sensor cannot detect positions beyond 22.5 cm. If your setup requires longer distances, consider repositioning the trainer.

### Minimum stroke
Very small movements (less than 0.8 cm) may not register as separate strokes. This ensures the trainer doesn't count micro-movements as intentional actions.

### Environmental factors

!!! warning
    The sensor may be affected by:
    - Reflective surfaces near the sensing area
    - Very soft or sound-absorbing materials
    - Extreme temperatures

## Troubleshooting
!!! note "Sensor readings seem inaccurate"
    - Recalibrate the device
    - Ensure the toy is properly positioned in the sensor's path
    - Check that nothing is obstructing the sensing area

!!! note "Position jumps or stutters"
    - This may occur near the dead zone boundary
    - Try adjusting your segment parameters to avoid the extreme ranges
    - Ensure the toy moves smoothly without wobbling

!!! note "Small movements aren't detected"
    Movements smaller than 0.8 cm may not register. This is by design to prevent false readings from vibration or minor adjustments.

## Related guides
**[LED Feedback](/dtt/technical/led-feedback)**

How LED colors indicate your position status.
**[Calibration](/dtt/technical/calibration)**

Step-by-step guide to calibrating your trainer.
