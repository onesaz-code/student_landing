import type { ProductSlug } from './names'

/**
 * Product page copy for all 11 products (/products/:slug).
 * Product names, colours and short lines come from PRODUCTS in names.ts; this file holds the page text only.
 */

export type FeatureIcon =
  | 'Award'
  | 'BedDouble'
  | 'BellRing'
  | 'BookOpen'
  | 'Bus'
  | 'CalendarCheck'
  | 'CalendarClock'
  | 'CalendarX'
  | 'ChartColumn'
  | 'CircleHelp'
  | 'ClipboardCheck'
  | 'ClipboardList'
  | 'Clock'
  | 'Database'
  | 'Eye'
  | 'FileCheck2'
  | 'FileScan'
  | 'FileText'
  | 'Filter'
  | 'Highlighter'
  | 'History'
  | 'IndianRupee'
  | 'KeyRound'
  | 'Layers'
  | 'LayoutGrid'
  | 'LayoutTemplate'
  | 'Lightbulb'
  | 'Link2'
  | 'ListChecks'
  | 'Lock'
  | 'MapPin'
  | 'Megaphone'
  | 'MessageSquare'
  | 'Package'
  | 'PenLine'
  | 'PhoneCall'
  | 'Printer'
  | 'QrCode'
  | 'Radio'
  | 'RefreshCw'
  | 'Repeat'
  | 'Route'
  | 'ScanLine'
  | 'Send'
  | 'Share2'
  | 'ShieldCheck'
  | 'SlidersHorizontal'
  | 'TabletSmartphone'
  | 'Target'
  | 'TrendingUp'
  | 'Trophy'
  | 'UserCheck'
  | 'UserPlus'
  | 'Users'
  | 'Video'
  | 'Wallet'
  | 'Wand2'

export interface ProductContent {
  headline: string
  lead: string
  /** Three ticked points under the hero buttons. */
  highlights: string[]
  featuresTitle: string
  featuresLead: string
  features: { icon: FeatureIcon; title: string; text: string }[]
  stepsTitle: string
  steps: { title: string; text: string }[]
  audienceTitle: string
  audience: { role: string; points: string[] }[]
  worksWithLead: string
  /** Six related products, shown in "Works with the rest of ONESAZ". */
  related: ProductSlug[]
  faqs: { q: string; a: string }[]
  cta: { title: string; text: string }
}

