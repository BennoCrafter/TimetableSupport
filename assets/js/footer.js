// Shared site footer — edit here, it renders on every page with <footer class="site-footer"></footer>.
// i18n.js translates its data-i18n strings on DOMContentLoaded.
document.querySelector(".site-footer").innerHTML = `
  <div class="wrap">
    <div class="footer-top">
      <div>
        <a class="footer-brand" href="/">
          <img src="/assets/images/logo/logo.png" alt="Timetable Manager logo" />
          Timetable Manager
        </a>
        <p class="footer-tagline" data-i18n="footerTagline">Perfect for everyday life.</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/timetablemanager.app" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://www.tiktok.com/@timetablemanager.app" target="_blank" rel="noopener" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.36-2.47V9.66a5.71 5.71 0 0 0-.77-.05 5.68 5.68 0 0 0-5.68 5.68A5.68 5.68 0 0 0 9.86 21a5.68 5.68 0 0 0 5.68-5.68V9.01a7.35 7.35 0 0 0 4.29 1.38V7.3a4.3 4.3 0 0 1-3.23-1.48z"/></svg>
          </a>
          <a href="https://ko-fi.com/bennowo" target="_blank" rel="noopener" aria-label="Support me on Ko-fi">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M10 17.5s-3.5-2-3.5-4.25A1.75 1.75 0 0 1 10 12.5a1.75 1.75 0 0 1 3.5.75c0 2.25-3.5 4.25-3.5 4.25z" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://bennowo.vercel.app" target="_blank" rel="noopener" aria-label="Website">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </a>
        </div>
      </div>
      <ul class="footer-links">
        <li><a href="mailto:timetablemanager.contact@gmail.com?subject=Timetable%20Manager%20App%20Support" data-i18n="footerContact">Contact Us</a></li>
        <li><a href="/privacy-policy.html" data-i18n="footerPrivacy">Privacy Policy</a></li>
        <li><a href="/imprint.html" data-i18n="footerImprint">Imprint</a></li>
        <li><a href="/feedback.html" data-i18n="footerFeedback">Give Feedback</a></li>
      </ul>
    </div>
    <div class="footer-bottom" data-i18n="footerCopyright">&copy; 2027 Timetable Manager. All rights reserved.</div>
  </div>
`;
