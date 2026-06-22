const projects = [
  {
    id: 1, title: 'Portfolio Website', client: 'Sneha Patel', assignee: 'Priya Nair',
    priority: 'High', status: 'In Progress', progress: 65, due: '2026-07-15',
    description: 'Complete redesign of the portfolio site with animations and case studies.',
    team: ['Priya Nair', 'Anika Patel'],
    tasks: { total: 12, done: 8 },
    notes: 'Client approved wireframes. Moving to development phase.',
    color: '#DC2626'
  },
  {
    id: 2, title: 'Analytics Tool', client: 'Karan Singh', assignee: 'Sarah Chen',
    priority: 'High', status: 'In Progress', progress: 42, due: '2026-07-20',
    description: 'Build a real-time analytics dashboard with custom event tracking.',
    team: ['Sarah Chen', 'Marcus Bell'],
    tasks: { total: 18, done: 8 },
    notes: 'Backend API 80% complete. Frontend integration starting.',
    color: '#6B7280'
  },
  {
    id: 3, title: 'Mobile App', client: 'Divya Nair', assignee: 'Anika Patel',
    priority: 'High', status: 'Todo', progress: 10, due: '2026-08-10',
    description: 'Cross-platform mobile application for iOS and Android.',
    team: ['Anika Patel', 'Marcus Bell'],
    tasks: { total: 24, done: 3 },
    notes: 'Requirements gathering done. Starting sprint planning.',
    color: '#10B981'
  },
  {
    id: 4, title: 'Client Dashboard', client: 'Arjun Mehta', assignee: 'Marcus Bell',
    priority: 'Medium', status: 'Todo', progress: 0, due: '2026-07-30',
    description: 'Custom admin dashboard with role-based access control.',
    team: ['Marcus Bell', 'Sarah Chen'],
    tasks: { total: 15, done: 0 },
    notes: 'Waiting on client design assets before kickoff.',
    color: '#F59E0B'
  },
  {
    id: 5, title: 'Landing Page', client: 'Vikram Joshi', assignee: 'Tom Hughes',
    priority: 'Medium', status: 'Done', progress: 100, due: '2026-06-30',
    description: 'High-converting landing page with A/B testing setup.',
    team: ['Tom Hughes', 'Priya Nair'],
    tasks: { total: 8, done: 8 },
    notes: 'Launched. Conversion rate at 4.2% — above benchmark.',
    color: '#EF4444'
  },
  {
    id: 6, title: 'Marketing Site', client: 'Rahul Sharma', assignee: 'Sarah Chen',
    priority: 'Low', status: 'Done', progress: 100, due: '2026-06-15',
    description: 'Full company marketing website with blog and CMS integration.',
    team: ['Sarah Chen', 'Anika Patel'],
    tasks: { total: 10, done: 10 },
    notes: 'Live and indexed. SEO score 87/100.',
    color: '#3B82F6'
  },
  {
    id: 7, title: 'Customer Portal', client: 'Ananya Bose', assignee: 'Olivia Grant',
    priority: 'Low', status: 'Todo', progress: 5, due: '2026-08-01',
    description: 'Self-service portal for customers to manage subscriptions and invoices.',
    team: ['Olivia Grant'],
    tasks: { total: 9, done: 1 },
    notes: 'Scoped and estimated. Awaiting project kickoff.',
    color: '#DC2626'
  },
  {
    id: 8, title: 'Pricing Page', client: 'Priya Reddy', assignee: 'Priya Nair',
    priority: 'Medium', status: 'In Progress', progress: 78, due: '2026-07-10',
    description: 'Redesign pricing page with comparison table and FAQ section.',
    team: ['Priya Nair'],
    tasks: { total: 6, done: 5 },
    notes: 'Final review pending with client.',
    color: '#6B7280'
  },
];

export default projects;
