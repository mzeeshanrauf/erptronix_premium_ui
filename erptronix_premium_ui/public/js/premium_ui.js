frappe.ready(() => {
  const body = document.body;

  function applyTheme(theme) {
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
    } else {
      body.removeAttribute("data-theme");
    }
    localStorage.setItem("ep_theme_mode", theme);
  }

  function toggleTheme() {
    const current = body.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  function injectThemeToggle() {
    if (document.querySelector(".ep-theme-toggle")) return;
    const btn = document.createElement("button");
    btn.className = "ep-theme-toggle";
    btn.innerText = "Toggle Theme";
    btn.addEventListener("click", toggleTheme);
    document.body.appendChild(btn);
  }

  function injectMobileQuickNav() {
    if (document.querySelector(".ep-mobile-nav")) return;
    const pageHead = document.querySelector(".page-head");
    if (!pageHead) return;

    const nav = document.createElement("div");
    nav.className = "ep-mobile-nav";
    nav.innerHTML = `
      <button class="btn btn-default" data-route="/app">Home</button>
      <button class="btn btn-default" data-route="/app/workspace">Workspace</button>
      <button class="btn btn-default" data-route="/app/List/Sales Order/List">Sales</button>
      <button class="btn btn-default" data-route="/app/query-report">Reports</button>
    `;

    nav.querySelectorAll("button[data-route]").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = btn.getAttribute("data-route");
      });
    });

    pageHead.insertAdjacentElement("afterend", nav);
  }

  function initPremiumUI() {
    injectThemeToggle();
    injectMobileQuickNav();
    const savedTheme = localStorage.getItem("ep_theme_mode") || "light";
    applyTheme(savedTheme);
  }

  initPremiumUI();
  document.addEventListener("click", () => {
    setTimeout(() => {
      injectThemeToggle();
      injectMobileQuickNav();
    }, 300);
  });
});
