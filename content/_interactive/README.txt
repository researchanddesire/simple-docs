# Community documentation components

This directory contains the bidirectionally synchronized implementations for the
@repo/device-tools workspace package. The thin package boundary lives at
packages/device-tools so pnpm links do not appear inside the content tree watched
by the documentation compiler. These tools are shared by the dashboard and docs:

- device-flasher.jsx
- gold-motor-control.jsx
- mermaid-controls.jsx
- ossm-ble-controller.tsx
- ossm-funscript-player.jsx

The directory is mirrored with the User Guide content so public contributors can
develop the components without access to the private application repository. Keep
the implementations in this synchronized directory: moving their source outside
the content tree would break inbound edits from researchanddesire/simple-docs.
