(function () {
  const STORAGE_KEY = "erptronix-premium-dark";
  const TOGGLE_CLASS = "erptronix-theme-toggle";
  let observerStarted = false;

  function isDarkMode() {
    return localStorage.getItem(STORAGE_KEY) === "1";
  }

  function applyTheme() {
    document.body.classList.toggle("erptronix-dark", isDarkMode());
    updateToggleLabel();
  }

  function updateToggleLabel() {
    const btn = document.querySelector(`.${TOGGLE_CLASS}`);
    if (!btn) return;
    btn.textContent = isDarkMode() ? "Light Mode" : "Dark Mode";
    btn.title = isDarkMode() ? "Switch to light mode" : "Switch to dark mode";
  }

  function toggleTheme() {
    localStorage.setItem(STORAGE_KEY, isDarkMode() ? "0" : "1");
    applyTheme();
  }

  function getNavbarContainer() {
    return (
      document.querySelector(".navbar .container") ||
      document.querySelector(".navbar > .container-fluid") ||
      document.querySelector("header .navbar .container") ||
      document.querySelector(".navbar")
    );
  }

  function createToggleButton() {
    const btn = document.createElement("button");
    btn.className = `btn btn-default btn-sm ${TOGGLE_CLASS}`;
    btn.type = "button";
    btn.style.marginLeft = "10px";
    btn.style.borderRadius = "12px";
    btn.style.whiteSpace = "nowrap";
    btn.addEventListener("click", toggleTheme);
    return btn;
  }

  function ensureToggle() {
    const navbar = getNavbarContainer();
    if (!navbar) return;

    let btn = navbar.querySelector(`.${TOGGLE_CLASS}`);
    if (!btn) {
      btn = createToggleButton();
      navbar.appendChild(btn);
    }
    updateToggleLabel();
  }

  function safeRefresh() {
    applyTheme();
    ensureToggle();
  }

  function setupObservers() {
    if (observerStarted) return;
    observerStarted = true;

    const observer = new MutationObserver(() => {
      ensureToggle();
      document.body.classList.toggle("erptronix-dark", isDarkMode());
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function setupRouteHooks() {
    if (window.frappe && frappe.router && typeof frappe.router.on === "function") {
      frappe.router.on("change", () => {
        setTimeout(safeRefresh, 200);
      });
    }

    document.addEventListener("page-change", () => {
      setTimeout(safeRefresh, 200);
    });

    window.addEventListener("hashchange", () => {
      setTimeout(safeRefresh, 200);
    });
  }

  frappe.ready(() => {
    safeRefresh();
    setupObservers();
    setupRouteHooks();
  });
})();
