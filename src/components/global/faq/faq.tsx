import { component$, useSignal, $ } from '@builder.io/qwik';
import './faq.css';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  label?: string;
  title?: string;
  description?: string;
  email?: string;
  faqs: FAQItem[];
}

export const FAQ = component$<FAQProps>(({
  label = 'Frequently asked questions',
  title = 'Everything you need to get started',
  description = 'Find clear answers to the most common questions about our platform, features, and services.',
  email = 'help@kitlayer.com',
  faqs
}) => {

  const openIndex = useSignal<number | null>(null);

  const toggle = $((index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
  });

  return (
    <section class="faq-container">

      <div class="faq-left">

        <span class="faq-label">
          {label}
        </span>

        <h2 class="faq-title">
          {title}
        </h2>

        <p class="faq-description">
          {description}
        </p>

        <a class="faq-mail" href={`mailto:${email}`}>
          <span class="faq-mail-icon">✉</span>
          {email}
        </a>

      </div>

      <div class="faq-right">
        {faqs.map((item, index) => (
          <div
            key={index}
            class={`faq-item ${openIndex.value === index ? 'open' : ''}`}
            onClick$={() => toggle(index)}
          >
            <div class="faq-question">
              <span>{item.question}</span>
              <span class="faq-icon">
                {openIndex.value === index ? '−' : '+'}
              </span>
            </div>

            {openIndex.value === index && (
              <div class="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
});