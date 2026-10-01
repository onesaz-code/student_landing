/**
 * Home page copy (everything except the hero and the product tour).
 * Product, feature and solution names come from names.ts so they stay identical everywhere.
 */
import { FEATURES, PRODUCTS, SOLUTIONS, productBySlug, type ProductSlug } from './names'

const name = (slug: ProductSlug) => productBySlug(slug)!.name
const short = (slug: ProductSlug) => productBySlug(slug)!.short

/* ── Clients ─────────────────────────────────────────────── */

/** Tenant logos on S3 (`logos/{slug}_mini.png`). */
const S3 = (file: string) => `https://onesaz-new.s3.ap-south-1.amazonaws.com/logos/${file}_mini.png`

/**
 * Every ONESAZ client (tenant subdomains on onesaz.com; demo, test and the main site left out).
 * Clients whose original high-resolution logo is already in public/images use that file.
 * Left out as duplicates: sr / sreducation (same logo as SR Ekluvya) and wethink (file shows the ONESAZ mark).
 */
export const CLIENTS = [
  { name: 'Trinity', logo: S3('trinity') },
  { name: 'Bhashyam Educational Institutions', logo: '/images/9eb39e2401b690179d4aeb5a695cd365c5806939-B1HGUPBB.png' },
  { name: 'Bhashyam Medex', logo: '/images/829e4a90576f0a5e5aca38c261ed0f9619160e2c-H01NUPi9.png' },
  { name: 'Sri Abhida KP', logo: S3('sriabhidakp') },
  { name: 'MIITY, powered by IITians', logo: '/images/5e11a78fc96223a1b49bac8302827a23aff36624-CKRNAiq9.png' },
  { name: 'VIIT JEE', logo: S3('viitjee') },
  { name: 'Vinners', logo: S3('vinners') },
  { name: 'Sri Abhida', logo: S3('sriabhida') },
  { name: 'Tirumala', logo: S3('tirumala') },
  { name: 'Medicon', logo: S3('medicon') },
  { name: 'Impulse', logo: S3('impulse') },
  { name: 'Sandeepani', logo: S3('sandeepani') },
  { name: 'AIAT', logo: S3('aiat') },
  { name: 'Valley Oak', logo: S3('valleyoak') },
  { name: 'SCJC', logo: S3('scjc') },
  { name: 'PJC MNCL', logo: S3('pjcmncl') },
  { name: 'Agastya IIT-JEE Academy', logo: '/images/7c05ad389050b250977a51b2da7a634b1c0046eb-CqC1mqbQ.png' },
  { name: 'Edify', logo: S3('edify') },
  { name: 'Ligade Patil', logo: S3('ligadepatil') },
  { name: 'Turito', logo: '/images/523cc89e09841093d8d0e4f1bc2aeb26dba9f7e3-9UEntu-E.png' },
  { name: 'Ybrant', logo: S3('ybrant') },
  { name: 'Pine Grove', logo: S3('pinegrove') },
  { name: 'Neutrino Academy', logo: S3('neutrinoacademy') },
  { name: 'Vijna', logo: S3('vijna') },
  { name: 'Ayati', logo: S3('ayati') },
  { name: 'Sundar', logo: S3('sundar') },
  { name: 'Cognizant', logo: S3('cognizant') },
  { name: 'Metamind', logo: S3('metamind') },
  { name: 'Motion', logo: S3('motion') },
  { name: 'Excellencia', logo: S3('excellencia') },
  { name: 'KLE', logo: S3('kle') },
  { name: 'Arastu', logo: S3('arastu') },
  { name: 'SGIMA', logo: S3('sgima') },
  { name: 'Unacademy', logo: S3('unacademy') },
  { name: 'Adhyapak', logo: S3('adhyapak') },
  { name: "Alva's", logo: S3('alvas') },
  { name: 'Plasma', logo: S3('plasma') },
  { name: 'Pragyan', logo: S3('pragyan') },
  { name: 'Roots Global', logo: S3('rootsglobal') },
  { name: 'Spectrum', logo: S3('spectrum') },
  { name: 'Velammal', logo: S3('velammal') },
  { name: 'Ignite School', logo: S3('igniteschool') },
  { name: 'Montessori', logo: S3('montessori') },
  { name: 'SR Ekluvya', logo: '/images/5d2e2c50eda75af419a91341a59e351936135bc7-CyaB5-Y7.png' },
  { name: 'Harvest', logo: S3('harvest') },
  { name: 'Harshini', logo: S3('harshini') },
  { name: 'MedJEE', logo: S3('medjee') },
  { name: 'Amrita Vidyalayam', logo: S3('amritavidyalayam') },
  { name: 'Pushpalata', logo: S3('pushpalata') },
  { name: 'Vision', logo: S3('vision') },
  { name: 'Dr. B.R. Ambedkar Junior College', logo: S3('brambedkarjc') },
  { name: 'Oxford Junior College', logo: S3('oxfordjc') },
  { name: 'KLP', logo: S3('klp') },
  { name: 'Mahathi', logo: S3('mahathi') },
  { name: 'SMGJC', logo: S3('smgjc') },
  { name: 'Dhanik Bharat', logo: S3('dhanikbharat') },
  { name: 'Quantum', logo: S3('quantum') },
  { name: 'KIMS', logo: S3('kims') },
  { name: 'MedJEE Edu', logo: S3('medjeeedu') },
  { name: 'Sri Prakash Junior College', logo: S3('sriprakashjrcollege') },
  { name: 'Greatway School', logo: S3('greatwayschool') },
  { name: 'Sri Chaitanya', logo: S3('srichaithanya') },
  { name: 'BIGI', logo: S3('bigi') },
  { name: 'Vignan', logo: S3('vignan') },
]

