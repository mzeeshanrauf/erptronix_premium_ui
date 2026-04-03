# Erptronix Premium UI for ERPNext / Frappe v15

A ready-to-install Frappe app that gives ERPNext v15 a more modern, colorful, premium UI.

## What it changes
- Modern gradient accents
- Glass-style cards
- Cleaner sidebar
- Better form, list, report, and workspace visuals
- Mobile-friendly top quick nav
- Floating dark mode toggle
- Dashboard card polish

## Important note
This app **themes the Desk UI globally**. It does not replace ERPNext core doctypes or business logic.
It is designed to be upgrade-safer than editing core files.

## Install

```bash
cd /home/erp/frappe-bench
bench get-app /path/to/erptronix_premium_ui
bench --site yoursite install-app erptronix_premium_ui
bench build --app erptronix_premium_ui
bench clear-cache
bench restart
```

If you already copied the folder directly into `apps/`, then use:

```bash
cd /home/erp/frappe-bench
bench --site yoursite install-app erptronix_premium_ui
bench build --app erptronix_premium_ui
bench clear-cache
bench restart
```

## Uninstall

```bash
bench --site yoursite uninstall-app erptronix_premium_ui
```

## Files to edit
- CSS: `erptronix_premium_ui/public/css/premium_ui.css`
- JS: `erptronix_premium_ui/public/js/premium_ui.js`

## Recommended next steps
- Create role-based Workspaces for Sales and Management
- Add custom Number Cards and Dashboard Charts
- Hide pricing fields by role for sales users
- Add branding logo and company colors
