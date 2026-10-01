import { Metadata } from 'next';
import { LegalPage, LocaleLink } from '@/components/site/legal-page';

export const metadata: Metadata = {
  title: 'Freshman Privacy Policy',
  description: 'Privacy Policy for Freshman, a study app by People Who Code LLC',
};

const serviceProviders = [
  ['Supabase', 'Sign-in, database and file storage'],
  ['Fly.io', 'Hosting for our servers'],
  ['Trigger.dev', 'Background jobs, such as processing uploads and sending reminders'],
  ['Upstash', 'Rate limiting to protect the Services from abuse'],
  ['OpenAI', 'AI tutoring, study material generation and live voice sessions'],
  ['Deepgram', 'Speech-to-text for voice answers and dictation'],
  ['Resend', 'Sign-in codes, account emails and study reminders'],
  ['Mixpanel', 'Product analytics in the apps'],
  ['OneSignal', 'Push notifications'],
  ['RevenueCat', 'Managing App Store and Google Play subscriptions'],
  ['Stripe', 'Payments made on desktop or the web'],
  ['Simple Analytics', 'Cookie-free, privacy-friendly analytics for joinfreshman.com'],
];

const californiaCategories = [
  [
    'Identifiers',
    'Name, email address, account ID, IP address, push notification ID',
    'Hosting, sign-in, email, analytics and push providers',
  ],
  [
    'Commercial information',
    'Plan, billing period, subscription status and purchase history',
    'Payment and subscription providers',
  ],
  [
    'Internet or other electronic network activity',
    'How you use the apps and website, device and app information',
    'Hosting and analytics providers',
  ],
  [
    'Audio information',
    'Voice audio streamed live during voice sessions and dictation (not recorded)',
    'AI and speech-to-text providers',
  ],
  [
    'Education-related information',
    'Education level, exam system, subjects, exam dates, materials, test results and progress',
    'Hosting and AI providers',
  ],
  [
    'Inferences',
    'Study preferences, strengths and weak spots drawn from your activity',
    'Hosting and AI providers',
  ],
];

