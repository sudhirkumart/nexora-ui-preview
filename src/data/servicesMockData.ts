export type ServiceReadiness = 'Ready' | 'Attention needed' | 'Not started'

export interface ServiceAttentionItem {
  id: string
  area: string
  issue: string
  action: string
}

export interface ServiceChecklistItem {
  label: string
  status: ServiceReadiness
}

export interface ServiceRole {
  role: string
  owner: string
  status: ServiceReadiness
}

export interface ServiceRecord {
  id: string
  name: string
  date: string
  dateLabel: string
  day: string
  month: string
  time: string
  location: string
  type: string
  expectedAttendance: number
  preparationStatus: ServiceReadiness
  volunteerReadiness: ServiceReadiness
  openVolunteerRoles: number
  attentionIssues: ServiceAttentionItem[]
  readiness: ServiceChecklistItem[]
  plan: {
    theme: string
    serviceLeader: string
    speaker: string
    worshipLead: string
    venue: string
    volunteerArrival: string
  }
  volunteerRoles: ServiceRole[]
  attendancePreparation: {
    seatingReadiness: string
    checkInMethod: string
    visitorWelcome: string
    followUpOwner: string
    followUpDeadline: string
  }
}

export const serviceLocations = [
  'Delhi Central Church',
  'Noida Community Church',
  'Greater Noida Outreach Centre',
]

