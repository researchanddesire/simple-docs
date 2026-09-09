# Device Support

## Overview

RADR supports Research And Desire devices first, followed by popular third‑party toys via direct integrations and the Buttplug.io Bluetooth protocol. We continuously evaluate, implement, and validate support across 2025–2026.

!!! info
    Want us to prioritize a device or add a new one? Email support@researchanddesire.com or use our contact form at https://www.researchanddesire.com/contact.

### Status legend

- Supported: RADR can connect and control the device.
- Tested: Verified by R+D in-house for reliability with RADR.
- Vibration Only: Only the vibration motor is controllable; advanced features (heating, thrusting, suction, rotation, lighting) are not yet supported.
- Oscillation Only: Only oscillation/thrusting control is available; vibration features are not supported.
- Pending: Not yet implemented; on the roadmap.

!!! tip
    For the smoothest setup, keep your device firmware up to date and follow the [Quick Start](../getting-started/quick-start.md) to pair.

!!! info
    Device support is continuously expanding. RADR uses a dynamic device registry that can be updated via firmware updates without changing the core application, allowing new devices to be added more frequently.

!!! warning
    Untested devices show a warning before first use. When connecting to an untested device for the first time, RADR displays a confirmation dialog. You must acknowledge you understand the risks before proceeding. Start at the lowest intensity and verify basic controls before a session.

## Verify your device works with RADR

### Step 1: Charge and update

Charge your RADR via USB‑C. If your OSSM or RADR needs an update, flash using the <a href="/ossm/tools/">Web Flasher</a>.

!!! success
    Device powers on and shows the home screen.

### Step 2: Power on and make discoverable

Turn on your target device and ensure Bluetooth is enabled or the device is in pairing/advertising mode (consult the device's manual if unsure).

### Step 3: Scan with RADR

Follow the [Quick Start](../getting-started/quick-start.md) to scan. RADR only lists supported devices; if yours appears, select to connect.

!!! success
    You can start/stop and change intensity from RADR.

## Research And Desire devices

| Device | Supported | Tested |
| --- | --- | --- |
| [Open Source Sex Machine](https://www.researchanddesire.com/open-source-sex-machine) | Yes | Yes |
| [Chastity Lockbox](https://www.researchanddesire.com/products/lockbox) | Pending | - |
| Deepthroat Trainer | Pending | - |

!!! note
    Deepthroat Trainer integrations focus on cross‑device experiences and are rolling out in phases. Watch the <a href="/dtt/quick-start">Quick Start</a> and <a href="/dtt/faqs">FAQs</a> for updates.

## Third‑party devices

| Device | Supported | Tested |
| --- | --- | --- |
| DG Labs Coyote E‑Stim Powerbox 3.0 | Pending | - |

## Buttplug.io devices

Through our partnership with Buttplug.io, RADR supports Bluetooth devices that speak the Buttplug protocol. Check their public compatibility list for the most current coverage. Feature availability varies by model; in many cases RADR provides vibration control only.

### Lovense (tested)

| Device | Supported | Tested |
| --- | --- | --- |
| Lovense Domi | Vibration Only | Yes |
| Lovense Hyphy | Vibration Only | Yes |
| Lovense Ferri | Vibration Only | Yes |

!!! info
    Lovense Domi (and Domi 2) has direct integration—not via Buttplug.io—that includes battery level reading and power control commands. Other Lovense devices use the generic Buttplug.io implementation with vibration-only control.

### Lovense (untested)

| Device | Supported | Tested |
| --- | --- | --- |
| Lovense Max | Vibration Only | - |
| Lovense Edge | Vibration Only | - |
| Lovense Nora | Vibration Only | - |
| Lovense Ambi | Vibration Only | - |
| Lovense Lush | Vibration Only | - |
| Lovense Hush | Vibration Only | - |
| Lovense Osci | Vibration Only | - |
| Lovense Mission | Vibration Only | - |
| Lovense Mission 2 | Vibration Only | - |
| Lovense Diamo | Vibration Only | - |
| Loveai Dolp | Vibration Only | - |
| Lovense Dolce | Vibration Only | - |
| Lovense Osci 3 | Vibration Only | - |
| Lovense Gush | Vibration Only | - |
| Lovense Gush 2 | Vibration Only | - |
| Lovense Calor | Vibration Only | - |
| Lovense Flexer | Vibration Only | - |
| Lovense Gemini | Vibration Only | - |
| Lovense Gravity | Vibration Only | - |
| Lovense Tenera | Vibration Only | - |
| Lovense Ridge | Vibration Only | - |
| Lovense Lapis | Vibration Only | - |
| Lovense Vulse | Vibration Only | - |
| Lovense Solace | Oscillation Only | - |
| Lovense Solace Pro | Oscillation Only | - |

### Other brands (pending support)
!!! note "We‑Vibe"
    - We‑Vibe Melt
    - We‑Vibe Moxie
    - We‑Vibe Vector
    - We‑Vibe Wand / Wand 2
    - We‑Vibe Bond
    - We‑Vibe Nova / Nova 2
    - We‑Vibe Jive / Jive 2
    - We‑Vibe Sync / Sync 2 / Sync Lite
    - We‑Vibe Bloom
    - We‑Vibe Ditto
    - We‑Vibe Pivot
    - We‑Vibe Rave
    - We‑Vibe Verge
    - We‑Vibe Wish
    - We‑Vibe 4 Plus
    - We‑Vibe Gala

!!! note "Satisfyer"
    - Satisfyer Hot Spot
    - Satisfyer Love Triangle
    - Satisfyer Curvy 1+ / 2+ / 3+
    - Satisfyer Double Joy / Double Fun / Double Love
    - Satisfyer Mono Flex / Double Flex
    - Satisfyer Pro 2 Gen 3
    - And many more models...

!!! note "Kiiroo / OhMiBod"
    - Kiiroo Pearl / Pearl 2 / Pearl 3
    - Kiiroo Onyx / Onyx 2 / Onyx+
    - Kiiroo Titan
    - Kiiroo Keon
    - OhMiBod Fuse
    - OhMiBod Esca 2
    - OhMiBod Lumen

!!! note "LELO"
    - Lelo F1s V2 / V3
    - Lelo Ida Wave
    - Lelo Tor 3
    - Lelo Hugo 2
    - Lelo Enigma Double Sonic

!!! note "MagicMotion"
    - MagicMotion Smart Bean
    - MagicMotion Vini
    - MagicMotion Flamingo
    - MagicMotion Equinox
    - MagicMotion Zenith

For the broader upstream compatibility list, see the [Buttplug.io device support documentation](https://buttplug.io).

## Troubleshooting
!!! note "My device doesn't appear in the scan list"
    - Ensure it's a supported model and is powered on/in pairing mode
    - Move the device within 1–2 meters of RADR
    - Power‑cycle both RADR and the device, then rescan
    - Update firmware where applicable: <a href="/ossm/tools/">Flashing your OSSM</a>

!!! note "Device connects but controls don't work"
    - Many third‑party devices are "Vibration Only" on first release
    - Try basic intensity up/down; advanced features may be pending
    - Disconnect other apps that might have claimed the device over Bluetooth

!!! note "I need a device added or prioritized"
    Open a request with brand, exact model, and a short description of what you want to control. Include any available links to the product page and Bluetooth details. Contact support@researchanddesire.com or use the website form.
