export const mdmBrand = {
  company: 'Acadhub',
  brandWordmark: 'ACADHUB',
  productLine: 'Acadhub Mobile Device Management (MDM)',
  productLineShort: 'MDM',
  taglineOneStop: 'Secure, enroll, and govern student & staff Android fleets for schools and colleges.',
  siteOrigin: 'https://acadhub.com',
  signInUrl: 'https://onesaz.com/sign-in',
  emailSupport: 'info@acadhub.com',
  emailInfo: 'info@acadhub.com',
  phone: '+91 99123 40396',
  phoneTel: '+919912340396',
  addressLines: [
    'Suvarna Habitat, Jai Hind Gandhi Rd, Cyber Hills Colony,',
    'VIP Hills, Jaihind Enclave, Madhapur,',
    'Hyderabad, Telangana 500081',
  ] as string[],
  mapsQuery:
    'Suvarna+Habitat,+Jai+Hind+Gandhi+Rd,+Cyber+Hills+Colony,+VIP+Hills,+Jaihind+Enclave,+Madhapur,+Hyderabad,+Telangana+500081',
  footerBlurb:
    'MDM built for schools: control student tabs, apps, and Android devices from one console so classrooms stay focused and IT stays in charge.',
  social: {
    facebook: 'https://www.facebook.com/',
    twitter: 'https://x.com',
    linkedin: 'https://www.linkedin.com/company/onesaz',
    instagram: 'https://www.instagram.com',
  },
} as const;

export type MdmDocSection = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: boolean;
};

export type MdmLegalPage = {
  path: string;
  navLabel: string;
  documentTitle: string;
  sections: MdmDocSection[];
};

/** Site-wide footer column link: `to` = SPA route, `href` = in-page anchor on home */
export type FooterNavLink = { label: string; to?: string; href?: string };

/** Home `#id` targets shared by footer Product links and landing `<section id>` — change label/id here only */
export const mdmHomeAnchors = {
  security: { label: 'Security', id: 'security' },
  helpCenter: { label: 'Help Center', id: 'help' },
} as const;

export type FooterSectionConfig = {
  title: string;
  links: FooterNavLink[];
};

export const mdmFooterSections: FooterSectionConfig[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Solutions', href: '/#modules' },
      { label: 'Pricing', href: '/#pricing' },
      { label: mdmHomeAnchors.security.label, href: `/#${mdmHomeAnchors.security.id}` },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', href: '/#careers' },
      { label: 'Blog', href: '/#blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/#docs' },
      { label: mdmHomeAnchors.helpCenter.label, href: `/#${mdmHomeAnchors.helpCenter.id}` },
      { label: 'Case Studies', href: '/#cases' },
      { label: 'API', href: '/#api' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Service', to: '/terms-of-service' },
      { label: 'Cookie Policy', to: '/cookie-policy' },
      { label: 'GDPR', to: '/gdpr' },
    ],
  },
];

export const mdmFooterCopyrightLinks: FooterNavLink[] = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
  { label: 'GDPR', to: '/gdpr' },
];