/* ── Why ONESAZ is different ─────────────────────────────── */

/** The ten jobs institutions usually buy from ten vendors. Keys map to icons in the section. */
export const SEPARATE_TOOLS = [
  { key: 'learning', label: 'Learning app' },
  { key: 'exams', label: 'Online exams' },
  { key: 'omr', label: 'OMR scanning' },
  { key: 'qbank', label: 'Question bank' },
  { key: 'devices', label: 'Device management' },
  { key: 'video', label: 'Video calling' },
  { key: 'sms', label: 'SMS & WhatsApp' },
  { key: 'fees', label: 'Fees & ERP' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'ai', label: 'AI calling' },
] as const

export const WITHOUT_ONESAZ = ['10 logins for your staff', '10 bills and 10 contracts', 'Student data copied between systems']
export const WITH_ONESAZ = ['1 login for everyone', '1 bill, 1 contract, 1 support team', '1 shared student record']

/* ── Our products (six product families) ─────────────────── */

export interface ProductFamily {
  code: string
  who: string
  name: string
  color: string
  tint: string
  desc: string
  features: string[]
  cta: string
  slug: ProductSlug
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    code: 'LMS',
    who: 'TEACHERS · STUDENTS',
    name: name('lms'),
    color: '#2447D1',
    tint: '#EEF2FD',
    slug: 'lms',
    cta: 'Explore LMS',
    desc: 'Everything teaching and learning needs, from course content to assignments and progress.',
    features: [
      'Courses, lessons and learning content',
      'Video, notes and worksheet library',
      'Assignments with online submission',
      'Gradebook and report cards',
      'Class and batch timetables',
      'Lessons delivered to class tablets',
    ],
  },
  {
    code: 'ERP',
    who: 'ADMIN · MANAGEMENT',
    name: name('erp'),
    color: '#1F7A4F',
    tint: '#E9F6EF',
    slug: 'erp',
    cta: 'Explore ERP',
    desc: 'The administration that keeps an institution running, in one connected system.',
    features: [
      'Enquiries and admissions',
      'Attendance for classes and batches',
      'Fees, dues and online payment',
      'Staff records and payroll',
      'Hostel, transport and visitors',
      'Multi-campus administration',
    ],
  },
  {
    code: 'EXAMS',
    who: 'TEACHERS · EXAM CELL',
    name: name('omr-scanning'),
    color: '#B42318',
    tint: '#FDEFEC',
    slug: 'omr-scanning',
    cta: 'Explore OMR Scanning',
    desc: 'Every kind of test, online or on paper, with results the same day.',
    features: [
      'Online exams, including offline mode',
      'OMR sheet scanning',
      'Question bank and paper builder',
      'AI grading of written answers',
      'Ranks, analysis and progress reports',
      'Results sent straight to parents',
    ],
  },
  {
    code: 'MDM',
    who: 'IT · ADMINISTRATORS',
    name: name('mdm'),
    color: '#9A6400',
    tint: '#FBF3E4',
    slug: 'mdm',
    cta: 'Explore MDM',
    desc: 'Institution-owned tablets and phones, set up for learning and managed centrally.',
    features: [
      'QR-based device enrolment',
      'Kiosk mode for learning',
      'App catalogue and remote installs',
      'Exam mode lockdown',
      'Remote lock, ring, message and restart',
      'Live device status and battery',
    ],
  },
  {
    code: 'CONNECT',
    who: 'PARENTS · STUDENTS',
    name: 'Communication',
    color: '#0E7490',
    tint: '#E6F6FA',
    slug: 'video-calling',
    cta: 'Explore Video Calling',
    desc: 'Reach parents and students without paying a different vendor for every channel.',
    features: [
      'Direct video calls to parents and students',
      'SMS, WhatsApp and app alerts',
      'Parent and student apps',
      'Absence and result alerts',
      'Announcements and circulars',
      'Two-way messaging',
    ],
  },
  {
    code: 'AI',
    who: 'BUILT IN',
    name: 'ONESAZ AI',
    color: '#6A4BD8',
    tint: '#F1ECFD',
    slug: 'ai-calling-agent',
    cta: 'Explore AI Calling Agent',
    desc: 'AI features working inside the platform, not sold as another add-on.',
    features: [
      'AI calls for enquiries and dues',
      'Grading of descriptive answers',
      'Question generation by topic',
      'Personalised practice for students',
      'Insights on who is falling behind',
      'Works across every module',
    ],
  },
]

