# Contributing

This project is designed for writers first.

If you can edit a text file, you can contribute here.

## The easy path

Use Docker so everyone gets the same setup on macOS, Linux, and Windows.

- macOS: run `./start-docs.command`
- Windows: run `.\start-docs.bat`
- Linux: run `./start-docs.sh`

When the preview starts, open <http://localhost:8000>.

Keep that terminal window open while you work.

## What to edit

- Most changes happen in the `docs/` folder.
- Each page is a Markdown file ending in `.md`.
- If you only need to improve wording, fix typos, or add examples, you can usually edit an existing file and stop there.

## Editing an existing page

1. Open the `docs/` folder.
2. Pick the page you want to improve.
3. Edit the text.
4. Refresh the browser preview.

## Creating a new page

1. Copy [templates/page-template.md](templates/page-template.md).
2. Save it in `docs/` with a clear file name like `troubleshooting-login.md`.
3. Add the new page to the `nav` section in `mkdocs.yml`.
4. Refresh the preview and confirm the page appears in the sidebar.

## Before you submit

Run the docs check script for your operating system.

- macOS: `./check-docs.command`
- Windows: `.\check-docs.bat`
- Linux: `./check-docs.sh`

This makes sure the site still builds cleanly.

## Writing tips

- Use short headings that help readers scan quickly.
- Prefer steps, examples, and screenshots over dense paragraphs.
- Write what the reader should do, not just what the system does.
- If a sentence feels complicated, it usually gets better when shortened.

## If Docker is not an option

There is also a local Python workflow:

### macOS and Linux

```bash
./scripts/bootstrap.sh
./scripts/serve-local.sh
```

### Windows PowerShell

```powershell
.\scripts\bootstrap.ps1
.\scripts\serve-local.ps1
```

## Optional editor setup

VS Code works especially well for non-technical contributors because it has a simple file browser and good Markdown support. If you use VS Code, opening the repo in a Dev Container is also supported.
