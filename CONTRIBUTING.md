# Contributing

Documentation lives under `content/` as Markdown and MDX. Sidebar order and section titles are controlled by nearby `meta.json` files.

The easiest contribution path is the pencil beside any page title or heading on [docs.researchanddesire.com](https://docs.researchanddesire.com). It opens GitHub's editor at the exact source line on `main`; GitHub creates a fork automatically when you do not have write access.

Use the [Fumadocs Preview extension](https://marketplace.visualstudio.com/items?itemName=ResearchAndDesire.fumadocs-vscode-plugin) to preview a page without the private application repository.

Before opening a pull request:

- keep the change focused on reader-facing content
- keep images next to the pages that use them
- use existing Fumadocs components for callouts, cards, tabs, accordions, and steps
- do not add secrets, application code, build output, or private product information
- target `main` and allow the `validate-content` check to finish

Maintainers review public changes before automation synchronizes them to the private application repository. Contributions are accepted under CC BY-SA 4.0 unless a file says otherwise.
