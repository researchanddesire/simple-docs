---
title: "Overview"
description: "Track the latest updates, new features, and improvements to the Chastity Lockbox"
rss: true
---

Stay up to date with the latest changes to the Chastity Lockbox. This changelog documents all releases, including new features, improvements, and bug fixes.

<Update label="Version 0.0.0" description="Placeholder Release">

## Placeholder Release

This is a placeholder entry for future Chastity Lockbox updates. See the [detailed release notes](/lockbox/changelog/v0.0.0) for more information.

### v1.17.47
- **Automated changelog generation** — Version bump workflow now automatically generates changelog entries using AI

### v1.17.48
- **Instant 24-hour lock documentation** — Added guide for the new quick-start 24-hour lock session feature

### v1.17.49
- **Improved boot screen** — Redesigned splash screen with centered RD logo and cleaner version display
- **Onboarding preflight flow** — Added structured initialization states for welcome, WiFi setup, and device pairing
- **Text display improvements** — Fixed text wrapping to properly handle line breaks and cursor positioning

### v1.17.51
- **Public voting duration limits** — Added configurable maximum and minimum lock duration limits for public voting
- **Improved public voting docs** — Clarified setup instructions for templates and active session modifications

### v1.17.56
- **Changelog maintenance** — Removed premature version entries from documentation

### v1.17.57
- **AI development context** — Added project memory file to improve AI-assisted development and code navigation

### v1.17.58
- **Header bar cleanup** — Disabled battery icon from the status bar display

### v1.17.62
- **Reverted memory changes** — Rolled back HTTP client reuse and boot sequence changes from v1.17.61 due to stability issues

### v1.17.63
- **Battery icon restored** — Re-enabled battery status icon in the header bar with improved reliability
- **INA219 sensor handling** — Added graceful fallback when battery sensor is unavailable

### v1.17.65
- **Interactive diagram controls** — Added pan, zoom, and pinch-to-zoom support for Mermaid diagrams in documentation

### v1.17.66
- **Automatic Bluetooth pairing** — Pair your Lockbox directly from Chrome or Edge using Web Bluetooth — no manual WiFi setup required
- **WiFi provisioning over BLE** — WiFi credentials are sent securely over Bluetooth during automatic pairing
- **Improved unpair flow** — Unpaired devices automatically restart and re-enable Bluetooth advertising for re-pairing

### v1.17.67
- **Debugging improvements** — Added test logging tag for improved diagnostics and development

</Update>
