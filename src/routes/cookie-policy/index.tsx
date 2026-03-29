import { component$, useStyles$ } from "@builder.io/qwik";
import { Footer } from "~/components/global/footer/footer";
import { HomeHeader } from "~/components/global/header/homeHeader";
import styles from "./index.css?inline";

export default component$(() => {
    useStyles$(styles);

    return (
        <>
            <HomeHeader />
            <div class="policy-container">
                <h1 class="policy-title">Cookie Policy</h1>

                <div class="policy-meta">
                    <span class="policy-meta-label">Last updated</span>
                    <span class="policy-meta-date">March 2026</span>
                </div>

                <div class="policy-content">
                    <h2 class="policy-section-title">1. Introduction</h2>
                    <p>
                        This Cookie Policy explains how Kitlayer (“Platform”, “Site”, “we”) uses cookies and similar tracking technologies. By using the Platform, you consent to this policy..
                    </p>

                    <h2 class="policy-section-title">2. What are cookies?</h2>
                    <p>
                        A cookie is a small data file sent by a website to your device (computer, tablet, phone). Cookies are used to enhance site functionality, improve user experience, and perform analytics.
                    </p>

                    <h2 class="policy-section-title">3. Types of Cookies We Use</h2>
                    <p>
                        1. Essential / Necessary Cookies:
                    </p>
                    <ul class="policy-list">
                        <li>Required for site operation and security</li>
                        <li>Example: Session management cookies</li>
                    </ul>

                    <p>
                        2. Performance & Analytics Cookies:
                    </p>
                    <ul class="policy-list">
                        <li>Track site traffic, user behavior, and performance</li>
                        <li>Example: Google Analytics</li>
                    </ul>

                    <p>
                        3. Functional Cookies:
                    </p>
                    <ul class="policy-list">
                        <li>Remember user preferences and personalize experience</li>
                        <li>Example: Language selection, theme settings </li>
                    </ul>

                    <p>
                        4. Advertising & Marketing Cookies:
                    </p>
                    <ul class="policy-list">
                        <li>Used to show targeted ads and measure campaigns</li>
                        <li>Example: Retargeting, Google AdSense</li>
                    </ul>

                    <h2 class="policy-section-title">4. Purposes of Cookies</h2>
                    <p>
                        Overall, cookies help us provide you with a better website by enabling us to monitor which pages, functions, and content you find useful and which you do not.
                    </p>

                    <ul class="policy-list">
                        <li>Improve site performance</li>
                        <li>Personalize user experience</li>
                        <li>Collect analytics and statistics</li>
                        <li>Optimize advertising and marketing campaigns</li>
                        <li>Ensure security measures</li>
                    </ul>

                    <h2 class="policy-section-title">5. Cookie Consent and Management</h2>

                    <ul class="policy-list">
                        <li>You will be asked to consent to cookies on your first visit</li>
                        <li>Necessary cookies may be used without consent, but other cookies require user approval</li>
                        <li>You can manage your cookie preferences via your browser settings or our cookie panel.</li>
                    </ul>

                    <h2 class="policy-section-title">6. Third-Party Cookies</h2>
                    <p>
                        The Platform may use cookies from third-party service providers, including:
                    </p>

                    <ul class="policy-list">
                        <li>Google Analytics</li>
                        <li>Google AdSense</li>
                        <li>Social media sharing buttons</li>
                    </ul>

                    <p>
                        Management and privacy of these cookies are controlled by the respective third-party providers.
                    </p>

                    <h2 class="policy-section-title">7. Disabling Cookies</h2>

                     <p>
                        You can disable cookies through your browser settings. However, if certain cookies are disabled:
                    </p>

                    <ul class="policy-list">
                        <li>Some site features may not work</li>
                        <li>User experience may be limited</li>
                    </ul>

                      <h2 class="policy-section-title">8. Changes</h2>

                     <p>
                        The Platform reserves the right to modify this Cookie Policy at any time without prior notice:
                    </p>

                    <ul class="policy-list">
                        <li>Updated policies become effective upon publication on the Site</li>
                        <li>It is the user’s responsibility to review periodically</li>
                    </ul>

                     <h2 class="policy-section-title">9. Contact</h2>
                    <p>
                     For any questions regarding this Policy, you may contact us via <a href="mailto:help@kitlayer.com">help@kitlayer.com</a>
                    </p>
                    
                </div>
            </div>
            <Footer />
        </>
    );
});
