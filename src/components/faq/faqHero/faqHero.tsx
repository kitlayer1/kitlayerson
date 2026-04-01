import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import "./faqHero.css";

export const FaqHero = component$(() => {
  return (
    <section class="faqhero">
      <div class="faqhero-container">
        
        {/* Top Header Section */}
        <div class="faqhero-header">
          <div class="faqhero-badge">
            <span class="badge-dot"></span>
            Frequently Asked Questions
          </div>
          <h1 class="faqhero-title">
           Everything You<br />Need To Get Started
          </h1>
          <p class="faqhero-description">
            Learn how to use Kitlayer step by step, explore logo creation features, download options, usage rights, and find clear answers to the most frequently asked questions.
          </p>
        </div>

        {/* Cards Section */}
        <div class="faqhero-cards">
          
          {/* Card 1 */}
          <div class="faqhero-card">
            <div class="faqhero-card-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <h3 class="faqhero-card-title">About</h3>
            </div>
            <p class="faqhero-card-text">
             Discover Kitlayer and our mission to make professional logo creation simple, fast, and accessible. Learn how our platform works, explore its features, and see how we help brands bring their ideas to life.
            </p>
            <Link href="/about" class="faqhero-card-button">About</Link>
          </div>

          {/* Card 2 */}
          <div class="faqhero-card">
            <div class="faqhero-card-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <h3 class="faqhero-card-title">Contact Us</h3>
            </div>
            <p class="faqhero-card-text">
              Get in touch with the Kitlayer team. Whether you have questions about logo creation, features, or your account, we’re here to help and provide fast, friendly support to assist your brand journey.
            </p>
            <Link href="/contact" class="faqhero-card-button">Contact</Link>
          </div>

        </div>

      </div>
    </section>
  );
});
