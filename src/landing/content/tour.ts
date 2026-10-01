import type { ProductSlug } from './names'

/** Product tour on the home page ("See it in action"). Product names come from PRODUCTS. */
export interface TourItem {
  slug: ProductSlug
  title: string
  text: string
  steps: { title: string; text: string }[]
  /** Soft gradient behind the animated demo. */
  mockBg: string
}

/** Tour order. Attendance Management is left out of the tour by request; it lives inside the LMS demo. */
export const TOUR: TourItem[] = [
  {
    slug: 'erp',
    title: 'Run admissions, attendance and fees without spreadsheets.',
    text: 'Your office works from one system, and every record is linked to the same student.',
    steps: [
      {
        title: 'Attendance in seconds',
        text: 'Mark registers by class; parents of absent students are alerted.',
      },
      {
        title: 'Fees collected on time',
        text: 'Online payment, receipts and automatic reminders.',
      },
      {
        title: 'Admissions, enquiry to enrolment',
        text: 'Track every applicant and create the student record once.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #E4F4EB 0%, #F3FAF6 100%)',
  },
  {
    slug: 'lms',
    title: 'Teach, share and track learning in one place.',
    text: 'Teachers plan lessons, share content and see who needs help, without switching apps.',
    steps: [
      {
        title: 'Build lessons and courses',
        text: 'Videos, notes and quizzes organised by class and unit.',
      },
      {
        title: 'Send lessons to class tablets',
        text: 'One click and every student has today’s lesson.',
      },
      {
        title: 'See who needs help',
        text: 'Watch time, quiz scores and students falling behind, live.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #E9EEFD 0%, #F4F6FE 100%)',
  },
  {
    slug: 'omr-scanning',
    title: 'Conduct exams online or on paper, with results the same day.',
    text: 'Online tests, OMR sheets and a shared question bank, with evaluation done for you.',
    steps: [
      {
        title: 'Online and OMR exams',
        text: 'Run tests on tablets, or scan paper OMR sheets in minutes.',
      },
      {
        title: 'Automatic evaluation and ranks',
        text: 'Scores, ranks and topic analysis are ready instantly.',
      },
      {
        title: 'Results reach parents the same day',
        text: 'Shared through the app, SMS and WhatsApp.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #FCE9E4 0%, #FEF5F2 100%)',
  },
  {
    slug: 'mdm',
    title: 'Keep every classroom tablet ready for learning.',
    text: 'Your IT team sets up, locks down and supports institution-owned tablets from one screen.',
    steps: [
      {
        title: 'Push apps to every tablet at once',
        text: 'Install or update learning apps for a whole class in one step.',
      },
      {
        title: 'Lock tablets to approved apps',
        text: 'Kiosk mode keeps only the ONESAZ and Acadhub apps. Games, videos and browsers are hidden.',
      },
      {
        title: 'Lock a lost tablet remotely',
        text: 'Lock, ring or message any tablet without collecting it.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #FBF0DA 0%, #FEF9EF 100%)',
  },
  {
    slug: 'ai-calling-agent',
    title: 'An AI agent that calls parents for you.',
    text: 'It rings parents on their normal phone number to follow up on fees, admission enquiries and absences, so your office staff don’t have to.',
    steps: [
      {
        title: 'Calls parents automatically',
        text: 'Works through the call list on its own. Parents need no app, just their phone.',
      },
      {
        title: 'Talks naturally',
        text: 'Answers questions, handles replies and sends payment links during the call.',
      },
      {
        title: 'Every call summarised',
        text: 'Outcomes and next steps are saved to the ERP, so nothing is missed.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #EEE8FD 0%, #F7F4FF 100%)',
  },
  {
    slug: 'video-calling',
    title: 'Parents and students, face to face.',
    text: 'Parents video call their child straight from the ONESAZ app, and students can call home too. No separate app or phone numbers needed.',
    steps: [
      {
        title: 'Call your child in one tap',
        text: 'Parents start a video call from their child’s profile.',
      },
      {
        title: 'Talk face to face, live',
        text: 'See and hear each other in real time, wherever you are.',
      },
      {
        title: 'Call history in one place',
        text: 'Every call is listed with its time and length.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #E0F2F7 0%, #F2FAFC 100%)',
  },
  {
    slug: 'ai-tutor',
    title: 'A personal tutor for every student.',
    text: 'The ONESAZ AI Tutor answers doubts, explains step by step and sets practice at the right level for each student.',
    steps: [
      {
        title: 'Answers doubts any time',
        text: 'Students ask in their own words and get clear, step-by-step explanations.',
      },
      {
        title: 'Practice that adapts',
        text: 'Questions get harder or easier based on how each student is doing.',
      },
      {
        title: 'Teachers see the gaps',
        text: 'Mastery by topic shows who needs help, and where.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #FCE7F3 0%, #FFF5FA 100%)',
  },
  {
    slug: 'crm',
    title: 'Turn every enquiry into an admission.',
    text: 'Track admission enquiries from the first call to fee payment, with follow-ups that happen on their own.',
    steps: [
      {
        title: 'Capture every enquiry',
        text: 'Website, walk-in, phone and campaign enquiries land in one list.',
      },
      {
        title: 'Follow up automatically',
        text: 'WhatsApp, SMS and AI calls remind parents at the right time.',
      },
      {
        title: 'See your admissions funnel',
        text: 'Know how many enquiries, visits and admissions each counsellor has.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #E8E9FD 0%, #F5F5FF 100%)',
  },
  {
    slug: 'descriptive-evaluation',
    title: 'Evaluate written answers, beyond marks.',
    text: 'Rubric-based evaluation of descriptive answers, with clear feedback for every student.',
    steps: [
      {
        title: 'Marks for every criterion',
        text: 'Each answer is marked against a rubric, not just given a total.',
      },
      {
        title: 'Faster, consistent checking',
        text: 'Key points are highlighted so evaluators mark faster and more fairly.',
      },
      {
        title: 'Feedback students can use',
        text: 'Every answer comes back with what to improve.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #FFEDE0 0%, #FFF8F2 100%)',
  },
  {
    slug: 'question-bank',
    title: '10 lakh+ questions, ready when you are.',
    text: 'Build tests, assessments and practice sets in minutes from a bank of over 10 lakh questions.',
    steps: [
      {
        title: 'Filter in seconds',
        text: 'By class, subject, chapter, topic and difficulty.',
      },
      {
        title: 'Build a paper your way',
        text: 'Pick questions one by one, or set the marks and let ONESAZ choose.',
      },
      {
        title: 'Use it online or on paper',
        text: 'Send it to students’ tablets, or print it with an OMR sheet.',
      },
    ],
    mockBg: 'linear-gradient(135deg, #DDF3F0 0%, #F2FBF9 100%)',
  },
]
