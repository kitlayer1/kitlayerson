import { useStyles$ } from '@builder.io/qwik';
import { component$, useSignal, $ } from '@builder.io/qwik';
import style0 from "./faq.css?inline";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
}

export default component$<FAQProps>(({ items }) => {
  useStyles$(style0);

  const openIndex = useSignal<number | null>(null);

  const toggleFAQ = $((index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
  });

  const defaultItems: FAQItem[] = [
    {
      question: "Do I need design experience to create a logo?",
      answer: "No. The logo maker is designed for beginners and guides you through each step, so you can create a professional logo without any design experience."
    },
    {
      question: "How long does it take to create a logo?",
      answer: "No. The logo maker is designed for beginners and guides you through each step, so you can create a professional logo without any design experience."
    },
    {
      question: "Can I use my logo for commercial purposes?",
      answer: "Yes. Logos created with the platform can be used for commercial purposes, including branding, marketing, and promotional materials. Once downloaded, all rights to the logo belong to you, and your design is removed from our system."
    },
    {
      question: "What file formats will my logo be provided in?",
      answer: "Your logo will be delivered in PNG, SVG, and JPG formats, packaged in a ZIP file. Each download includes five different logo variations, making it easy to use your logo across different platforms and use cases."
    },
    {
      question: "Can I edit my logo after creating it?",
      answer: "Yes. You can go back and update colors, typography, and layout at any time before downloading your final logo."
    },
    {
      question: "Is this logo maker suitable for small businesses and personal projects?",
      answer: "Yes. The platform is designed for individuals, creators, and small businesses who want a simple and reliable way to create a professional logo."
    }
  ];

  const faqItems = items || defaultItems;

  return (
    <section class="faq-section">
      <div class="faq-container">
        <div class="faq-left">
          <p class="faq-sub">Frequently asked questions</p>
          <h2 class="faq-title">EVERYTHING YOU<br />NEED TO GET STARTED</h2>
          <p class="faq-description">
            Find clear answers to the most common questions about our platform, features, and services.
          </p>
          <a href="mailto:help@kitlayer.com" class="faq-contact">
            <div class="faq-contact-icon-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mail-icon"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <span class="faq-contact-text">help@kitlayer.com</span>
          </a>
        </div>

        <div class="faq-right">
          <div class="faq-list">
            {faqItems.map((item, index) => (
              <div
                key={index}
                class={`faq-item ${openIndex.value === index ? 'active' : ''}`}
                onClick$={() => toggleFAQ(index)}
              >
                <div class="faq-question">
                  <span>{item.question}</span>
                  <div class="faq-icon-box">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="faq-icon"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </div>
                <div class="faq-answer">
                  <div class="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