export const services: ServiceRecord[] = [
  {
    id: 'family-celebration',
    name: 'Family Celebration',
    date: '2026-07-19',
    dateLabel: '19 July 2026',
    day: '19',
    month: 'JUL',
    time: '9:00 AM–11:00 AM',
    location: 'Delhi Central Church',
    type: 'Sunday service',
    expectedAttendance: 420,
    preparationStatus: 'Ready',
    volunteerReadiness: 'Ready',
    openVolunteerRoles: 0,
    attentionIssues: [],
    readiness: [
      { label: 'Service plan', status: 'Ready' },
      { label: 'Venue preparation', status: 'Ready' },
      { label: 'Worship team', status: 'Ready' },
      { label: 'Welcome team', status: 'Ready' },
      { label: 'Children’s ministry', status: 'Ready' },
      { label: 'Media team', status: 'Ready' },
      { label: 'Attendance preparation', status: 'Ready' },
      { label: 'Visitor follow-up plan', status: 'Ready' },
    ],
    plan: {
      theme: 'Belonging and service',
      serviceLeader: 'Delhi service coordinator',
      speaker: 'Regional teaching lead',
      worshipLead: 'Delhi worship coordinator',
      venue: 'Main gathering hall',
      volunteerArrival: '8:00 AM',
    },
    volunteerRoles: [
      { role: 'Service leader', owner: 'Delhi service coordinator', status: 'Ready' },
      { role: 'Worship lead', owner: 'Delhi worship coordinator', status: 'Ready' },
      { role: 'Welcome team', owner: 'Delhi welcome team', status: 'Ready' },
      { role: 'Children’s ministry', owner: 'Delhi children’s team', status: 'Ready' },
      { role: 'Media', owner: 'Delhi media team', status: 'Ready' },
      { role: 'Setup team', owner: 'Delhi operations team', status: 'Ready' },
      { role: 'Follow-up coordinator', owner: 'Delhi connection team', status: 'Ready' },
    ],
    attendancePreparation: {
      seatingReadiness: '420 seats arranged with reserve capacity',
      checkInMethod: 'Welcome-desk aggregate count',
      visitorWelcome: 'First-time visitor welcome point prepared',
      followUpOwner: 'Delhi connection team',
      followUpDeadline: 'Within 48 hours of the service',
    },
  },
  {
    id: 'community-worship-gathering',
    name: 'Community Worship Gathering',
    date: '2026-07-19',
    dateLabel: '19 July 2026',
    day: '19',
    month: 'JUL',
    time: '11:00 AM–12:30 PM',
    location: 'Noida Community Church',
    type: 'Community worship service',
    expectedAttendance: 285,
    preparationStatus: 'Attention needed',
    volunteerReadiness: 'Attention needed',
    openVolunteerRoles: 2,
    attentionIssues: [
      {
        id: 'welcome-role',
        area: 'Welcome team',
        issue: '1 role unfilled',
        action: 'Review volunteers',
      },
      {
        id: 'children-role',
        area: 'Children’s ministry',
        issue: '1 role unfilled',
        action: 'Assign role',
      },
      {
        id: 'follow-up-owner',
        area: 'Visitor follow-up',
        issue: 'Coordinator not confirmed',
        action: 'Confirm coordinator',
      },
    ],
    readiness: [
      { label: 'Service plan', status: 'Ready' },
      { label: 'Venue preparation', status: 'Ready' },
      { label: 'Worship team', status: 'Ready' },
      { label: 'Welcome team', status: 'Attention needed' },
      { label: 'Children’s ministry', status: 'Attention needed' },
      { label: 'Media team', status: 'Ready' },
      { label: 'Attendance preparation', status: 'Ready' },
      { label: 'Visitor follow-up plan', status: 'Not started' },
    ],
    plan: {
      theme: 'Serving our neighbours',
      serviceLeader: 'Noida service coordinator',
      speaker: 'Community teaching lead',
      worshipLead: 'Noida worship coordinator',
      venue: 'Noida main gathering hall',
      volunteerArrival: '9:45 AM',
    },
    volunteerRoles: [
      { role: 'Service leader', owner: 'Noida service coordinator', status: 'Ready' },
      { role: 'Worship lead', owner: 'Noida worship coordinator', status: 'Ready' },
      { role: 'Welcome team', owner: 'Noida welcome team', status: 'Attention needed' },
      { role: 'Children’s ministry', owner: 'Noida children’s team', status: 'Attention needed' },
      { role: 'Media', owner: 'Noida media team', status: 'Ready' },
      { role: 'Setup team', owner: 'Noida operations team', status: 'Ready' },
      { role: 'Follow-up coordinator', owner: 'Awaiting confirmation', status: 'Not started' },
    ],
    attendancePreparation: {
      seatingReadiness: '285 seats planned with 25 reserve places',
      checkInMethod: 'Welcome-desk aggregate count',
      visitorWelcome: 'Visitor cards and welcome point prepared',
      followUpOwner: 'Coordinator awaiting confirmation',
      followUpDeadline: 'Within 48 hours of the service',
    },
  },
  {
    id: 'midweek-prayer-reflection',
    name: 'Midweek Prayer and Reflection',
    date: '2026-07-22',
    dateLabel: '22 July 2026',
    day: '22',
    month: 'JUL',
    time: '6:30 PM–7:30 PM',
    location: 'Delhi Central Church',
    type: 'Midweek gathering',
    expectedAttendance: 110,
    preparationStatus: 'Ready',
    volunteerReadiness: 'Ready',
    openVolunteerRoles: 0,
    attentionIssues: [],
    readiness: [
      { label: 'Service plan', status: 'Ready' },
      { label: 'Venue preparation', status: 'Ready' },
      { label: 'Worship team', status: 'Ready' },
      { label: 'Welcome team', status: 'Ready' },
      { label: 'Children’s ministry', status: 'Ready' },
      { label: 'Media team', status: 'Ready' },
      { label: 'Attendance preparation', status: 'Ready' },
      { label: 'Visitor follow-up plan', status: 'Ready' },
    ],
    plan: {
      theme: 'Prayer, reflection and shared learning',
      serviceLeader: 'Delhi midweek coordinator',
      speaker: 'Prayer and reflection facilitator',
      worshipLead: 'Delhi acoustic worship team',
      venue: 'Community hall',
      volunteerArrival: '5:45 PM',
    },
    volunteerRoles: [
      { role: 'Service leader', owner: 'Delhi midweek coordinator', status: 'Ready' },
      { role: 'Worship lead', owner: 'Delhi acoustic worship team', status: 'Ready' },
      { role: 'Welcome team', owner: 'Midweek welcome team', status: 'Ready' },
      { role: 'Children’s ministry', owner: 'Not required for this gathering', status: 'Ready' },
      { role: 'Media', owner: 'Delhi media team', status: 'Ready' },
      { role: 'Setup team', owner: 'Delhi operations team', status: 'Ready' },
      { role: 'Follow-up coordinator', owner: 'Delhi connection team', status: 'Ready' },
    ],
    attendancePreparation: {
      seatingReadiness: '110 seats arranged',
      checkInMethod: 'Simple aggregate attendance count',
      visitorWelcome: 'Welcome-desk contact point prepared',
      followUpOwner: 'Delhi connection team',
      followUpDeadline: 'Within 48 hours of the gathering',
    },
  },
]

