---
title: "Device Errors"
description: "Troubleshooting guide for Chastity Lockbox error codes and their solutions"
---

When your Chastity Lockbox encounters an issue, it displays an error code to help you identify and resolve the problem. This guide organizes errors by category and links to detailed troubleshooting steps for each.

## Hardware errors

These errors indicate physical issues with the lock mechanism or device components.

<CardGroup cols={2}>
  <Card title="E-LOCK-1: Could Not Lock" icon="lock" href="./e-lock-1">
    The device failed to engage the locking mechanism. Usually caused by obstruction or alignment issues.
  </Card>

  <Card title="E-LOCK-2: Could Not Unlock" icon="lock-open" href="./e-lock-2">
    The device failed to disengage the locking mechanism. May require manual intervention.
  </Card>

  <Card title="E-LOCK-3: No Backplate Detected" icon="circle-exclamation" href="./e-lock-3">
    The device cannot detect the backplate connection. Check mounting and cable connections.
  </Card>
</CardGroup>

## Network errors

These errors relate to Wi-Fi connectivity and network communication issues.

<CardGroup cols={2}>
  <Card title="E-LOCK-10: Could Not Connect to Wi-Fi" icon="wifi-slash" href="./e-lock-10">
    The device failed to establish a Wi-Fi connection. Verify network credentials and signal strength.
  </Card>
</CardGroup>

## Emergency unlock

These codes appear when emergency features are activated.

<CardGroup cols={2}>
  <Card title="E-LOCK-20: Emergency Unlock Used" icon="triangle-exclamation" href="./e-lock-20">
    An emergency unlock was triggered. Review this guide to understand implications and next steps.
  </Card>
</CardGroup>

## Break-related messages

These messages appear when attempting to use the break feature. They are informational screens, not error codes.

<AccordionGroup>
  ??? note "Breaks Not Enabled"

    **What it means**: Your current lock session does not have breaks enabled. Your Keyholder has configured this session without the break feature.
    
    **What to do**: Contact your Keyholder if you need breaks enabled. They can modify session settings from the dashboard.
  
??? note "Too Soon for a Break"

    **What it means**: You've recently taken a break and must wait before taking another one. Your Keyholder configured a minimum interval between breaks.
    
    **What to do**: The screen displays how long you must wait. Return to the lock menu and try again after the waiting period ends.
    
    !!! info
The waiting period is calculated from when your last break ended, not when it started.
    

</AccordionGroup>

!!! warning
If you encounter an error not listed here, or if troubleshooting steps don't resolve your issue, contact support with your device serial number and the exact error code displayed.
