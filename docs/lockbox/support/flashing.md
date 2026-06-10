---
title: "How to flash your Chastity Lockbox"
description: "Reinstall the latest Chastity Lockbox firmware to fix issues like freezing or unresponsive menus."
---

!!! warning
Only flash your device if instructed to do so by Research and Desire support. If you're experiencing issues, contact [support@researchanddesire.com](mailto:support@researchanddesire.com) first.

<iframe
  
  src="https://www.loom.com/embed/09a4bc33d3d945f6811efecc78e4b5bd"
  title="How to reflash your Chastity Lockbox"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

## When to flash your device

Flashing reinstalls the firmware and can resolve:

- Device continuously restarting on its own (power cycling or boot loop)
- Device freezing when pressing menu buttons
- Unresponsive screens or buttons after waking from sleep
- Software glitches that persist after a hard reset

!!! tip
Before flashing, try a hard reset first: hold the **Enter/Lock** button for 10 seconds. If the issue persists, proceed with flashing.

## Prerequisites

Before you begin, ensure you have:

- A USB-C cable that supports **data transfer** (not just charging)
- A computer with an available USB-C port
- Google Chrome or another Chromium-based browser

!!! note
Some USB-C cables only support charging. If your device isn't detected, try a different cable that supports data transfer.

## Flashing instructions


### Step 1: Connect your device


  Plug the USB-C cable into your Chastity Lockbox and connect the other end to your computer.

### Step 2: Open the web flasher


  Navigate to [the webflasher page](https://dashboard.researchanddesire.com/app/tools/web-flasher) in your browser.

### Step 3: Connect to your device


  Click **Connect** and select the device labeled **USB JTAG Serial Debug** (or similar) from the list.

  !!! warning
If no device appears, verify your cable supports data transfer and try a different USB port.
  

### Step 4: Choose whether to erase device data


  When prompted with the **Erase device** checkbox:

  - **Do NOT check the box** if you want to keep your current settings and lock state. This reinstalls the firmware while preserving your data—ideal for fixing freezing issues.
  - **Check the box** if you want a full factory reset that erases all settings.

  !!! info
Either option preserves your dashboard pairing. Your Lockbox remains connected to your account.
  

### Step 5: Complete the flash


  Click **Next** to begin the flash process. Wait for it to complete.

!!! success
Once complete, your device restarts. If you erased the device, it displays the calibration screen—see the calibration guide for next steps. If you didn't erase, the device returns to normal operation.
