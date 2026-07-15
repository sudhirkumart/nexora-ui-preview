export type PreviewStatus =
  | 'Concept'
  | 'Under Review'
  | 'Approved for Development'
  | 'In Development'
  | 'Demo Ready'

export const previewStatuses: PreviewStatus[] = [
  'Concept',
  'Under Review',
  'Approved for Development',
  'In Development',
  'Demo Ready',
]

export const organisation = {
  name: 'Horizon Church & Community Network',
  shortName: 'HCCN',
  level: 'Global Office',
  description:
    'A fictional multi-location church network coordinating worship, participation, community outreach, and development work.',
  hierarchy: [
    { id: 'global', name: 'Global Office', type: 'Network' },
    { id: 'india', name: 'India Country Office', type: 'Country office' },
    { id: 'north-india', name: 'North India Region', type: 'Region' },
    { id: 'delhi-central', name: 'Delhi Central Church', type: 'Church' },
    { id: 'noida-community', name: 'Noida Community Church', type: 'Church' },
    { id: 'greater-noida-outreach', name: 'Greater Noida Outreach Centre', type: 'Outreach centre' },
  ],
}

export const summaryMetrics = [
  {
    label: 'People in network',
    value: '2,846',
    detail: 'Members, visitors, volunteers, and participants',
    trend: '+6.4% this year',
    icon: 'people',
  },
  {
    label: 'Average weekly attendance',
    value: '1,184',
    detail: 'Across the fictional church locations',
    trend: '82% of planned capacity',
    icon: 'attendance',
  },
  {
    label: 'Upcoming services',
    value: '7',
    detail: 'Scheduled in the next 14 days',
    trend: 'Across 2 churches',
    icon: 'services',
  },
  {
    label: 'New visitors',
    value: '18',
    detail: 'Recorded during the current month',
    trend: '6 require follow-up',
    icon: 'visitors',
  },
  {
    label: 'Active small groups',
    value: '24',
    detail: '286 current participants',
    trend: '4 near capacity',
    icon: 'groups',
  },
  {
    label: 'Volunteer coverage gaps',
    value: '9',
    detail: 'Open positions across upcoming services',
    trend: 'Needs attention',
    icon: 'volunteers',
  },
]

export const attentionSummary = [
  {
    label: '2 volunteer roles unfilled for Sunday',
    detail: 'Community Worship Gathering at Noida Community Church',
    actionLabel: 'Review roles',
    to: '/volunteers',
    icon: 'volunteers',
    priority: 1,
    requiresAttention: true,
  },
  {
    label: '8 visitors awaiting follow-up',
    detail: 'Oldest item has waited 3 days',
    actionLabel: 'Open follow-up',
    to: '/care-follow-up',
    icon: 'visitors',
    priority: 2,
    requiresAttention: true,
  },
  {
    label: '1 church location requires review',
    detail: 'Noida volunteer readiness needs attention',
    actionLabel: 'Review location',
    to: '/locations',
    icon: 'locations',
    priority: 3,
    requiresAttention: true,
  },
]

export const networkPulse = [
  { label: 'Average weekly attendance', value: '1,184' },
  { label: 'Visitors awaiting follow-up', value: '8' },
  { label: 'Locations requiring attention', value: '1' },
]

export const dashboardHeadlineMetrics = [
  {
    label: 'Average weekly attendance',
    value: '1,184',
    detail: 'Across two fictional church locations',
    icon: 'attendance',
  },
  {
    label: 'Upcoming services',
    value: '3',
    detail: 'Scheduled in the next 14 days',
    icon: 'services',
  },
  {
    label: 'Visitors awaiting follow-up',
    value: '8',
    detail: 'Across three aggregate visitor groups',
    icon: 'visitors',
  },
  {
    label: 'Unfilled volunteer positions',
    value: '2',
    detail: 'Across upcoming ministry assignments',
    icon: 'volunteers',
  },
]

export const upcomingServices = [
  {
    day: '19',
    month: 'JUL',
    name: 'Sunday Celebration',
    location: 'Delhi Central Church',
    time: '09:30–11:15',
    expectedAttendance: 420,
    volunteerCoverage: 'Covered',
    coverageTone: 'ready',
    volunteerReadiness: 'Ready',
    openVolunteerRoles: 0,
    requiresAttention: false,
  },
  {
    day: '19',
    month: 'JUL',
    name: 'Community Worship Gathering',
    location: 'Noida Community Church',
    time: '11:00–12:30',
    expectedAttendance: 285,
    volunteerCoverage: '2 roles open',
    coverageTone: 'attention',
    volunteerReadiness: 'Attention needed',
    openVolunteerRoles: 2,
    requiresAttention: true,
  },
  {
    day: '22',
    month: 'JUL',
    name: 'Midweek Prayer & Reflection',
    location: 'Delhi Central Church',
    time: '18:30–19:30',
    expectedAttendance: 110,
    volunteerCoverage: 'Covered',
    coverageTone: 'ready',
    volunteerReadiness: 'Ready',
    openVolunteerRoles: 0,
    requiresAttention: false,
  },
]