export const postServiceSteps = [
  'Attendance recorded',
  'New visitors identified',
  'Follow-up tasks assigned',
  'Service notes captured',
  'Outreach or care needs routed appropriately',
]

export type SermonWorkflowState =
  | 'No sermon added'
  | 'Transcript unavailable'
  | 'Processing'
  | 'Insights ready for review'
  | 'Reviewed'
  | 'Published'
  | 'Processing failed'

export const sermonWorkflowStates: SermonWorkflowState[] = [
  'No sermon added',
  'Transcript unavailable',
  'Processing',
  'Insights ready for review',
  'Reviewed',
  'Published',
  'Processing failed',
]

export interface SermonInsightDraft {
  summary: string
  mainHeadings: string[]
  themes: string[]
  scriptureReferences: string[]
  keyTakeaways: string[]
  discussionQuestions: string[]
  suggestedActions: string[]
}

export interface SermonRecord {
  title: string
  speaker: string
  sourceType: string
  sourceUrl: string
  duration: string
  transcriptStatus: string
  transcriptPreview: string
  workflowState: SermonWorkflowState
  questionReviewStatus: QuestionReviewStatus
  insights: SermonInsightDraft
}

export type QuestionReviewStatus = 'Questions ready for review' | 'Reviewed'
export type SermonQuestionStatus = 'Draft' | 'Approved'
export type SermonQuestionGroupId = 'personal' | 'small-group' | 'ministry-leader'

export interface SermonQuestion {
  id: string
  text: string
  status: SermonQuestionStatus
}

export interface SermonQuestionGroup {
  id: SermonQuestionGroupId
  title: string
  description: string
  questions: SermonQuestion[]
}

export type QuestionAudience =
  | 'General congregation'
  | 'Small group'
  | 'Ministry leaders'
  | 'Youth'
  | 'Children'

export type QuestionStyle =
  | 'Reflection'
  | 'Discussion'
  | 'Scripture study'
  | 'Practical application'

export const questionAudiences: QuestionAudience[] = [
  'General congregation',
  'Small group',
  'Ministry leaders',
  'Youth',
  'Children',
]

export const questionStyles: QuestionStyle[] = [
  'Reflection',
  'Discussion',
  'Scripture study',
  'Practical application',
]

export const sermonQuestionGroups: SermonQuestionGroup[] = [
  {
    id: 'personal',
    title: 'Personal reflection',
    description: 'Questions for individual reflection after the message.',
    questions: [
      { id: 'personal-1', text: 'What part of the message was most relevant to your current situation?', status: 'Draft' },
      { id: 'personal-2', text: 'Where is faithful action required in your life this week?', status: 'Draft' },
      { id: 'personal-3', text: 'Which scripture from the sermon would you like to study further?', status: 'Draft' },
    ],
  },
  {
    id: 'small-group',
    title: 'Small-group discussion',
    description: 'Prompts for a calm, practical group conversation.',
    questions: [
      { id: 'small-group-1', text: 'How can the church community support people during difficult seasons?', status: 'Draft' },
      { id: 'small-group-2', text: 'What is the difference between passive waiting and faithful action?', status: 'Draft' },
      { id: 'small-group-3', text: 'What practical response can the group take together?', status: 'Draft' },
    ],
  },
  {
    id: 'ministry-leader',
    title: 'Ministry-leader follow-up',
    description: 'Review prompts for pastoral, care, and ministry decisions.',
    questions: [
      { id: 'ministry-leader-1', text: 'Are there individuals or households who may require follow-up?', status: 'Draft' },
      { id: 'ministry-leader-2', text: 'Did the sermon identify a ministry or community need?', status: 'Draft' },
      { id: 'ministry-leader-3', text: 'Should this topic continue in a future teaching or group discussion?', status: 'Draft' },
    ],
  },
]

export const generatedQuestionSamples = [
  'What idea from the message deserves more reflection this week?',
  'How does the featured scripture shape a practical response?',
  'Where might the community need patient and faithful support?',
  'What could help turn this message into a shared action?',
  'Which assumption from the discussion should be examined further?',
  'How could this theme be explored in a smaller group setting?',
  'What question would help a younger listener engage with this theme?',
  'Which ministry team may need to consider a follow-up response?',
  'What is one realistic step that could be taken before next week?',
  'What further context would help the church review this topic responsibly?',
]