export const mdmAboutSections: MdmDocSection[] = [
  {
    paragraphs: [
      `${mdmBrand.company} ${mdmBrand.productLineShort} is a device management platform built exclusively for institution-issued student Android tablets.`,
      'We exist because institutes distributing tablets to students have one real problem once that tablet leaves your hands, you have no idea what the student is doing on it. They\'re browsing YouTube instead of studying. Installing games. Exiting your exam portal mid-assessment. Using apps you never approved. Acadhub ends that completely.',
      "We don't manage staff laptops, faculty phones, school buses, or personal BYOD devices. That's intentional. Keeping scope focused means our tooling, telemetry, onboarding, and pricing stay aligned with the real complexity of running a student fleet not diluted across use cases that need different solutions.",
    ],
  },
  {
    title: 'What We Do (MDM)',
    bullets: [
      'We give institutes complete, daily-operational control over every student tablet in their fleet from the moment of enrollment to the moment a device is retired.',
      'Bulk and zero-touch style enrollment workflows (QR, tokens, group assignment) scoped to institutes and campuses.',
      'Policy design for kiosk, multi-app classrooms, signage, admissions counters, labs, buses, attendance tablets, loaner fleets, or staff mobiles.',
      'Security posture aligned to institute risk tolerance: PIN/password rules, app allowlists/blocklists, update controls, uninstall protection, wipe/lock, tamper/friction signals where supported by the platform/OS.',
      'Operational telemetry you need without noise: fleet inventory, compliance drift, diagnostics exports, rollout history.',
      `Location-assisted controls only where institutes enable geography features (routes, campuses, misuse signals) configured and explained in console.`,
      'Role-aware admin consoles and audit oriented logs suitable for delegated IT/helpdesk models.',
      'Integrations posture (directory, SSO/API patterns where offered) framed around provisioning and lifecycle not academic gradebooks.',
      'Training kits and enablement tuned to device stewards (IT coordinators, principals, procurement, lab leads).',
      'Packaged guidance for phased pilots (single grade → full school), refresh cycles, and spare-pool sizing.',
      'Support channels that understand provisioning failures, OEM nuances, kiosk edge cases, and education procurement timelines.',
      'Capacity planning cues for simultaneous exam seasons, onboarding weeks, parent device days.',
      'White abel friendly experiences when institutes want parent-facing nomenclature to match campus branding.',
      'Template policies for standardized district or multi-branch governance.',
      'Backup path recommendations for configuration exports and contingency planning.',
      'Continuous hardening Reviews as OS vendors ship new enrollment, privacy, and management primitives.',
      'Responsive technical assistance with clear SLAs proportional to contracted tier.',
    ],
  },
  {
    title: 'Our Commitment',
    bullets: [
      'User-first design',
      'Secure and scalable architecture',
      'Continuous innovation',
      'Timely support and training',
      'Compliance with data privacy laws',
      'Feedback-driven feature improvements',
      'Reliable uptime and fast performance',
      'Transparent pricing',
      'Inclusive and accessible solutions',
      'Community engagement',
      'Environmental responsibility',
      'Ethical business practices',
      'Long-term partnerships',
      'Global reach with local expertise',
      'Empowering educators and students',
    ],
  },
  {
    paragraphs: [
      'Vision: Every institution adopts shared devices confidently with policies, visibility, and support that mirror real campus operations.',
      'Mission: Deliver MDM ergonomics institutes can run daily: dependable enrollments, explainable telemetry, humane support.',
      'Core Values: Integrity, Excellence, Inclusion, Innovation, Empathy, Collaboration, Accountability, Sustainability, Customer Success, Diversity.',
      `Contact MDM inquiries, demos, and procurement: ${mdmBrand.emailInfo}.`,
    ],
  },
];

export const mdmContactSections: MdmDocSection[] = [
  {
    paragraphs: [
      `Reach the ${mdmBrand.productLine} team for pilots, quotations, rollout planning, SOC-style questionnaires, procurement paperwork, OEM compatibility checks, SLAs, and incident escalations.`,
    ],
  },
  {
    title: 'Corporate Office',
    paragraphs: [`${mdmBrand.addressLines.join(' ')}`],
  },
  {
    paragraphs: [`Email: ${mdmBrand.emailSupport}`],
  },
  {
    paragraphs: ['Our team is available Monday to Saturday, 9:00 AM – 6:00 PM IST.'],
  },
  {
    title: 'Other Ways to Reach Us',
    ordered: true,
    bullets: [
      'Support Portal: Submit tickets via our online support portal for faster resolution.',
      'Live Chat: Chat with our support team during business hours on our website.',
      'Social Media: Connect with us on LinkedIn, Twitter, and Facebook for updates and support.',
      'Feedback: Share your feedback or suggestions to help us improve.',
      `Partnerships: For business or partnership inquiries, email ${mdmBrand.emailSupport}.`,
      `Media: For press or media queries, contact ${mdmBrand.emailSupport}.`,
      `Careers: Interested in joining our team? Email ${mdmBrand.emailSupport}.`,
      'Workshops & Training: Request provisioning workshops or policy labs for institute IT staffs and academic sponsors.',
      "Emergency Support: For urgent issues, mark your email as 'URGENT' in the subject line.",
      'Location Map: Visit our website for a map and directions to our office.',
    ],
  },
];