export const visitorFollowUps = [
  {
    cohort: 'Delhi Sunday visitors',
    visitors: 3,
    owner: 'Delhi welcome team',
    status: 'Contact planned',
    daysWaiting: 1,
    tone: 'planned',
  },
  {
    cohort: 'Noida family visitors',
    visitors: 3,
    owner: 'Noida follow-up team',
    status: 'In progress',
    daysWaiting: 2,
    tone: 'progress',
  },
  {
    cohort: 'Community event visitors',
    visitors: 2,
    owner: 'Regional care coordinator',
    status: 'Needs assignment',
    daysWaiting: 3,
    tone: 'attention',
  },
]

export const careSummary = [
  { value: '11', label: 'Open care follow-ups' },
  { value: '8', label: 'Conversations scheduled' },
  { value: '3', label: 'Awaiting assignment' },
]

export const ministryCoverage = [
  { ministry: 'Worship', coverage: 100, detail: 'All positions covered' },
  { ministry: 'Welcome team', coverage: 88, detail: '2 positions open' },
  { ministry: 'Children’s ministry', coverage: 75, detail: '4 positions open' },
  { ministry: 'Media', coverage: 92, detail: '1 position open' },
  { ministry: 'Community outreach', coverage: 80, detail: '2 positions open' },
]

export const ministryReadiness = [
  { ministry: 'Worship team', status: 'Ready', detail: 'All roles assigned', tone: 'ready' },
  { ministry: 'Welcome team', status: 'Attention needed', detail: '1 role still open', tone: 'attention' },
  { ministry: 'Children’s ministry', status: 'Roles unfilled', detail: '1 role still open', tone: 'unfilled' },
  { ministry: 'Media team', status: 'Ready', detail: 'All roles assigned', tone: 'ready' },
  { ministry: 'Outreach team', status: 'Ready', detail: 'Next activity covered', tone: 'ready' },
]

export const groupsSummary = {
  active: 24,
  participation: 286,
  nearCapacity: 4,
  requireLeaders: 3,
  participationTrend: 74,
}

export const locationSnapshots = [
  {
    name: 'Delhi Central Church',
    weeklyParticipation: 612,
    services: 3,
    groups: 12,
    volunteers: 84,
    status: 'On track',
  },
  {
    name: 'Noida Community Church',
    weeklyParticipation: 432,
    services: 2,
    groups: 8,
    volunteers: 56,
    status: 'On track',
  },
  {
    name: 'Greater Noida Outreach Centre',
    weeklyParticipation: 140,
    services: 0,
    groups: 4,
    volunteers: 28,
    status: 'Review coverage',
  },
]

export const locationDecisionSnapshots = [
  {
    name: 'Delhi Central Church',
    attendance: 612,
    followUpItems: 3,
    volunteerReadiness: 'Ready',
    overallStatus: 'On track',
    tone: 'ready',
  },
  {
    name: 'Noida Community Church',
    attendance: 432,
    followUpItems: 3,
    volunteerReadiness: 'Attention needed',
    overallStatus: 'Needs attention',
    tone: 'attention',
  },
  {
    name: 'Greater Noida Outreach Centre',
    attendance: 140,
    followUpItems: 2,
    volunteerReadiness: 'Ready',
    overallStatus: 'On track',
    tone: 'ready',
  },
]

export const communityActivities = [
  {
    name: 'Neighbourhood listening day',
    location: 'Greater Noida Outreach Centre',
    type: 'Community engagement',
    date: '24 Jul',
    outcome: '60 conversations planned',
  },
  {
    name: 'Family wellbeing workshop',
    location: 'Noida Community Church',
    type: 'Community development',
    date: '27 Jul',
    outcome: '45 places available',
  },
  {
    name: 'Volunteer-led skills session',
    location: 'Delhi Central Church',
    type: 'Development program',
    date: '31 Jul',
    outcome: '32 participants registered',
  },
]

export const recentActivities = [
  {
    title: 'Weekend attendance summary prepared',
    description: 'Both fictional church locations completed their weekly attendance review.',
    time: 'Today, 10:30',
    type: 'service',
  },
  {
    title: 'Visitor follow-up queue updated',
    description: 'Six aggregate visitor follow-ups were marked for team attention.',
    time: 'Yesterday, 15:10',
    type: 'visitor',
  },
  {
    title: 'Volunteer roster reviewed',
    description: 'Upcoming service assignments were checked across ministry teams.',
    time: '2 days ago',
    type: 'volunteer',
  },
  {
    title: 'Community activity plan approved',
    description: 'The next fictional outreach and development activities moved into planning.',
    time: '4 days ago',
    type: 'outreach',
  },
]

