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

  function refresh() {
    applyTheme();
    ensureToggle();
  }

  frappe.ready(() => {
    refresh();

    if (!observerStarted) {
      observerStarted = true;
      const observer = new MutationObserver(() => {
        ensureToggle();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    if (window.frappe && frappe.router && typeof frappe.router.on === "function") {
      frappe.router.on("change", () => setTimeout(refresh, 120));
    }

    window.addEventListener("hashchange", () => setTimeout(refresh, 120));
  });
})();
