(function () {
  const STORAGE_KEY = "erptronix-premium-dark";
  const TOGGLE_CLASS = "erptronix-theme-toggle";
  const FAVICON_URL = "/assets/erptronix_premium_ui/images/erptronix-favicon.svg";
  const LOGO_URL = "/assets/erptronix_premium_ui/images/erptronix-logo.svg";
  let observerStarted = false;

  function isDarkMode() {
    return localStorage.getItem(STORAGE_KEY) === "1";
  }

  function updateButton(btn) {
    if (!btn) return;
    btn.textContent = isDarkMode() ? "Light" : "Dark";
    btn.title = isDarkMode() ? "Switch to light mode" : "Switch to dark mode";
  }

  function applyTheme() {
    document.body.classList.toggle("erptronix-dark", isDarkMode());
    document.querySelectorAll("." + TOGGLE_CLASS).forEach(updateButton);
  }

  function toggleTheme() {
    localStorage.setItem(STORAGE_KEY, isDarkMode() ? "0" : "1");
    applyTheme();
  }

  function navbarContainer() {
    return document.querySelector(".navbar .container, .navbar > .container-fluid, .navbar");
  }

  function ensureToggle() {
    const nav = navbarContainer();
    if (!nav) return;
    let btn = nav.querySelector("." + TOGGLE_CLASS);
    if (!btn) {
      btn = document.createElement("button");
      btn.className = "btn btn-default btn-sm " + TOGGLE_CLASS;
      btn.type = "button";
      btn.style.marginLeft = "10px";
      btn.style.borderRadius = "10px";
      btn.style.whiteSpace = "nowrap";
      btn.addEventListener("click", toggleTheme);
      nav.appendChild(btn);
    }
    updateButton(btn);
  }

  function buildBrandNode(compact=false) {
    const wrap = document.createElement("span");
    wrap.className = compact ? "erptronix-side-brand" : "erptronix-brand-badge";
    wrap.innerHTML = `
      <img class="erptronix-brand-img" src="${LOGO_URL}" alt="ERPTronix">
      <span class="${compact ? "erptronix-side-text" : "erptronix-brand-text"}">ERPTronix</span>
    `;
    return wrap;
  }

  function replaceNavbarBrand() {
    const selectors = [".navbar-home", ".app-logo", ".navbar-brand", ".navbar .app-logo"];
    const host = document.querySelector(selectors.join(", "));
    if (!host) return;

    host.classList.add("erptronix-brand-root");
    host.querySelectorAll("img").forEach(img => {
      if (!img.classList.contains("erptronix-brand-img")) img.style.display = "none";
    });
    host.querySelectorAll(".hidden-xs, .app-logo-text, .navbar-brand-name, .app-logo-container").forEach(el => {
      if (!el.classList.contains("erptronix-brand-text") && !el.classList.contains("erptronix-brand-badge")) {
        el.style.display = "none";
      }
    });

    let badge = host.querySelector(".erptronix-brand-badge");
    if (!badge) {
      badge = buildBrandNode(false);
      host.appendChild(badge);
    }
  }

  function replaceSidebarBrand() {
    const host = document.querySelector(".layout-side-section");
    if (!host) return;
    let topArea = host.querySelector(".erptronix-side-brand-host");
    if (!topArea) {
      topArea = document.createElement("div");
      topArea.className = "erptronix-side-brand-host";
      host.prepend(topArea);
    }
    if (!topArea.querySelector(".erptronix-side-brand")) {
      topArea.appendChild(buildBrandNode(true));
    }
  }

  function ensureFavicon() {
    let link = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = FAVICON_URL;
    link.type = "image/svg+xml";
  }

  function refresh() {
    applyTheme();
    ensureToggle();
    replaceNavbarBrand();
    replaceSidebarBrand();
    ensureFavicon();
  }

  frappe.ready(() => {
    refresh();

    if (!observerStarted) {
      observerStarted = true;
      const observer = new MutationObserver(() => {
        replaceNavbarBrand();
        replaceSidebarBrand();
        ensureToggle();
        ensureFavicon();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    if (window.frappe && frappe.router && typeof frappe.router.on === "function") {
      frappe.router.on("change", () => setTimeout(refresh, 180));
    }

    window.addEventListener("hashchange", () => setTimeout(refresh, 180));
  });
})();