/** Mirrors https://onesaz-new.s3.ap-south-1.amazonaws.com/PRIVACY_POLOCIY/privacypolicy.html */
export const mdmPrivacySections: MdmDocSection[] = [
  {
    paragraphs: [
      'Last updated May 23, 2026',
      `This privacy notice for Acadhub Edu Tech Pvt Lmtd ("Company," "we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:`,
    ],
  },
  {
    bullets: [
      'Engage with us in other related ways, including any sales, marketing, or events',
    ],
  },
  {
    paragraphs: [
      'Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at muraliiith@gmail.com.',
    ],
  },
  {
    title: 'Summary of Key Points',
    paragraphs: [
      'This summary provides key points from our privacy notice, but you can find out more details about any of these topics by using our table of contents below to find the section you are looking for.',
    ],
    bullets: [
      'What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with Acadhub Edu Tech Pvt Lmtd and the Services, the choices you make, and the products and features you use.',
      'Do we process any sensitive personal information? We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law.',
      'Do we receive any information from third parties? We do not receive any information from third parties.',
      'How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.',
      'In what situations and with which parties do we share personal information? We may share information in specific situations and with specific third parties.',
      'How do we keep your information safe? We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.',
      'What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.',
      'How do you exercise your rights? The easiest way to exercise your rights is by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.',
    ],
  },
  {
    title: 'Table of Contents',
    ordered: true,
    bullets: [
      'What Information Do We Collect?',
      'How Do We Process Your Information?',
      'When and With Whom Do We Share Your Personal Information?',
      'How Long Do We Keep Your Information?',
      'How Do We Keep Your Information Safe?',
      'What Are Your Privacy Rights?',
      'Controls for Do-Not-Track Features',
      'Do California Residents Have Specific Privacy Rights?',
      'Do We Make Updates to This Notice?',
      'How Can You Contact Us About This Notice?',
      'How Can You Review, Update, or Delete the Data We Collect From You?',
    ],
  },
  {
    title: '1. What Information Do We Collect?',
    paragraphs: [
      'In Short: We collect personal information that you provide to us.',
      'We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.',
      'Personal Information Provided by You. The personal information we collect may include the following:',
    ],
    bullets: ['Names', 'Phone numbers', 'Usernames', 'Passwords'],
  },
  {
    paragraphs: [
      'Sensitive Information. When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:',
    ],
    bullets: ['Student data'],
  },
  {
    paragraphs: [
      'Payment Data. We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by PayU. You may find their privacy notice here: https://payu.in/privacy-policy.',
    ],
  },
  {
    paragraphs: [
      'Application Data. If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:',
    ],
    bullets: [
      'Mobile Device Access. We may request access or permission to certain features from your mobile device, including your mobile device\'s camera, microphone, storage, and other features. If you wish to change our access or permissions, you may do so in your device\'s settings.',
      'Push Notifications. We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device\'s settings.',
    ],
  },
  {
    paragraphs: [
      'All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.',
    ],
  },
  {
    title: '2. How Do We Process Your Information?',
    paragraphs: [
      'In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.',
      'We process your personal information for a variety of reasons, depending on how you interact with our Services, including:',
    ],
    bullets: [
      'To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.',
      'To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.',
    ],
  },
  {
    title: '3. When and With Whom Do We Share Your Personal Information?',
    paragraphs: [
      'In Short: We may share information in specific situations described in this section and/or with the following third parties.',
      'We may need to share your personal information in the following situations:',
    ],
    bullets: [
      'Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.',
      'Location Data. We may collect precise and background location data from managed devices for attendance tracking, device compliance, security monitoring, asset management, and institution administrative purposes.',
      'Device Management Permissions. The application may request Device Administrator or Android Enterprise permissions to manage institutional devices, enforce security policies, configure applications, restrict unauthorized access, and support enterprise mobility management features.',
      'Installed Applications. The application may access installed application information to ensure compliance with organizational policies, app whitelisting/blacklisting, and device security monitoring.',
      'Device Information. We may collect device identifiers, operating system version, hardware model, IP address, Wi-Fi information, and security status for device administration and compliance purposes.',
      'Background Services. The application may run background or foreground services to maintain device management functionality, policy synchronization, notifications, remote commands, and security monitoring.',
      'Remote Device Management. Authorized administrators may remotely manage managed devices, including applying security configurations, locking devices, wiping institutional data, installing required applications, or enforcing compliance policies.',
      'Enterprise / Educational Use. This application is intended for institutional, educational, or enterprise device management purposes and may be deployed on organization-managed devices.',
    ],
  },
  {
    title: '4. How Long Do We Keep Your Information?',
    paragraphs: [
      'In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.',
      'We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.',
      'When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible, then we will securely store your personal information and isolate it from any further processing until deletion is possible.',
    ],
  },
  {
    title: '5. How Do We Keep Your Information Safe?',
    paragraphs: [
      'In Short: We aim to protect your personal information through a system of organizational and technical security measures.',
      'We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.',
    ],
  },
  {
    title: '6. What Are Your Privacy Rights?',
    paragraphs: [
      'In Short: You may review, change, or terminate your account at any time.',
      'If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: https://ec.europa.eu/justice/data-protection/bodies/authorities/index%5Fen.htm.',
      'If you are located in Switzerland, the contact details for the data protection authorities are available here: https://www.edoeb.admin.ch/edoeb/en/home.html.',
      'Withdrawing your consent: If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time by contacting us using the contact details provided in the section "How Can You Contact Us About This Notice?" below. However, please note that this will not affect the lawfulness of the processing before its withdrawal.',
      'Account Information. If you would at any time like to review or change the information in your account or terminate your account, you can:',
    ],
    bullets: [
      'Contact us using the contact information provided.',
      'Log in to your account settings and update your user account.',
    ],
  },
  {
    paragraphs: [
      'Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.',
      'If you have questions or comments about your privacy rights, you may email us at muraliiith@gmail.com.',
    ],
  },
  {
    title: '7. Controls for Do-Not-Track Features',
    paragraphs: [
      'Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.',
    ],
  },
  {
    title: '8. Do California Residents Have Specific Privacy Rights?',
    paragraphs: [
      'In Short: Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.',
      'California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.',
      'If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely removed from all our systems (e.g., backups, etc.).',
    ],
  },
  {
    title: '9. Do We Make Updates to This Notice?',
    paragraphs: [
      'In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.',
      'We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.',
    ],
  },
  {
    title: '10. How Can You Contact Us About This Notice?',
    paragraphs: [
      'If you have questions or comments about this notice, you may email us at muraliiith@gmail.com or by post to:',
      'Suvarna Habitat, Jai Hind Gandhi Rd\nCyber Hills Colony, VIP Hills\nJaihind Enclave, Madhapur\nHyderabad, Telangana 500081',
    ],
  },
  {
    title: '11. How Can You Review, Update, or Delete the Data We Collect From You?',
    paragraphs: [
      'Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please submit a request by contacting us directly.',
    ],
  },
];

