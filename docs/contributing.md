# Contributing

This project is built so writers can contribute without learning the full toolchain first.

## Start the preview

Use the script for your operating system:

- macOS: `./start-docs.command`
- Windows: `.\start-docs.bat`
- Linux: `./start-docs.sh`

When the preview is ready, open <http://localhost:8000>.

## Edit a page

1. Open the `docs/` folder.
2. Choose the page you want to improve.
3. Edit the Markdown file.
4. Refresh the browser to review your changes.

## Add a page

1. Copy `templates/page-template.md`.
2. Save the new file inside `docs/`.
3. Add the page to the `nav` section in `mkdocs.yml`.
4. Refresh the preview and confirm the page appears in the sidebar.

## Check before sharing

Use the script for your operating system:

- macOS: `./check-docs.command`
- Windows: `.\check-docs.bat`
- Linux: `./check-docs.sh`

## If you prefer local Python

There is also a local workflow:

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
