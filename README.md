# Simple Docs

This repo is set up so docs contributors can start helping quickly, even if they do not usually write code.

You do not need to know React, Next.js, or Fumadocs internals to edit pages here.

## Fastest path for writers

1. Install Node.js LTS if you do not already have it.
2. Download or clone this repo.
3. Start the docs preview:

macOS:

```bash
./start-docs.command
```

Windows:

```powershell
.\start-docs.bat
```

Linux:

```bash
./start-docs.sh
```

On macOS and Windows, you can also double-click the start script instead of running it from a terminal.
The script will install what it needs the first time you run it.

4. Open <http://localhost:8000>.
5. Edit files in `docs/` and save your changes. The browser preview should update automatically.

## Install Node.js

If `node` or `npm` is not already available on your machine:

- macOS: install Node.js LTS from [nodejs.org](https://nodejs.org/) or with Homebrew using `brew install node`
- Windows: install Node.js LTS from [nodejs.org](https://nodejs.org/)
- Linux: install Node.js LTS with your package manager or from [nodejs.org](https://nodejs.org/)

You can check whether Node.js is ready with these commands:

```bash
node --version
npm --version
```

## Before you share your work

Run the docs check:

macOS:

```bash
./check-docs.command
```

Windows:

```powershell
.\check-docs.bat
```

Linux:

```bash
./check-docs.sh
```

On macOS and Windows, you can also double-click the check script.
The check script uses the same local Node.js setup as the preview.

## Helpful files

- [CONTRIBUTING.md](CONTRIBUTING.md) explains the writing workflow in plain language.
- [templates/page-template.md](templates/page-template.md) gives you a starting point for new pages.
- [docs/contributors/getting-started.md](docs/contributors/getting-started.md) is the contributor guide inside the docs site itself.

## Advanced options

If you prefer to manage the environment manually, the scripts in `scripts/` are a good next step. Most contributors should be able to stick with the top-level start and check scripts.