/* ── Inside the platform (module ring) ───────────────────── */

export type ModuleGroup = 'LMS' | 'Exams' | 'ERP' | 'MDM' | 'Connect' | 'AI'

export const GROUP_COLORS: Record<ModuleGroup, string> = {
  LMS: '#2447D1',
  ERP: '#1F9D63',
  MDM: '#E0A030',
  Exams: '#D1453B',
  Connect: '#0E9AB8',
  AI: '#7B5CE6',
}

export interface PlatformModule {
  key: string
  /** Full name: centre card and list. */
  name: string
  /** Ring label (tight space). */
  label: string
  group: ModuleGroup
  stat: string
  desc: string
}

/** Twelve modules around the ring, in the design's order. */
export const MODULES: PlatformModule[] = [
  {
    key: 'lms',
    name: name('lms'),
    label: short('lms'),
    group: 'LMS',
    stat: 'LMS',
    desc: 'Academics, assignments, tests, timetables, attendance, reports and student progress.',
  },
  {
    key: 'desc',
    name: name('descriptive-evaluation'),
    label: short('descriptive-evaluation'),
    group: 'Exams',
    stat: 'Beyond marks',
    desc: 'Structured evaluation of written answers, beyond marks alone.',
  },
  {
    key: 'omr',
    name: name('omr-scanning'),
    label: short('omr-scanning'),
    group: 'Exams',
    stat: 'Same-day results',
    desc: 'Scan OMR sheets, evaluate exams, process results and analyse performance.',
  },
  {
    key: 'qbank',
    name: name('question-bank'),
    label: short('question-bank'),
    group: 'Exams',
    stat: '10 lakh+ questions',
    desc: 'Create tests, assessments and practice sessions from over 10 lakh questions.',
  },
  {
    key: 'attendance',
    name: name('attendance'),
    label: short('attendance'),
    group: 'LMS',
    stat: 'Students and staff',
    desc: 'Manage student and staff attendance, with alerts to parents.',
  },
  {
    key: 'erp',
    name: name('erp'),
    label: short('erp'),
    group: 'ERP',
    stat: 'ERP',
    desc: 'Admissions, fees, finance, staff, transport, inventory, hostel and institutional operations.',
  },
  {
    key: 'payments',
    name: FEATURES.payments,
    label: FEATURES.payments,
    group: 'ERP',
    stat: 'Digital payments',
    desc: 'Collect fees online and track every payment in one place.',
  },
  {
    key: 'mdm',
    name: name('mdm'),
    label: short('mdm'),
    group: 'MDM',
    stat: 'MDM',
    desc: 'Secure and centrally manage institutional devices, apps and policies.',
  },
  {
    key: 'video',
    name: name('video-calling'),
    label: short('video-calling'),
    group: 'Connect',
    stat: 'Secure calls',
    desc: 'Connect institutions, students and parents securely by video.',
  },
  {
    key: 'sms',
    name: FEATURES.sms,
    label: FEATURES.sms,
    group: 'Connect',
    stat: 'Bulk messaging',
    desc: 'Send updates, reminders, results and announcements in bulk.',
  },
  {
    key: 'adaptive',
    name: FEATURES.adaptive,
    label: FEATURES.adaptive,
    group: 'AI',
    stat: 'Personalised practice',
    desc: 'Practice that adapts to each student’s performance.',
  },
  {
    key: 'ai-calling',
    name: name('ai-calling-agent'),
    label: short('ai-calling-agent'),
    group: 'AI',
    stat: 'Automated calls',
    desc: 'Automate student and parent communication with AI phone calls.',
  },
]

