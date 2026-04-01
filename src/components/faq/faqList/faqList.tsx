import { component$, useSignal } from "@builder.io/qwik";
import "./faqList.css";

export const FaqList = component$(() => {
  const activeIndex = useSignal<number | null>(null);

  const faqs = [
    {
      question: "How can I create a logo with Kitlayer?",
      answer: "To create a logo with Kitlayer, simply enter your brand name, choose your industry, and customize the generated designs. You can adjust colors, fonts, and icons to create a professional logo in minutes."
    },
    {
      question: "Do I need design experience to create a logo?",
      answer: "No, you don’t need any design experience. Kitlayer’s intuitive interface and smart suggestions make it easy for anyone to create a professional logo."
    },
    {
      question: "In which formats can I download my logo?",
      answer: "You can download your logo in various formats such as PNG, JPG, PDF, and SVG. You'll also have 5 different versions of your logo, allowing you to easily use them both digitally and in print."
    },
    {
      question: "Will I own full rights to the logo I create?",
      answer: "Yes, once you download your logo, you have full ownership and can use it freely across any platform."
    },
    {
      question: "Are the logos unique and original?",
      answer: "Yes, logos are generated based on your inputs, ensuring each design is unique and tailored to your brand."
    },
    {
      question: "Can I use my logo for commercial purposes?",
      answer: "Yes, you can use your logo for commercial purposes including branding, websites, and social media."
    },
    {
      question: "What can I do if I don’t like the generated logos?",
      answer: "If you’re not satisfied, you can generate new designs or customize your existing logo until it meets your expectations."
    },
    {
      question: "How can I contact support if I have an issue?",
      answer: "If you experience any issues, you can contact our support team عبر the contact page, and we will assist you as soon as possible."
    },
    {
      question: "Can I download my logo in different color variations?",
      answer: "Yes, you can create and download your logo in multiple color variations based on your needs."
    },
    {
      question: "Do you offer refunds or money-back guarantees?",
      answer: "Refund policies may vary depending on the purchased package and usage. Please refer to our refund policy page for detailed information."
    },
      {
      question: "Can I design logos for any industry?",
      answer: "Yes, Kitlayer offers design options suitable for a wide range of industries including tech, fashion, food, and more."
    },
    {
      question: "How does the logo creation process work?",
      answer: "The process involves entering your brand details, selecting a design, customizing it, and downloading your final logo."
    },
    {
      question: "What do I need to start designing a logo?",
      answer: "To start designing a logo, simply enter your brand name and the system will generate suitable designs for you."
    },
    {
      question: "Are there any usage restrictions?",
      answer: "In general, you can use your logo freely. However, some elements like icons or fonts may be subject to specific licensing terms."
    }
  ];

  return (
    <section class="faqlist">
      <div class="faqlist-container">
        <div class="faqlist-items">
          {faqs.map((faq, index) => {
            const isActive = activeIndex.value === index;
            return (
              <div 
                key={index} 
                class={`faqlist-item ${isActive ? 'active' : ''}`}
                onClick$={() => {
                  activeIndex.value = isActive ? null : index;
                }}
              >
                <div class="faqlist-item-header">
                  <span class="faqlist-item-text">{faq.question}</span>
                  <span class="faqlist-item-icon">
                    {isActive ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    )}
                  </span>
                </div>
                {isActive && (
                  <div class="faqlist-item-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
