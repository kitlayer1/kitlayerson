import { component$ } from '@builder.io/qwik';
import { ContactForm } from '~/components/contact/contactForm';
import { HomeHeader } from '~/components/global/header/homeHeader';
import { Footer } from '~/components/global/footer/footer';

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
