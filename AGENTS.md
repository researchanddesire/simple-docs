# Content repository instructions

Edit English pages under `content/` using plain `.mdx` filenames. Keep navigation
in `meta.json` and images beside the pages. Open content PRs into `staging`.

rad-app polls hourly, reconciles edits, and proposes reviewed sync PRs. It owns
image conversion, validation and all translations. Upload ordinary images here;
the hub returns finished WebPs and updated references. Do not recompress them.

This repo has no GitHub Actions, build scripts or localization files. Required
assets, navigation, attribution and BOM data remain with the pages. The passive
`.github/docs-sync.json` checkpoint is maintained by the hub; do not edit it.

The hub copy is `researchanddesire/rad-app/apps/docs-userguide/content/`. English pages
there use `.en.mdx`; translations are edited and maintained only in rad-app.
Normal sync is staging to staging. Promote the hub before this repo to main.
