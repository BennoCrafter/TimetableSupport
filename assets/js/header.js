// Shared site header — edit here, it renders on every page with <header class="site-header"></header>.
// The right-hand button is "Get on App Store" by default; <header class="site-header" data-cta="home">
// shows "Back to home" instead. Runs before DOMContentLoaded, when theme.js and i18n.js bind to it.
(function () {
  var header = document.querySelector(".site-header");

  var cta =
    header.getAttribute("data-cta") === "home"
      ? `<a class="btn btn-ghost" data-i18n="navBackHome" href="/">Back to home</a>`
      : `<a class="btn btn-primary" data-i18n="navGetApp" href="https://apps.apple.com/us/app/timetable-manager/id6738605424" rel="nofollow noopener" target="_blank">Get on App Store</a>`;

  header.innerHTML = `
    <div class="wrap">
      <a class="brand" href="/">
        <img src="/assets/images/logo/logo.png" alt="Timetable Manager logo" />
        Timetable Manager
      </a>
      <div class="header-actions">
        <div class="lang-switch" role="group" aria-label="Language">
          <button type="button" data-lang="en">EN</button>
          <button type="button" data-lang="de">DE</button>
        </div>
        <button type="button" class="theme-toggle" aria-label="Toggle color theme">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="12" y1="2" x2="12" y2="4"></line>
            <line x1="12" y1="20" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="4" y2="12"></line>
            <line x1="20" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>
            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>
          </svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path>
          </svg>
        </button>
        <a class="btn btn-ghost btn-kofi" href="https://ko-fi.com/bennowo" target="_blank" rel="noopener" aria-label="Support me on Ko-fi">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M10 17.5s-3.5-2-3.5-4.25A1.75 1.75 0 0 1 10 12.5a1.75 1.75 0 0 1 3.5.75c0 2.25-3.5 4.25-3.5 4.25z" fill="currentColor" stroke="none"/></svg>
          <span data-i18n="navKofi">Support me on Ko-fi</span>
        </a>
        ${cta}
      </div>
    </div>
  `;
})();
