import { BarChart, Briefcase, DollarSign, MapPin, Users, TrendingUp } from 'lucide-react';

export const jobFilters = {
  jobType: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Volunteer', 'Government'],
  provinces: ['Lusaka', 'Copperbelt', 'Central', 'Eastern', 'Luapula', 'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western'],
};

export const jobs = [
  {
    id: '1',
    title: 'Secondary School Teacher',
    company: 'Ministry of Education',
    logo: 'https://placehold.co/100x100.png',
    location: 'Lusaka, Lusaka',
    salary: 'ZMW 8,000 - ZMW 12,000',
    type: 'Government',
    description: 'Seeking a qualified teacher for a government secondary school in Lusaka.',
    tags: ['Education', 'Teaching', 'Government'],
  },
  {
    id: '2',
    title: 'Registered Nurse',
    company: 'Ndola Central Hospital',
    logo: 'https://placehold.co/100x100.png',
    location: 'Ndola, Copperbelt',
    salary: 'ZMW 9,000 - ZMW 14,000',
    type: 'Healthcare',
    description: 'We are looking for a compassionate Registered Nurse to join our team at a major hospital in the Copperbelt.',
    tags: ['Healthcare', 'Nursing', 'Public Sector'],
  },
  {
    id: '3',
    title: 'ICT Officer',
    company: 'Zambia Revenue Authority',
    logo: 'https://placehold.co/100x100.png',
    location: 'Kitwe, Copperbelt',
    salary: 'ZMW 10,000 - ZMW 15,000',
    type: 'Government',
    description: 'Join our ICT team to support and maintain our critical systems.',
    tags: ['ICT', 'Government', 'Networking'],
  },
  {
    id: '4',
    title: 'Construction Foreman',
    company: 'Zhong-Gan Engineering',
    logo: 'https://placehold.co/100x100.png',
    location: 'Lusaka, Lusaka',
    salary: 'ZMW 7,000 - ZMW 11,000',
    type: 'Full-time',
    description: 'Supervise construction projects and ensure they are completed on time and within budget.',
    tags: ['Construction', 'Supervision', 'Civil Engineering'],
  },
  {
    id: '5',
    title: 'Accountant',
    company: 'Airtel Zambia',
    logo: 'https://placehold.co/100x100.png',
    location: 'Lusaka, (Hybrid)',
    salary: 'ZMW 12,000 - ZMW 18,000',
    type: 'Full-time',
    description: 'An exciting opportunity for an experienced accountant to join a leading telecommunications company.',
    tags: ['Accounting', 'Finance', 'ACCA'],
  },
];

export const applications = [
  {
    id: '1',
    jobTitle: 'Secondary School Teacher',
    company: 'Ministry of Education',
    status: 'Viewed',
    appliedDate: '2024-05-20',
  },
  {
    id: '2',
    jobTitle: 'Registered Nurse',
    company: 'Ndola Central Hospital',
    status: 'Shortlisted',
    appliedDate: '2024-05-18',
  },
  {
    id: '3',
    jobTitle: 'ICT Officer',
    company: 'Zambia Revenue Authority',
    status: 'Submitted',
    appliedDate: '2024-05-22',
  },
];

export const recruiterJobs = [
    {
        id: '1',
        title: 'Secondary School Teacher',
        status: 'Open',
        applicants: 42,
        interviews: 5,
    },
    {
        id: '2',
        title: 'Accountant',
        status: 'Open',
        applicants: 31,
        interviews: 3,
    },
    {
        id: '3',
        title: 'Civil Engineer',
        status: 'Closed',
        applicants: 58,
        interviews: 8,
    }
];

export const analyticsData = {
    stats: [
        { name: 'Total Jobs Posted', value: '12', icon: Briefcase },
        { name: 'Total Applicants', value: '237', icon: Users },
        { name: 'Active Listings', value: '8', icon: TrendingUp },
        { name: 'Avg. Applicants/Job', value: '19.8', icon: BarChart },
    ],
    chartData: [
        { month: 'Jan', applications: 45 },
        { month: 'Feb', applications: 62 },
        { month: 'Mar', applications: 81 },
        { month: 'Apr', applications: 74 },
        { month: 'May', applications: 98 },
        { month: 'Jun', applications: 112 },
    ]
};
