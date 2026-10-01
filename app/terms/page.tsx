import { Metadata } from 'next';
import { LegalPage, LocaleLink } from '@/components/site/legal-page';

export const metadata: Metadata = {
  title: 'Freshman Terms of Use',
  description: 'Terms of Use for Freshman, a study app by People Who Code LLC',
};

const TermsOfUse = () => {
  return (
    <LegalPage title='Terms of Use' effectiveDate='October 1, 2026'>
      <p>Welcome to Freshman!</p>
      <p>
        These Terms of Use (“Terms”) are a legally binding agreement between you and People Who
        Code LLC d/b/a Freshman (“Freshman”, “we”, “us” and “our”). They govern your use of the
        Freshman apps for iPhone and Android, the Freshman desktop app, and our website at
        joinfreshman.com (together, the “Services”). Please also read our{' '}
        <LocaleLink href='/privacy'>Privacy Policy</LocaleLink>, which explains how we handle your
        personal information.
      </p>
      <p>
        By creating an account or using the Services, you agree to these Terms. If you do not
        agree, do not use the Services.
      </p>

      <h2>1. The Services</h2>
      <p>
        Freshman is an AI study tutor. It helps you plan your revision, learn from your own
        materials with text and voice tutoring, and practise with tests, mock exams, mind maps and
        study guides. Your plan and progress sync between your devices.
      </p>
      <p>
        We are always improving Freshman, so features may be added, changed or removed over time.
        Some features are only available on certain plans or devices. We do our best to keep the
        Services available, but we do not guarantee uninterrupted access, and the Services may be
        unavailable during maintenance, updates or outages.
      </p>

      <h2>2. Who can use Freshman</h2>
      <p>
        You must be at least 13 years old to use Freshman. If you are under 18, or under the age
        of majority where you live, you may only use Freshman with the permission of a parent or
        guardian who has read and agreed to these Terms on your behalf. In some countries the
        minimum age to consent to data processing is higher (up to 16 in parts of the European
        Union); where that applies, a parent or guardian must give that consent.
      </p>
      <p>
        If you are a parent or guardian allowing a teen to use Freshman, you are responsible for
        their use of the Services, including any purchases.
      </p>

      <h2>3. Your account</h2>
      <p>
        You need an account to use Freshman. You can sign in with your email address, using a
        one-time code we send you, or with Google or Apple. Please give accurate information and
        keep it up to date. You are responsible for activity on your account, so keep access to
        your email and sign-in methods secure, and tell us at{' '}
        <a href='mailto:team@joinfreshman.com'>team@joinfreshman.com</a> if you think someone has
        accessed your account without permission.
      </p>
      <p>
        You can delete your account at any time from your account settings in the app. Deleting
        your account permanently removes your data, as described in our{' '}
        <LocaleLink href='/privacy'>Privacy Policy</LocaleLink>, and does not cancel subscriptions
        bought through the App Store or Google Play.
      </p>

      <h2>4. Plans, payments and cancellation</h2>
      <h3>Plans</h3>
      <p>
        Freshman offers a Free plan and paid plans, currently called Pro and Max (“Subscriptions”).
        Paid plans unlock more subjects, uploads, tutoring time, tests and other features. The
        current features, limits and prices for each plan are shown on our pricing page and in the
        app at the time of purchase, and may vary by country and platform.
      </p>
      <p>
        Some features are described as “unlimited”. Unlimited features are subject to reasonable
        fair-use limits, as shown in the app and on our pricing page, so the Services stay fast
        and reliable for everyone.
      </p>
      <h3>Billing and automatic renewal</h3>
      <p>
        Subscriptions may be offered weekly (App Store and Google Play only), monthly or every
        3 months. When you buy a Subscription, you authorise us, or the App Store, Google Play or
        Stripe, to charge you the price shown at the start of each billing period.{' '}
        <strong>
          Your Subscription renews automatically at the end of each billing period until you
          cancel it.
        </strong>{' '}
        If you subscribed to a plan we no longer offer, such as an older yearly plan, it continues
        on its existing terms until you cancel it.
      </p>
      <p>
        We may change prices or plans. If we raise the price of your Subscription, we will tell you
        in advance, and the new price will apply from your next billing period after the notice.
        If you do not agree, you can cancel before then. Upgrades take effect immediately;
        downgrades take effect at your next billing date.
      </p>
      <h3>License keys</h3>
      <p>
        Your school or organisation may give you a license key that unlocks a paid plan for a set
        period. License keys are personal, cannot be resold, and may be withdrawn by the
        organisation or by us if they are misused.
      </p>
      <h3>Cancelling</h3>
      <p>
        You can cancel any time. When you cancel, you keep your paid features until the end of the
        billing period you have already paid for, and you are not charged again. How you cancel
        depends on where you subscribed:
      </p>
      <ul>
        <li>
          <strong>App Store:</strong> open the Settings app on your iPhone or iPad, tap your name,
          then Subscriptions, choose Freshman and tap Cancel Subscription.
        </li>
        <li>
          <strong>Google Play:</strong> open the Google Play Store app, tap your profile icon, then
          Payments &amp; subscriptions, then Subscriptions, choose Freshman and tap Cancel.
        </li>
        <li>
          <strong>Desktop or web (Stripe):</strong> open Billing in your account settings in the
          Freshman desktop app and manage your subscription in the Stripe billing portal.
        </li>
      </ul>
      <p>
        <strong>
          Deleting the app or your account does not automatically cancel a subscription bought
          through the App Store or Google Play.
        </strong>
      </p>
      <h3>Refunds</h3>
      <p>
        Payments are non-refundable, and we do not provide refunds or credits for partial billing
        periods, except where required by law. This does not affect any rights you have under the
        consumer laws of your country.
      </p>
      <p>
        Refunds for purchases made through the App Store or Google Play are handled by Apple or
        Google under their policies, and we cannot issue them ourselves. You can request one from{' '}
        <a href='https://support.apple.com/en-us/118223'>Apple</a> or{' '}
        <a href='https://support.google.com/googleplay?p=refundAWF'>Google Play</a>. If a payment
        is refunded or reversed, the paid features it covered end.
      </p>

      <h2>5. Your content</h2>
      <p>
        The Services let you upload study materials, write messages, speak to the tutor and create
        tests, notes and other content (“Your Content”). You keep all ownership rights in Your
        Content.
      </p>
      <p>
        You give Freshman a limited, worldwide, non-exclusive, royalty-free licence to host, store,
        copy, process and display Your Content only as needed to provide the Services to you,
        including sending it to the service providers described in our Privacy Policy. This
        licence ends when you delete Your Content or your account, except for copies in backups
        that are overwritten in the normal course.
      </p>
      <p>
        <strong>We do not use Your Content to train AI models.</strong>
      </p>
      <p>
        You are responsible for Your Content. You confirm that you have the rights needed to upload
        it and that our use of it as described in these Terms will not infringe anyone’s rights or
        break any law. You can delete Your Content in the app at any time.
      </p>

      <h2>6. AI-generated content</h2>
      <p>
        Freshman uses artificial intelligence to explain topics, answer questions, and create
        study plans, tests, mark schemes, summaries and other material (“AI Output”). AI is an
        evolving technology and AI Output can be incomplete, out of date or wrong.
      </p>
      <ul>
        <li>
          AI Output is for learning and revision. It does not replace your teachers, your course
          materials or official guidance from your exam board or institution.
        </li>
        <li>
          Readiness scores and marks given by Freshman are estimates and do not guarantee any
          exam result.
        </li>
        <li>Check important information against reliable sources.</li>
      </ul>
      <p>
        If you see AI Output that is wrong or inappropriate, please tell us using in-app feedback
        or at <a href='mailto:team@joinfreshman.com'>team@joinfreshman.com</a>.
      </p>

      <h2>7. Academic integrity</h2>
      <p>
        Freshman is built to help you learn. You are responsible for following the rules of your
        school, university and exam board. Do not use Freshman to cheat, for example to get help
        during an exam or assessment where that is not allowed, or to submit AI Output as your own
        work where that is prohibited.
      </p>

      <h2>8. Acceptable use</h2>
      <p>When using the Services, you agree not to:</p>
      <ul>
        <li>
          upload or create content that is illegal, violent, sexually explicit, hateful, harassing
          or otherwise harmful;
        </li>
        <li>upload content you do not have the right to use;</li>
        <li>
          try to get around plan limits, fair-use limits or security measures, or access other
          people’s accounts or data;
        </li>
        <li>
          use bots, scrapers or automated means to access the Services, or overload or disrupt
          them;
        </li>
        <li>
          copy, sell, resell or commercially exploit the Services, or share your account or
          Subscription with others;
        </li>
        <li>
          reverse engineer, decompile, disassemble or try to extract the source code or AI models
          behind the Services, except where the law allows; or
        </li>
        <li>use the Services in a way that breaks any law or these Terms.</li>
      </ul>
      <p>
        We may review, remove or restrict content and accounts where we reasonably believe these
        Terms have been broken, and we may cooperate with law enforcement where required. If you
        notice a violation, please contact us at{' '}
        <a href='mailto:team@joinfreshman.com'>team@joinfreshman.com</a>.
      </p>

      <h2>9. Freshman’s intellectual property</h2>
      <p>
        The Services, including our software, design, text, graphics, logos and trademarks, are
        owned by Freshman or its licensors and protected by intellectual property laws. Except for
        Your Content, all rights not expressly granted in these Terms are reserved.
      </p>
      <p>
        If you follow these Terms, we grant you a limited, personal, non-exclusive,
        non-transferable, revocable licence to install and use the Freshman apps on devices you own
        or control, and to use the Services for your own personal, non-commercial learning. You
        may use AI Output created for you for your own studies.
      </p>

      <h2>10. Desktop app and updates</h2>
      <p>
        The Freshman desktop app checks for and installs updates automatically so you always have
        the latest features and security fixes. Some updates may be required to keep using the
        Services.
      </p>

      <h2>11. Feedback</h2>
      <p>
        If you send us ideas, suggestions or feedback, we may use them without any obligation to
        you.
      </p>

      <h2>12. Copyright complaints</h2>
      <p>
        We respect intellectual property rights. If you believe content on the Services infringes
        your copyright, email us at{' '}
        <a href='mailto:team@joinfreshman.com'>team@joinfreshman.com</a> with details of the work,
        where the content appears and your contact information. We may terminate accounts that
        repeatedly infringe the rights of others.
      </p>

      <h2>13. Third-party services</h2>
      <p>
        The Services rely on and may link to third-party services, such as Apple, Google and
        Stripe. Your use of those services is governed by their own terms, and we are not
        responsible for them.
      </p>

      <h2>14. Disclaimer of warranties</h2>
      <p>
        THE SERVICES AND ALL AI OUTPUT ARE PROVIDED “AS IS” AND “AS AVAILABLE”, WITHOUT WARRANTIES
        OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL IMPLIED WARRANTIES,
        INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, QUIET ENJOYMENT AND
        NON-INFRINGEMENT. WE DO NOT PROMISE THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE OR
        SECURE, THAT AI OUTPUT WILL BE ACCURATE, OR THAT USING FRESHMAN WILL LEAD TO ANY PARTICULAR
        GRADE OR RESULT.
      </p>

      <h2>15. Limitation of liability</h2>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, FRESHMAN AND ITS SERVICE PROVIDERS WILL NOT BE
        LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, OR FOR
        ANY LOSS OF PROFITS, DATA, GOODWILL OR OPPORTUNITY, ARISING OUT OF OR RELATING TO THESE
        TERMS OR THE SERVICES.
      </p>
      <p>
        OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SERVICES WILL NOT EXCEED THE GREATER OF
        THE AMOUNT YOU PAID US FOR THE SERVICES IN THE 12 MONTHS BEFORE THE CLAIM AROSE OR ONE
        HUNDRED US DOLLARS ($100).
      </p>
      <p>
        Some jurisdictions do not allow certain disclaimers or limitations, so some of the above
        may not apply to you. Nothing in these Terms limits liability that cannot be limited by
        law.
      </p>

      <h2>16. Indemnification</h2>
      <p>
        To the extent permitted by law, you agree to indemnify and hold Freshman and its officers,
        employees and agents harmless from claims, losses and expenses (including reasonable legal
        fees) arising from Your Content, your misuse of the Services or your breach of these Terms.
      </p>

      <h2>17. Suspension and termination</h2>
      <p>
        You can stop using Freshman and delete your account at any time. We may suspend or end your
        access if you seriously or repeatedly break these Terms, if required by law, or if we stop
        offering the Services. Where reasonable, we will tell you in advance. Sections that by their nature should
        survive termination will continue to apply.
      </p>

      <h2>18. Governing law and dispute resolution</h2>
      <h3>Governing law</h3>
      <p>
        These Terms are governed by the Federal Arbitration Act and the laws of the State of
        Wyoming, without regard to its conflict of laws rules. Any dispute not subject to
        arbitration will be heard exclusively in the state and federal courts located in Cheyenne,
        Wyoming. If you live in the European Union or United Kingdom, you also benefit from the
        mandatory consumer protections of your country and may bring proceedings in your local
        courts.
      </p>
      <h3>Informal resolution</h3>
      <p>
        Before starting a formal dispute, please email us at{' '}
        <a href='mailto:team@joinfreshman.com'>team@joinfreshman.com</a> so we can try to resolve
        it informally within 30 days.
      </p>
      <h3>Arbitration</h3>
      <p>
        Except where prohibited by law, any dispute arising out of or relating to these Terms or
        the Services (“Dispute”) will be resolved by binding individual arbitration administered
        by the American Arbitration Association (“AAA”) under its Consumer Arbitration Rules.
        Hearings will take place in the county where you live unless we both agree otherwise. Fees
        are governed by the AAA rules. Either of us may instead bring a qualifying claim in small
        claims court, or seek injunctive relief to protect intellectual property rights.
      </p>
      <h3>Class action waiver</h3>
      <p>
        You and Freshman may bring claims against each other only individually and not as a
        plaintiff or class member in any class or representative proceeding. You and Freshman
        waive the right to a jury trial.
      </p>

      <h2>19. Apple App Store terms</h2>
      <p>If you downloaded Freshman from the Apple App Store, you also agree that:</p>
      <ul>
        <li>
          these Terms are between you and Freshman, not Apple, and Freshman, not Apple, is
          responsible for the app and its content;
        </li>
        <li>
          Apple has no obligation to provide maintenance or support for the app, and has no
          warranty obligations beyond refunding the purchase price where applicable;
        </li>
        <li>
          Apple is not responsible for any product liability, consumer protection or intellectual
          property claims relating to the app;
        </li>
        <li>
          you are not located in a country subject to a US Government embargo or on any US
          Government list of prohibited or restricted parties; and
        </li>
        <li>
          Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce
          them against you.
        </li>
      </ul>
      <p>
        If you downloaded Freshman from Google Play, Google Play’s terms of service also apply to
        your use of the app.
      </p>

      <h2>20. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. We will change the effective date above and,
        for material changes, notify you in the app or by email at least 15 days before they take
        effect. If you keep using the Services after the changes take effect, you accept the
        updated Terms. If you do not agree, you can stop using the Services and delete your
        account.
      </p>

      <h2>21. General</h2>
      <p>
        These Terms, together with our Privacy Policy, are the entire agreement between you and
        Freshman about the Services. If any part of these Terms is found unenforceable, the rest
        will still apply. Our failure to enforce a right is not a waiver of it. You may not transfer
        these Terms without our consent; we may transfer them as part of a merger, acquisition or
        sale of assets. We may send you notices by email or in the app.
      </p>

      <h2>22. Contact us</h2>
      <p>If you have questions about these Terms, contact us at:</p>
      <p>
        People Who Code LLC
        <br />
        447 Broadway, 10th Floor
        <br />
        New York, NY 10013, United States
        <br />
        Email: <a href='mailto:team@joinfreshman.com'>team@joinfreshman.com</a>
      </p>
    </LegalPage>
  );
};

export default TermsOfUse;
