import {
  BookOpen,
  Briefcase,
  Presentation,
  School,
  UsersRound,
  CalendarCheck,
  Database,
  FileCheck2,
  GraduationCap,
  IndianRupee,
  Landmark,
  MessageSquare,
  PenLine,
  Phone,
  Smartphone,
  TabletSmartphone,
  Target,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react'
import type { FEATURES, ProductSlug } from '../content/names'

/** One flat icon per product, shared by the menus and the product tour. */
export const PRODUCT_ICONS: Record<ProductSlug, LucideIcon> = {
  erp: Landmark,
  lms: BookOpen,
  attendance: CalendarCheck,
  'omr-scanning': FileCheck2,
  'descriptive-evaluation': PenLine,
  'question-bank': Database,
  'ai-tutor': GraduationCap,
  crm: Users,
  mdm: TabletSmartphone,
  'ai-calling-agent': Phone,
  'video-calling': Video,
}

/** Icons for platform features (no product page of their own). */
export const PLATFORM_FEATURE_ICONS: Record<keyof typeof FEATURES, LucideIcon> = {
  adaptive: Target,
  payments: IndianRupee,
  sms: MessageSquare,
  app: Smartphone,
}

/** Icons for the "By Role" links (roles have no product colour; shown in brand blue). */
export const ROLE_ICONS = {
  management: Briefcase,
  principals: School,
  teachers: Presentation,
  parentsStudents: UsersRound,
} as const
