import { component$ } from "@builder.io/qwik";
import { AboutSection } from "~/components/about/aboutSection/aboutSection";
import { Footer } from "~/components/global/footer/footer";
import { GlobalSelect } from "~/components/global/globalSelect/globalSelect";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { GlobalFuture } from "~/components/global/globalFuture/globalFuture";
import { GlobalHero } from "~/components/global/globalHero/globalHero";


export default component$(() => {
    return (
        <>
            <HomeHeader />
            <GlobalHero
                badgeText="About"
                title="BUILT TO HELP BRANDS STAND OUT"
                description="We help businesses create meaningful and memorable logos with ease, combining simplicity and creativity to build strong brand identities."
                buttonText="Get Started"
                bottomText="Trusted by thousands of users creating standout brand identities."
                image="/images/about/hero/aboutHero.jpg"
            />

            <AboutSection 
                cards={[
                    {
                        title: "FAQ'S",
                        description: "Find answers to common questions and learn how to get the most out of our logo design platform. Learn how to create and customize your logo and build a strong brand identity.",
                        buttonText: "Faq's",
                        link: "/faq"
                    },
                    {
                        title: "CONTACT US",
                        description: "Have questions or need help? Get in touch with our team and we’ll help you with your logo design journey, from creating your logo to customizing it and making it truly unique for your brand.",
                        buttonText: "Contact",
                        link: "/contact"
                    },
                    {
                        title: "BLOG",
                        description: "Explore expert tips, creative ideas, and practical insights about logo design, branding, and visual identity to help you build a strong and memorable brand that stands out.",
                        buttonText: "Blog",
                        link: "/blog"
                    }
                ]}
            />
            <GlobalFuture
                title="DEMOCRATIZING PROFESSIONAL BRAND DESIGN FOR ALL"
                description={[
                    "Our mission is to empower creative ideas to build their own brands without being held back by high budgets or traditional design barriers. We believe that every business, regardless of its industry or scale, deserves to be represented by a strong visual identity.",
                    "Transform your brand into a professional and memorable identity that stands out in every market. Build a strong presence that captures attention, creates trust, and leaves a lasting impression."
                ]}
                image="/images/about/future/mission/mission.jpg"
            />
            <GlobalFuture
                title="SHAPING THE DIGITAL BRANDING FUTURE TOGETHER"
                description={[
                    "Our vision is to become the leading global platform for next generation branding by seamlessly blending the power of technology with creativity. We don’t just digitalize the first step of an entrepreneur's journey; we lay the foundation for brands that leave a lasting mark.",
                    "By evolving our algorithms, we aim to deliver timeless logos that don't just follow trends, but set them transforming new ideas into iconic global brands.."
                ]}
                image="/images/about/future/vision/vision.jpg"
                reverse={true}
            />
            <GlobalSelect
                features={[
                    "100% FREE TO START",
                    "FULLY CUSTOMIZABLE",
                    "NO DESIGN SKILLS NEEDED",
                    "10+ LOGO FORMATS",
                    "8+ UNIQUE STYLES",
                    "INSTANT DOWNLOAD",
                    "HIGH-RES FILES INCLUDED",
                    "UNLIMITED REVISIONSD",
                ]}
                backgroundColor="var(--color-secondary-200)"
                textColor="var(--color-primary-900)"
            />

            <Footer />
        </>
    );
});