import { BarChart, Briefcase, DollarSign, MapPin, Users, TrendingUp } from 'lucide-react';

export const jobFilters = {
  jobType: ['Full-time', 'Part-time', 'Contract', 'Internship'],
};

export const jobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Innovatech',
    logo: 'https://placehold.co/100x100.png',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    description: 'Seeking a skilled Senior Frontend Developer to build and maintain our next-generation user interfaces.',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'DataDriven Co.',
    logo: 'https://placehold.co/100x100.png',
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    description: 'We are looking for an experienced Product Manager to lead our product development lifecycle from conception to launch.',
    tags: ['Agile', 'Roadmap', 'User Research'],
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Creative Studio',
    logo: 'https://placehold.co/100x100.png',
    location: 'Remote',
    salary: '$90,000 - $110,000',
    type: 'Contract',
    description: 'Join our team to design intuitive and engaging user experiences for our web and mobile applications.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    id: '4',
    title: 'Backend Engineer (Go)',
    company: 'ScaleFast',
    logo: 'https://placehold.co/100x100.png',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    description: 'Help us build scalable and reliable backend services using Go and modern cloud technologies.',
    tags: ['Go', 'Microservices', 'AWS', 'Kubernetes'],
  },
  {
    id: '5',
    title: 'Marketing Intern',
    company: 'GrowthHackers',
    logo: 'https://placehold.co/100x100.png',
    location: 'Boston, MA (Hybrid)',
    salary: '$25/hour',
    type: 'Internship',
    description: 'An exciting opportunity for a marketing student to gain hands-on experience in a fast-paced startup.',
    tags: ['SEO', 'Content Marketing', 'Social Media'],
  },
];

export const applications = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'Innovatech',
    status: 'Viewed',
    appliedDate: '2024-05-20',
  },
  {
    id: '2',
    jobTitle: 'Product Manager',
    company: 'DataDriven Co.',
    status: 'Shortlisted',
    appliedDate: '2024-05-18',
  },
  {
    id: '3',
    jobTitle: 'Backend Engineer (Go)',
    company: 'ScaleFast',
    status: 'Submitted',
    appliedDate: '2024-05-22',
  },
];

export const recruiterJobs = [
    {
        id: '1',
        title: 'Senior Frontend Developer',
        status: 'Open',
        applicants: 42,
        interviews: 5,
    },
    {
        id: '2',
        title: 'Data Scientist',
        status: 'Open',
        applicants: 31,
        interviews: 3,
    },
    {
        id: '3',
        title: 'Cloud Architect',
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
