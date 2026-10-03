import type { FaqItem } from '../sections/FaqSection'

/**
 * Previous year question papers (/previous-papers).
 *
 * Adding PDFs: put each file in `public/papers/<exam>/<year>/`. Every download button is always shown; the page checks
 * which files exist, and a button only downloads once its file is there (until then it does nothing when clicked).
 *
 * JEE Main sessions with exam days listed below have one PDF per day, shift and subject (questions with solutions):
 *   public/papers/jee-main/2025/2025-01-22-shift-1-physics.pdf
 *   public/papers/jee-main/2025/2025-01-22-shift-2-mathematics.pdf
 *
 * Other entrance exam sessions (NEET UG, TS EAPCET, and JEE sessions without days) have one PDF per subject,
 * named `<session id>-<subject>.pdf`:
 *   public/papers/jee-main/2026/january-physics.pdf
 *   public/papers/jee-main/2025/april-mathematics.pdf
 *   public/papers/neet-ug/2024/question-paper-biology.pdf
 *
 * Board exams (CBSE) have one paper per subject, with its solutions in a second PDF:
 *   public/papers/cbse-class-12/2024/physics.pdf
 *   public/papers/cbse-class-12/2024/physics-solutions.pdf
 *
 * An optional `all-papers.zip` in a year's folder turns on "Download all" for that exam and year.
 */

export interface PyqExam {
  slug: string
  name: string
  /** Who conducts it, shown under the exam name. */
  body: string
  /** One line about what is on this page for the exam. */
  about: string
}

export interface PyqPaper {
  /** File name (without .pdf), unique within an exam and year. */
  id: string
  exam: string
  year: number
  title: string
  /** Shown under the title. */
  detail: string
  /** A single-subject board paper: its subject. */
  subject?: string
  /** A session split into one PDF per subject, each with questions and solutions. */
  subjects?: string[]
  /** Exam days in the session (ISO dates) and how many shifts each had. Each shift gets its own PDF per subject. */
  days?: PyqDay[]
}

export interface PyqDay {
  date: string
  shifts: number
}

export const PYQ_EXAMS: PyqExam[] = [
  {
    slug: 'jee-main',
    name: 'JEE Main',
    body: 'National Testing Agency',
    about: 'Solved questions from every shift, grouped by session and subject.',
  },
  {
    slug: 'neet-ug',
    name: 'NEET UG',
    body: 'National Testing Agency',
    about: 'The full paper with solutions, split into Physics, Chemistry and Biology.',
  },
  {
    slug: 'cbse-class-12',
    name: 'CBSE Class 12',
    body: 'Central Board of Secondary Education',
    about: 'Board exam papers for the main science and language subjects, with solutions.',
  },
  {
    slug: 'cbse-class-10',
    name: 'CBSE Class 10',
    body: 'Central Board of Secondary Education',
    about: 'Board exam papers for Science, Maths, Social Science and English, with solutions.',
  },
  {
    slug: 'ts-eapcet',
    name: 'TS EAPCET',
    body: 'JNTU Hyderabad for TSCHE (formerly TS EAMCET)',
    about: 'Engineering stream papers with solutions, split into Maths, Physics and Chemistry.',
  },
]

export const ALL_SUBJECTS = 'All subjects'
/** Years marked “New” on the page. */
const NEW_YEARS = new Set(['jee-main-2026'])
export const isNewYear = (exam: string, year: number) => NEW_YEARS.has(`${exam}-${year}`)

const PCM = ['Physics', 'Chemistry', 'Mathematics']

/**
 * JEE Main exam days (Paper 1, B.E./B.Tech), two shifts a day.
 * Check these against the NTA schedule before publishing; a session without days shows one PDF per subject instead.
 */
const JEE_DAYS: Record<string, string[]> = {
  '2026-January': ['2026-01-21', '2026-01-22', '2026-01-23', '2026-01-24', '2026-01-28'],
  '2025-January': ['2025-01-22', '2025-01-23', '2025-01-24', '2025-01-28', '2025-01-29'],
  '2025-April': ['2025-04-02', '2025-04-03', '2025-04-04', '2025-04-07', '2025-04-08'],
  '2024-January': ['2024-01-27', '2024-01-29', '2024-01-30', '2024-01-31', '2024-02-01'],
  '2024-April': ['2024-04-04', '2024-04-05', '2024-04-06', '2024-04-08', '2024-04-09'],
}
const daysFor = (year: string, session: string) => JEE_DAYS[`${year}-${session}`]?.map((date) => ({ date, shifts: 2 }))
const BOARD_YEARS = [2025, 2024, 2023, 2022, 2021]

/** JEE Main sessions by year. */
const JEE_SESSIONS: Record<number, string[]> = {
  2026: ['January'],
  2025: ['January', 'April'],
  2024: ['January', 'April'],
  2023: ['January', 'April'],
  2022: ['June', 'July'],
  2021: ['February', 'March', 'July', 'August'],
}

const CBSE_12 = [
  { id: 'physics', subject: 'Physics', marks: 70 },
  { id: 'chemistry', subject: 'Chemistry', marks: 70 },
  { id: 'mathematics', subject: 'Mathematics', marks: 80 },
  { id: 'biology', subject: 'Biology', marks: 70 },
  { id: 'english-core', subject: 'English', marks: 80, title: 'English Core' },
]
const CBSE_10 = [
  { id: 'science', subject: 'Science', marks: 80 },
  { id: 'mathematics-standard', subject: 'Mathematics', marks: 80, title: 'Mathematics (Standard)' },
  { id: 'social-science', subject: 'Social Science', marks: 80 },
  { id: 'english', subject: 'English', marks: 80, title: 'English Language and Literature' },
]