/* ── Solutions (by institution) ──────────────────────────── */

type SolutionId = (typeof SOLUTIONS)[number]['id']

export const SOLUTION_DETAILS: Record<SolutionId, { title: string; desc: string; points: string[]; products: ProductSlug[] }> = {
  schools: {
    title: 'Schools',
    desc: 'Run learning, administration and classroom tablets for every grade from one platform.',
    points: ['Class-wise learning and gradebooks', 'Admissions, attendance and fees', 'Tablets configured per class'],
    products: [
      'erp',
      'lms',
      'attendance',
      'omr-scanning',
      'mdm',
      'ai-calling-agent',
      'video-calling',
      'ai-tutor',
      'crm',
      'descriptive-evaluation',
      'question-bank',
    ],
  },
  colleges: {
    title: 'Colleges',
    desc: 'Run departments, courses, examinations and student services across your college.',
    points: ['Department and course management', 'Examinations and results', 'Admissions, fees and student records'],
    products: [
      'erp',
      'lms',
      'attendance',
      'omr-scanning',
      'descriptive-evaluation',
      'question-bank',
      'crm',
      'ai-calling-agent',
      'video-calling',
      'ai-tutor',
      'mdm',
    ],
  },
  'coaching-institutes': {
    title: 'Coaching Institutes',
    desc: 'Manage students, batches, learning operations and digital devices across centres.',
    points: ['Batch schedules and attendance', 'Tests and performance tracking', 'Learning tablets for every batch'],
    products: [
      'lms',
      'attendance',
      'omr-scanning',
      'question-bank',
      'ai-tutor',
      'mdm',
      'crm',
      'ai-calling-agent',
      'video-calling',
      'erp',
      'descriptive-evaluation',
    ],
  },
  'trusts-school-groups': {
    title: 'Trusts & School Groups',
    desc: 'Oversee multiple institutions with centralised operations and campus-level control.',
    points: ['One view across campuses', 'Shared policies and standards', 'Campus-level administration'],
    products: [
      'erp',
      'crm',
      'lms',
      'attendance',
      'omr-scanning',
      'mdm',
      'ai-calling-agent',
      'video-calling',
      'ai-tutor',
      'descriptive-evaluation',
      'question-bank',
    ],
  },
}

/* ── For every role ──────────────────────────────────────── */

