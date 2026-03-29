import { component$ } from '@builder.io/qwik';
import { HomeHeader } from '~/components/global/header/homeHeader';
import { Footer } from '~/components/global/footer/footer';
import { ContactForm } from '~/components/contact/contactForm';

export default component$(() => {
  return (
    <>
      <HomeHeader />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
});