export const mdmTermsSections: MdmDocSection[] = [
  {
    paragraphs: [
      `These Terms of Service ("Terms") govern access to ${mdmBrand.productLine}, ${mdmBrand.siteOrigin}, consoles, downloadable tooling we supply to enroll devices, integrations, telemetry APIs, trainings, demos, quotations, Statements of Work, and ancillary professional services referencing these Terms.`,
    ],
  },
  {
    ordered: true,
    bullets: [
      `Parties: "${mdmBrand.company}" provides cloud MDM tooling; institutes, districts, resellers onboarding on their behalf ("Customer") subscribe under an order.`,
      `Service Description: zero-touch-ish enrollment scaffolding, kiosk/app governance tooling, remediation actions (lock/wipe when Customer authorizes), geofencing features when opted-in, inventories, ticketing hooks, dashboards, exports, education-first templates.`,
      'Eligibility & Authority: admins represent they can bind Customer, including consenting to device commands Customer issues via console.',
      'Accounts: Customer maintains role separation, revokes leavers promptly, secures MFA, avoids credential sharing; we may suspend accounts if compromise suspected.',
      'Subscriptions & Entitlements: usage measured per ordered device seats/branches; overages billed per commercial schedule; trials convert or sunset per quote.',
      'Billing & Taxes: fees exclusive unless stated; withholding taxes Customer responsibility; late fees per contract.',
      'Acceptable Use: no law violations, no attempts to bypass Android management frameworks, no reverse engineering except where law permits, no interference with other tenants, no mining crypto on our infra, no uploading malware-laced packages into support portals.',
      'Customer Content & Instructions: Customer owns policy catalogs, uploaded CSVs, branding; Customer instructs us to process them solely to deliver MDM.',
      'Device Commands: Customer acknowledges wipe/lock/reboot may erase user data; Customer obtains required consents from staff/parents/students per local law.',
      'Third-Party Dependencies: Google/Android/OEM behaviors outside our control; Customer accepts vendor release notes; we disclaim OEM-specific bugs beyond commercially reasonable triage.',
      'Service Levels: measured per executed SLA exhibit; maintenance windows announced; emergency patches may be unscheduled.',
      'Confidentiality: mutual NDA defaults for non-public documents exchanged during procurement unless superseded.',
      'IP: we retain platform IP; feedback may be used to improve services without royalty.',
      'Privacy: Customer institution often acts as controller for end-user data; we process as processor where applicable per DPA—see Privacy Policy.',
      'Warranty Disclaimer: services provided "as is" to maximum extent permitted; no guarantee of uninterrupted zero-defect operation across every OEM model.',
      'Limitation of Liability: neither party liable for indirect/consequential damages; aggregate cap equals fees paid in twelve months preceding claim unless statute forbids.',
      'Indemnity: Customer defends us against claims arising from Customer policies/content/instructions; we defend Customer against claims our platform core infringes third-party IP subject to process.',
      'Suspension/Termination: for material breach after cure period; we may suspend for nonpayment, legal demand, or severe security risk; data export windows per DPA.',
      'Governing Law: laws of India unless written order states otherwise.',
      'Dispute Resolution: arbitration per Arbitration and Conciliation Act, 1996; English language; seat Rajahmundry—aligned to Privacy Policy dispute clause unless Master Agreement specifies Hyderabad with written precedence.',
      'Force Majeure: neither party liable for delays from events beyond reasonable control.',
      'Assignment: Customer may not assign without consent except internal reorganizations; we may assign to affiliates or acquirers with notice.',
      'Entire Agreement: Terms + order + DPA + SLA supersede informal chats.',
      'Changes: we may update Terms; continued use after notice constitutes acceptance where permitted; material adverse changes allow termination per order.',
      `Contact: legal, commercial, and security inquiries—${mdmBrand.emailInfo}.`,
      `GDPR alignment: supplemental GDPR Addendum executes where EU/UK processing emerges; SCCs appended as needed.`,
    ],
  },
];