export const ROLE_VIEWS = [
  {
    id: 'principal',
    label: 'Principal',
    greet: 'Principal view',
    title: 'Institution overview',
    tag: 'ALL CAMPUSES',
    kpis: [
      ['Attendance', 'Across every class'],
      ['Fees', 'Collection at a glance'],
      ['MDM', 'Fleet status'],
    ],
    items: [
      ['Term results ready for review', 'Academics', '#2447D1'],
      ['Fee reminders ready to send', 'Fees', '#E0A030'],
      ['Admissions awaiting approval', 'Admissions', '#1F9D63'],
      ['Staff meeting this afternoon', 'Calendar', '#98A2B3'],
    ],
  },
  {
    id: 'teacher',
    label: 'Teacher',
    greet: 'Teacher view',
    title: 'My classes today',
    tag: 'CLASS VIEW',
    kpis: [
      ['Timetable', 'Today’s classes'],
      ['Gradebook', 'Work to review'],
      ['Tablets', 'Class devices ready'],
    ],
    items: [
      ['Push today’s lesson to class tablets', 'Courses', '#2447D1'],
      ['Review submitted worksheets', 'Gradebook', '#E0A030'],
      ['Schedule the unit quiz', 'Assessments', '#1F9D63'],
      ['Take attendance', 'Attendance', '#98A2B3'],
    ],
  },
  {
    id: 'it',
    label: 'IT Administrator',
    greet: 'IT view',
    title: 'Device fleet',
    tag: 'DEVICES',
    kpis: [
      ['Online', 'Live device status'],
      ['Updates', 'Apps to roll out'],
      ['Policies', 'Rules in effect'],
    ],
    items: [
      ['App updates ready to roll out', 'Applications', '#E0A030'],
      ['Exam mode scheduled for Grade 10', 'Policies', '#2447D1'],
      ['Tablets offline for a while', 'MDM', '#98A2B3'],
      ['New tablets ready to enrol', 'Enrolment', '#1F9D63'],
    ],
  },
  {
    id: 'student',
    label: 'Student',
    greet: 'Student view',
    title: 'My learning',
    tag: 'STUDENT',
    kpis: [
      ['Lessons', 'Continue where you left off'],
      ['Assignments', 'What is due'],
      ['Results', 'Latest marks'],
    ],
    items: [
      ['Continue today’s science lesson', 'Courses', '#2447D1'],
      ['Lab report due this week', 'Assignment', '#E0A030'],
      ['Quiz result available', 'Result', '#1F9D63'],
      ['Library books to return', 'Library', '#98A2B3'],
    ],
  },
] as const

/* ── ONESAZ AI ───────────────────────────────────────────── */

export const AI_CARDS = [
  {
    key: 'calls',
    title: 'Calls parents',
    text: 'Handles admission enquiries and fee reminders by phone, at a volume your front desk cannot reach.',
    slug: 'ai-calling-agent',
  },
  {
    key: 'grades',
    title: 'Grades written answers',
    text: 'Reads descriptive answer papers and evaluates them, so long-answer exams stop delaying results.',
    slug: 'descriptive-evaluation',
  },
  {
    key: 'writes',
    title: 'Writes questions',
    text: 'Creates new questions by topic and difficulty when the question bank does not have what a teacher needs.',
    slug: 'question-bank',
  },
  {
    key: 'practice',
    title: 'Picks what to practise',
    text: 'Reads a student’s marks and builds their next quiz around the topics costing them the most.',
    slug: 'ai-tutor',
  },
] as const satisfies readonly {
  key: string
  title: string
  text: string
  slug: ProductSlug
}[]

/* ── How it works ────────────────────────────────────────── */

export const STEPS = [
  {
    n: '01',
    title: 'Consultation',
    text: 'We understand your institution, campuses and goals, and recommend the right products.',
  },
  {
    n: '02',
    title: 'Setup and data migration',
    text: 'Our team configures ONESAZ and brings in your students, staff and classes.',
  },
  {
    n: '03',
    title: 'Training and device rollout',
    text: 'We train your staff and enrol your institution’s tablets.',
  },
  {
    n: '04',
    title: 'Go live with support',
    text: 'Your institution goes live, and our support team stays with you.',
  },
]

