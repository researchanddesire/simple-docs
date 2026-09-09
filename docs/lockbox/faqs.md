# Lockbox FAQs

Short answers to common Chastity Lockbox questions. If you need step-by-step troubleshooting, start with the [Help Center](support/index.md).

## Pricing and Subscriptions

!!! note "Do I need a subscription to use the Lockbox?"
    No. The Lockbox does not require a subscription. Core functionality works without ongoing fees.

    Research and Desire offers an optional service called **Ultra** for additional features and perks.

!!! note "Does my keyholder need to pay for a subscription?"
    No. Keyholders can create a free dashboard account at [dashboard.researchanddesire.com](https://dashboard.researchanddesire.com) and follow the [Keyholder Guide](quick-start/keyholder-guide.md).

!!! note "Can I explore the dashboard before purchasing a Lockbox?"
    Yes. You can create a free dashboard account at [dashboard.researchanddesire.com](https://dashboard.researchanddesire.com) and explore the interface before purchasing.

## Setup and Pairing

!!! note "How do I connect my Lockbox to Wi-Fi?"
    If you pair with the automatic Bluetooth method in Chrome or Edge, Wi-Fi setup happens during pairing.

    If you use manual pairing, connect Wi-Fi first from **Settings > Wi-Fi Settings** on the device. See [Connect to Wi-Fi](quick-start/wifi-setup.md) for the full walkthrough.

!!! note "How do I pair my Lockbox to the dashboard?"
    There are two pairing methods:

    - **Automatic Bluetooth pairing:** Recommended. Use Chrome or Edge from **Settings > Devices** in the dashboard.
    - **Manual pairing code:** Connect the Lockbox to Wi-Fi first, then enter the six-digit pairing code from **Settings > Pairing**.

    See [Pairing](quick-start/pairing.md) for the full instructions.

!!! note "I bought a secondhand Lockbox. How do I pair it to my account?"
    If the previous owner paired the Lockbox to their account, contact [support@researchanddesire.com](mailto:support@researchanddesire.com) for an ownership transfer.

    Include proof of purchase and the MAC address or pairing code from **Settings > Pairing**. Once support unpairs the device, it restarts and can be paired to your account.

!!! note "Why does the pairing code change?"
    The pairing code changes each time the device restarts. This is normal. Once paired, your Lockbox stays connected to your account regardless of which pairing code it displays.

## Battery and Power

!!! note "How long does the battery last?"
    The Lockbox battery lasts approximately 24 hours unplugged with normal use. Sleep modes help extend battery life by dimming the screen, turning the screen off, or disconnecting Wi-Fi during deep sleep.

    For longer sessions, keep the device plugged in when possible. See [Sleep Mode](device-states/sleep-mode.md) for power-saving details.

!!! note "Should I keep the Lockbox plugged in?"
    Yes, when you have access to power. Keeping the Lockbox plugged in helps it stay connected to Wi-Fi and responsive to remote keyholder commands.

    When plugged in, the device does not enter deep sleep.

!!! note "My Lockbox will not turn on. What should I try first?"
    Connect it to a computer with a USB-C cable that supports data transfer and leave it charging for at least 30 minutes. Then press the **Enter/Lock** button several times.

    If the device is detected as **USB JTAG Serial Debug** or still does not respond, see [Firmware Flashing](support/flashing.md) or contact [support@researchanddesire.com](mailto:support@researchanddesire.com).

## Users and Roles

!!! note "What is a keyholder?"
    A keyholder is the person you authorize to control your lock conditions. They can create, edit, manage, and end lock sessions through the dashboard.

!!! note "What is a lockee?"
    A lockee is the person subject to the lock, usually the person physically holding the Lockbox.

!!! note "What is a self-lock?"
    A self-lock is a lock you start without a keyholder. You are both the lockee and the authority.

    Self-locks cannot be abandoned or modified through the dashboard once started.

!!! note "What is the difference between keyholding and self-locking?"
    | Feature | Keyholding | Self-locking |
    | --- | --- | --- |
    | Users involved | Two: keyholder and lockee | One |
    | Edit active lock | Keyholder can edit | Cannot edit |
    | Abandon lock | Keyholder can abandon | Cannot abandon |
    | Remote unlock | Yes | No |

!!! note "Can I add a keyholder after starting a self-lock?"
    No. Keyholders must be assigned before starting the lock.

    If you accidentally started a self-lock and need partner control, contact support to end the session early. Then start a new lock with your partner assigned as keyholder.

!!! note "How do I assign a keyholder?"
    Go to **Settings > Partners** in the dashboard and invite another dashboard user to control your devices. See the [Keyholder Guide](quick-start/keyholder-guide.md) for the full flow.

## Lock Sessions

!!! note "How do I start or unlock a lock session?"
    Use the **Quick Actions** card on the **Chastity Lockbox > Home** dashboard page.

    - **Start Lock Session:** available when no session is active.
    - **Unlock:** available during active sessions for keyholders and test locks.

    Self-locks cannot be unlocked remotely. Use Emergency Unlock on the device if needed.

!!! note "How can I abandon a lock session?"
    Go to **Chastity Lockbox > Home**, select **Edit Lock**, then click **Abandon Lock**.

    Only keyholders can abandon locks. Self-locks cannot be abandoned through the dashboard.

!!! note "My keyholder is unresponsive. How do I end my lock?"
    Contact [support@researchanddesire.com](mailto:support@researchanddesire.com). Support can abandon the lock on your behalf if your keyholder is unavailable.

!!! note "I removed my keyholder during an active session and now my lock is stuck. What should I do?"
    Contact [support@researchanddesire.com](mailto:support@researchanddesire.com) and ask support to abandon the lock. Include your account email and a brief description of what happened.

    Avoid removing your keyholder while a lock session is active. Have the keyholder end or abandon the session first.

!!! note "What is a test lock?"
    A test lock is a practice mode you enable when configuring your lock template.

    Any authorized user can abandon or edit a test lock. Statistics are not recorded and results do not appear on the leaderboard.

!!! note "Can I change the template of an active lock session?"
    It depends on the lock type.

    | Lock type | Can modify |
    | --- | --- |
    | Keyholder lock | Yes, keyholder only |
    | Test lock | Yes, any authorized user |
    | Self-lock | No |

    Changes apply when the Lockbox is connected to Wi-Fi.

!!! note "Can I delete the template of an active lock session?"
    Yes, but deleting the template does not end the lock session. The current conditions stay in effect until the session completes or is ended manually.

## Features

!!! note "Can I unlock my Lockbox with Deep Throat Trainer points?"
    Yes. Toggle **Enable Deepthroat Training** when setting lock conditions, then use the gear icon to configure how many minutes are deducted per training XP earned.

!!! note "What is Public Voting?"
    Public Voting lets other people influence your lock duration through a shareable voting link. Voters can add or subtract a configured amount of time and can vote once every 24 hours.

    See [Public Voting](using/public-voting.md) for setup details.

!!! note "How do I earn XP from the Lockbox?"
    XP from the Lockbox is earned through public voting participation.

    - You can earn XP when others vote on your public lock session.
    - You can earn XP by voting on other users' public lock sessions.

!!! note "How does lock detection work?"
    The Lockbox has tamper detection sensors that notify your keyholder if you physically interfere with the locking paddle or forcibly open the back housing.

!!! note "What happens if I use Give Up Control?"
    **Give Up Control** transfers authority over your device to another user.

    - Your dashboard lock button becomes disabled.
    - Only your assigned keyholder can control your device.
    - You cannot start, stop, or modify lock sessions.

    If you selected delayed consent, you can reclaim control from **Settings > Advanced** after a 72-hour waiting period. If you selected permanent consent, only your keyholder can return control.

## Emergency Access

!!! note "Why can't I see Emergency Unlock or Take a Break on my Lockbox?"
    These options only appear when the device is locked. They may also be hidden if your keyholder, or you when self-locking, disabled them in the lock template.

!!! note "What if there is an emergency and I need my key immediately?"
    Use the software emergency unlock when available. On the Lockbox, open the lock menu and select **Emergency Unlock**.

    If software emergency unlock is unavailable, the hardware backplate method is the last resort. See [Emergency Unlock: Break the Backplate](support/emergency-backplate.md).

!!! note "Can the physical emergency fail-safe be disabled?"
    No. The hardware fail-safe is a physical safety feature built into every Lockbox. It cannot be disabled in software.

    The hardware method is destructive and requires a replacement backplate afterward. Use [software Emergency Unlock](device-states/emergency-unlock.md) whenever possible.

## Troubleshooting

!!! note "Dashboard shows offline but my device shows connected. Which guide should I use?"
    First, check whether the device display shows a solid green dot. The dashboard can take up to 60 seconds to update.

    Use [Check Online Status](support/online-status.md) to confirm status indicators. If the dashboard and device remain out of sync, use [Connectivity Troubleshooting](support/connectivity-troubleshooting.md).

!!! note "My lock randomly unlocks or does not sync properly. What should I do?"
    The device and server may be out of sync. Start with [Connectivity Troubleshooting](support/connectivity-troubleshooting.md), especially the hard reboot with resync steps.

!!! note "My Lockbox freezes or keeps restarting. What should I do?"
    Try a hard reset by holding the **Enter/Lock** button for 10 seconds. If freezing or power cycling persists, see [Firmware Flashing](support/flashing.md).

!!! note "Why did my Lockbox display the re-lock animation during an active lock session?"
    This is normal. After waking from sleep, the Lockbox verifies that it remains properly locked. You may also see periodic lock verifications during extended sessions.

!!! note "Why does my timer show the wrong duration when I power on?"
    During startup or wake from deep sleep, the device may briefly show a placeholder or cached timer before it syncs with the server.

    The display usually corrects within 15-30 seconds after Wi-Fi connects. If it does not correct after a minute or two, check your Wi-Fi status.

!!! note "Why is my lock button disabled on the dashboard?"
    Your account may be in **Give Up Control** mode. In this mode, only your assigned keyholder can control your device.

    If you removed your partner while Give Up Control was enabled, contact [support@researchanddesire.com](mailto:support@researchanddesire.com).

## Product Details and Replacement Parts

!!! note "What filament is used for the colored Lockboxes?"
    The colored Lockboxes use Voxel PLA Plus filament.

    | Color | Filament |
    | --- | --- |
    | Pink | Voxel PLA Plus Pink |
    | Blue | Voxel PLA Plus Sky Blue |

!!! note "How do I order a replacement back cover?"
    Email [support@researchanddesire.com](mailto:support@researchanddesire.com) and request a replacement back cover.

    Include the email address used for the original Lockbox purchase. Support will send an invoice for $10 USD plus shipping.

!!! note "Who should I contact for Lockbox support?"
    Contact [support@researchanddesire.com](mailto:support@researchanddesire.com). Include your account email, what happened, and what you have already tried.
