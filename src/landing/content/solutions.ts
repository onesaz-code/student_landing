/**
 * Copy for the Solutions page (/solutions). Institution and role names come from names.ts;
 * products are referenced by slug and rendered with their names and colours from PRODUCTS.
 */
import { ROLES, SOLUTIONS, type ProductSlug } from './names'

export type SolutionId = (typeof SOLUTIONS)[number]['id']

export const SOLUTIONS_HERO = {
  eyebrow: 'Solutions',
  title: 'One platform, shaped to the way your institution works.',
  lead: 'Schools, colleges, coaching institutes and multi-campus groups all run on ONESAZ, each with the products and setup that fit them.',
}

export interface SolutionBlock {
  id: SolutionId
  title: string
  lead: string
  points: string[]
  /** Text after "Book a demo for …" on the section button. */
  demoFor: string
  products: ProductSlug[]
  changes: { who: string; what: string }[]
}

/** One block per institution type, in SOLUTIONS order. */
export const SOLUTION_BLOCKS: SolutionBlock[] = [
  {
    id: 'schools',
    title: 'Run every grade and every class from one platform.',
    lead: 'From admissions and fees to lessons, exams and classroom tablets, ONESAZ gives schools one connected system for teachers, office staff, parents and management.',
    points: [
      'Class-wise lessons, homework and gradebooks',
      'Admissions, attendance and fee collection',
      'Report cards and parent updates on the app',
      'Classroom tablets locked to learning apps',
      'Absence and fee calls handled by the AI agent',
    ],
    demoFor: 'schools',
    products: ['erp', 'lms', 'attendance', 'omr-scanning', 'mdm', 'video-calling', 'ai-calling-agent', 'ai-tutor'],
    changes: [
      { who: 'Parents', what: 'Updates on the app the same day' },
      { who: 'Teachers', what: 'Less paperwork, more teaching' },
      { who: 'Office', what: 'Fees and admissions in one place' },
    ],
  },
  {
    id: 'colleges',
    title: 'Departments, courses and exams, connected.',
    lead: 'Run departments, courses, examinations and student services across your college, with one record for every student from admission to results.',
    points: [
      'Department, course and timetable management',
      'Online, OMR and descriptive exams with results',
      'Admissions, fees and student records',
      'Question bank for internal assessments',
      'Enquiries followed up with the admissions CRM',
    ],
    demoFor: 'colleges',
    products: ['erp', 'lms', 'omr-scanning', 'descriptive-evaluation', 'question-bank', 'crm', 'attendance', 'ai-calling-agent'],
    changes: [
      { who: 'Students', what: 'Results and progress in one app' },
      { who: 'Faculty', what: 'Faster evaluation, fewer registers' },
      { who: 'Management', what: 'Every department in one view' },
    ],
  },
  {
    id: 'coaching-institutes',
    title: 'Batches, tests and ranks, done right.',
    lead: 'Manage students, batches, weekly tests and learning devices across every centre, with ranks and analysis out the same day.',
    points: [
      'Batch schedules and attendance',
      'Weekly tests with OMR scanning and same-day ranks',
      '10 lakh+ questions for tests and practice',
      'AI Tutor practice for every student',
      'Enquiries to admissions with the CRM',
    ],
    demoFor: 'coaching institutes',
    products: ['lms', 'omr-scanning', 'question-bank', 'ai-tutor', 'crm', 'mdm', 'attendance', 'ai-calling-agent'],
    changes: [
      { who: 'Students', what: 'Practice at the right level' },
      { who: 'Faculty', what: 'Papers built in minutes' },
      { who: 'Centre heads', what: 'Ranks across every batch' },
    ],
  },
  {
    id: 'trusts-school-groups',
    title: 'Every campus, one view.',
    lead: 'Oversee multiple institutions with central control and campus-level freedom: shared standards, consolidated reports and one platform for every branch.',
    points: [
      'One dashboard across every campus',
      'Shared policies, fee structures and standards',
      'Campus-level administration and reports',
      'Consolidated admissions and collections',
      'Common question bank and exams across branches',
    ],
    demoFor: 'your group',
    products: ['erp', 'crm', 'lms', 'omr-scanning', 'mdm', 'attendance', 'ai-calling-agent', 'question-bank'],
    changes: [
      { who: 'Trustees', what: 'Every branch at a glance' },
      { who: 'Principals', what: 'Freedom to run their campus' },
      { who: 'Central office', what: 'One set of standards' },
    ],
  },
]

export const ROLES_INTRO = {
  eyebrow: 'By role',
  title: 'Built for everyone in your institution.',
  lead: 'Each person gets the view and tools they need, from the same platform.',
}

export type RoleIcon = 'management' | 'principal' | 'teacher' | 'family'

export interface RoleCard {
  name: string
  icon: RoleIcon
  points: string[]
  products: ProductSlug[]
}

export const ROLE_CARDS: RoleCard[] = [
  {
    name: ROLES[0],
    icon: 'management',
    points: ['Collections, dues and admissions live', 'Every branch in one dashboard', 'Decisions backed by real data'],
    products: ['erp', 'crm', 'ai-calling-agent'],
  },
  {
    name: ROLES[1],
    icon: 'principal',
    points: ['Attendance and syllabus coverage', 'Exam results and analysis', 'Teacher and class performance'],
    products: ['lms', 'attendance', 'omr-scanning'],
  },
  {
    name: ROLES[2],
    icon: 'teacher',
    points: ['Lessons and homework in minutes', 'Tests from 10 lakh+ questions', 'See who needs help, by topic'],
    products: ['lms', 'question-bank', 'descriptive-evaluation'],
  },
  {
    name: `${ROLES[4]} & ${ROLES[5]}`,
    icon: 'family',
    points: [
      'Homework, marks and attendance on the app',
      'Video calls between parents and students',
      'Personal practice with the AI Tutor',
    ],
    products: ['video-calling', 'ai-tutor', 'attendance'],
  },
]

export const SOLUTIONS_CTA = {
  title: 'Not sure which products you need?',
  text: 'Tell us about your institution and we’ll recommend the right ONESAZ setup.',
  back: 'Back to home',
}
