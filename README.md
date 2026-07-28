# Research and Desire User Guides

This repository is the public content mirror for the [Research and Desire User Guides](https://docs.researchanddesire.com), built with [Fumadocs](https://fumadocs.dev/) from the private `researchanddesire/rad-app` monorepo.

## Contribute

1. Fork this repository and create a branch from `main`.
2. Edit Markdown or MDX under `content/`.
3. Preview pages with the Fumadocs Preview extension for VS Code.
4. Open a focused pull request.

After a public change is approved, automation proposes the same content in `rad-app`. Changes from `rad-app` are likewise proposed back here as reviewed pull requests. The `[docs-sync]` commit marker prevents reciprocal loops.

This repository does not deploy a standalone site. Application code, deployment configuration, credentials, and generated build output do not belong here.

## Helpful files

- [Contributor pages](content/meta/)
- [Page template](templates/page-template.mdx)
- [Community interactive components](content/_interactive/README.txt)
