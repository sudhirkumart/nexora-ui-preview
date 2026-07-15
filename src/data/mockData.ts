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
  name: 'Horizon Community Network',
  shortName: 'HCN',
  level: 'Global Office',
  description:
    'A fictional network coordinating locally led community wellbeing initiatives.',
  hierarchy: [
    { name: 'Global Office', type: 'Network', count: 1 },
    { name: 'India Country Office', type: 'Country office', count: 1 },
    { name: 'North Region', type: 'Region', count: 1 },
    { name: 'Delhi Community Centre', type: 'Community centre', count: 1 },
    { name: 'Noida Outreach Centre', type: 'Outreach centre', count: 1 },
  ],
}

export const summaryMetrics = [
  {
    label: 'People in network',
    value: '2,486',
    detail: 'Across 5 organisation levels',
    trend: '+8.2%',
    icon: 'people',
  },
  {
    label: 'Active programs',
    value: '12',
    detail: '4 currently enrolling',
    trend: '+2 this quarter',
    icon: 'programs',
  },
  {
    label: 'Outreach activities',
    value: '38',
    detail: 'Completed this quarter',
    trend: '84% on plan',
    icon: 'outreach',
  },
  {
    label: 'Active locations',
    value: '5',
    detail: 'Across the sample hierarchy',
    trend: 'All reporting',
    icon: 'locations',
  },
]

export const recentActivities = [
  {
    title: 'Program milestone recorded',
    description: 'Skills Pathways reached its quarterly participation goal.',
    time: 'Today, 10:30',
    type: 'milestone',
  },
  {
    title: 'Outreach visit completed',
    description: 'The field team completed a community listening session.',
    time: 'Yesterday, 15:10',
    type: 'outreach',
  },
  {
    title: 'Monthly summary prepared',
    description: 'North Region submitted its fictional review summary.',
    time: '2 days ago',
    type: 'report',
  },
  {
    title: 'New cohort opened',
    description: 'Neighbourhood Wellbeing opened a new sample cohort.',
    time: '4 days ago',
    type: 'program',
  },
]

export const upcomingEvents = [
  {
    day: '18',
    month: 'JUL',
    title: 'Regional program review',
    meta: '10:00–11:30 · Online review',
    tag: 'Review',
  },
  {
    day: '22',
    month: 'JUL',
    title: 'Community listening session',
    meta: '14:00–16:00 · Delhi Community Centre',
    tag: 'Outreach',
  },
  {
    day: '29',
    month: 'JUL',
    title: 'Volunteer orientation',
    meta: '11:00–12:00 · Noida Outreach Centre',
    tag: 'People',
  },
]

export const programOutcomes = [
  { label: 'Wellbeing workshops', value: 82, result: '328 participants' },
  { label: 'Skills pathways', value: 68, result: '164 completions' },
  { label: 'Community leadership', value: 54, result: '72 leaders supported' },
]

export const pageContent = {
  organisations: {
    eyebrow: 'Network structure',
    title: 'Organisations',
    description:
      'Explore how offices, regions, centres, and teams connect across the network.',
    status: 'Under Review' as PreviewStatus,
    highlights: [
      ['5', 'Organisation levels'],
      ['2', 'Operating centres'],
      ['100%', 'Reporting coverage'],
    ],
  },
  people: {
    eyebrow: 'People & participation',
    title: 'People',
    description:
      'A future workspace for understanding participation, roles, teams, and support journeys.',
    status: 'Concept' as PreviewStatus,
    highlights: [
      ['2,486', 'People in network'],
      ['184', 'Active volunteers'],
      ['12', 'Program coordinators'],
    ],
  },
  programs: {
    eyebrow: 'Program delivery',
    title: 'Programs',
    description:
      'Review initiatives, cohorts, milestones, and outcomes across organisation levels.',
    status: 'In Development' as PreviewStatus,
    highlights: [
      ['12', 'Active programs'],
      ['4', 'Currently enrolling'],
      ['82%', 'Milestones on track'],
    ],
  },
  outreach: {
    eyebrow: 'Field engagement',
    title: 'Outreach',
    description:
      'Plan and review fictional community visits, listening sessions, and engagement activity.',
    status: 'Approved for Development' as PreviewStatus,
    highlights: [
      ['38', 'Quarterly activities'],
      ['316', 'Conversations logged'],
      ['84%', 'Activity plan complete'],
    ],
  },
  maps: {
    eyebrow: 'Geographic view',
    title: 'Maps',
    description:
      'A planned geographic view of sample locations, programs, and coverage without precise coordinates.',
    status: 'Concept' as PreviewStatus,
    highlights: [
      ['5', 'Sample locations'],
      ['3', 'Coverage zones'],
      ['0', 'Precise addresses'],
    ],
  },
  reports: {
    eyebrow: 'Insights & learning',
    title: 'Reports',
    description:
      'Bring progress, learning, and outcome summaries together for different organisation levels.',
    status: 'Demo Ready' as PreviewStatus,
    highlights: [
      ['8', 'Sample report views'],
      ['5', 'Organisation levels'],
      ['3', 'Outcome themes'],
    ],
  },
  settings: {
    eyebrow: 'Preview configuration',
    title: 'Settings',
    description:
      'Future controls for organisation preferences, program terminology, and preview behaviour.',
    status: 'Under Review' as PreviewStatus,
    highlights: [
      ['1', 'Sample organisation'],
      ['5', 'Workflow labels'],
      ['0', 'External connections'],
    ],
  },
}
