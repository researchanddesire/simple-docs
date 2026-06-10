---
title: "Accessory Port"
description: "Technical specifications for the 3.5mm accessory port and custom integration guidelines"
---

The Deepthroat Trainer includes a 3.5mm accessory port that drives compatible vibrating accessories for real-time, performance-based reinforcement.

## Official accessories

We offer vibrating plugs and wands that connect directly to the accessory port. These accessories auto‑respond to training output—no additional setup required.

!!! info
The accessory port outputs a modulated signal that scales with training performance. Higher performance produces stronger accessory activation.

### Using multiple accessories

When you purchase a Vibe and Wand together, we include a splitter cable so you can use both accessories simultaneously during training. Connect the splitter to the Trainer's accessory port, then plug each accessory into the splitter.

!!! tip
The wand is designed for external use—hold it in place manually, tuck it into underwear, or position it however works best for you.

!!! warning
Using multiple accessories increases battery drain. With both accessories connected, expect approximately 2–3 hours of battery life instead of the standard 4 hours. Monitor your battery level during longer sessions.

## Port specifications

The accessory port uses a 4‑conductor TRRS (3.5 mm) jack with the characteristics below.

| Parameter | Specification |
|-----------|---------------|
| Connector type | 3.5 mm TRRS (4‑conductor) |
| Signal output | First ring (R1) |
| Signal type | 3.3 V PWM (pulse‑width modulation) |
| Maximum current | 200 mA total on the accessory output |
| Behavior | Duty cycle varies dynamically based on training performance |

!!! note
PWM (pulse‑width modulation) rapidly switches the output on and off. The effective intensity is controlled by the duty cycle (percentage of time the signal is on within each cycle).

!!! warning
When connecting external devices to the trainer, follow these safety guidelines:

- Never connect high‑voltage or mains‑powered equipment directly to the accessory port.
- Observe basic electrical safety and comply with all local standards and regulations.
- Attempt custom integrations only if you are experienced with electronics and accept the associated risks.
- We officially support only R+D accessories. Custom or third‑party interfaces are used at your own risk.

## Pinout diagram

Refer to the diagram for conductor positions and ground reference. The PWM signal is present on the first ring (R1).

<Frame caption="TRRS pinout diagram for the accessory port">
  <img src="./dtt/_images/image (5).webp" alt="Accessory port TRRS pinout diagram showing the 4-conductor configuration" />
</Frame>

!!! tip
Do not assume a particular CTIA/OMTP conductor order from other audio devices. Always verify against the provided pinout before wiring.

## Custom integrations

Use the steps and reference designs below to safely integrate the accessory output into your own projects.


### Step 1: Plan your load and budget current


  Determine the accessory or circuit you want to drive and confirm it requires no more than 200 mA from the port. If it needs more current or a different voltage, use a driver stage (example provided below).

!!! success
You have identified the expected steady‑state current and any startup/inrush current for your load.


### Step 2: Measure the signal behavior on your device


  With the trainer active, measure the PWM duty cycle and frequency using a multimeter with duty‑cycle mode or an oscilloscope. Frequency may change across firmware versions; design for a reasonable range rather than a fixed value.

!!! success
You recorded typical duty‑cycle values at low, medium, and high performance, and confirmed the signal amplitude is 3.3 V.


### Step 3: Prototype with a safe test load


  Before connecting a motor or accessory, start with a resistor load within the 200 mA limit (for example, ≥22 Ω at 3.3 V). Verify the port does not exceed temperature limits and that the duty cycle behaves as expected.

!!! warning
Do not short the output. Use a current‑limited bench supply or an inline fuse for additional protection when testing.


### Step 4: Add a driver stage for higher‑power loads


  If your accessory requires more current or a higher voltage than the port provides, use a logic‑level N‑channel MOSFET or a dedicated low‑side driver. Keep the trainer’s accessory output strictly as a control signal.

!!! success
You can fully drive your accessory without exceeding the port’s limits, and the trainer remains cool and stable during operation.


### Step 5: Verify and finalize wiring


  Confirm conductor assignments against the pinout diagram. Route grounds as required by your design, add flyback protection for inductive loads, and strain‑relieve the TRRS connector.

!!! success
With the accessory connected, output intensity smoothly tracks performance without resets, brownouts, or audible artifacts.


### Reference circuits

Use these examples as starting points. Adapt component values to your accessory’s specifications.

#### A. Direct drive (≤200 mA at 3.3 V)

- Connect the accessory between the accessory port’s PWM output (R1) and ground as indicated by the pinout diagram.
- Optional: insert a small series resistor (1–4.7 Ω) to reduce inrush for small DC motors.
- Ensure total draw never exceeds 200 mA.