/* ── Services ────────────────────────────────────────────── */

export const SERVICE_CARDS = [
  {
    n: '01',
    title: 'Implementation and setup',
    text: 'We configure ONESAZ around your campuses, classes, fee structures and academic calendar.',
  },
  {
    n: '02',
    title: 'Data migration',
    text: 'We move your existing student, staff and class records into ONESAZ.',
  },
  {
    n: '03',
    title: 'Staff and teacher training',
    text: 'Hands-on sessions for administrators, teachers and IT staff.',
  },
  {
    n: '04',
    title: 'Device rollout',
    text: 'We help enrol your institution-owned tablets and set up kiosk mode and policies.',
  },
  {
    n: '05',
    title: 'Ongoing support',
    text: 'A dedicated support team that stays with your institution after go-live.',
  },
  {
    n: '06',
    title: 'Custom configuration',
    text: 'Reports, workflows and settings adapted to how your institution works.',
  },
]

/* ── Resources & Tutorials ───────────────────────────────── */

export const TUTORIALS = [
  {
    cover: ['Settings Guide:', 'Organization & Admission Setup'],
    date: 'Nov 20, 2024',
    title: 'Configure settings in ONESAZ',
    text: 'Learn how to configure the Settings section in ONESAZ, including Organization Settings and Admission Settings.',
    href: 'https://youtu.be/aTQP5eip46o',
    art: 'settings',
  },
  {
    cover: ['Student App &', 'Parent Login Guide'],
    date: 'Nov 18, 2024',
    title: 'Exam analysis in the student and parent app',
    text: 'Discover how students and parents can view exams and detailed exam analysis through the ONESAZ app.',
    href: 'https://youtu.be/tybGsgFb3DM',
    art: 'app',
  },
  {
    cover: ['Create Test Papers', 'in ONESAZ'],
    date: 'Nov 15, 2024',
    title: 'How to create a test in ONESAZ',
    text: 'Step-by-step guide on creating tests in ONESAZ, from selecting classes to choosing questions from the question bank.',
    href: 'https://youtu.be/K4zNGrLcDU0',
    art: 'test',
  },
] as const

/* ── Testimonials ────────────────────────────────────────── */

export const TESTIMONIAL_VIDEO = {
  src: '/video-B5skbVmn.mp4',
  hook: 'Juggling separate tools for online exams, OMR scanning, question banks and more?',
}

/* ── FAQs ────────────────────────────────────────────────── */

export const FAQS = [
  {
    q: 'What is the all-in price?',
    a: 'Per student, per year, quoted once. Setup, migration, training and support are included. SMS and WhatsApp are billed at cost and shown separately, and you approve the rate before anything is sent.',
  },
  {
    q: 'How long until we are live?',
    a: 'Four to six weeks for most institutions. We migrate your student data, fee structures and staff records, so it does not land on your office staff as a spreadsheet task.',
  },
  {
    q: 'Do we have to buy all of it?',
    a: 'No. Start with what you need, and switch on the rest when you are ready. Pricing follows what you use.',
  },
  {
    q: 'What if we want to leave?',
    a: 'Your data is yours. Export everything (students, fees, marks, attendance) in a standard format, any time, at no cost.',
  },
  {
    q: 'Our staff are not very technical. Is that a problem?',
    a: 'Not at all. Most teachers use just two screens: attendance and marks. We train your team on site, and support answers in Telugu, Hindi and English during working hours.',
  },
  {
    q: 'Will parents actually use the app?',
    a: 'Parents get the same alerts on WhatsApp and SMS, so the app is optional. Nothing important depends on a parent downloading anything.',
  },
]

/* ── Book a demo ─────────────────────────────────────────── */

export const INSTITUTION_TYPES = ['School', 'College', 'Coaching institute', 'Trust or school group'] as const

/** Every product, for the "Interested in" checklist on the demo form. */
export const DEMO_PRODUCTS = PRODUCTS.map((p) => p.name)
