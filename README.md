# Simple Docs

This repo is set up so docs contributors can start helping quickly, even if they do not usually write code.

You do not need to know Python, Docker internals, or MkDocs configuration to edit pages here.

## Fastest path for writers

1. Install Docker Desktop if you are on macOS or Windows, or Docker Engine if you are on Linux.
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
If Docker is installed but not open yet, the script will try to start it for you and wait for it to be ready.

4. Open <http://localhost:8000>.
5. Edit files in `docs/` and refresh the browser to see your changes.

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
If Docker is closed, the script will try to open it before running the build check.

## Helpful files

- [CONTRIBUTING.md](CONTRIBUTING.md) explains the writing workflow in plain language.
- [templates/page-template.md](templates/page-template.md) gives you a starting point for new pages.
- [docs/getting-started.md](docs/getting-started.md) is the contributor guide inside the docs site itself.

## Advanced options

If you prefer a more developer-oriented workflow, this repo also supports VS Code Dev Containers and a local Python virtual environment. Those options are documented in [CONTRIBUTING.md](CONTRIBUTING.md).