/** Every paper listed on the page. */
export const PYQ_PAPERS: PyqPaper[] = [
  ...Object.entries(JEE_SESSIONS).flatMap(([y, sessions]) =>
    sessions.map((s) => ({
      id: s.toLowerCase(),
      exam: 'jee-main',
      year: Number(y),
      title: `${s} session`,
      detail: 'All shifts · questions with solutions',
      subjects: PCM,
      days: daysFor(y, s),
    })),
  ),
  ...BOARD_YEARS.flatMap((year) => [
    {
      id: 'question-paper',
      exam: 'neet-ug',
      year,
      title: 'Question paper',
      detail: `${year >= 2025 ? '180 questions · 3 hours' : '200 questions · 3 hours 20 minutes'} · 720 marks`,
      subjects: ['Physics', 'Chemistry', 'Biology'],
    },
    ...CBSE_12.map((p) => ({
      id: p.id,
      exam: 'cbse-class-12',
      year,
      title: p.title ?? p.subject,
      detail: `${p.marks} marks · 3 hours`,
      subject: p.subject,
    })),
    ...CBSE_10.map((p) => ({
      id: p.id,
      exam: 'cbse-class-10',
      year,
      title: p.title ?? p.subject,
      detail: `${p.marks} marks · 3 hours`,
      subject: p.subject,
    })),
    {
      id: 'engineering',
      exam: 'ts-eapcet',
      year,
      title: 'Engineering stream',
      detail: '160 questions · 160 marks · 3 hours',
      subjects: ['Mathematics', 'Physics', 'Chemistry'],
    },
  ]),
]

/** Years with papers for an exam, newest first. */
export const examYears = (exam: string) => [...new Set(PYQ_PAPERS.filter((p) => p.exam === exam).map((p) => p.year))].sort((a, b) => b - a)
/** Subjects that can be filtered for an exam. */
export const examSubjects = (exam: string) => [
  ...new Set(PYQ_PAPERS.filter((p) => p.exam === exam).flatMap((p) => p.subjects ?? (p.subject ? [p.subject] : []))),
]

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')
export const subjectFile = (p: PyqPaper, subject: string) => `/papers/${p.exam}/${p.year}/${p.id}-${slug(subject)}.pdf`
/** One shift's PDF for a subject, e.g. /papers/jee-main/2025/2025-01-22-shift-1-physics.pdf */
export const shiftFile = (p: PyqPaper, date: string, shift: number, subject: string) =>
  `/papers/${p.exam}/${p.year}/${date}-shift-${shift}-${slug(subject)}.pdf`
export const paperFile = (p: PyqPaper) => `/papers/${p.exam}/${p.year}/${p.id}.pdf`
export const solutionsFile = (p: PyqPaper) => `/papers/${p.exam}/${p.year}/${p.id}-solutions.pdf`
export const zipFile = (exam: string, year: number) => `/papers/${exam}/${year}/all-papers.zip`

/** Shortcuts under the search bar and on the no-results card. */
export const PYQ_POPULAR: { label: string; exam: string; year?: number; subject?: string }[] = [
  { label: 'JEE Main 2026', exam: 'jee-main', year: 2026 },
  { label: 'NEET UG 2025', exam: 'neet-ug', year: 2025 },
  { label: 'CBSE Class 12 Physics', exam: 'cbse-class-12', subject: 'Physics' },
  { label: 'TS EAPCET 2024', exam: 'ts-eapcet', year: 2024 },
]

export const PYQ_PAGE = {
  eyebrow: 'Previous year papers',
  title: 'Past exam papers, free to download.',
  lead: 'Real papers from JEE Main, NEET, CBSE and TS EAPCET, with solutions for every subject. Free, no sign-up.',
  searchPlaceholder: 'Search by exam, year or subject',
  tipsTitle: 'Get more from every past paper.',
  tipsLead: 'Past papers are the closest thing to the real exam. Use them the way toppers do.',
  tips: [
    { title: 'Sit it like the real exam', text: 'Set a timer for the full duration and answer without notes, in one sitting.' },
    { title: 'Check with the solutions', text: 'Mark your answers, then read the solution for every question you got wrong or guessed.' },
    { title: 'Find your weak topics', text: 'Note the chapters where you lose marks, and practise those before the next paper.' },
  ],
  practice: {
    title: 'Want more practice after the papers?',
    text: 'The ONESAZ app gives you topic-wise practice from 10 lakh+ questions, step-by-step solutions and an AI Tutor for your doubts.',
    cta: { label: 'See student plans', to: '/pricing' },
  },
}

export const PYQ_FAQS: FaqItem[] = [
  { q: 'Are the papers free to download?', a: 'Yes. Every paper and its solutions are free, with no sign-up needed.' },
  {
    q: 'Can I download one subject at a time?',
    a: 'Yes. Each subject is a separate PDF, so you can download only Physics, Chemistry, Maths or Biology.',
  },
  {
    q: 'Do the papers come with solutions?',
    a: 'Yes. Entrance exam PDFs have the solution right after each question. Board papers have a separate solutions PDF.',
  },
  {
    q: 'Which exams are covered?',
    a: 'JEE Main, NEET UG, CBSE Class 12, CBSE Class 10 and TS EAPCET, from 2021 onwards. We add new exams and papers regularly.',
  },
  {
    q: 'When are new papers added?',
    a: 'Soon after each exam, once the official paper is released. Solutions follow shortly after.',
  },
  {
    q: 'Can I practise these papers online?',
    a: 'Yes. In the ONESAZ app you can take timed practice tests and see step-by-step solutions for every question.',
    link: { label: 'See student plans', to: '/pricing' },
  },
]
