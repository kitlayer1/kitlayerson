import { component$, useStore, useSignal, $ } from '@builder.io/qwik';
import { supabase } from '~/lib/supabaseClient';
import './contactForm.css';

export const ContactForm = component$(() => {
  const formData = useStore({
    name: '',
    surname: '',
    email: '',
    subject: '',
    message: '',
  });

  const status = useSignal<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const isLoading = useSignal(false);

  const handleSubmit = $(async () => {
    if (!formData.name || !formData.surname || !formData.email || !formData.subject || !formData.message) {
      status.value = { type: 'error', message: 'Please fill in all fields.' };
      return;
    }

    isLoading.value = true;
    status.value = { type: null, message: '' };

    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      status.value = { type: 'success', message: 'Message sent successfully!' };
      // Reset form
      formData.name = '';
      formData.surname = '';
      formData.email = '';
      formData.subject = '';
      formData.message = '';
    } catch (err: any) {
      status.value = { type: 'error', message: err.message || 'Something went wrong.' };
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <section class="contact-section">
      <div class="contact-container">
        {/* Left Side */}
        <div class="contact-info">
          <div class="contact-badge">
            <span class="dot"></span>
            Contact Us
          </div>
          <h1>Have Questions or Need Support?</h1>
          <p class="subtitle">
            Have a question, need assistance, or want to share your feedback? Reach out to our team anytime, and we’ll provide clear answers and guidance so you can make the most of our platform quickly and effortlessly.
          </p>

          <div class="info-links">
            <a href="/about" class="info-card">
              <div class="card-content">
                <h3>About</h3>
                <p>Have questions or need assistance? Our team is here to help you every step of the way, providing clear answers and guidance so you can get the most out of our platform.</p>
              </div>
              <div class="arrows">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            <a href="/faq" class="info-card">
              <div class="card-content">
                <h3>Faq's</h3>
                <p>Have questions? We’ve compiled clear answers to the most common inquiries so you can quickly find what you need and get the most out of our platform.</p>
              </div>
              <div class="arrows">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <div class="contact-form-card">
          <div class="form-header">
            <h2>Have Questions or Need Support?</h2>
            <p>Fill out the form below and our team will get back to you quickly with helpful answers and guidance.</p>
          </div>

          <form 
            class="contact-form" 
            preventdefault:submit
            onSubmit$={handleSubmit}
          >
            <div class="input-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Name" 
                value={formData.name}
                onInput$={(e) => (formData.name = (e.target as HTMLInputElement).value)}
              />
            </div>

            <div class="input-group">
              <label for="surname">Surname</label>
              <input 
                type="text" 
                id="surname" 
                placeholder="Surname" 
                value={formData.surname}
                onInput$={(e) => (formData.surname = (e.target as HTMLInputElement).value)}
              />
            </div>

            <div class="input-group">
              <label for="mail">Mail</label>
              <input 
                type="email" 
                id="mail" 
                placeholder="Mail" 
                value={formData.email}
                onInput$={(e) => (formData.email = (e.target as HTMLInputElement).value)}
              />
            </div>

            <div class="input-group">
              <label for="subject">Subject</label>
              <select 
                id="subject" 
                class="custom-select"
                value={formData.subject}
                onChange$={(e) => (formData.subject = (e.target as HTMLSelectElement).value)}
              >
                <option value="" disabled selected={!formData.subject}>Select Subject</option>
                <option value="payment">Payment Operations</option>
                <option value="technical">Technical Support</option>
                <option value="general">General Inquiry</option>
                <option value="feature">Feature Request</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>

            <div class="input-group full">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                placeholder="Message"
                value={formData.message}
                onInput$={(e) => (formData.message = (e.target as HTMLTextAreaElement).value)}
              ></textarea>
            </div>

            {status.value.type && (
              <div class={`status-message ${status.value.type}`}>
                {status.value.message}
              </div>
            )}

            <button type="submit" class="send-btn" disabled={isLoading.value}>
              {isLoading.value ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});