export const PRODUCT_CONTENT: Record<ProductSlug, ProductContent> = {
  erp: {
    headline: 'Run your whole institution from one office.',
    lead: 'ONESAZ ERP handles admissions, fees, finance, staff, transport, inventory and hostel, with every record linked to the same student.',
    highlights: ['One record from admission onwards', 'Online fee payments built in', 'Reports for every branch'],
    featuresTitle: 'Every office task, in one ERP.',
    featuresLead: 'From the first enquiry to the final fee receipt.',
    features: [
      { icon: 'UserPlus', title: 'Admissions', text: 'Enquiries and applications become one student record, with documents attached.' },
      { icon: 'IndianRupee', title: 'Fee management', text: 'Fee plans, concessions, receipts and dues follow-up, with online payment.' },
      { icon: 'Wallet', title: 'Finance & accounts', text: 'Income, expenses and ledgers kept up to date as the office works.' },
      { icon: 'Users', title: 'Staff & payroll', text: 'Staff records, attendance, leave and salaries in one place.' },
      { icon: 'Bus', title: 'Transport', text: 'Routes, vehicles, stops and transport fees for every student.' },
      { icon: 'BedDouble', title: 'Hostel', text: 'Rooms, allocations and hostel fees, managed alongside everything else.' },
      { icon: 'Package', title: 'Inventory & assets', text: 'Track stock, purchases and institution assets across campuses.' },
      { icon: 'Award', title: 'Certificates', text: 'Transfer, bonafide and other certificates generated in a click.' },
      { icon: 'ChartColumn', title: 'Reports & dashboards', text: 'Collections, admissions and attendance by branch, class or date.' },
    ],
    stepsTitle: 'Set up once, then run every day.',
    steps: [
      { title: 'Set up', text: 'We configure your classes, fee plans, staff and campuses, and import your records.' },
      { title: 'Run', text: 'The office handles admissions, fees, staff and transport from one screen.' },
      { title: 'Review', text: 'Management sees collections, dues and admissions live, for every branch.' },
    ],
    audienceTitle: 'Built for everyone who runs the institution.',
    audience: [
      { role: 'Management', points: ['Collections and dues at a glance', 'Every branch in one view', 'Decisions backed by live data'] },
      { role: 'Principals', points: ['Attendance and staff overview', 'Admissions progress', 'Reports ready for reviews'] },
      {
        role: 'Office & accounts',
        points: ['Receipts and dues in a few clicks', 'No double entry between systems', 'Certificates without paperwork'],
      },
      { role: 'Parents', points: ['Pay fees online', 'Receipts on the app', 'Reminders before due dates'] },
    ],
    worksWithLead: 'The ERP holds the student record every other ONESAZ product uses, so the office never types the same thing twice.',
    related: ['crm', 'lms', 'ai-calling-agent', 'omr-scanning', 'video-calling', 'mdm'],
    faqs: [
      {
        q: 'Can we manage several branches in one ERP?',
        a: 'Yes. Each campus runs on its own, and management sees every branch together.',
      },
      {
        q: 'Can parents pay fees online?',
        a: 'Yes. Payment gateway integration lets parents pay online, and receipts are issued automatically.',
      },
      { q: 'Can we move our existing data into ONESAZ?', a: 'Yes. Our team imports your student, staff and fee records during setup.' },
      {
        q: 'Do we need the whole platform to use the ERP?',
        a: 'No. You can start with the ERP and add the LMS, exams and other products when you are ready.',
      },
    ],
    cta: {
      title: 'See ONESAZ ERP with your own fee structure.',
      text: 'Book a walkthrough and we’ll show it with a sample of your classes and fee plans.',
    },
  },
  lms: {
    headline: 'Run academics for every class, from one place.',
    lead: 'ONESAZ LMS brings lessons, assignments, tests, timetables, attendance, reports and student progress together, so teachers teach and everyone stays informed.',
    highlights: ['Web, tablet and mobile app', 'One login for every role', 'Connected to ERP and exams'],
    featuresTitle: 'Everything academics needs, in one LMS.',
    featuresLead: 'From the first lesson of the term to the final report card.',
    features: [
      { icon: 'BookOpen', title: 'Lessons & content', text: 'Videos, notes and worksheets organised by class, subject and unit.' },
      {
        icon: 'ClipboardList',
        title: 'Assignments & homework',
        text: 'Set, collect and check work online, with due-date reminders for students.',
      },
      {
        icon: 'FileCheck2',
        title: 'Online tests',
        text: 'Build tests from the 10 lakh+ Question Bank and get results the moment students submit.',
      },
      {
        icon: 'CalendarClock',
        title: 'Timetables',
        text: 'Class and teacher timetables in one place, with substitutions handled in minutes.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Attendance',
        text: 'Mark a class register in seconds. Parents are told about absences automatically.',
      },
      {
        icon: 'FileText',
        title: 'Reports & report cards',
        text: 'Gradebooks, report cards and progress reports generated from the marks you enter.',
      },
      {
        icon: 'TrendingUp',
        title: 'Student progress',
        text: 'Topic-wise performance shows who is ahead and who needs help, class by class.',
      },
      { icon: 'Users', title: 'Parent visibility', text: 'Parents see homework, marks and attendance in the ONESAZ mobile app.' },
      { icon: 'TabletSmartphone', title: 'Class tablets', text: 'Send lessons straight to tablets managed with ONESAZ MDM.' },
    ],
    stepsTitle: 'Plan, share and track, in three steps.',
    steps: [
      { title: 'Plan', text: 'Teachers build lessons or pick ready content, and attach worksheets and tests.' },
      { title: 'Share', text: 'One click sends the lesson to the class, on tablets, the web and the mobile app.' },
      { title: 'Track', text: 'See who watched, submitted and scored, and step in where students need help.' },
    ],
    audienceTitle: 'Built for everyone in the classroom, and at home.',
    audience: [
      {
        role: 'Teachers',
        points: ['Plan and share lessons in minutes', 'Check homework and tests faster', 'See who needs help, by topic'],
      },
      {
        role: 'Students',
        points: ['Today’s lessons and homework in one place', 'Practice tests with instant results', 'Track their own progress'],
      },
      {
        role: 'Parents',
        points: ['Homework, marks and attendance on the app', 'Absence alerts the same day', 'Report cards without paperwork'],
      },
      { role: 'Principals', points: ['Syllabus coverage across classes', 'Class and teacher performance', 'Reports ready for reviews'] },
    ],
    worksWithLead: 'The LMS shares one student record with every other ONESAZ product, so nothing is entered twice.',
    related: ['question-bank', 'ai-tutor', 'omr-scanning', 'erp', 'mdm', 'descriptive-evaluation'],
    faqs: [
      {
        q: 'Can teachers and students use the LMS on mobile?',
        a: 'Yes. The LMS works in the browser, on class tablets and in the ONESAZ mobile app for students, teachers and parents.',
      },
      {
        q: 'Can we bring in our existing student and class data?',
        a: 'Yes. Our team imports your student, staff and class records during setup, so you start with everything in place.',
      },
      {
        q: 'Can parents see their child’s progress?',
        a: 'Yes. Parents see homework, marks, attendance and report cards in the ONESAZ mobile app.',
      },
      {
        q: 'Do we need the whole ONESAZ platform to use the LMS?',
        a: 'No. You can start with the LMS and add ERP, exams, devices and other products whenever you are ready.',
      },
    ],
    cta: {
      title: 'See ONESAZ LMS with your own classes.',
      text: 'Book a 30-minute walkthrough. We’ll set it up with a sample of your timetable and subjects.',
    },
  },
  'omr-scanning': {
    headline: 'Paper or online exams, with results the same day.',
    lead: 'Scan OMR sheets, run online tests, evaluate automatically, and share ranks and analysis with parents the same day.',
    highlights: ['Same-day results', 'Online and OMR exams', 'Ranks and analysis included'],
    featuresTitle: 'Everything your exam cell needs.',
    featuresLead: 'From the question paper to the parent’s phone.',
    features: [
      { icon: 'LayoutTemplate', title: 'OMR sheet design', text: 'Create OMR sheets for your own exam patterns and roll numbers.' },
      { icon: 'ScanLine', title: 'OMR scanning', text: 'Scan answer sheets in batches and process them in minutes.' },
      { icon: 'ClipboardCheck', title: 'Automatic evaluation', text: 'Answers are checked against the key, with no manual counting.' },
      { icon: 'FileCheck2', title: 'Online tests', text: 'Run tests on tablets or phones, with timers and instant results.' },
      { icon: 'Trophy', title: 'Ranks & merit lists', text: 'Class, branch and overall ranks generated the moment results are in.' },
      { icon: 'ChartColumn', title: 'Detailed analysis', text: 'Topic, question and student analysis shows what to reteach.' },
      { icon: 'Send', title: 'Results to parents', text: 'Results go out on the app, SMS and WhatsApp the same day.' },
      { icon: 'Database', title: 'Question Bank tests', text: 'Build papers from 10 lakh+ questions in minutes.' },
      { icon: 'CalendarClock', title: 'Exam scheduling', text: 'Plan exam timetables and seating across classes and branches.' },
    ],
    stepsTitle: 'Create, conduct and publish, in three steps.',
    steps: [
      { title: 'Create', text: 'Build the paper from the Question Bank and print OMR sheets, or set it up online.' },
      { title: 'Conduct', text: 'Students write on paper or online. Paper sheets are scanned in batches.' },
      { title: 'Publish', text: 'Ranks and analysis are ready the same day and reach parents automatically.' },
    ],
    audienceTitle: 'Built for everyone involved in exams.',
    audience: [
      { role: 'Exam cell', points: ['Results in hours, not days', 'No manual counting', 'Branch-wide merit lists'] },
      { role: 'Teachers', points: ['Question-wise analysis', 'Know what to reteach', 'Papers built in minutes'] },
      { role: 'Students', points: ['Results the same day', 'See strong and weak topics', 'Practice where it matters'] },
      { role: 'Parents', points: ['Results on the app', 'Rank and progress over time', 'SMS and WhatsApp alerts'] },
    ],
    worksWithLead: 'Exam results flow into the LMS, report cards and parent app automatically.',
    related: ['question-bank', 'descriptive-evaluation', 'lms', 'ai-tutor', 'erp', 'mdm'],
    faqs: [
      {
        q: 'What do we need to scan OMR sheets?',
        a: 'A standard document scanner is usually enough. Our team helps you choose and set it up.',
      },
      {
        q: 'Can we use our own OMR sheet format?',
        a: 'Yes. Sheets can be designed for your exam pattern, number of questions and roll numbers.',
      },
      { q: 'Can we run online and paper exams together?', a: 'Yes. Both kinds of results come into the same ranks and analysis.' },
      { q: 'How do results reach parents?', a: 'Through the ONESAZ mobile app, SMS and WhatsApp, the same day results are published.' },
    ],
    cta: {
      title: 'See ONESAZ exams with your own question paper.',
      text: 'Bring a sample paper and we’ll show scanning, ranks and analysis end to end.',
    },
  },
  mdm: {
    headline: 'Keep every classroom tablet ready for learning.',
    lead: 'Enrol, configure, lock down and support institution-owned devices from one console, without collecting them.',
    highlights: ['Kiosk mode for class time', 'Apps pushed to every device', 'Remote lock for lost devices'],
    featuresTitle: 'Full control of every institution device.',
    featuresLead: 'From the first setup to the day a tablet goes missing.',
    features: [
      { icon: 'QrCode', title: 'QR enrolment', text: 'Scan a QR code to enrol a device and apply your settings automatically.' },
      { icon: 'LayoutGrid', title: 'App management', text: 'Install and update learning apps on a whole class at once.' },
      { icon: 'Lock', title: 'Kiosk mode', text: 'Lock devices to approved apps so class time stays focused.' },
      { icon: 'ShieldCheck', title: 'Policies', text: 'Control Wi-Fi, camera, settings and more with simple policies.' },
      { icon: 'ShieldCheck', title: 'Content restrictions', text: 'Block games, unsafe sites and apps that aren’t approved.' },
      { icon: 'Radio', title: 'Remote commands', text: 'Lock, ring or message any device without collecting it.' },
      { icon: 'TabletSmartphone', title: 'Device status', text: 'See battery, connection and last seen for every device.' },
      { icon: 'Layers', title: 'Bulk actions', text: 'Apply changes to a class, a batch or a whole campus at once.' },
      { icon: 'Lock', title: 'Lost device mode', text: 'Lock a missing device and show a return message on screen.' },
    ],
    stepsTitle: 'Enrol, configure and manage, in three steps.',
    steps: [
      { title: 'Enrol', text: 'Scan a QR code on each device, and it joins your institution’s console.' },
      { title: 'Configure', text: 'Push apps, set policies and turn on kiosk mode for each class.' },
      { title: 'Manage', text: 'Watch device status and act remotely when something goes wrong.' },
    ],
    audienceTitle: 'Built for everyone who uses or looks after devices.',
    audience: [
      { role: 'IT team', points: ['Every device in one console', 'Bulk changes in one step', 'No more collecting devices'] },
      { role: 'Teachers', points: ['Students stay on learning apps', 'Lessons arrive on every tablet', 'Fewer distractions in class'] },
      { role: 'Students', points: ['Ready-to-use tablets', 'Only the apps they need', 'Safe browsing'] },
      { role: 'Management', points: ['Devices protected and accounted for', 'Lost devices locked remotely', 'Usage across campuses'] },
    ],
    worksWithLead: 'MDM keeps the tablets that run the LMS, online exams and AI Tutor ready for class.',
    related: ['lms', 'omr-scanning', 'ai-tutor', 'question-bank', 'erp', 'video-calling'],
    faqs: [
      {
        q: 'Which devices does ONESAZ MDM support?',
        a: 'It is built for institution-owned tablets and phones. Tell us your devices and we’ll confirm during the demo.',
      },
      {
        q: 'Can students change the settings?',
        a: 'No. Policies and kiosk mode are set by your IT team and can’t be changed on the device.',
      },
      { q: 'What happens if a tablet is lost?', a: 'Lock it remotely and show a message asking for it to be returned to the IT desk.' },
      {
        q: 'Can we push apps to a whole class at once?',
        a: 'Yes. Install or update apps for a class, a batch or a whole campus in one step.',
      },
    ],
    cta: { title: 'See ONESAZ MDM with your own devices.', text: 'Book a walkthrough and we’ll enrol a sample tablet live.' },
  },
  'ai-calling-agent': {
    headline: 'An AI agent that calls parents for you.',
    lead: 'Automate fee reminders, admission follow-ups, absence calls and announcements with natural phone conversations.',
    highlights: ['Rings parents’ normal phone numbers', 'Summaries saved to the ERP', 'Works through the list on its own'],
    featuresTitle: 'Every follow-up call, handled.',
    featuresLead: 'The calls your office never has time to make.',
    features: [
      { icon: 'IndianRupee', title: 'Fee reminders', text: 'Polite reminders before and after due dates, with payment links.' },
      { icon: 'UserPlus', title: 'Admission follow-ups', text: 'Calls every enquiry back and books campus visits.' },
      { icon: 'PhoneCall', title: 'Absence calls', text: 'Parents hear about an absence the same morning.' },
      { icon: 'Megaphone', title: 'Announcements', text: 'Exam dates, holidays and events, told to every parent.' },
      { icon: 'MessageSquare', title: 'Natural conversation', text: 'Understands replies and answers common questions on the call.' },
      { icon: 'IndianRupee', title: 'Payment links', text: 'Sends a payment link on WhatsApp or SMS during the call.' },
      { icon: 'FileText', title: 'Call summaries', text: 'Every call is summarised with the outcome and next step.' },
      { icon: 'Repeat', title: 'Call-backs', text: 'Schedules a call back when a parent is busy.' },
      { icon: 'ChartColumn', title: 'Reports', text: 'See answered, promised and pending calls at a glance.' },
    ],
    stepsTitle: 'Choose, call and review, in three steps.',
    steps: [
      { title: 'Choose a list', text: 'Pick parents with fees due, new enquiries or today’s absences.' },
      { title: 'Let it call', text: 'The AI agent calls each parent and handles the conversation.' },
      { title: 'Review outcomes', text: 'Summaries and next steps are saved, and follow-ups are scheduled.' },
    ],
    audienceTitle: 'Built for the teams that talk to parents.',
    audience: [
      { role: 'Office staff', points: ['Hundreds of calls handled for you', 'Only tricky cases come back', 'More time for walk-ins'] },
      { role: 'Accounts', points: ['Fee dues followed up on time', 'Payment links sent on the call', 'Promises tracked to the date'] },
      { role: 'Admissions team', points: ['Every enquiry called back', 'Visits booked automatically', 'No lead forgotten'] },
      { role: 'Management', points: ['Call outcomes in one report', 'Dues and enquiries moving', 'Consistent, polite calls'] },
    ],
    worksWithLead: 'The AI agent reads fee dues, enquiries and attendance from ONESAZ and saves every outcome back.',
    related: ['erp', 'crm', 'lms', 'omr-scanning', 'video-calling', 'ai-tutor'],
    faqs: [
      { q: 'Do parents need to install anything?', a: 'No. The agent calls their normal phone number.' },
      {
        q: 'Which languages can it speak?',
        a: 'Tell us the languages your parents use and we’ll confirm what is available during the demo.',
      },
      { q: 'When does it make calls?', a: 'Only within the calling hours you set, so parents aren’t disturbed at odd times.' },
      { q: 'Can staff see what was said on each call?', a: 'Yes. Every call has a summary with the outcome and next step.' },
    ],
    cta: { title: 'Hear the ONESAZ AI agent call a parent.', text: 'Book a demo and we’ll run a sample fee reminder call for you.' },
  },
  'video-calling': {
    headline: 'Parents and students, face to face.',
    lead: 'Secure video calls between parents and students, and between families and the institution, right inside the ONESAZ app.',
    highlights: ['Inside the ONESAZ app', 'No phone numbers shared', 'You decide who can call, and when'],
    featuresTitle: 'Safe, simple video calling for families.',
    featuresLead: 'Built for hostels, residential campuses and busy parents.',
    features: [
      { icon: 'Video', title: 'Parent–student calls', text: 'Parents video call their child straight from the app.' },
      { icon: 'Video', title: 'Students call home', text: 'Students can call approved family members when allowed.' },
      { icon: 'Video', title: 'Teacher–parent calls', text: 'Hold parent-teacher meetings without a campus visit.' },
      { icon: 'CalendarClock', title: 'Calling hours', text: 'Set the times when calls are allowed for each group.' },
      { icon: 'ShieldCheck', title: 'Approved contacts only', text: 'Only registered parents and guardians can call.' },
      { icon: 'ShieldCheck', title: 'Private by design', text: 'No personal phone numbers are shared on either side.' },
      { icon: 'History', title: 'Call history', text: 'See who called whom and for how long.' },
      { icon: 'TabletSmartphone', title: 'Works on phones and tablets', text: 'Calls run on the ONESAZ app on any phone or class tablet.' },
      { icon: 'BellRing', title: 'Reminders', text: 'Notify parents when a scheduled call is about to start.' },
    ],
    stepsTitle: 'Set rules, call and review, in three steps.',
    steps: [
      { title: 'Set rules', text: 'Choose who can call, which contacts are approved and the calling hours.' },
      { title: 'Call', text: 'Parents and students call each other from the ONESAZ app.' },
      { title: 'Review', text: 'Call history helps wardens and staff keep everything on track.' },
    ],
    audienceTitle: 'Built for families and the staff who care for students.',
    audience: [
      { role: 'Parents', points: ['See their child, not just hear them', 'Call from the app they already use', 'No visits needed'] },
      { role: 'Students', points: ['Talk to family face to face', 'Feel closer to home', 'Calls at set times'] },
      { role: 'Wardens & staff', points: ['Approved contacts only', 'Calling hours enforced', 'Call history on record'] },
      { role: 'Management', points: ['Safe, private calls', 'Happier families', 'Fewer visit requests'] },
    ],
    worksWithLead: 'Video calls use the same parent and student accounts as the rest of ONESAZ.',
    related: ['lms', 'erp', 'mdm', 'ai-calling-agent', 'crm', 'ai-tutor'],
    faqs: [
      { q: 'Do parents need a separate app?', a: 'No. Calls happen inside the ONESAZ mobile app.' },
      { q: 'Can we limit when students take calls?', a: 'Yes. Set calling hours for each class, hostel or group.' },
      { q: 'Are phone numbers shared?', a: 'No. Neither side sees the other’s personal phone number.' },
      { q: 'Can students call from class tablets?', a: 'Yes, when you allow it, calls work on tablets as well as phones.' },
    ],
    cta: { title: 'See ONESAZ video calling in action.', text: 'Book a demo and we’ll set up a sample parent–student call.' },
  },
  'ai-tutor': {
    headline: 'A personal tutor for every student.',
    lead: 'The ONESAZ AI Tutor explains every doubt step by step, sets practice at the right level and shows teachers where students need help.',
    highlights: ['Step-by-step explanations', 'Practice that adapts', 'Insights for teachers'],
    featuresTitle: 'Help for every student, whenever they need it.',
    featuresLead: 'A patient tutor beside every student, working alongside the teacher.',
    features: [
      { icon: 'CircleHelp', title: 'Doubt solving', text: 'Students ask in their own words and get a clear answer.' },
      { icon: 'Lightbulb', title: 'Step-by-step explanations', text: 'Every answer is broken into clear steps students can follow.' },
      { icon: 'Target', title: 'Adaptive practice', text: 'Questions adjust to each student’s level as they improve.' },
      { icon: 'Database', title: 'Question Bank practice', text: 'Practice questions drawn from a bank of 10 lakh+.' },
      { icon: 'TrendingUp', title: 'Topic mastery', text: 'Mastery for every topic, updated after each practice session.' },
      { icon: 'Route', title: 'Revision plans', text: 'A clear plan of what to revise before each test.' },
      { icon: 'Trophy', title: 'Exam preparation', text: 'Mock tests and practice sets for upcoming exams.' },
      { icon: 'Eye', title: 'Teacher insights', text: 'Teachers see which topics each class finds hardest.' },
      { icon: 'BellRing', title: 'Parent updates', text: 'Parents follow their child’s progress in the ONESAZ app.' },
    ],
    stepsTitle: 'Ask, practise and improve, in three steps.',
    steps: [
      { title: 'Ask', text: 'Students ask a doubt in their own words and get a step-by-step explanation.' },
      { title: 'Practise', text: 'The tutor sets questions at the right level for each student.' },
      { title: 'Improve', text: 'Mastery grows topic by topic, and teachers see where to help.' },
    ],
    audienceTitle: 'Built for students, and the people who support them.',
    audience: [
      { role: 'Students', points: ['Doubts cleared any time', 'Practice at their own level', 'Confidence before exams'] },
      { role: 'Teachers', points: ['See weak topics by class', 'Less time re-explaining basics', 'Focus time where it’s needed'] },
      { role: 'Parents', points: ['Progress in the ONESAZ app', 'Know what their child is practising', 'Less need for extra tuition'] },
      { role: 'Principals', points: ['Learning gaps across classes', 'Better exam readiness', 'Data for academic reviews'] },
    ],
    worksWithLead: 'The AI Tutor uses your LMS content, the Question Bank and exam results to personalise practice.',
    related: ['lms', 'question-bank', 'omr-scanning', 'descriptive-evaluation', 'mdm', 'video-calling'],
    faqs: [
      {
        q: 'Does the AI Tutor follow our syllabus?',
        a: 'It works with your classes, subjects and LMS content. We’ll walk through your syllabus during the demo.',
      },
      { q: 'Does it replace teachers?', a: 'No. It helps students practise and shows teachers where to step in.' },
      { q: 'Is it safe for students?', a: 'It answers only study questions and runs inside the ONESAZ app your institution controls.' },
      { q: 'Which devices does it work on?', a: 'It works on phones, class tablets and the web.' },
    ],
    cta: { title: 'See the ONESAZ AI Tutor with your own subject.', text: 'Book a demo and try it with a topic your students find hard.' },
  },
  crm: {
    headline: 'Turn every enquiry into an admission.',
    lead: 'Capture enquiries from every source, reply in minutes and follow every family from the first message to fee payment.',
    highlights: ['Every enquiry in one list', 'Instant WhatsApp replies', 'Live admissions funnel'],
    featuresTitle: 'Everything your admissions team needs.',
    featuresLead: 'From the first enquiry to a confirmed seat.',
    features: [
      { icon: 'Filter', title: 'Enquiry capture', text: 'Website, WhatsApp, walk-in, phone and campaign enquiries in one list.' },
      { icon: 'Filter', title: 'Lead pipeline', text: 'Follow every enquiry from new to admitted.' },
      { icon: 'PhoneCall', title: 'Automatic follow-ups', text: 'WhatsApp messages, SMS and AI calls go out at the right time.' },
      { icon: 'ClipboardList', title: 'Counsellor assignment', text: 'Enquiries are shared fairly across your counsellors.' },
      { icon: 'MapPin', title: 'Campus visits', text: 'Parents book visits from WhatsApp and get a reminder the day before.' },
      { icon: 'FileText', title: 'Applications & documents', text: 'Collect application forms and documents online.' },
      { icon: 'UserPlus', title: 'Fee payment & admission', text: 'The seat is confirmed as soon as the admission fee is paid.' },
      { icon: 'Share2', title: 'Source tracking', text: 'See which sources and campaigns bring the most admissions.' },
      { icon: 'ChartColumn', title: 'Funnel reports', text: 'Enquiries, visits and admissions by counsellor and branch.' },
    ],
    stepsTitle: 'Capture, nurture and admit, in three steps.',
    steps: [
      { title: 'Capture', text: 'Enquiries from every source land in one list, assigned to a counsellor.' },
      { title: 'Nurture', text: 'Replies, prospectuses and visit reminders go out automatically.' },
      { title: 'Admit', text: 'Once the application and fee are complete, the student moves into the ERP.' },
    ],
    audienceTitle: 'Built for everyone who fills your seats.',
    audience: [
      { role: 'Counsellors', points: ['Today’s follow-ups in one list', 'Full history for every parent', 'Less manual calling'] },
      { role: 'Management', points: ['A live admissions funnel', 'Counsellor performance', 'Targets by branch'] },
      { role: 'Marketing', points: ['Know which campaigns work', 'Website enquiries captured instantly', 'Cost per admission'] },
      { role: 'Parents', points: ['Replies within minutes', 'Simple online applications', 'Clear next steps'] },
    ],
    worksWithLead: 'A confirmed admission becomes a student record in the ERP, with nothing typed twice.',
    related: ['erp', 'ai-calling-agent', 'lms', 'omr-scanning', 'ai-tutor', 'video-calling'],
    faqs: [
      {
        q: 'Can website enquiry forms come straight into the CRM?',
        a: 'Yes. Website and campaign forms can send enquiries directly into ONESAZ.',
      },
      { q: 'Can follow-ups go out on WhatsApp?', a: 'Yes. Replies and follow-ups can go out on WhatsApp, as well as by SMS and AI calls.' },
      { q: 'What happens when a parent pays the admission fee?', a: 'The enquiry becomes a student record in the ERP automatically.' },
      { q: 'Can we track several branches?', a: 'Yes. View the funnel for each branch, or for all branches together.' },
    ],
    cta: {
      title: 'See ONESAZ CRM with your admissions season.',
      text: 'Book a demo and we’ll walk through your enquiry-to-admission process.',
    },
  },
  'descriptive-evaluation': {
    headline: 'Written answers, marked fairly and explained.',
    lead: 'Scan answer sheets, check every answer against your rubric, and give each student a fair mark with clear feedback.',
    highlights: ['Marked point by point', 'The teacher has the final say', 'Feedback for every answer'],
    featuresTitle: 'Fair, fast checking of written answers.',
    featuresLead: 'Marking that is consistent for teachers and useful for students.',
    features: [
      { icon: 'ClipboardCheck', title: 'Rubric for every question', text: 'Set out what a full-marks answer needs, point by point.' },
      { icon: 'FileScan', title: 'Digital answer sheets', text: 'Scan handwritten answer sheets and check them on screen.' },
      { icon: 'ListChecks', title: 'Marks for each point', text: 'Every rubric point is marked, not just the total.' },
      {
        icon: 'Highlighter',
        title: 'Key points highlighted',
        text: 'Matching points in each answer are highlighted, so checking is faster.',
      },
      { icon: 'Users', title: 'Evaluator assignment', text: 'Share papers among evaluators by subject or section.' },
      { icon: 'RefreshCw', title: 'Moderation and re-checks', text: 'Review marks and handle re-evaluation requests in one place.' },
      { icon: 'MessageSquare', title: 'Feedback for students', text: 'Every answer comes back with what went well and what to improve.' },
      { icon: 'ChartColumn', title: 'Performance analysis', text: 'See which rubric points each class finds hardest.' },
      { icon: 'Send', title: 'Results to parents', text: 'Marks and feedback reach parents in the ONESAZ app.' },
    ],
    stepsTitle: 'Scan, check and share, in three steps.',
    steps: [
      { title: 'Scan', text: 'Answer sheets are scanned with a phone or scanner and assigned to evaluators.' },
      { title: 'Check', text: 'ONESAZ checks each answer against the rubric and suggests a mark. The evaluator reviews and approves it.' },
      { title: 'Share', text: 'Students and parents get marks and feedback, and teachers see where the class needs help.' },
    ],
    audienceTitle: 'Built for everyone in the evaluation process.',
    audience: [
      { role: 'Evaluators', points: ['Check answers on screen', 'A clear rubric for every question', 'Faster, fairer marking'] },
      { role: 'Exam cell', points: ['Evaluation progress at a glance', 'Moderation in one place', 'Results published sooner'] },
      { role: 'Students', points: ['Know exactly where marks were lost', 'Feedback they can act on', 'Fair, consistent marking'] },
      { role: 'Parents', points: ['Marks and feedback in the ONESAZ app', 'Progress over time', 'Fewer re-check disputes'] },
    ],
    worksWithLead: 'Written-answer marks combine with OMR results in the same report cards and analysis.',
    related: ['omr-scanning', 'question-bank', 'lms', 'ai-tutor', 'erp', 'mdm'],
    faqs: [
      { q: 'Do evaluators mark on paper or on screen?', a: 'On screen. Answer sheets are scanned, then checked digitally.' },
      {
        q: 'Can evaluators change the suggested marks?',
        a: 'Yes. ONESAZ only suggests marks. Evaluators review them and decide the final mark.',
      },
      { q: 'Can we use our own rubrics?', a: 'Yes. Set your own rubric for each question, subject or exam.' },
      { q: 'Does it work with OMR exams?', a: 'Yes. Objective and written-answer marks come together in one result.' },
    ],
    cta: {
      title: 'See ONESAZ evaluation with your own answer sheets.',
      text: 'Bring a few answer sheets, and we’ll check them against a rubric during the demo.',
    },
  },
  'question-bank': {
    headline: '10 lakh+ questions, ready when you are.',
    lead: 'Build tests, assessments and practice sessions in minutes from a bank of over 10 lakh questions.',
    highlights: ['10 lakh+ questions', 'Papers in minutes', 'Online or on paper'],
    featuresTitle: 'Every question your teachers need.',
    featuresLead: 'Search, pick and build a paper in minutes.',
    features: [
      { icon: 'Database', title: '10 lakh+ questions', text: 'A large bank across classes, subjects and topics.' },
      { icon: 'SlidersHorizontal', title: 'Smart filters', text: 'Filter by class, subject, chapter, topic and difficulty.' },
      { icon: 'ListChecks', title: 'Question types', text: 'MCQ, short answer, long answer and diagram questions.' },
      { icon: 'Wand2', title: 'Auto paper generation', text: 'Set marks and difficulty, and ONESAZ builds the paper.' },
      { icon: 'PenLine', title: 'Your own questions', text: 'Add your institution’s questions alongside the bank.' },
      { icon: 'KeyRound', title: 'Answer keys', text: 'Answer keys ready for every paper you build.' },
      { icon: 'Printer', title: 'Print with OMR sheets', text: 'Print papers with matching OMR sheets for scanning.' },
      { icon: 'FileCheck2', title: 'Online tests', text: 'Send the paper to students’ tablets and phones.' },
      { icon: 'Target', title: 'Practice sets', text: 'Build practice sets for revision and homework.' },
    ],
    stepsTitle: 'Find, build and use, in three steps.',
    steps: [
      { title: 'Find', text: 'Filter by class, subject, topic and difficulty to find the right questions.' },
      { title: 'Build', text: 'Pick questions one by one, or set the marks and let ONESAZ choose.' },
      { title: 'Use', text: 'Run it online, or print it with OMR sheets for paper exams.' },
    ],
    audienceTitle: 'Built for everyone who sets or takes tests.',
    audience: [
      { role: 'Teachers', points: ['Papers in minutes', 'Right difficulty every time', 'Answer keys included'] },
      {
        role: 'Exam cell',
        points: ['Consistent papers across branches', 'Print-ready with OMR sheets', 'Online and paper from one place'],
      },
      { role: 'Students', points: ['More practice questions', 'Practice by topic', 'Better exam readiness'] },
      { role: 'Principals', points: ['Quality papers across classes', 'Less time spent on paper-setting', 'Standard assessments'] },
    ],
    worksWithLead: 'Papers from the Question Bank flow into OMR exams, online tests and AI Tutor practice.',
    related: ['omr-scanning', 'lms', 'ai-tutor', 'descriptive-evaluation', 'mdm', 'erp'],
    faqs: [
      {
        q: 'Which syllabus does the Question Bank cover?',
        a: 'Tell us your syllabus and classes, and we’ll show the matching questions during the demo.',
      },
      { q: 'Can we add our own questions?', a: 'Yes. Your questions sit alongside the bank and can be used in any paper.' },
      { q: 'Do papers come with answer keys?', a: 'Yes. Every paper has an answer key.' },
      { q: 'Can we print papers?', a: 'Yes. Print papers with matching OMR sheets for paper exams.' },
    ],
    cta: { title: 'Build a test from the ONESAZ Question Bank.', text: 'Book a demo and we’ll build a paper for your class in minutes.' },
  },
  attendance: {
    headline: 'Attendance done in seconds, parents told the same morning.',
    lead: 'Mark student and staff attendance quickly, alert parents about absences automatically, and see attendance across every class and branch.',
    highlights: ['Class registers in seconds', 'Automatic absence alerts', 'Student and staff attendance'],
    featuresTitle: 'Every kind of attendance, in one place.',
    featuresLead: 'Students, staff, classes and branches.',
    features: [
      {
        icon: 'CalendarCheck',
        title: 'Quick class registers',
        text: 'Teachers mark a whole class in a few taps, on phone, tablet or web.',
      },
      { icon: 'BellRing', title: 'Absence alerts', text: 'Parents get an SMS, WhatsApp or app alert the same morning.' },
      { icon: 'UserCheck', title: 'Staff attendance', text: 'Track staff check-ins, leave and late arrivals.' },
      { icon: 'CalendarCheck', title: 'Period-wise attendance', text: 'Record attendance per period or per batch where needed.' },
      { icon: 'CalendarX', title: 'Leave requests', text: 'Parents and staff request leave online, and it’s approved in one place.' },
      { icon: 'Clock', title: 'Late arrivals', text: 'Mark and report late arrivals separately from absences.' },
      { icon: 'ChartColumn', title: 'Attendance reports', text: 'Daily, monthly and term reports by student, class or branch.' },
      { icon: 'CalendarCheck', title: 'Low-attendance alerts', text: 'Spot students whose attendance is falling below your limit.' },
      { icon: 'Link2', title: 'Linked to ERP and LMS', text: 'Attendance feeds report cards, fees and parent updates automatically.' },
    ],
    stepsTitle: 'Mark, alert and report, in three steps.',
    steps: [
      { title: 'Mark', text: 'Teachers mark the register in seconds at the start of class.' },
      { title: 'Alert', text: 'Parents of absent students are told automatically, the same morning.' },
      { title: 'Report', text: 'Attendance for every class, staff member and branch is ready any time.' },
    ],
    audienceTitle: 'Built for everyone who relies on attendance.',
    audience: [
      { role: 'Teachers', points: ['Registers in a few taps', 'No paper registers', 'Leave requests in one list'] },
      { role: 'Parents', points: ['Absence alerts the same day', 'Attendance history on the app', 'Request leave online'] },
      { role: 'Office staff', points: ['Monthly reports ready', 'Staff attendance and leave', 'No manual totals'] },
      { role: 'Principals', points: ['Attendance across classes', 'Low-attendance students flagged', 'Branch comparisons'] },
    ],
    worksWithLead: 'Attendance feeds the LMS, report cards, ERP and parent app automatically.',
    related: ['lms', 'erp', 'ai-calling-agent', 'video-calling', 'crm', 'mdm'],
    faqs: [
      { q: 'Can teachers mark attendance on their phones?', a: 'Yes. Registers work on phones, tablets and the web.' },
      { q: 'How are parents told about absences?', a: 'Through SMS, WhatsApp and the ONESAZ app, the same morning.' },
      { q: 'Does it cover staff attendance too?', a: 'Yes. Track staff attendance, leave and late arrivals in the same place.' },
      { q: 'Can we see attendance across branches?', a: 'Yes. Reports can be viewed by student, class, branch or the whole institution.' },
    ],
    cta: {
      title: 'See ONESAZ attendance with your own classes.',
      text: 'Book a demo and we’ll mark a sample register and send a test absence alert.',
    },
  },
}