export const mdmRefundSections: MdmDocSection[] = [
  {
    paragraphs: [
      `Refund rules for ${mdmBrand.productLine} subscriptions, professional services, and device onboarding packages purchased directly from ${mdmBrand.company}.`,
    ],
  },
  {
    ordered: true,
    bullets: [
      '7-Day Refund Window: If you are not satisfied with our service, you may request a full refund within 7 days of the original purchase.',
      'After 7 Days: Refund requests made after 7 days will be evaluated on a case-by-case basis.',
      `Request Process: To request a refund, email ${mdmBrand.emailSupport} with your registered email and order reference.`,
      'Refund Timeframe: Approved refunds will be processed within 7–10 business days to the original payment method.',
      `Eligibility: Only payments made directly to ${mdmBrand.company} are eligible for refunds. Third-party purchases are not covered.`,
      'Partial Refunds: If MDM seats were partially deployed, proration may apply per commercial policy.',
      'Non-Refundable Items: OEM/Google pass-through fees (if any), bespoke integration labor already delivered, on-site MDM bootcamps completed, custom policy engineering beyond standard templates.',
      'Duplicate Payments: Any duplicate payments made in error will be fully refunded upon verification.',
      'Chargebacks: Initiating a chargeback without contacting support may result in account suspension.',
      'Refund Denial: Refunds may be denied if there is evidence of policy abuse, fraud, or violation of our terms of service.',
      'Service Disruption: Planned maintenance, carrier outages, OEM firmware regressions, or Android platform incidents are not automatic refund triggers—credits may be issued per SLA instead.',
      'Account Termination: If your account is terminated due to a breach of terms, you are not eligible for a refund.',
      'Refund Communication: All refund decisions will be communicated via email.',
      'Currency: Refunds will be processed in the original payment currency. Currency conversion charges, if any, are borne by the user.',
      `Policy Updates: ${mdmBrand.company} reserves the right to update this refund policy at any time. Users will be notified of major changes.`,
      `Contact: For any questions or clarifications regarding refunds, contact ${mdmBrand.emailSupport}.`,
    ],
  },
  {
    paragraphs: [
      `We aim to be fair and transparent with every user. For questions, contact ${mdmBrand.emailSupport}.`,
    ],
  },
];

