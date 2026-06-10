# Frequently Asked Questions

Find answers to common questions about setting up, using, and troubleshooting your RADR wireless remote.

## Controls & Buttons
!!! note "One bumper button feels different or has no tactile feedback"
    Each bumper button on the RADR has two microswitches wired in parallel for redundancy. If one bumper feels different from the other or has reduced/no tactile feedback, this could be caused by:

    - **Assembly alignment** — Print inconsistencies or alignment during assembly can cause one microswitch to activate differently
    - **Screw tension** — A slightly over-torqued screw can affect the bumper's tactile feel

    **To troubleshoot:**

    1. Locate the single screw on the rear of the remote, directly behind the affected bumper
    2. Try loosening the screw slightly (quarter turn)
    3. Test the bumper feel again

    If both bumpers still function (the button registers on screen) but one has reduced tactile feedback, the remote is working as designed—some variation is normal.

    !!! warning
        If the button has absolutely no tactile feedback or doesn't register presses at all, the microswitch may be defective. Contact support for a replacement.
        **[Contact Support](mailto:support@researchanddesire.com)**

    Get help from our support team.

!!! note "What do the bumper buttons do?"
    The left and right bumper buttons on the top edge of the RADR switch between control modes when connected to an OSSM:

    | Button | Function |
    |--------|----------|
    | Left Bumper (`<<`) | Switch to previous mode |
    | Right Bumper (`>>`) | Switch to next mode |

    The modes cycle through: **Depth → Sensation → Stroke → Depth**
    **[OSSM Controls Guide](/radr/guides/user-guide/ossm-controls)**

    Learn more about controlling your OSSM with RADR.

## Connectivity
!!! note "How do I connect RADR to my OSSM?"
    To connect your RADR to an OSSM:

    1. Power on both devices
    2. On RADR, select **Device Search** from the main menu
    3. Wait for the scan to complete (about 5 seconds)
    4. Select your OSSM from the device list
    5. Wait for the connection confirmation sound
    **[Quick Start Guide](/radr/guides/getting-started/quick-start)**

    Step-by-step instructions for getting started.

!!! note "Why won't RADR find my OSSM?"
    If RADR can't find your OSSM during scanning:

    1. **Check distance** — Move RADR closer to your OSSM (within 10 meters)
    2. **Power cycle both devices** — Turn both off, wait 10 seconds, then power on
    3. **Check OSSM firmware** — Ensure your OSSM is running compatible firmware
    4. **Disable other Bluetooth connections** — Disconnect other devices that may be connected to your OSSM
    **[Device Support](/radr/guides/reference/device-support)**

    See which devices are compatible with RADR.

!!! note "Is RADR compatible with older OSSM board versions?"
    Yes, RADR is compatible with all OSSM PCB versions (v2.1, v2.3, and newer). The board version doesn't affect RADR compatibility—only the firmware version matters.

    **To use RADR with your OSSM:**

    1. Update your OSSM firmware to version 2.0.0 or later using the [Web Flasher](/ossm/tools/)
    2. Power on both devices
    3. RADR will automatically detect and connect to your OSSM

    !!! note
        The main differences between board versions relate to motor compatibility (v2.3 includes a capacitor for Gold Motor support) rather than RADR functionality. All board versions support RADR once the firmware is updated.
        **[Flash your OSSM](/ossm/tools/)**

    Update your OSSM firmware for RADR compatibility.

## Battery & Charging
!!! note "My RADR makes a rattling sound when shaken"
    A slight rattling sound when shaking the device is normal. This is caused by the internal battery pressing against a small piece of foam inside the enclosure.

    The rattling does not affect functionality — nothing is broken.

    If the sound bothers you, you can open the back panel and add a slightly thicker piece of foam to dampen the rattling.

!!! note "How long does the battery last?"
    RADR typically provides 4+ hours of active use on a full charge. Battery life varies based on screen brightness, vibration feedback usage, and connection activity.
    **[Battery & Power](/radr/Hardware/specifications/battery-and-power)**

    Technical details about battery monitoring and charging.

!!! note "How do I charge RADR?"
    Connect a USB-C cable to the port on the top edge of RADR. The device can be used while charging.

## Repairs & Replacement Parts
!!! note "Where can I find part numbers to source replacement components?"
    If you're comfortable with electronics repair and want to source replacement components yourself (such as encoders, switches, or other parts), the Bill of Materials (BOM) contains manufacturer part numbers for all components:
    **[RADR Bill of Materials](https://github.com/researchanddesire/radr-wireless-remote/tree/main/Hardware)**

    Complete parts list with manufacturer part numbers and specifications.

    The BOM Excel file (`RADR BOM - OSSM Wireless - v0.4 - S3.xlsx`) includes:
    - Manufacturer part numbers
    - Component values and specifications
    - Quantity per board

    !!! tip
        For common components like rotary encoders and tactile switches, you can often find equivalent parts at electronics suppliers like DigiKey, Mouser, or LCSC using the part numbers from the BOM.

    If you'd prefer not to source parts yourself, [contact support](mailto:support@researchanddesire.com) and we can send replacement components or a replacement remote.

## Support

!!! note "Who should I contact for RADR support?"
    For technical support or questions about your RADR, contact our support team:

    - **Email:** [support@researchanddesire.com](mailto:support@researchanddesire.com)