export const ministryOutcomes = [
  { label: 'Visitor follow-up within 48 hours', value: 78, result: '14 of 18 visitors' },
  { label: 'Upcoming volunteer coverage', value: 92, result: '104 of 113 positions' },
  { label: 'Small-group participation', value: 74, result: '286 active participants' },
  { label: 'Community activity completion', value: 68, result: '17 of 25 activities' },
]

export const pageContent = {
  people: {
    eyebrow: 'People & participation',
    title: 'People',
    description:
      'Explore planned workflows for members, visitors, households, leaders, volunteers, and participation across the network.',
    status: 'Under Review' as PreviewStatus,
    highlights: [
      ['2,846', 'People in network'],
      ['18', 'New visitors this month'],
      ['168', 'Active volunteers'],
    ],
  },
  'services-events': {
    eyebrow: 'Gatherings & schedules',
    title: 'Services & Events',
    description:
      'A planned workspace for worship services, meetings, ministry events, recurring schedules, attendance, and team readiness.',
    status: 'In Development' as PreviewStatus,
    highlights: [
      ['7', 'Upcoming services'],
      ['1,184', 'Average weekly attendance'],
      ['92%', 'Volunteer coverage'],
    ],
  },
  groups: {
    eyebrow: 'Groups & belonging',
    title: 'Groups',
    description:
      'Review small groups, ministry groups, leaders, membership, participation, and capacity across church locations.',
    status: 'Concept' as PreviewStatus,
    highlights: [
      ['24', 'Active groups'],
      ['286', 'Current participants'],
      ['4', 'Groups near capacity'],
    ],
  },
  volunteers: {
    eyebrow: 'Teams & service',
    title: 'Volunteers',
    description:
      'Plan ministry teams, roles, availability, service assignments, and coverage without exposing personal details.',
    status: 'Under Review' as PreviewStatus,
    highlights: [
      ['168', 'Active volunteers'],
      ['113', 'Upcoming positions'],
      ['9', 'Positions open'],
    ],
  },
  'care-follow-up': {
    eyebrow: 'Care & connection',
    title: 'Care & Follow-up',
    description:
      'A planned, privacy-conscious workspace for visitor follow-up, member care, and confidential pastoral workflows.',
    status: 'Concept' as PreviewStatus,
    highlights: [
      ['11', 'Open follow-ups'],
      ['8', 'Conversations scheduled'],
      ['0', 'Sensitive details shown'],
    ],
  },
  outreach: {
    eyebrow: 'Church & community',
    title: 'Outreach',
    description:
      'Coordinate fictional community outreach, field engagement, community-development activity, and program delivery.',
    status: 'Approved for Development' as PreviewStatus,
    highlights: [
      ['25', 'Quarterly activities'],
      ['17', 'Activities completed'],
      ['68%', 'Plan completion'],
    ],
  },
  calendar: {
    eyebrow: 'Shared planning',
    title: 'Calendar',
    description:
      'A future combined calendar for services, ministry events, groups, volunteer assignments, and outreach activity.',
    status: 'Under Review' as PreviewStatus,
    highlights: [
      ['7', 'Upcoming services'],
      ['6', 'Ministry events'],
      ['3', 'Community activities'],
    ],
  },
  locations: {
    eyebrow: 'Multi-location network',
    title: 'Locations',
    description:
      'Explore the fictional organisation hierarchy, church locations, outreach centres, and aggregate operating summaries.',
    status: 'Demo Ready' as PreviewStatus,
    highlights: [
      ['6', 'Organisation levels'],
      ['2', 'Church locations'],
      ['1', 'Outreach centre'],
    ],
  },
  reports: {
    eyebrow: 'Insights & learning',
    title: 'Reports',
    description:
      'Bring attendance, participation, volunteer coverage, groups, care, outreach, and community outcomes into review-ready summaries.',
    status: 'Demo Ready' as PreviewStatus,
    highlights: [
      ['9', 'Sample report views'],
      ['6', 'Organisation levels'],
      ['4', 'Outcome themes'],
    ],
  },
  settings: {
    eyebrow: 'Preview configuration',
    title: 'Settings',
    description:
      'Future controls for organisation preferences, terminology, service patterns, and preview behaviour.',
    status: 'Under Review' as PreviewStatus,
    highlights: [
      ['1', 'Fictional network'],
      ['5', 'Workflow labels'],
      ['0', 'External connections'],
    ],
  },
}
