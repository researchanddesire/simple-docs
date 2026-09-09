# Connectivity Troubleshooting

If your Lockbox and the dashboard are showing different states — for example, the dashboard says "Offline" while your device shows a green connection indicator, or your lock session isn't behaving as expected — this guide covers the most common causes and fixes.

## Dashboard shows offline but device shows connected

Your Lockbox shows a green dot when it has both WiFi and MQTT broker connectivity. The dashboard may take up to 60 seconds to reflect the device's actual status.

**Try these steps in order:**

1. **Wait up to 60 seconds** — The dashboard polls for device status periodically and may lag behind the actual connection state.
2. **Hard reboot with resync** — Force the device to re-establish its connection and pull the latest lock state from the server.
**[Hard Reboot Procedure](../technical/button-controls.md#hard-reboot-with-resync)**

Press and hold the Enter/Lock button for 10 seconds to force a full resync.

3. **Check for alpha firmware** — If you're enrolled in the alpha program, alpha firmware can occasionally cause sync issues. Consider [returning to stable firmware](alpha-updates.md#leaving-the-alpha-program) using the web flasher.
4. **Remove and re-pair** — As a last resort, remove the device from your account (Settings → Devices), then re-pair it using the pairing code on your Lockbox.

!!! note
    If your lock session is stuck in a "pending" state along with this issue, ask your keyholder to abandon the session from the dashboard so you can start fresh after resolving the connectivity problem.

---

## Lock randomly unlocks or doesn't sync

If your Lockbox unlocks unexpectedly or lock commands from the dashboard aren't being applied correctly, the device and server may be out of sync.

**Common causes:**
- A temporary network interruption caused the device to miss a state update
- The device woke from deep sleep and loaded stale local state before syncing
- Alpha firmware introduced a sync regression

**How to fix:**

Perform a [hard reboot with resync](../technical/button-controls.md#hard-reboot-with-resync) by pressing and holding the **Enter/Lock** button for 10 seconds. This forces the device to restart, reconnect to WiFi, and pull the latest lock state from the server.

!!! note
    If the issue persists after resyncing, contact [support@researchanddesire.com](mailto:support@researchanddesire.com) with your username and a description of the behavior.

---

## Alpha firmware sync issues

Alpha firmware receives early-access features that may occasionally introduce sync regressions. If you're experiencing connectivity or sync problems while enrolled in the alpha program:

1. **Hard reboot with resync** — Press and hold the **Enter/Lock** button for 10 seconds to [force a resync](../technical/button-controls.md#hard-reboot-with-resync)
2. **Abandon and restart the lock** — If your keyholder can access the dashboard, have them abandon the stuck session so you can start a new one
3. **Reflash to stable firmware** — If issues persist, use the web flasher to [return to stable firmware](alpha-updates.md#leaving-the-alpha-program). After flashing, you may need to remove the device from your account (Settings → Devices) and re-pair it
**[Alpha Updates](alpha-updates.md)**

How to enroll in or leave the alpha program.

**[Firmware Flashing](flashing.md)**

Step-by-step firmware flashing instructions.

---

## When to contact support

Contact [support@researchanddesire.com](mailto:support@researchanddesire.com) if:

- A hard reboot does not resolve the sync issue
- Your lock session is stuck and your keyholder cannot abandon it
- You removed your keyholder during an active session and your lock is stuck (support can abandon the lock on your behalf)
- The dashboard consistently shows incorrect lock state after multiple resync attempts

Include your account email, a description of the issue, and what you've already tried.
