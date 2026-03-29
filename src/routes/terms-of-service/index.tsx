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
        <h1 class="policy-title">Terms of Service</h1>
        
        <div class="policy-meta">
          <span class="policy-meta-label">Last updated</span>
          <span class="policy-meta-date">March 2026</span>
        </div>

        <div class="policy-content">
          <h2 class="policy-section-title">1. Introduction and Acceptance</h2>
          <p>
           These Terms of Service (“Terms”) govern your access to and use of Kitlayer (“Platform”, “Site”, “we”) and all related services, including logo generation and digital design tools.
          </p>
            <p>
          By accessing the Platform, creating an account, or using any part of the services, you confirm that you have read, understood, and agree to be legally bound by these Terms. If you do not agree, you must not use the Platform.
          </p>
          
          <h2 class="policy-section-title">2. Scope of Services</h2>
         <p> The Platform provides tools that allow users to generate logos and digital content using automated systems, algorithms, and AI technologies based on user input.</p>
  
    <p> The Platform:</p>
                      <ul class="terms-list">
                        <li>Is not a design agency</li>
                        <li>Does not provide legal or branding advice</li>
                        <li>Does not guarantee accuracy or suitability of generated content</li>
                    </ul>

          <h2 class="policy-section-title">3. User Accounts and Responsibilities</h2>
           <p> Users agree to:</p>
                      <ul class="terms-list">
                        <li>Provide accurate and complete information</li>
                        <li>Maintain the confidentiality of account credentials</li>
                        <li>Be responsible for all activity under their account</li>
                    </ul>
                     <p> Users also agree not to:</p>
                      <ul class="terms-list">
                        <li>Upload unlawful or harmful content</li>
                        <li>Violate third-party rights</li>
                        <li>Misuse the Platform</li>
                    </ul>

                    <h2 class="policy-section-title">4. User Accounts and Responsibilities</h2>
           <p>All content generated or uploaded by users (“User Content”) remains the responsibility of the user.</p>
           <p>Users confirm that:</p>
                      <ul class="terms-list">
                        <li>They have the necessary rights to the content</li>
                        <li>They grant the Platform a limited license to process and display such content</li>
                    </ul>
                     <p>We reserve the right to remove or review content at our discretion.</p>

                        <h2 class="policy-section-title">5. User Accounts and Responsibilities</h2>
           <p>Generated content is produced automatically, and:</p>
                      <ul class="terms-list">
                        <li>We do not guarantee originality</li>
                        <li>Similar or identical logos may be generated for other users</li>
                        <li>We do not guarantee trademark eligibility</li>
                    </ul>
                     <p>Users are responsible for performing legal checks and assume all risks.</p>
                      

                      <h2 class="policy-section-title">6. User Accounts and Responsibilities</h2>
           <p>Certain features may require payment. Paid services:</p>
                      <ul class="terms-list">
                        <li>Will be clearly disclosed</li>
                        <li>May be non-refundable unless stated otherwise</li>
                    </ul>

                       <h2 class="policy-section-title">7. Disclaimer</h2>
           <p>All services are provided “as is” and “as available”</p>
           <p>The Platform does NOT guarantee:</p>
                      <ul class="terms-list">
                        <li>Originality, accuracy, or legal compliance</li>
                        <li>That logos will not conflict with existing trademarks</li>
                        <li>Suitability for commercial use</li>
                    </ul>
           <p>The Platform shall NOT be liable for:</p>
                      <ul class="terms-list">
                        <li>Copyright infringement</li>
                        <li>Trademark disputes</li>
                        <li>Financial loss</li>
                        <li>Data loss</li>
                        <li>Reputational damage</li>
                    </ul>

                      <h2 class="policy-section-title">8. Limitation of Liability</h2>
           <p>To the maximum extent permitted by law, the Platform shall not be liable for:</p>
                      <ul class="terms-list">
                        <li>Direct</li>
                        <li>Indirect</li>
                         <li>Incidental</li>
                        <li>Special</li>
                        <li>Consequential damages</li>
                    </ul>

                      <h2 class="policy-section-title">9. Indemnification</h2>
           <p>Users agree to indemnify and hold harmless the Platform from any:</p>
                      <ul class="terms-list">
                        <li>Claims</li>
                        <li>Damages</li>
                         <li>Expenses</li>
                    </ul>
                     <p>arising from their use of the service.</p>

                     <h2 class="policy-section-title">10. Service Changes</h2> 
                     <p>The Platform reserves the right, at its sole discretion and without prior notice, to:</p>
                      <ul class="terms-list">
                        <li>Modify the scope of services</li>
                        <li>Add new features or remove existing ones</li>
                         <li>Temporarily or permanently suspend services</li>
                        <li>Make changes to the technical infrastructure</li>
                    </ul>

                      <p>The Platform may also:</p>
                      <ul class="terms-list">
                        <li>Introduce paid features</li>
                        <li>Apply usage limits</li>
                         <li>Restrict or differentiate access among users</li>
                    </ul>

                       <p>The Platform shall not be liable for:</p>
                      <ul class="terms-list">
                        <li>Data loss</li>
                        <li>Service interruptions</li>
                         <li>Removal of features</li>
                    </ul>

                     <p>resulting from such changes.</p>


                     <h2 class="policy-section-title">11. Termination</h2>
            <p>The Platform may suspend or terminate user access at any time, without prior notice, in cases including but not limited to:</p>
                      <ul class="terms-list">
                        <li>Violation of these Terms</li>
                        <li>Unlawful use</li>
                         <li>Infringement of third-party rights</li>
                         <li>Misuse of the Platform or harm to systems</li>
                    </ul>

                       <p>Upon termination:</p>
                      <ul class="terms-list">
                        <li>Access to the Platform may be immediately revoked</li>
                        <li>User data may be deleted or restricted</li>
                         <li>User rights under these Terms may cease</li>
                    </ul>

                     <p>The Platform shall not be liable for any damages resulting from termination.</p>
                      
                      
                       <h2 class="policy-section-title">12. Updates</h2>
            <p>The Platform reserves the right to update or modify these Terms at any time at its sole discretion.</p>
                      <ul class="terms-list">
                        <li>Updated Terms become effective upon publication on the Site</li>
                        <li>No prior notice is required</li>
                         <li>Changes may not apply retroactively but are binding from the effective date</li>
                    </ul>

                    <p>User responsibility:</p>
                      <ul class="terms-list">
                        <li>To review the Terms periodically</li>
                        <li>To stay informed about updates</li>
                    </ul>

                     <p>Continued use of the Platform constitutes acceptance of the updated Terms.</p>
                      
                      
   
                       <h2 class="policy-section-title">13. Contact</h2>
                    <p>
                     For any questions regarding this Policy, you may contact us via <a href="mailto:help@kitlayer.com">help@kitlayer.com</a>
                    </p>
                      
        </div>
      </div>
      <Footer />
    </>
  );
});
