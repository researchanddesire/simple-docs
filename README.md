# Simple Docs

Documentation for Research and Desire products, built with [Fumadocs](https://fumadocs.dev).

You do not need to run a local dev server or learn the full toolchain to edit pages here. Open the repo in VS Code and preview your changes with the Fumadocs Preview extension.

## Fastest path for writers

1. Install [VS Code](https://code.visualstudio.com/).
2. Install the **Fumadocs Preview** extension:
   - [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ResearchAndDesire.fumadocs-vscode-plugin)
   - [Open VSX](https://open-vsx.org/extension/ResearchAndDesire/fumadocs-vscode-plugin)
3. Clone or download this repo and open it in VS Code.
4. Open any `.mdx` file in `content/`.
5. Run **Fumadocs: Preview** from the Command Palette, the editor title bar, or the CodeLens link at the top of the file (`Cmd+Alt+V` on macOS, `Ctrl+Alt+V` on Windows and Linux).
6. Edit the file and save. The preview updates beside your editor.

On first preview, the extension installs its bundled renderer dependencies once. You need [Node.js](https://nodejs.org/) and a package manager (`npm`, `pnpm`, or `yarn`) on your `PATH`.

## What to edit

- Pages live in `content/` as MDX files.
- Sidebar order and section titles are controlled by `meta.json` files in each folder.
- Copy `templates/page-template.mdx` when adding a new page.

## Helpful files

- [content/meta/contributing.mdx](content/meta/contributing.mdx) explains the writing workflow inside the docs site.
- [content/meta/getting-started.mdx](content/meta/getting-started.mdx) is the contributor guide for new writers.
- [templates/page-template.mdx](templates/page-template.mdx) is a starting point for new pages.

## Hosting

The site is published two ways from this repo:

- Custom domain: <https://docs.researchanddesire.com>
- GitHub Pages: <https://researchanddesire.github.io/simple-docs/>

Both are built and deployed by the [`Deploy docs to GitHub Pages`](.github/workflows/deploy-docs.yml) workflow on every push to `main`.