export interface CompletedServiceRecord {
  id: string
  name: string
  date: string
  dateLabel: string
  day: string
  month: string
  time: string
  location: string
  attendance: number
  newVisitors: number
  followUpTasks: number
  operationalNote: string
  notes: string
  sermonInsightStatus: SermonWorkflowState
  actionLabel: string
  actionTo: string
  sermon?: SermonRecord
}

export const completedServices: CompletedServiceRecord[] = [
  {
    id: 'sunday-worship-12-july',
    name: 'Sunday Worship',
    date: '2026-07-12',
    dateLabel: '12 July 2026',
    day: '12',
    month: 'JUL',
    time: '9:00 AM–11:00 AM',
    location: 'Delhi Central Church',
    attendance: 398,
    newVisitors: 6,
    followUpTasks: 6,
    operationalNote: '6 new visitors',
    notes: 'The gathering finished on schedule. Attendance and visitor records were reviewed by the fictional Delhi operations team.',
    sermonInsightStatus: 'Insights ready for review',
    actionLabel: 'Review service',
    actionTo: '/services/sunday-worship-12-july',
    sermon: {
      title: 'Hope in Everyday Service',
      speaker: 'Mira Senfield — fictional sample speaker',
      sourceType: 'Fictional online video link',
      sourceUrl: 'https://video.example.invalid/nexora-preview/sunday-worship',
      duration: '31 minutes',
      transcriptStatus: 'Fictional transcript available',
      transcriptPreview:
        'This local sample transcript introduces the theme of attentive service, shared responsibility, and practical hope. It contains no audio-derived or real sermon content.',
      workflowState: 'Insights ready for review',
      questionReviewStatus: 'Questions ready for review',
      insights: {
        summary:
          'A fictional draft summary exploring how practical service, shared responsibility, and compassionate attention to neighbours can shape everyday community life.',
        mainHeadings: [
          'Service begins with attentive listening',
          'Shared responsibility strengthens community',
          'Small actions can express durable hope',
        ],
        themes: ['Compassionate service', 'Shared responsibility', 'Neighbourly care', 'Hope in action'],
        scriptureReferences: ['Micah 6:8', 'Mark 10:45', 'James 2:14–17'],
        keyTakeaways: [
          'Notice practical needs before choosing a response.',
          'Invite people into sustainable service rather than isolated activity.',
          'Connect Sunday reflection with specific actions during the week.',
        ],
        discussionQuestions: [
          'Where is attentive listening most needed in our community this week?',
          'Which responsibilities could be shared more effectively?',
          'What small action would make hope visible to a neighbour?',
        ],
        suggestedActions: [
          'Invite ministry leads to identify one practical follow-up action.',
          'Share the discussion questions with small-group facilitators after review.',
          'Route any identified care needs through the appropriate confidential workflow.',
        ],
      },
    },
  },
  {
    id: 'community-worship-12-july',
    name: 'Community Worship Gathering',
    date: '2026-07-12',
    dateLabel: '12 July 2026',
    day: '12',
    month: 'JUL',
    time: '11:00 AM–12:30 PM',
    location: 'Noida Community Church',
    attendance: 271,
    newVisitors: 4,
    followUpTasks: 4,
    operationalNote: 'Follow-up tasks assigned',
    notes: 'Aggregate attendance was recorded and the fictional follow-up queue was prepared for local review.',
    sermonInsightStatus: 'Processing',
    actionLabel: 'View follow-up',
    actionTo: '/care-follow-up',
  },
  {
    id: 'midweek-prayer-8-july',
    name: 'Midweek Prayer Gathering',
    date: '2026-07-08',
    dateLabel: '8 July 2026',
    day: '08',
    month: 'JUL',
    time: '6:30 PM–7:30 PM',
    location: 'Delhi Central Church',
    attendance: 96,
    newVisitors: 1,
    followUpTasks: 1,
    operationalNote: 'Brief notes available',
    notes: 'A short fictional operational note was captured after the gathering. No sermon source was added.',
    sermonInsightStatus: 'No sermon added',
    actionLabel: 'Review notes',
    actionTo: '/reports',
  },
]
