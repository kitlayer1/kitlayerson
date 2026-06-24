import { component$, useStore, $, useStyles$ } from '@builder.io/qwik';
import style0 from "./footer.css?inline";

export const Footer = component$(() => {
  useStyles$(style0);

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
        
        {/* CTA Banner Section */}
        <div class="footer-cta-banner">
          <div class="footer-cta-content">
            <h2 class="footer-cta-title">TURN YOUR VISION INTO A BRAND<br/>WORTH REMEMBERING</h2>
            <p class="footer-cta-description">Find clear answers to the most common questions about<br/>our platform, features, and services.</p>
            <a href="/app" class="footer-cta-button">
  Get Started
  <span class="icon-container">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  </span>
</a>
          </div>
          <div class="footer-cta-image">
            {/* eslint-disable-next-line qwik/jsx-img */}
            <img src="/images/global/footer/banner/footerBanner.svg" alt="Brew Box" />
          </div>
        </div>

        <div class="footer-grid">
          {/* Brand Section */}
          <div class="footer-brand">
            <h2 class="brand-logo">Kitlayer</h2>
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
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/pricing-policy">Pricing</a></li>
                <li><a href="/terms-of-service">Terms of Service</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/cookie-policy">Cookie Policy</a></li>
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
                <li><a href="/design/fashion">Fashion Logo Maker</a></li>
              </ul>
            </div>

            {/* Blog Column */}
            <div class={`footer-column ${state.blog ? 'is-open' : ''}`}>
              <h3 class="column-title" onClick$={() => toggle('blog')}>
                Blog
                <Chevron />
              </h3>
              <ul class="footer-links">
                <li><a href="/blog/1">Blog Content 1</a></li>
                <li><a href="/blog/2">Blog Content 2</a></li>
                <li><a href="/blog/3">Blog Content 3</a></li>
                <li><a href="/blog/4">Blog Content 4</a></li>
                <li><a href="/blog/5">Blog Content 5</a></li>
                <li><a href="/blog/6">Blog Content 6</a></li>
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
                <li><a href="https://linkedin.com/kitlayer" target="_blank" rel="noopener">Linkedin</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div class="footer-bottom">
        <p>Designed with love for you in Istanbul ❤️</p>
      </div>
    </footer>
  );
});
