(function () {
  const STORAGE_KEY = "erptronix-premium-dark";
  const TOGGLE_CLASS = "erptronix-theme-toggle";
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

  function ensureBranding() {
    // Navbar logo text
    const homeLink =
      document.querySelector(".navbar-home") ||
      document.querySelector(".app-logo") ||
      document.querySelector(".navbar-brand");

    if (homeLink) {
      homeLink.classList.add("erptronix-brand-root");

      let brand = homeLink.querySelector(".erptronix-brand-badge");
      if (!brand) {
        brand = document.createElement("span");
        brand.className = "erptronix-brand-badge";
        brand.innerHTML = '<span class="erptronix-mark">E</span><span class="erptronix-brand-text">ERPTronix</span>';
        homeLink.appendChild(brand);
      }

      const img = homeLink.querySelector("img");
      if (img) img.style.display = "none";

      const existingTextNodes = Array.from(homeLink.childNodes).filter(
        n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
      );
      existingTextNodes.forEach(n => (n.textContent = ""));
    }

    // Sidebar logo
    const sidebarLogo =
      document.querySelector(".desk-logo") ||
      document.querySelector(".app-logo .app-logo-container") ||
      document.querySelector(".layout-side-section .sidebar-toggle-btn")?.parentElement;

    if (sidebarLogo && !sidebarLogo.querySelector(".erptronix-side-brand")) {
      const sideBrand = document.createElement("div");
      sideBrand.className = "erptronix-side-brand";
      sideBrand.innerHTML = '<span class="erptronix-mark">E</span><span class="erptronix-side-text">ERPTronix</span>';
      sidebarLogo.appendChild(sideBrand);
    }
  }

  function refresh() {
    applyTheme();
    ensureToggle();
    ensureBranding();
  }

  frappe.ready(() => {
    refresh();

    if (!observerStarted) {
      observerStarted = true;
      const observer = new MutationObserver(() => {
        ensureToggle();
        ensureBranding();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    if (window.frappe && frappe.router && typeof frappe.router.on === "function") {
      frappe.router.on("change", () => setTimeout(refresh, 150));
    }

    window.addEventListener("hashchange", () => setTimeout(refresh, 150));
  });
})();
