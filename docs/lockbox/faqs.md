---
title: "Frequently Asked Questions"
description: "Common questions and answers about the Chastity Lockbox"
---

# Frequently Asked Questions

Find answers to common questions about setting up, using, and troubleshooting your Chastity Lockbox.

## Pricing and Subscription

<AccordionGroup>
??? note "Do I need a subscription to use the Lockbox?"

  No, the Lockbox does not require a subscription. All core functionality works without any ongoing fees.

  We offer an optional service called **Ultra** that unlocks additional features and perks for users who want enhanced capabilities. Ultra is entirely optional—your Lockbox works fully without it.

??? note "Does my keyholder need to pay for a subscription?"

  No, keyholders do not need a subscription. They simply need to create a free dashboard account at [dashboard.researchanddesire.com](https://dashboard.researchanddesire.com) and follow the [Keyholder Guide](/lockbox/quick-start/keyholder-guide) to connect with you.

??? note "Can I explore the dashboard before purchasing a Lockbox?"

  Yes! You can create a free dashboard account at [dashboard.researchanddesire.com](https://dashboard.researchanddesire.com) and explore the interface before making a purchase. This lets you see the features, settings, and how keyholder control works.

</AccordionGroup>

## Battery and Power

<AccordionGroup>
??? note "How long does the battery last?"

  The Lockbox battery lasts approximately 24 hours when unplugged with normal use. The device includes automatic sleep modes that help extend battery life:

  - **Idle mode** (30 seconds) — Screen dims to save power
  - **Pseudo-sleep** (2 minutes) — Screen turns off, WiFi stays connected
  - **Deep sleep** (10 minutes) — WiFi disconnects, minimal power use (~0.5-2mA)

  For extended sessions, we recommend keeping the device plugged in when possible.

  <Card title="Sleep Mode Details" icon="moon" href="./device-states/sleep-mode">
    Learn more about power-saving modes.
  </Card>

??? note "Should I keep the Lockbox plugged in?"

  Yes, the Lockbox is designed to be kept plugged in via USB-C when you have access to power. This ensures:

  - Your keyholder can always send commands
  - The device stays connected to WiFi
  - You don't need to worry about battery life during extended sessions

  When plugged in, the device will not enter deep sleep, so it remains responsive to remote commands at all times. If you need to go without power, the battery provides approximately 24 hours of use with sleep mode helping to extend this further.

</AccordionGroup>

## Setup and Connectivity

<AccordionGroup>
??? note "I bought a secondhand Lockbox. How do I pair it to my account?"

  If the previous owner paired the Lockbox to their account, you'll need support assistance to transfer ownership.

  **To request an ownership transfer:**

  1. Contact support at [support@researchanddesire.com](mailto:support@researchanddesire.com)
  2. Include proof of purchase (order confirmation, receipt, or shipping details)
  3. Provide the MAC address or pairing code from your device (found in **Settings > Pairing**)

  Our team will unpair the device from the previous owner's account. Once unpaired, the Lockbox restarts automatically and re-enables Bluetooth advertising — so you can pair it to your account right away using either the automatic Bluetooth method or the manual pairing code.

  !!! note
The pairing code changes each time the device restarts — this is normal. Once paired, your Lockbox stays connected to your account regardless of which pairing code it displays.
  

??? note "How do I connect my Lockbox to WiFi?"

  If you're pairing using the **automatic Bluetooth method** (Chrome or Edge), you don't need to set up WiFi separately — it's handled during pairing. You'll enter your WiFi credentials in the dashboard and they're sent directly to your Lockbox over Bluetooth.

  If you're using **manual pairing** (pairing code), set up WiFi first:

  1. Navigate to **Settings > WiFi Settings** on your device menu
  2. Scan the QR code displayed on the Lockbox screen with your mobile phone
  3. Select your 2.4 GHz network and enter the password

  Once connected, a green dot appears next to the WiFi symbol on your Lockbox to confirm connectivity.

  <Card title="WiFi Setup Guide" icon="wifi" href="/lockbox/quick-start/wifi-setup">
    Step-by-step WiFi setup instructions.
  </Card>

??? note "How do I pair my Lockbox to the dashboard?"

  There are two ways to pair:

  **Automatic (Bluetooth)** — Recommended. Works in Chrome or Edge. Go to **Settings → Devices** in the dashboard, click **Pair Lockbox**, and select the **Automatic** tab. Click **Scan for Lockbox** and follow the prompts. Handles WiFi setup for you.

  **Manual (pairing code)** — Works in any browser. Connect your Lockbox to WiFi first, then navigate to **Settings → Pairing** on the device to find your six-digit code. Enter it in the **Enter Code** tab on the dashboard.

  <Card title="Pairing Guide" icon="link" href="/lockbox/quick-start/pairing">
    Full pairing instructions for both methods.
  </Card>

</AccordionGroup>

## Users and Roles

<AccordionGroup>
??? note "What is a Keyholder?"

  A Keyholder is the user you designate to control your lock conditions. They can create, edit, and manage locks for a lockee through the dashboard. The Keyholder has authority to modify lock settings and end sessions remotely.

??? note "What is a lockee?"

  A lockee is the user subject to the lock—typically the person who physically holds the Lockbox. The lockee follows the conditions set by their Keyholder or, in the case of a self-lock, the conditions they set for themselves.

??? note "What is a self-lock?"

  A self-lock is when you impose lock conditions on yourself without a Keyholder. As a self-locked user, you are both the lockee and the authority.

  !!! warning
Self-locks cannot be abandoned or modified through the dashboard once started. This ensures the integrity of your commitment.
  

??? note "What's the difference between Keyholding and self-locking?"

  | Feature | Keyholding | Self-locking |
  |---------|-----------|--------------|
  | Users involved | Two (Keyholder + lockee) | One |
  | Edit active lock | Keyholder can edit | Cannot edit |
  | Abandon lock | Keyholder can abandon | Cannot abandon |
  | Remote unlock | Yes | No |

??? note "Can I add a keyholder after starting a self-lock?"

  No, you cannot add a keyholder to an active self-lock session. Keyholders must be assigned **before** starting the lock.

  If you accidentally started a self-lock and need your partner to have control, contact support to end the session early. You can then start a new lock with your partner assigned as keyholder.

  !!! tip
Before starting any lock, double-check that you've selected the correct option—either "No keyholder" for self-locking or your partner's name for keyholder control.
  

??? note "How can I assign a Keyholder to my account?"

  To assign a Keyholder:

  1. Go to **Settings > Partners** in the dashboard
  2. Invite another dashboard user to control your devices
  3. They can also request control of your devices

  <Card title="Connecting with Partners" icon="users" href="/lockbox/quick-start/keyholder-guide">
    Learn more about partnering with other users.
  </Card>

</AccordionGroup>

## Lock Sessions

<AccordionGroup>
??? note "How do I start or unlock a lock session?"

  Use the **Quick Actions** card on the **Chastity Lockbox > Home** page:

  - **Start Lock Session**: Click when no session is active
    - Viewing your own lockbox creates a self-lock
    - As a keyholder viewing your partner's lockbox, you become their keyholder
  - **Unlock**: Available during active sessions for keyholders and test locks

  !!! note
Self-locks cannot be unlocked remotely for security purposes. Use Emergency Unlock on the device if needed.
  

??? note "How can I abandon a lock session?"

  To abandon a lock:

  1. Go to **Chastity Lockbox > Home** in the dashboard
  2. Select the **Edit Lock** option on the far right
  3. Click **Abandon Lock**

  !!! warning
Only Keyholders can abandon locks. Self-locks cannot be abandoned—this is by design to maintain commitment integrity.
  

??? note "My keyholder is unresponsive. How do I end my lock?"

  If your keyholder has become inactive or unresponsive and you need to end your lock session, contact support at [support@researchanddesire.com](mailto:support@researchanddesire.com).

  Our support team can abandon the lock on your behalf, freeing your Lockbox for use with a new keyholder.

  !!! note
Only keyholders can abandon locks through the dashboard. If your keyholder is unavailable, support intervention is required to end the session early.
  

??? note "I removed my keyholder during an active session and now my lock is stuck. What do I do?"

  If you removed your keyholder from your partners list while a lock session was active (especially during a break), your lock may become stuck in a state where you cannot control it remotely.

  **To resolve this:**

  Contact support at [support@researchanddesire.com](mailto:support@researchanddesire.com) and ask them to abandon the lock for you. Include your account email and a brief description of the issue.

  Once support abandons the lock, your Lockbox will be freed and you can start a new session.

  !!! warning
Avoid removing your keyholder while a lock session is active. Always have your keyholder end or abandon the session first, then remove them from your partners list.
  

??? note "What is an active lock session?"

  An active lock session is a lock currently in progress. During an active session, the Lockbox enforces the configured conditions until the timer expires or the session is ended by an authorized user.

??? note "What is a test lock?"

  A test lock is a practice mode you enable by toggling **Test Lock** when configuring your lock template.

  **Test lock features:**
  - Any user (Keyholder, lockee, or self-locker) can abandon or edit it
  - Statistics are not recorded
  - Results don't appear on the leaderboard

  !!! tip
Test locks are perfect for learning the dashboard and Lockbox features without commitment.
  

??? note "Can I change the template of an active lock session?"

  Template changes during an active session depend on your lock type:

  | Lock Type | Can Modify |
  |-----------|------------|
  | Keyholder lock | Yes (Keyholder only) |
  | Test lock | Yes (any authorized user) |
  | Self-lock | No |

  Changes apply immediately as long as the Lockbox is connected to WiFi.

??? note "Can I delete the template of an active lock session?"

  Yes, you can delete a template during an active session. However, deleting the template does not end the lock session—the current conditions remain in effect until the session completes or is ended manually.

</AccordionGroup>

## Features

<AccordionGroup>
??? note "Can I unlock my Lockbox with Deepthroat Trainer points?"

  Yes! To use training points to reduce lock time:

  1. Toggle on **Enable Deepthroat Training** when setting lock conditions
  2. Click the gear icon to configure how many minutes are deducted per training XP earned

  This creates an interactive way to earn your freedom through training achievements.

??? note "What is Public Voting?"

  Public Voting allows others to influence your lock duration.

  **To enable:**
  1. Toggle **Enable public voting on lock duration** in your template settings
  2. A shareable link appears at **Chastity Lockbox > Home** under the lock name
  3. Share the link with others

  **How it works:**
  - Voters can add or subtract a fixed amount from your lock duration
  - Configure the time increment by clicking the gear icon next to the setting
  - Users can vote once every 24 hours
  - Voters receive 100 XP for participating

??? note "How do I earn XP from the Lockbox?"

  XP from the Lockbox is earned exclusively through public voting participation. Lock time alone does not grant XP.

  **Ways to earn XP:**
  - **Receive votes**: Enable public voting on your lock session and share your link. You earn XP when others vote on your session.
  - **Vote on others**: Vote on other users' public lock sessions to earn XP.

  !!! note
XP values decrease throughout the day as more votes are cast, encouraging early participation.
  
<Card title="Public Voting Guide" icon="thumbs-up" href="./using/public-voting">
    Learn how to enable public voting and share your lock session.
  </Card>

??? note "How does lock detection work?"

  The Lockbox has tamper detection sensors that notify your Keyholder if you:

  - Physically interfere with the locking paddle
  - Forcibly open the back housing

  This feature helps maintain accountability between keyholders and lockees.

??? note "Can the physical emergency fail-safe be disabled?"

  No, the physical emergency fail-safe cannot be disabled. This is an intentional safety feature built into the hardware of every Lockbox.

  **Understanding the two emergency access methods:**

  | Method | Can be disabled? | How it works |
  |--------|------------------|--------------|
  | Software Emergency Unlock | Yes (by keyholder) | Menu option on the device; ends session with 24-hour cooldown |
  | Hardware Fail-Safe | No | Physical tab on back housing; requires breaking the housing to access |

  The hardware fail-safe is a small rectangular tab on the back of the device. To use it, you must physically break the tab with a screwdriver or similar tool to access the locking mechanism. This is a destructive, last-resort method that requires replacing the back housing afterward.

  **Why it cannot be disabled:**

  The hardware fail-safe is a physical component of the device, not a software setting. It exists to ensure you can always access your key in a genuine emergency, regardless of software settings, connectivity, or battery status. This is a core safety feature and is present on every Lockbox by design.

  <Card title="Hardware Emergency Unlock Guide" icon="screwdriver" href="/lockbox/support/emergency-backplate">
    Learn how to use the hardware fail-safe if the software method is unavailable.
  </Card>

??? note "What happens if I use the 'Give Up Control' feature?"

  **Give Up Control** transfers complete authority over your device to another user. When enabled:

  - Your lock button becomes disabled (greyed out) on the dashboard
  - Only your assigned Keyholder can control your device
  - You cannot start, stop, or modify lock sessions

  **Consent options when enabling Give Up Control:**

  When you enable Give Up Control, you'll choose one of the following consent levels:

  - **Delayed** — You can reclaim control yourself, but there's a mandatory 72-hour waiting period before control is returned to you
  - **Permanent** — Only your Keyholder can return control to you. You cannot regain control on your own through the dashboard

  **How to regain control (Delayed consent only):**

  If you selected "Delayed" consent, you can reclaim control by going to **Settings > Advanced** in the dashboard and toggling off the Give Up Control setting. The 72-hour countdown begins when you toggle it off.

  !!! warning
**Do not remove your partner while Give Up Control is enabled.** If you remove your Keyholder from your partners list before regaining control, you may become locked out and require support assistance to restore access.
  

</AccordionGroup>

## Troubleshooting

<AccordionGroup>
??? note "My Lockbox won't turn on"

If your Lockbox doesn't respond when you press the buttons, try these steps in order:

**Step 1: Charge the device**

Connect your Lockbox to a USB port on your computer (not a wall charger) using a USB‑C cable that supports data transfer. Leave it connected for at least 30 minutes.

!!! tip
Some USB‑C cables only support charging, not data. If your computer doesn't recognize the device, try a different cable.

**Step 2: Try to wake the device**

While plugged in, press the **Enter/Lock** button (right side) several times. New devices may ship in deep sleep mode and need a moment to wake up.

**Step 3: Check for bootloader mode**

If your computer shows a "USB JTAG/serial debug unit" in Device Manager (Windows) or System Information (Mac) when the Lockbox is connected, your device may be stuck in bootloader mode.

**To recover from bootloader mode:**

1. Keep the device connected to your computer via USB‑C
2. Open the <a href="https://dashboard.researchanddesire.com/app/tools/web-flasher">web flasher</a> in Chrome
3. Click **Connect** and select "USB JTAG Serial Debug" from the device list
4. Complete the firmware flash (do not check "Erase device" to preserve settings)
5. After flashing completes, hold the **Enter/Lock** button for 10 seconds

<Card title="Flashing Guide" icon="rotate" href="./support/flashing">
  Detailed firmware flashing instructions.
</Card>

**Step 4: Contact support**

If the device still doesn't respond after flashing, contact <a href="mailto:support@researchanddesire.com">support@researchanddesire.com</a> with:
- Your order number
- What you've tried so far
- Whether your computer detects the device when plugged in

??? note "My Lockbox freezes and becomes unresponsive"

  If your Lockbox freezes when pressing buttons—especially when accessing the menu—and stops responding entirely, try these steps:

  1. **Hard reset**: Press and hold the **Enter/Lock** button for 10 seconds. The device will restart automatically.
  2. **Reflash the firmware**: If freezing persists after a hard reset, reinstall the firmware using the web flasher.

  <Card title="Flashing Guide" icon="rotate" href="./support/flashing">
    Step-by-step firmware flashing instructions.
  </Card>

??? note "My Lockbox keeps restarting on its own (power cycling)"

  If your Lockbox continuously reboots without giving you a chance to press any buttons, this is usually a firmware issue that can be resolved by reflashing.

  <Card title="Flashing Guide" icon="rotate" href="./support/flashing">
    Step-by-step firmware flashing instructions to fix power cycling.
  </Card>

??? note "My lock randomly unlocks or doesn't sync properly"

  If your Lockbox unlocks unexpectedly or lock commands from the dashboard aren't being applied correctly, the device and server may be out of sync. A hard reboot forces the device to pull the latest lock state from the server.

  <Card title="Connectivity Troubleshooting" icon="wifi" href="./support/connectivity-troubleshooting#lock-randomly-unlocks-or-doesnt-sync">
    Step-by-step sync troubleshooting guide.
  </Card>

??? note "Dashboard shows offline but my device shows connected"

  If the dashboard displays your Lockbox as "Offline" but your device shows a green connection indicator, your device and the dashboard may be out of sync. This can usually be resolved with a hard reboot and resync.

  <Card title="Connectivity Troubleshooting" icon="wifi" href="./support/connectivity-troubleshooting#dashboard-shows-offline-but-device-shows-connected">
    Full diagnostic steps for dashboard-device sync issues.
  </Card>

??? note "Why can't I see Emergency Unlock or Take a Break on my Lockbox?"

  The Emergency Unlock and Take a Break options only appear when the device is locked. If your Lockbox is unlocked, these menu items are hidden because they aren't applicable yet.

  Once you start a lock session:
  - Press the **Enter** button to open the lock menu
  - Scroll to find **Take a Break** or **Emergency Unlock**

  !!! note
Even when locked, these options may be hidden if your keyholder (or you, when self-locking) disabled them in the lock template settings.
  

??? note "What if there's an emergency and I need my key immediately?"

  For urgent access to your key:

  1. On your Lockbox, navigate to **Settings > Emergency Unlock**
  2. Follow the on-screen instructions

  !!! warning
Emergency Unlock may be disabled if your current lock session has this feature turned off. Physical backup access instructions are available in the device manual.
  

??? note "Why did my Lockbox display the re-lock animation during an active lock session?"

  This is normal behavior. After waking from sleep, your Lockbox runs a sensor verification to confirm it remains properly locked. You may also notice periodic lock verifications during extended sessions.

  This security feature ensures continuous lock integrity throughout your session.

??? note "Why does my timer show the wrong duration when I power on?"

  When your Lockbox powers on or wakes from deep sleep, it may briefly display an incorrect timer duration (sometimes showing very large values like many years) before correcting itself. This is normal behavior.

  **Why this happens:**
  - The device stores lock duration locally but needs to sync with the server to display accurate remaining time
  - During startup, the device shows a placeholder or cached value while it connects to WiFi and retrieves the correct time

  **What to expect:**
  - The display typically corrects itself within 15–30 seconds once WiFi connects
  - Your actual lock timer is unaffected—it continues running accurately on the server regardless of what the display shows during startup

  If the timer doesn't correct after a minute or two, check your WiFi connection status.

??? note "Why is my lock button disabled on the dashboard?"

  If your lock button is greyed out, your account is set to **Give up control** mode. In this mode, only your assigned Keyholder can control your device.

  **To regain control:**

  - **If you chose "Delayed" consent**: Go to **Settings > Advanced** and toggle off the Give Up Control setting. Control will be returned to you after a 72-hour waiting period.
  - **If you chose "Permanent" consent**: Ask your Keyholder to return control to you through the dashboard. You cannot regain control yourself.
  - **If you removed your partner while Give Up Control was enabled**: Contact support at [support@researchanddesire.com](mailto:support@researchanddesire.com) for assistance restoring your account access.

</AccordionGroup>

## Product Details

<AccordionGroup>
??? note "What filament is used for the colored Lockboxes?"

  The colored Lockboxes use Voxel PLA Plus filament:

  | Color | Filament |
  |-------|----------|
  | Pink | Voxel PLA Plus Pink |
  | Blue | Voxel PLA Plus Sky Blue |

  This information is useful if you want to print accessories or other devices (like an OSSM) in matching colors.

</AccordionGroup>

## Replacement Parts

<AccordionGroup>
??? note "How do I order a replacement back cover?"

  Replacement back covers are available if yours was damaged during an emergency hardware unlock or for any other reason.

  **To order a replacement:**

  1. Email [support@researchanddesire.com](mailto:support@researchanddesire.com) requesting a replacement back cover
  2. Include the email address you used for your original Lockbox purchase
  3. Our team will send you an invoice for $10 USD plus shipping

  Once payment is received, we'll ship the replacement part to you.

  !!! note
If you needed to use the hardware emergency unlock, the back cover will no longer lock securely until replaced.
  

</AccordionGroup>

## Support

??? note "Who should I contact for Lockbox support?"

  For technical support or questions about your Lockbox, please contact our support team through the dashboard or visit our support portal.

  <Card title="Contact Support" icon="headset" href="/lockbox/support">
    Get help from our support team.
  </Card>