!!! warning
If your accessory draws near the 200 mA limit, measure stall current. Many small motors exceed steady‑state current at startup.

#### B. External power with MOSFET low‑side driver (>200 mA or >3.3 V)

- Power the accessory from an external supply sized for its voltage/current.
- Use the accessory port’s PWM (R1) as the MOSFET gate drive.
- Common design elements:
  - Logic‑level N‑MOSFET (e.g., low Rds(on) at 3.3 V gate)
  - Gate resistor: 47–220 Ω
  - Gate‑to‑source pulldown: 100 kΩ
  - Flyback diode across inductive loads (motor/solenoid): fast diode rated for load current
  - Common ground between external supply and the trainer, if required by your measurement and isolation strategy

!!! info
For galvanic isolation, use an optocoupler or a gate driver with isolation and power the isolated side appropriately. Ensure signal polarity and timing remain compatible with PWM.

### Reading the PWM signal with a microcontroller

If you want your project to react to the trainer’s performance rather than drive a load, read the PWM duty cycle with a microcontroller. The examples below measure duty cycle and map it to a 0–100% intensity value.

<CodeGroup>
```cpp Arduino
// Reads a 3.3 V PWM signal and computes duty cycle on Arduino (3.3 V boards recommended)
// Wire the accessory port PWM (R1) to a digital input pin that supports pulseIn measurements.

const int pwmPin = 2; // PWM signal from accessory port (R1)

void setup() {
  Serial.begin(115200);
  pinMode(pwmPin, INPUT);
}

void loop() {
  // Measure high and low durations (microseconds)
  unsigned long highT = pulseIn(pwmPin, HIGH, 50000); // 50 ms timeout
  unsigned long lowT  = pulseIn(pwmPin, LOW,  50000);
  if (highT > 0 && lowT > 0) {
    float duty = 100.0f * (float)highT / (highT + lowT);
    Serial.print("Duty: ");
    Serial.print(duty, 1);
    Serial.println(" %");
  }
}
```

```python Python
# Reads a 3.3 V PWM signal and computes duty cycle on Raspberry Pi using pigpio
# Requires: sudo apt install pigpio && sudo systemctl start pigpiod

import time
import pigpio

PWM_PIN = 18  # BCM numbering; connect accessory port PWM (R1) here
pi = pigpio.pi()
pi.set_mode(PWM_PIN, pigpio.INPUT)

def measure_duty(pin, interval=0.05):
    # Sample high/low states over a short window and estimate duty
    start = time.time()
    high_time = 0.0
    last_t = start
    last_state = pi.read(pin)
    while time.time() - start < interval:
        state = pi.read(pin)
        now = time.time()
        if last_state == 1:
            high_time += now - last_t
        last_t = now
        last_state = state
    duty = 100.0 * high_time / interval
    return max(0.0, min(100.0, duty))

try:
    while True:
        d = measure_duty(PWM_PIN)
        print(f"Duty: {d:4.1f} %")
        time.sleep(0.1)
finally:
    pi.stop()
```
</CodeGroup>

!!! note
If your microcontroller operates at 5 V logic, ensure the input pin is 3.3 V‑tolerant or add a level shifter/buffer. Do not feed 5 V back into the accessory port.

## Design guidelines and best practices

- Protect against inductive kickback with a diode across motors and solenoids.
- Keep cable runs short to minimize PWM edge ringing and EMI. Add a small RC snubber at the accessory if needed.
- Use strain relief on the TRRS connector to prevent intermittent connections.
- Validate with a dummy load before attaching a wearable or user‑contact accessory.
- Document your wiring and settings so you can reproduce results across sessions.

<AccordionGroup>
??? note "The accessory doesn’t respond"

- Confirm you are connected to the correct conductor (R1) for PWM.
- Verify the ground reference matches the pinout diagram.
- Test with a resistor load to rule out accessory faults.

??? note "Output seems weak or inconsistent"

- Measure actual duty cycle and confirm your driver stage isn’t in a linear region.
- Check supply voltages and ensure no brownout when the load engages.
- Reduce cable length or add decoupling close to the load.

??? note "Electrical noise or audible whining"

- Increase PWM filtering on the load side (RC or LC) if appropriate.
- Add a gate resistor (47–220 Ω) and minimize loop area on high‑di/dt paths.
- Mount the flyback diode close to the load terminals.

</AccordionGroup>

!!! success
You have verified current limits, confirmed correct pinout usage, and demonstrated stable operation with both a test load and your final accessory.
