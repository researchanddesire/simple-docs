# Simple Docs

This repo is set up so docs contributors can start helping quickly, even if they do not usually write code.

You do not need to know Python internals, virtual environments, or MkDocs configuration to edit pages here.

## Fastest path for writers

1. Install Python 3 if you do not already have it.
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
The script will create the local docs environment for you the first time you run it.

4. Open <http://localhost:8000>.
5. Edit files in `docs/` and refresh the browser to see your changes.

## Install Python

If `python3` or `py` is not already available on your machine:

- macOS: install Python 3 from [python.org](https://www.python.org/downloads/) or with Homebrew using `brew install python`
- Windows: install Python 3 from [python.org](https://www.python.org/downloads/) and make sure the installer adds Python to your `PATH`
- Linux: install Python 3 with your package manager, for example `sudo apt install python3 python3-venv` on Ubuntu or Debian

You can check whether Python is ready with one of these commands:

```bash
python3 --version
```

Windows PowerShell:

```powershell
py -3 --version
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
The check script uses the same local Python environment as the preview.

## Helpful files

- [CONTRIBUTING.md](CONTRIBUTING.md) explains the writing workflow in plain language.
- [templates/page-template.md](templates/page-template.md) gives you a starting point for new pages.
- [docs/getting-started.md](docs/getting-started.md) is the contributor guide inside the docs site itself.

## Advanced options

If you prefer to manage the environment manually, the scripts in `scripts/` are a good next step. Most contributors should be able to stick with the top-level start and check scripts.
