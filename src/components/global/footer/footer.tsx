import { component$, useStore, $ } from "@builder.io/qwik";
import "./footer.css";

export const Footer = component$(() => {
  const currentYear = new Date().getFullYear();
  
  const state = useStore({
    company: false,
    design: false,
    blog: false,
    followUs: false,
  });

  const toggle = $((section: 'company' | 'design' | 'blog' | 'followUs') => {
    state[section] = !state[section];
  });

  const Chevron = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class="accordion-chevron"
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );

  return (
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          {/* Brand Section */}
          <div class="footer-brand">
            <h2 class="brand-logo">Kitlayer.com</h2>
            <div class="copyright-info">
              <p>© {currentYear} Kitlayer</p>
              <p>All Rights Reserved.</p>
            </div>
          </div>

          <div class="footer-menu-container">
            {/* Company Column */}
            <div class={`footer-column ${state.company ? 'is-open' : ''}`}>
              <h3 class="column-title" onClick$={() => toggle('company')}>
                Company
                <Chevron />
              </h3>
              <ul class="footer-links">
                <li><a href="/about">About</a></li>
                <li><a href="/faq">Faq's</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/cookie">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Design Column */}
            <div class={`footer-column ${state.design ? 'is-open' : ''}`}>
              <h3 class="column-title" onClick$={() => toggle('design')}>
                Design
                <Chevron />
              </h3>
              <ul class="footer-links">
                <li><a href="/design/food">Food Logo Maker</a></li>
                <li><a href="/design/education">Education Logo Maker</a></li>
                <li><a href="/design/gaming">Gaming Logo Maker</a></li>
                <li><a href="/design/travel">Travel Logo Maker</a></li>
                <li><a href="/design/beauty">Beauty Logo Maker</a></li>
                <li><a href="/design/technology">Technology Logo Maker</a></li>
              </ul>
            </div>

            {/* Blog Column */}
            <div class={`footer-column ${state.blog ? 'is-open' : ''}`}>
              <h3 class="column-title" onClick$={() => toggle('blog')}>
                Blog
                <Chevron />
              </h3>
              <ul class="footer-links">
                <li><a href="/blog/1">Blog Content One</a></li>
                <li><a href="/blog/2">Blog Content Two</a></li>
                <li><a href="/blog/3">Blog Content Three</a></li>
                <li><a href="/blog/4">Blog Content Four</a></li>
                <li><a href="/blog/5">Blog Content Five</a></li>
                <li><a href="/blog/6">Blog Content Six</a></li>
                <li><a href="/blog/7">Blog Content Seven</a></li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div class={`footer-column ${state.followUs ? 'is-open' : ''}`}>
              <h3 class="column-title" onClick$={() => toggle('followUs')}>
                Follow Us
                <Chevron />
              </h3>
              <ul class="footer-links">
                <li><a href="https://facebook.com/kitlayercom" target="_blank" rel="noopener">Facebook</a></li>
                <li><a href="https://twitter.com/kitlayercom" target="_blank" rel="noopener">X</a></li>
                <li><a href="https://instagram.com/kitlayercom" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="https://tiktok.com/kitlayercom" target="_blank" rel="noopener">Tiktok</a></li>
                <li><a href="https://dribbble.com/kitlayercom" target="_blank" rel="noopener">Dribbble</a></li>
                <li><a href="https://pinterest.com/kitlayercom" target="_blank" rel="noopener">Pinterest</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener">Linkedin</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div class="footer-bottom">
        <p>Designed with love for you in Istanbul  ❤️</p>
      </div>
    </footer>
  );
});
