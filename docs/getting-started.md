# Getting Started

This guide is for contributors who want to help with documentation and do not want to spend time learning the tooling first.

## What you need

- A copy of this repository on your computer
- Python 3
- Any text editor you like

VS Code is a good choice if you want a simple editor with a file list and Markdown support.

## Install Python if needed

If Python 3 is not already installed on your machine:

- macOS: install it from [python.org](https://www.python.org/downloads/) or with Homebrew using `brew install python`
- Windows: install it from [python.org](https://www.python.org/downloads/) and make sure Python is added to your `PATH`
- Linux: install `python3` and `python3-venv` with your package manager

You can verify the install with:

```bash
python3 --version
```

Windows PowerShell:

```powershell
py -3 --version
```

## Start the preview

Use the script that matches your operating system:

- macOS: `./start-docs.command`
- Windows: `.\start-docs.bat`
- Linux: `./start-docs.sh`

On macOS and Windows, you can double-click the script if that feels easier.
The first run will create the local environment and install the docs tools for you.

When the preview is ready, open <http://localhost:8000>.

## Make a change

1. Open the `docs/` folder.
2. Pick a Markdown file.
3. Change the wording, add steps, or fix an error.
4. Refresh the browser and review the result.

## Add a new page

1. Copy `templates/page-template.md`.
2. Save the copy inside `docs/`.
3. Add the page to `mkdocs.yml` so it appears in the sidebar.
4. Refresh the preview and make sure the new page opens correctly.

## Check your work

Use the script for your operating system:

- macOS: `./check-docs.command`
- Windows: `.\check-docs.bat`
- Linux: `./check-docs.sh`

If the check passes, your docs are ready to share.
