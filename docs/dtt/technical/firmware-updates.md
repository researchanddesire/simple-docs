---
title: "Firmware Updates"
description: "How your trainer receives and installs software updates"
---

Your Deepthroat Trainer receives firmware updates over-the-air (OTA) when connected to Wi-Fi. Updates bring new features, improvements, and bug fixes.

## How updates work

### Automatic checking
Each time you power on and connect to Wi-Fi, the trainer checks for available updates during the preflight phase.

### Update process
When an update is available:
1. The screen shows "Updating" with progress information
2. New firmware downloads automatically
3. The device restarts with the new version

!!! warning
Do not power off the device during an update. Wait for it to complete and restart automatically. Interrupting an update could cause issues.

## Firmware streams

Your trainer may receive updates from different firmware streams:

| Stream | Description |
|--------|-------------|
| **Production** | Stable releases for general use |
| **Beta** | Preview releases with new features (may have bugs) |
| **Alpha** | Early testing builds (internal/limited use) |

!!! info
Most users receive production updates automatically. Beta enrollment is typically managed through your dashboard account or subscription tier.

### Current beta status
Active subscribers are often enrolled in the beta stream during rollouts. A dashboard toggle to switch between Production, Beta, and Latest streams is planned.

See the <a href="/dtt/software-2.0-preview">Software 2.0 Preview</a> for details on current beta features.

## What updates include

Firmware updates may include:

- **New features** — Training modes, UI improvements, customization
- **Bug fixes** — Resolved issues from previous versions
- **Performance** — Faster response, better stability
- **Security** — Protection improvements

## Version information

Your current firmware version is displayed during device startup. Note this information when contacting support.

## Manual update check

To force an update check:
1. Ensure Wi-Fi is connected
2. Power cycle the device
3. The preflight checks will look for updates automatically

There's no manual "check for updates" button — the check happens automatically on each startup when online.

## Manual USB flashing

If your Trainer can't receive OTA updates (due to connectivity issues or network restrictions), you can manually flash firmware using a USB cable and the Web Flasher.

!!! info
Use manual USB flashing when troubleshooting connectivity issues or when instructed by support. Most users won't need this—OTA updates handle everything automatically.

### Prerequisites

- A USB cable that supports **data transfer** (not just charging)
- A computer with an available USB port
- Google Chrome, Edge, or another Chromium-based browser

!!! warning
**Hardware compatibility:** Trainers purchased before July 1st, 2025 do not have the required USB interface for manual flashing. If you see a message indicating your device isn't flashable, or if the webflasher cannot detect your device, contact [support@researchanddesire.com](mailto:support@researchanddesire.com) for assistance.

### Flashing instructions


### Step 1: Connect your Trainer


  Plug the USB cable into your Deepthroat Trainer and connect the other end to your computer.

### Step 2: Open the Web Flasher


  Navigate to [dashboard.researchanddesire.com/app/tools/web-flasher](https://dashboard.researchanddesire.com/app/tools/web-flasher) in your browser.

### Step 3: Select firmware options


  In the Web Flasher:
  1. Select **Deepthroat Trainer** from the device dropdown
  2. Select **Production** from the firmware stream dropdown

### Step 4: Connect to your device


  Click **Connect** and select your device from the list. Look for a device labeled:
  - **UART Bridge**
  - **USB JTAG** (or similar)
  
  !!! warning
If no device appears, verify your cable supports data transfer and try a different USB port.
  

### Step 5: Flash the firmware


  Click **Flash** to install the firmware. Wait for the process to complete.
  
  !!! warning
Do **not** enable "Erase device" unless specifically instructed by support. Erasing clears your Trainer ID and requires re-provisioning.
  

### After flashing

Once the flash completes, your Trainer restarts with the new firmware. Connect to Wi-Fi to verify connectivity.

If you see **E-DTT-1** ("No internet. Check firewall and router.") after connecting, this confirms a network restriction is blocking your device. Follow the <a href="/dtt/errors/e-dtt-1">E-DTT-1 troubleshooting guide</a> to resolve the issue.

## Update requirements

| Requirement | Details |
|-------------|---------|
| **Internet** | Wi-Fi connection required |
| **Battery** | Sufficient charge recommended |
| **Time** | Updates typically take 1-3 minutes |

## Troubleshooting

<AccordionGroup>
??? note "Update doesn't start"

- Verify Wi-Fi is connected and working
- Check that the device can reach the internet (no firewall blocks)
- Try power cycling and reconnecting

??? note "Update fails or restarts repeatedly"

- Ensure stable power (plug in charger if battery is low)
- Check for strong Wi-Fi signal
- If repeated failures, contact support

??? note "Trainer ID shows jumbled or random characters after update"

If your Trainer ID displays corrupted characters (such as ".t", "U]t", or other random symbols) and changes on every reboot, the device's provisioning data was erased during the firmware update.

**Cause:**
This typically happens when using the web flasher with the "Erase device" option enabled. The erase option clears all stored data including the unique Trainer ID assigned during manufacturing.

**Solution:**
Contact support at [support@researchanddesire.com](mailto:support@researchanddesire.com). Include:
- Your order number
- A description of what you see on the screen
- The steps you took before the issue appeared

Support can re-provision your device with a new Trainer ID.

!!! warning
When using the web flasher, only enable "Erase device" if specifically instructed by support. Normal firmware updates do not require erasing the device.


??? note "Features don't match documentation"

- You may be on a different firmware stream than documented
- Some features are beta/preview only
- Check your current version against release notes

??? note "Can I downgrade firmware?"

Downgrading isn't supported through normal operation. If you're experiencing issues with a new version, contact support.

</AccordionGroup>

## Release communication

Updates and changes are communicated through:
- Dashboard announcements
- Documentation updates
- The <a href="/dtt/software-2.0-preview">Software 2.0 Preview</a> page

## Related guides

<CardGroup cols={2}>
<Card title="Software 2.0 Preview" icon="sparkles" href="/dtt/software-2.0-preview">
Current beta features and roadmap.
</Card>

<Card title="Wi-Fi Setup" icon="wifi" href="/dtt/quick-start/pairing/wifi-setup">
Connect your trainer for updates.
</Card>
</CardGroup>
