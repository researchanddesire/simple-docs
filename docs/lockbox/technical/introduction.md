---
title: "Technical Documentation"
description: "In-depth technical reference for your Chastity Lockbox, including device states, error codes, and advanced configuration options."
---

This section provides detailed technical information to help you understand how your Chastity Lockbox operates and how to resolve any issues that may arise.

!!! note
If you're looking for basic setup help, start with the [Quick Start Guide](../quick-start/introduction) instead.

## Device operation

<CardGroup cols={2}>
  <Card title="Button Controls" icon="hand-pointer" href="./button-controls">
    Complete guide to button inputs, encoder navigation, hard reset, and control functions.
  </Card>
  <Card title="Menu Structure" icon="list" href="./menu-structure">
    All menus, options, and navigation paths available on your device.
  </Card>
  <Card title="Timer Duration Limits" icon="clock" href="./timer-duration-limits">
    Lock duration ranges from 30 seconds to 1000 years, with configuration details.
  </Card>
  <Card title="Idle and Power States" icon="battery-half" href="./idle-and-power-states">
    Technical details on power management, timeouts, and battery conservation.
  </Card>
</CardGroup>

## Device behavior

<CardGroup cols={2}>
  <Card title="Offline Mode" icon="wifi-slash" href="./offline-mode">
    How your device operates without WiFi, including local locks and state persistence.
  </Card>
  <Card title="Sensor System" icon="microchip" href="./sensor-system">
    Technical documentation for lock detection and backplate sensors.
  </Card>
</CardGroup>

## Reference sections

<CardGroup cols={2}>
  <Card title="Device States" icon="toggle-on" href="../device-states/introduction">
    Operational modes including calibration, sleep, permalock, and emergency unlock.
  </Card>
  <Card title="Device Errors" icon="triangle-exclamation" href="../errors/introduction">
    Troubleshoot error codes with causes and step-by-step resolution instructions.
  </Card>
</CardGroup>

## Advanced options

<Card title="Alpha Updates" icon="flask" href="../support/alpha-updates">
  Get early access to new features by enrolling in the alpha update channel. Ideal for users who want to test upcoming functionality.
</Card>

## Firmware information

Your device displays its firmware version on the startup screen (e.g., "Chastity Lockbox: 1.17.21"). You can also find version information in Settings after the device boots.

- **Production channel**: Stable releases for general use
- **Alpha channel**: Early-access builds with new features (enroll via Settings → Enrol in Alpha)
