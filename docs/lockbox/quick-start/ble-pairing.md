---
title: "Automatic Pairing via Bluetooth"
description: "Pair your Chastity Lockbox to the dashboard in one step using Web Bluetooth — no WiFi setup required"
---

Automatic pairing connects your Lockbox to your dashboard account directly over Bluetooth. The dashboard reads your device, links your account, and provisions WiFi credentials — all in one flow, without any manual steps on the device itself.

## Requirements

| Requirement | Details |
|---|---|
| Browser | Google Chrome or Microsoft Edge (desktop) |
| Lockbox status | Powered on, **not** paired to any account |
| WiFi (optional) | Only needed if your Lockbox isn't already on WiFi |

!!! warning
Web Bluetooth is not supported in Firefox, Safari, or most mobile browsers. If you're on one of these, use [manual pairing with a pairing code](/lockbox/quick-start/pairing#option-2-manual-pairing-pairing-code) instead.

---

## How it works

When your Lockbox is unpaired, it broadcasts a Bluetooth signal. The dashboard connects over BLE, reads the device's MAC address, chip info, and firmware version, then registers your account as the owner — before any WiFi communication happens.

From there, one of two things occurs:

### Your Lockbox is already on WiFi

If the Lockbox is already connected to your home network (e.g. you set up WiFi earlier), pairing completes immediately. No credentials needed — the dashboard claims the device and it authenticates on its own.

### Your Lockbox is not on WiFi

The dashboard shows a WiFi selection form. You can pick a saved network or enter credentials manually. The dashboard sends the SSID and password directly to the Lockbox over Bluetooth. The device connects to WiFi and authenticates with the server on its own.

!!! tip
You can save WiFi networks to your account so you don't have to re-enter them every time you pair a new device. Check **Save this network** when entering credentials manually, or manage saved networks in **Settings → WiFi Networks**.

---

## Step-by-step


### Step 1: Open the pairing dialog


  In the dashboard, go to **Settings → Devices** and click **Pair Lockbox**.

  The dialog opens to the **Automatic** tab by default.

### Step 2: Scan for your Lockbox


  Click **Scan for Lockbox**. Your browser displays a device picker — select **LKBX** from the list and click **Connect**.

  !!! note
If **LKBX** doesn't appear in the picker:
  - Make sure the Lockbox is powered on
  - Make sure it hasn't already been paired to an account — the device only advertises via Bluetooth when unpaired
  - Try moving closer to the Lockbox
  

### Step 3: Wait while the dashboard reads your device


  After connecting, the dashboard automatically reads device info (MAC address, firmware version, WiFi status). This takes a few seconds.

### Step 4: Provide WiFi credentials (if prompted)


  If your Lockbox is not yet on WiFi, a network selection form appears:

  - **Select a saved network** from the dropdown (if you've saved one before), or
  - **Enter manually** — type the network name and password

  If your Lockbox is already online, this step is skipped.

### Step 5: Confirm and continue


  The dashboard links your account to the device. If WiFi credentials were needed, they're sent to the Lockbox over Bluetooth and the device connects on its own.

  !!! success
Once you see the confirmation screen, your Lockbox is paired. Click **Continue**.
  

---

## Saved WiFi networks

You can store WiFi credentials in your account so they're ready for future pairings. Passwords are encrypted and never sent to the device in plaintext — the dashboard decrypts them server-side and sends them over the Bluetooth connection.

To manage saved networks, go to **Settings → WiFi Networks** in the dashboard.

---

## Troubleshooting

<AccordionGroup>
??? note "My Lockbox doesn't appear in the browser picker"

  - Confirm you're using Chrome or Edge on a desktop — mobile browsers have limited Bluetooth support
  - Make sure the Lockbox is powered on
  - The Lockbox only advertises when **unpaired**. If it's already paired to an account, it won't appear. Contact support if you need to transfer ownership.
  - Try moving your computer closer to the device
  - Refresh the page and try scanning again

??? note "The connection drops before pairing completes"

  The dashboard automatically restarts advertising when a Bluetooth connection drops, so you can retry without rebooting the device. Click **Scan for Lockbox** again to reconnect.

??? note "WiFi credentials were sent but the Lockbox didn't connect"

  - Double-check that the network is 2.4 GHz — the Lockbox does not support 5 GHz
  - Verify the password is correct by connecting another device to the same network
  - Make sure the Lockbox is within range of your router during the connection attempt
  - If the issue persists, try the [manual WiFi setup](/lockbox/quick-start/wifi-setup) flow instead

??? note "I see 'Scan for Lockbox' but clicking it does nothing"

  Your browser may not support Web Bluetooth. Confirm you're using Chrome or Edge. In Chrome, you can check by visiting `chrome://flags` and searching for "bluetooth" to verify the feature is enabled.

</AccordionGroup>
