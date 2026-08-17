# Research and Desire User Guides

This repository is the public, editable content mirror for the [Research and Desire User Guides](https://docs.researchanddesire.com). Every page title and section heading on the rendered site links to its exact source line here.

## Contribute

1. Select a pencil on the rendered site, or fork this repository from `main`.
2. Edit Markdown or MDX under `content/`.
3. Preview larger changes with the Fumadocs Preview extension for VS Code.
4. Open a focused pull request into `main` and let `validate-content` finish.

After a public change is approved, automation synchronizes the same content into `rad-app`. Changes from `rad-app` are likewise mirrored here by the dedicated synchronization app. The `[docs-sync]` commit marker prevents reciprocal loops.

This repository does not deploy a standalone site. Application code, deployment configuration, credentials, and generated build output do not belong here.

## Helpful files

- [Contributor pages](content/meta/)
- [Page template](templates/page-template.mdx)
- [Community interactive components](content/_interactive/README.txt)

R+D-owned prose and media are licensed under [CC BY-SA 4.0](LICENSE). Separately licensed code, product material, and third-party assets retain their stated licenses.
