import { component$ } from "@builder.io/qwik";
import "./footer.css";

export const Footer = component$(() => {
  return (
    <footer class="footer">
      <div class="footer__container">
        {/* Brand & Socials */}
        <div class="footer__brand-section">
          <div class="footer__brand">
            <svg class="footer__logo-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <span class="footer__logo-text">Kitlayer.</span>
          </div>
          <p class="footer__description">
            Streamline your entire operations. Boost your margins. Cut waste. Meet the AI-powered
          </p>
          <div class="footer__social-links">
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" aria-label="Dribbble">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.5 2.5c3.5 10 13 10 13 10"/><path d="M2 12c10 5 10 10 10 10"/><path d="M12 2c0 10-10 10-10 10"/></svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* Company Column */}
        <div class="footer__column">
          <h4 class="footer__column-title">Company</h4>
          <ul class="footer__list">
            <li><a href="/about">About</a></li>
            <li><a href="/faq">Faq's</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/cookie-policy">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Design Column */}
        <div class="footer__column">
          <h4 class="footer__column-title">Design</h4>
          <ul class="footer__list">
            <li><a href="#">Food Logo Maker</a></li>
            <li><a href="#">Eduation Logo Maker</a></li>
            <li><a href="#">Gaming Logo Maker</a></li>
            <li><a href="#">Travel Logo Maker</a></li>
            <li><a href="#">Beauty Logo Maker</a></li>
            <li><a href="#">Technology Logo Maker</a></li>
          </ul>
        </div>

        {/* Blog Column */}
        <div class="footer__column">
          <h4 class="footer__column-title">Blog</h4>
          <ul class="footer__list">
            <li><a href="#">Blog Content One</a></li>
            <li><a href="#">Blog Content Two</a></li>
            <li><a href="#">Blog Content Three</a></li>
            <li><a href="#">Blog Content Four</a></li>
            <li><a href="#">Blog Content Five</a></li>
            <li><a href="#">Blog Content Six</a></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>Streamline your entire operations. Boost your margins. Cut waste. Meet the AI-powered</p>
      </div>
    </footer>
  );
});