export const mdmCancellationSections: MdmDocSection[] = [
  {
    paragraphs: [
      `Cancellation and wind-down mechanics for institute MDM deployments on ${mdmBrand.productLine}; your Master Agreement or order form takes precedence if clauses conflict.`,
    ],
  },
  {
    ordered: true,
    bullets: [
      'Refunds: Once paid, it will not be refunded.',
      'Cancellations: No cancellations are allowed.',
      `Contact: For any queries, contact our support team at ${mdmBrand.emailSupport}.`,
      'Subscription Plans: You may cancel your subscription at any time through your account settings.',
      'Advance Notice: Cancellations made within 7 days of payment may be eligible for a full or partial refund (see Refund Policy).',
      `Third-Party Fees: ${mdmBrand.company} is not responsible for cancellation fees or policies applied by third-party partners or payment gateways.`,
      `Cancellation Process: Submit a cancellation request via your dashboard or by emailing ${mdmBrand.emailSupport}.`,
      'Confirmation: You will receive a confirmation email once your cancellation is processed.',
      'Access Post-Cancellation: Access to services will continue until the end of the current billing cycle unless otherwise specified.',
      'Data Retention: Your data will be retained for 1 year post-cancellation unless you request deletion.',
      'Reactivation: Cancelled accounts can be reactivated within 30 days by contacting support.',
      'Non-Refundable Charges: Setup and training fees are non-refundable upon cancellation.',
      'Custom Agreements: Custom contracts may have separate cancellation terms.',
      'Partial Cancellations: branch-level MDM mothballing adjusts billing on next renewal; mid-cycle true-downs negotiated per amendment.',
      'Outstanding Dues: All outstanding dues must be cleared before cancellation is finalized.',
      `Policy Changes: ${mdmBrand.company} reserves the right to update this policy; users will be notified of major changes.`,
      'Feedback: We welcome feedback on your cancellation experience to help us improve.',
    ],
  },
];

export const mdmCookieSections: MdmDocSection[] = [
  {

    paragraphs: [
      `This Cookie Policy covers ${mdmBrand.siteOrigin}, ${mdmBrand.productLineShort} administrator sessions, authenticated API docs, sandbox consoles, and onboarding checklists tied to our MDM offerings.`,
      'Cookies help us recognize your device, remember preferences, keep sessions secure, measure site performance, and improve your experience.',
    ],
  },
  {
    title: 'Types of cookies',
    bullets: [
      'Strictly necessary cookies required for authentication, security, and core site functionality.',
      'Performance/analytics cookies to understand usage and fix issues.',
      'Functional cookies to remember choices such as language or region.',
    ],
  },
  {
    title: 'Your choices',
    paragraphs: [
      'You can control cookies through your browser settings. Blocking some cookies may limit certain features of the Services.',
      `Questions: ${mdmBrand.emailSupport}`,
    ],
  },
];

export const mdmGdprSections: MdmDocSection[] = [
  {
    paragraphs: [
      `${mdmBrand.productLine}: institutions typically act as controller for student/staff identifiers surfaced through MDM; ${mdmBrand.company} acts processor for categories defined in Annexes of your DPA.`,
      `Where EU/UK individuals exist, we honor Chapter III rights (access, rectification, erasure, restriction, portability, objection) within statutory windows—route requests through your administrator or ${mdmBrand.emailSupport} with proof of authority.`,
      `International transfers rely on SCCs 2021/914 or successor instruments; subprocessor list available under NDA; DPIA templates for classroom Android deployments available on request.`,
    ],
  },
];

/** Keys used by routed content pages */
export const mdmLegalPages: Record<
  string,
  Pick<MdmLegalPage, 'path' | 'navLabel' | 'documentTitle' | 'sections'>
> = {
  about: {
    path: '/about',
    navLabel: 'About Us',
    documentTitle: `About ${mdmBrand.company} ${mdmBrand.productLineShort}`,
    sections: mdmAboutSections,
  },
  contact: {
    path: '/contact',
    navLabel: 'Contact Us',
    documentTitle: 'Contact Us',
    sections: mdmContactSections,
  },
  privacy: {
    path: '/privacy-policy',
    navLabel: 'Privacy Policy',
    documentTitle: 'Privacy Notice',
    sections: mdmPrivacySections,
  },
  terms: {
    path: '/terms-of-service',
    navLabel: 'Terms of Service',
    documentTitle: 'Terms of Service',
    sections: mdmTermsSections,
  },
  refund: {
    path: '/refund-policy',
    navLabel: 'Refund Policy',
    sections: mdmRefundSections,
    documentTitle: `Refund Policy — ${mdmBrand.productLine}`,
  },
  cancellation: {
    path: '/cancellation-policy',
    navLabel: 'Cancellation Policy',
    documentTitle: `Cancellation Policy — ${mdmBrand.productLine}`,
    sections: mdmCancellationSections,
  },
  cookie: {
    path: '/cookie-policy',
    navLabel: 'Cookie Policy',
    documentTitle: 'Cookie Policy',
    sections: mdmCookieSections,
  },
  gdpr: {
    path: '/gdpr',
    navLabel: 'GDPR',
    documentTitle: 'GDPR (General Data Protection Regulation)',
    sections: mdmGdprSections,
  },
};
