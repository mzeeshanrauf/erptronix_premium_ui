# Erptronix Premium UI

Modern premium UI theme app for Frappe / ERPNext v15.

## Install from local folder
```bash
cd ~/v15-bench/apps
rm -rf erptronix_premium_ui
unzip /path/to/erptronix_premium_ui_repo_fixed.zip
cd ~/v15-bench
bench build --app erptronix_premium_ui
bench --site yoursite install-app erptronix_premium_ui
bench --site yoursite clear-cache
bench restart
```