const PrivacyPolicy = () => {
  return (
    <LegalPage title='Privacy Policy' effectiveDate='October 1, 2026'>
      <p>
        This Privacy Policy explains how People Who Code LLC d/b/a Freshman (“Freshman”, “we”,
        “us” and “our”) collects, uses, shares and protects your personal information when you
        use Freshman, and the choices and rights you have.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>
          We collect what we need to run your tutor: your account details, study profile, the
          materials you upload and your study activity.
        </li>
        <li>We do not sell your personal information or use it for targeted advertising.</li>
        <li>We do not use your content to train AI models.</li>
        <li>Voice sessions are streamed live and are not recorded.</li>
        <li>You can delete your account and your data from the app at any time.</li>
      </ul>

      <h2>1. Scope</h2>
      <p>
        This Privacy Policy applies to the Freshman apps for iPhone and Android, the Freshman
        desktop app for macOS, Windows and Linux, and our website at joinfreshman.com (together,
        the “Services”). Your use of the Services is also governed by our{' '}
        <LocaleLink href='/terms'>Terms of Use</LocaleLink>.
      </p>

      <h2>2. Information we collect</h2>
      <h3>2.1 Information you give us</h3>
      <ul>
        <li>
          <strong>Account details:</strong> your email address, first name and, if you add one, a
          profile photo. If you sign in with Google or Apple, we receive your name and email
          address from them. Apple may give us a private relay email instead.
        </li>
        <li>
          <strong>Study profile:</strong> your education level, country, exam system, subjects,
          courses and topics, exam and deadline dates, language, timezone, learning preferences,
          tutor settings (such as name, voice and instructions) and how you heard about us.
        </li>
        <li>
          <strong>Study materials:</strong> files you upload, such as PDF, Word, PowerPoint and
          Markdown documents, and images on desktop, plus the text we extract from them.
        </li>
        <li>
          <strong>Tutor conversations and study activity:</strong> your messages to the tutor,
          your answers to tests and mock exams, and the study plans, guides, mind maps and session
          summaries created for you.
        </li>
        <li>
          <strong>Voice:</strong> when you use voice tutoring or dictation, audio from your
          microphone is sent in real time so it can be transcribed and answered. We do not keep
          recordings of your voice. We keep text transcripts and summaries of your sessions so
          the tutor can pick up where you left off.
        </li>
        <li>
          <strong>Purchases:</strong> your plan, billing period, subscription status and
          transaction identifiers from Apple, Google or Stripe. Payments are handled by those
          providers, and we never receive or store your full payment card details.
        </li>
        <li>
          <strong>Support and feedback:</strong> what you send us by email or in-app feedback,
          and the reason you give if you delete your account.
        </li>
        <li>
          <strong>License keys:</strong> if your school or organisation gives you a license key,
          we record that you redeemed it.
        </li>
      </ul>

      <h3>2.2 Information collected automatically</h3>
      <ul>
        <li>
          <strong>Usage data:</strong> which features you use, sessions, streaks and progress. In
          the apps we use Mixpanel for product analytics. During onboarding only, Mixpanel may
          record a session replay of the screens, with text and images masked.
        </li>
        <li>
          <strong>Device and technical data:</strong> device type, operating system, app version,
          language, timezone and IP address. We use your IP address for security and rate
          limiting.
        </li>
        <li>
          <strong>Push notifications:</strong> if you allow notifications, OneSignal gives your
          device a push identifier so we can send them.
        </li>
        <li>
          <strong>Website:</strong> joinfreshman.com uses Simple Analytics, which does not use
          cookies, collect personal data or track you across websites.
        </li>
        <li>
          <strong>Cookies and local storage:</strong> we only store what is needed to keep you
          signed in and remember your preferences. We do not use advertising cookies.
        </li>
      </ul>
      <p>
        We do not collect your precise location, your contacts or access to your camera.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>
          <strong>To provide the Services:</strong> building your study plan, tutoring you,
          generating tests and study materials, tracking your progress and syncing it across your
          devices.
        </li>
        <li>
          <strong>To communicate with you:</strong> sign-in codes, welcome and billing emails, and
          study reminders by email or push notification, which you can turn off.
        </li>
        <li>
          <strong>To process payments</strong> and manage your subscription.
        </li>
        <li>
          <strong>To keep the Services safe:</strong> preventing abuse and fraud, rate limiting
          and enforcing our Terms.
        </li>
        <li>
          <strong>To improve the Services:</strong> understanding how features are used, fixing
          bugs and measuring the quality and cost of AI responses.
        </li>
        <li>
          <strong>To meet legal obligations</strong> and respond to lawful requests.
        </li>
      </ul>

      <h3>3.1 AI and your content</h3>
      <p>
        To answer your questions and create study materials, we send the relevant parts of your
        materials, messages and voice audio to our AI providers: OpenAI for language and voice,
        and Deepgram for speech-to-text. They process this data on our behalf under API terms
        that do not allow them to use it to train their models. We do not use your content to
        train AI models, whether our own or anyone else’s.
      </p>
      <p>
        AI-generated content is created automatically from your materials and questions. It is
        not reviewed by a person before you see it.
      </p>

      <h2>4. How we share your information</h2>
      <p>
        We do not sell your personal information, and we do not share it for cross-context
        behavioural advertising.
      </p>
      <h3>4.1 Service providers</h3>
      <p>
        We share personal information with service providers that help us run the Services. They
        may only use it to provide services to us.
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>What they do for us</th>
          </tr>
        </thead>
        <tbody>
          {serviceProviders.map(([name, purpose]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>4.2 Other disclosures</h3>
      <ul>
        <li>
          <strong>Apple and Google:</strong> when you sign in with them or buy a subscription
          through the App Store or Google Play, they process that information under their own
          privacy policies:{' '}
          <a href='https://www.apple.com/legal/privacy/'>Apple Privacy Policy</a> and{' '}
          <a href='https://policies.google.com/privacy'>Google Privacy Policy</a>.
        </li>
        <li>
          <strong>At your direction:</strong> if you share a study guide or other file using your
          device’s share sheet, you choose who receives it.
        </li>
        <li>
          <strong>Legal and safety reasons:</strong> when we believe in good faith that it is
          required by law or legal process, or needed to protect the rights, property or safety
          of you, us or others.
        </li>
        <li>
          <strong>Business transfers:</strong> if we are involved in a merger, acquisition,
          financing, reorganisation or sale of assets, your information may be transferred as
          part of that transaction, subject to this Privacy Policy.
        </li>
      </ul>

      <h2>5. Your choices</h2>
      <ul>
        <li>
          <strong>Notifications and reminders:</strong> turn off push notifications and study
          reminder emails in the app settings or your device settings. We will still send
          essential emails, such as sign-in codes and billing notices.
        </li>
        <li>
          <strong>Microphone:</strong> you can deny or remove microphone access in your device
          settings. Text tutoring still works without it.
        </li>
        <li>
          <strong>Your materials:</strong> you can delete individual materials and subjects in the
          app.
        </li>
        <li>
          <strong>Delete your account:</strong> use Delete Account in your account settings on
          mobile or desktop. Deleting your account does not cancel an App Store or Google Play subscription, so
          please cancel it there first.
        </li>
      </ul>

      <h2>6. Your rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>access the personal information we hold about you;</li>
        <li>correct information that is inaccurate or incomplete;</li>
        <li>delete your personal information;</li>
        <li>receive a copy of your information in a portable format;</li>
        <li>restrict or object to certain processing;</li>
        <li>withdraw consent where we rely on it; and</li>
        <li>not be discriminated against for exercising these rights.</li>
      </ul>
      <p>
        To make a request, email us at{' '}
        <a href='mailto:team@joinfreshman.com'>team@joinfreshman.com</a> from the email address on
        your account. We may need to verify your identity, and we will respond within the time
        required by applicable law. You may also use an authorised agent where the law allows.
      </p>

      <h2>7. How long we keep your information</h2>
      <p>
        We keep your information for as long as your account is active. When you delete your
        account, we delete your account and profile, uploaded files, conversations and study
        data, and we ask RevenueCat to erase your subscriber record. We keep:
      </p>
      <ul>
        <li>
          the feedback you give when deleting your account (including your email, first name,
          country, plan and reason), so we can improve Freshman;
        </li>
        <li>usage and cost records for AI requests, with your account removed from them;</li>
        <li>billing and tax records we are required by law to keep; and</li>
        <li>
          copies in backups for a limited period until they are overwritten in the normal course.
        </li>
      </ul>

      <h2>8. Security</h2>
      <p>
        We protect your information with measures such as encryption in transit, access controls
        and, on desktop, encrypting your sign-in session on your device where your operating
        system supports it. Your materials are private to your account. No system is completely
        secure, so we cannot guarantee the security of your information.
      </p>

      <h2>9. International transfers</h2>
      <p>
        We are based in the United States, and our service providers may process your information
        in the United States and other countries whose data protection laws differ from yours.
        Where required, we rely on safeguards such as the European Commission’s Standard
        Contractual Clauses.
      </p>

      <h2>10. Children and teens</h2>
      <p>
        Freshman is not for children under 13, and we do not knowingly collect personal
        information from them. If we learn that a child under 13 has created an account, we will
        delete it.
      </p>
      <p>
        If you are between 13 and 17, you need permission from a parent or guardian to use
        Freshman. In some countries the age of digital consent is higher (up to 16 in parts of
        the European Union). Where that applies, a parent or guardian must give consent on your
        behalf.
      </p>
      <p>
        Parents and guardians can contact us at{' '}
        <a href='mailto:team@joinfreshman.com'>team@joinfreshman.com</a> to review or delete their
        child’s information.
      </p>

      <h2>11. Notice for California residents</h2>
      <p>
        This section applies to California residents under the California Consumer Privacy Act,
        as amended by the California Privacy Rights Act. In the past 12 months we have collected
        the categories of personal information below for the purposes described in Section 3, and
        disclosed them for business purposes to the categories of recipients shown.
      </p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Examples</th>
            <th>Disclosed to</th>
          </tr>
        </thead>
        <tbody>
          {californiaCategories.map(([category, examples, recipients]) => (
            <tr key={category}>
              <td>{category}</td>
              <td>{examples}</td>
              <td>{recipients}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        We do not sell or share personal information, including that of consumers under 16, and
        we do not use or disclose sensitive personal information for purposes that would require
        offering a right to limit. You can exercise your rights as described in Section 6.
      </p>

      <h2>12. Notice for residents of other US states</h2>
      <p>
        If you live in a state with a consumer privacy law, such as Virginia, Colorado,
        Connecticut, Utah or Texas, you may have rights similar to those in Section 6. We do not
        sell personal information, use it for targeted advertising, or use it for profiling that
        has legal or similarly significant effects. If we decline your request, you can appeal by
        replying to our response or emailing{' '}
        <a href='mailto:team@joinfreshman.com'>team@joinfreshman.com</a> with the subject
        “Privacy appeal”.
      </p>

      <h2>13. Notice for the EEA, UK and Switzerland</h2>
      <p>
        People Who Code LLC is the controller of your personal information. We process it on the
        following legal bases: to perform our contract with you (providing the Services); our
        legitimate interests (keeping the Services secure and improving them); your consent (for
        example, push notifications and microphone access); and to comply with legal obligations.
      </p>
      <p>
        You have the right to lodge a complaint with your local supervisory authority. You can
        find yours in the{' '}
        <a href='https://www.edpb.europa.eu/about-edpb/about-edpb/members_en'>
          list of EU data protection authorities
        </a>
        , or contact the{' '}
        <a href='https://ico.org.uk/make-a-complaint/'>Information Commissioner’s Office</a> in
        the UK.
      </p>

      <h2>14. Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will change the effective date
        above and, if the changes are material, let you know in the app or by email before they
        take effect.
      </p>

      <h2>15. Contact us</h2>
      <p>If you have questions about this Privacy Policy or your information, contact us at:</p>
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

export default PrivacyPolicy;
