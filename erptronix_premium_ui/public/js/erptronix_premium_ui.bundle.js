frappe.ready(() => {
  const apply = () => {
    if (localStorage.getItem('erptronix-premium-dark') === '1') {
      document.body.classList.add('erptronix-dark');
    } else {
      document.body.classList.remove('erptronix-dark');
    }
  };

  const addToggle = () => {
    if (document.querySelector('.erptronix-theme-toggle')) return;
    const navbar = document.querySelector('.navbar .container, header .navbar .container, .navbar');
    if (!navbar) return;
    const btn = document.createElement('button');
    btn.className = 'btn btn-default btn-sm erptronix-theme-toggle';
    btn.type = 'button';
    btn.textContent = 'Theme';
    btn.style.marginLeft = '10px';
    btn.onclick = () => {
      const next = localStorage.getItem('erptronix-premium-dark') === '1' ? '0' : '1';
      localStorage.setItem('erptronix-premium-dark', next);
      apply();
    };
    navbar.appendChild(btn);
  };

  apply();
  addToggle();
  setInterval(addToggle, 3000);
});
