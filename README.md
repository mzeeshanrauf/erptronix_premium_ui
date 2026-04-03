# Erptronix Premium UI

Modern premium UI theme app for Frappe / ERPNext v15.

## Features
- Premium glass-style Desk UI
- Gradient primary buttons
- Rounded cards and inputs
- Dark mode toggle in navbar
- Mobile-safe styling
- Frappe v15 bundle-compatible assets

## Install

```bash
bench get-app https://github.com/YOUR_USERNAME/erptronix_premium_ui.git
bench build --app erptronix_premium_ui
bench --site YOURSITE install-app erptronix_premium_ui
bench --site YOURSITE clear-cache
bench restart
```

## Repo structure

```text
erptronix_premium_ui/
├── erptronix_premium_ui/
│   ├── __init__.py
│   └── hooks.py
├── public/
│   ├── js/
│   │   └── erptronix_premium_ui.bundle.js
│   └── scss/
│       └── erptronix_premium_ui.bundle.scss
├── MANIFEST.in
├── modules.txt
├── requirements.txt
├── setup.py
└── README.md
```
