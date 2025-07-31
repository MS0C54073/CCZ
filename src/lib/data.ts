import { BarChart, Briefcase, DollarSign, MapPin, Users, TrendingUp } from 'lucide-react';
import { subDays } from 'date-fns';

export const jobFilters = {
  jobType: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Volunteer', 'Government', 'Remote', 'Hybrid', 'Healthcare'],
  provinces: ['Lusaka', 'Copperbelt', 'Central', 'Eastern', 'Luapula', 'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western'],
  locations: {
    'Lusaka': ['Lusaka', 'Chilanga', 'Chongwe', 'Kafue', 'Luangwa', 'Rufunsa'],
    'Copperbelt': ['Ndola', 'Kitwe', 'Chingola', 'Mufulira', 'Luanshya', 'Kalulushi', 'Chililabombwe', 'Lufwanyama', 'Mpongwe', 'Masaiti'],
    'Central': ['Kabwe', 'Serenje', 'Mkushi', 'Chibombo', 'Mumbwa', 'Kapiri Mposhi', 'Itezhi-Tezhi', 'Chisamba', 'Luano', 'Ngabwe'],
    'Eastern': ['Chipata', 'Lundazi', 'Petauke', 'Katete', 'Nyimba', 'Mambwe', 'Sinda', 'Chadiza', 'Vubwi'],
    'Luapula': ['Mansa', 'Nchelenge', 'Kawambwa', 'Samfya', 'Mwense', 'Chienge', 'Milenge', 'Lunga', 'Chipili', 'Chembe'],
    'Muchinga': ['Chinsali', 'Isoka', 'Mpika', 'Nakonde', 'Mafinga', 'Shiwang\'andu', 'Kanchibiya', 'Lavushimanda'],
    'Northern': ['Kasama', 'Mbala', 'Mporokoso', 'Luwingu', 'Mungwi', 'Kaputa', 'Nsama', 'Lupososhi', 'Senga Hill'],
    'North-Western': ['Solwezi', 'Mwinilunga', 'Kasempa', 'Zambezi', 'Kabompo', 'Ikelenge', 'Chavuma', 'Manyinga', 'Mushindamo'],
    'Southern': ['Livingstone', 'Choma', 'Mazabuka', 'Monze', 'Siavonga', 'Gwembe', 'Kalomo', 'Namwala', 'Itezhi-Tezhi', 'Kazungula', 'Pemba', 'Zimba', 'Chikankata'],
    'Western': ['Mongu', 'Kaoma', 'Sesheke', 'Senanga', 'Kalabo', 'Lukulu', 'Shang\'ombo', 'Sioma', 'Nkeyema', 'Mitete', 'Mwandi', 'Nalolo'],
  } as Record<string, string[]>,
};

export const jobs = [
  {
    id: '1',
    title: 'Secondary School Teacher',
    company: 'Ministry of Education',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Lusaka, Lusaka',
    salary: 'ZMW 8,000 - ZMW 12,000',
    type: 'Government',
    description: 'Seeking a qualified teacher for a government secondary school in Lusaka. Responsibilities include preparing lesson plans, teaching, and assessing students.',
    tags: ['Education', 'Teaching', 'Government'],
    postedDate: subDays(new Date(), 2).toISOString(),
    details: {
      tasks: [
        'Develop and implement engaging lesson plans that adhere to the national curriculum.',
        'Assess and evaluate student performance, providing constructive feedback.',
        'Maintain a positive and inclusive classroom environment.',
        'Collaborate with other teachers, parents, and administrators to support student development.'
      ],
      taskExamples: [
        'Conducting interactive classroom sessions using modern teaching aids.',
        'Grading assignments, tests, and examinations.',
        'Participating in staff meetings and professional development workshops.',
        'Organizing extracurricular activities or clubs.'
      ],
      whoWeAreLookingFor: [
        'A holder of a Bachelor’s degree in Education or a related field.',
        'Registered with the Teaching Council of Zambia (TCZ).',
        'Proven experience in teaching at a secondary school level.',
        'Excellent communication and interpersonal skills.'
      ],
      willBeAPlus: [
        'Experience with e-learning platforms.',
        'A Master’s degree in a specialized subject.',
        'Experience in a leadership role (e.g., Head of Department).'
      ],
      whatWeOffer: [
        'Competitive government salary and benefits package.',
        'Opportunities for career advancement and professional development.',
        'A supportive and collaborative work environment.',
        'Pension scheme and housing allowance.'
      ]
    }
  },
  {
    id: '2',
    title: 'Registered Nurse',
    company: 'Ndola Central Hospital',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Ndola, Copperbelt',
    salary: 'ZMW 9,000 - ZMW 14,000',
    type: 'Healthcare',
    description: 'We are looking for a compassionate Registered Nurse to join our team at a major hospital in the Copperbelt. Must be registered with the Nursing and Midwifery Council of Zambia.',
    tags: ['Healthcare', 'Nursing', 'Public Sector'],
    postedDate: subDays(new Date(), 5).toISOString(),
    details: {
        tasks: [
          'Providing direct patient care, including administering medication and treatments.',
          'Monitoring, recording, and reporting changes in patient conditions.',
          'Collaborating with doctors and other healthcare professionals.',
          'Educating patients and their families on disease prevention and management.'
        ],
        taskExamples: [
          'Dressing wounds and assessing patient vitals.',
          'Updating patient records with accuracy and confidentiality.',
          'Participating in ward rounds and clinical meetings.',
          'Providing emotional support to patients and their families.'
        ],
        whoWeAreLookingFor: [
          'Diploma or Bachelor’s degree in Nursing.',
          'Registered with the Nursing and Midwifery Council of Zambia (NMCZ).',
          'At least 2 years of clinical experience.',
          'Strong ethical standards and a compassionate nature.'
        ],
        willBeAPlus: [
          'Specialization in a specific area like Pediatrics, Midwifery, or Critical Care.',
          'Experience working in a high-volume hospital environment.',
          'Certification in Advanced Cardiac Life Support (ACLS) or Basic Life Support (BLS).'
        ],
        whatWeOffer: [
          'A stable job within the public healthcare system.',
          'Opportunities for specialization and further education.',
          'A challenging and rewarding work environment.',
          'Comprehensive health benefits and pension.'
        ]
      }
  },
  {
    id: '3',
    title: 'ICT Officer',
    company: 'Zambia Revenue Authority',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Kitwe, Copperbelt',
    salary: 'ZMW 10,000 - ZMW 15,000',
    type: 'Government',
    description: 'Join our ICT team to support and maintain our critical systems. Experience with network infrastructure and server management is required.',
    tags: ['ICT', 'Government', 'Networking'],
    postedDate: subDays(new Date(), 1).toISOString(),
    details: {
        tasks: [
          'Install, configure, and maintain computer hardware, software, systems, and networks.',
          'Provide technical support across the company (in person or over the phone).',
          'Monitor system performance and troubleshoot issues.',
          'Implement and maintain security protocols.'
        ],
        taskExamples: [
          'Setting up new user accounts and profiles.',
          'Repairing and replacing equipment as necessary.',
          'Running network diagnostics to resolve issues.',
          'Documenting technical procedures and user guides.'
        ],
        whoWeAreLookingFor: [
          'Bachelor’s degree in Computer Science, IT, or a related field.',
          'Proven experience as an ICT Officer or similar role.',
          'Strong knowledge of network security, management, and maintenance.',
          'Excellent problem-solving skills.'
        ],
        willBeAPlus: [
          'Professional certifications (e.g., CompTIA A+, Cisco CCNA).',
          'Experience with cloud computing (AWS, Azure).',
          'Familiarity with database management.'
        ],
        whatWeOffer: [
          'A key role in a critical national institution.',
          'Exposure to large-scale IT infrastructure.',
          'Competitive salary and continuous training opportunities.',
          'A dynamic and technologically driven work environment.'
        ]
      }
  },
  {
    id: '4',
    title: 'Construction Foreman',
    company: 'Zhong-Gan Engineering',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Lusaka, Lusaka',
    salary: 'ZMW 7,000 - ZMW 11,000',
    type: 'Full-time',
    description: 'Supervise construction projects and ensure they are completed on time and within budget. Must have over 5 years of experience in a similar role.',
    tags: ['Construction', 'Supervision', 'Civil Engineering'],
    postedDate: subDays(new Date(), 10).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '5',
    title: 'Accountant',
    company: 'Airtel Zambia',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Lusaka, (Hybrid)',
    salary: 'ZMW 12,000 - ZMW 18,000',
    type: 'Hybrid',
    description: 'An exciting opportunity for an experienced accountant to join a leading telecommunications company. ACCA or ZICA qualification is a must.',
    tags: ['Accounting', 'Finance', 'ACCA'],
    postedDate: subDays(new Date(), 7).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '6',
    title: 'Agronomist',
    company: 'Zambeef Products PLC',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Chisamba, Central',
    salary: 'ZMW 10,000 - ZMW 16,000',
    type: 'Full-time',
    description: 'Seeking an experienced agronomist to manage crop production and advise on best farming practices. A degree in Agriculture is required.',
    tags: ['Agriculture', 'Farming', 'Agronomy'],
    postedDate: subDays(new Date(), 12).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '7',
    title: 'Mining Engineer',
    company: 'First Quantum Minerals (FQM)',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Solwezi, North-Western',
    salary: 'ZMW 25,000 - ZMW 35,000',
    type: 'Full-time',
    description: 'Join one of Africa\'s largest copper mines. Responsible for planning and overseeing mining operations.',
    tags: ['Mining', 'Engineering', 'Copper'],
    postedDate: subDays(new Date(), 20).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '8',
    title: 'Lodge Manager',
    company: 'Tongabezi Lodge',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Livingstone, Southern',
    salary: 'ZMW 15,000 - ZMW 22,000',
    type: 'Full-time',
    description: 'Manage a world-renowned safari lodge, overseeing guest services, staff, and daily operations.',
    tags: ['Tourism', 'Hospitality', 'Management'],
    postedDate: subDays(new Date(), 4).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '9',
    title: 'Bank Teller',
    company: 'Zanaco Bank',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Chipata, Eastern',
    salary: 'ZMW 5,000 - ZMW 7,000',
    type: 'Full-time',
    description: 'Process transactions and provide excellent customer service at our Chipata branch.',
    tags: ['Banking', 'Finance', 'Customer Service'],
    postedDate: subDays(new Date(), 8).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '10',
    title: 'Frontend Developer',
    company: 'BongoHive',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Lusaka, Lusaka (Remote)',
    salary: 'ZMW 14,000 - ZMW 20,000',
    type: 'Remote',
    description: 'Build and maintain modern web applications using React and TypeScript for Zambia\'s leading tech hub.',
    tags: ['ICT', 'Software Development', 'React'],
    postedDate: subDays(new Date(), 3).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '11',
    title: 'Project Manager (NGO)',
    company: 'WWF Zambia',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Mongu, Western',
    salary: 'ZMW 18,000 - ZMW 25,000',
    type: 'Contract',
    description: 'Manage conservation projects in the Western Province. Experience in environmental work and community engagement is essential.',
    tags: ['NGO', 'Project Management', 'Conservation'],
    postedDate: subDays(new Date(), 15).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '12',
    title: 'Logistics Coordinator',
    company: 'Bolloré Logistics',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Ndola, Copperbelt',
    salary: 'ZMW 9,000 - ZMW 13,000',
    type: 'Full-time',
    description: 'Coordinate and monitor supply chain operations, including transportation and warehousing.',
    tags: ['Logistics', 'Supply Chain', 'Transport'],
    postedDate: subDays(new Date(), 22).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '13',
    title: 'Marketing Manager',
    company: 'MTN Zambia',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Lusaka, Lusaka',
    salary: 'ZMW 20,000 - ZMW 30,000',
    type: 'Full-time',
    description: 'Develop and implement marketing strategies to drive brand growth and customer acquisition.',
    tags: ['Marketing', 'Management', 'Telecoms'],
    postedDate: subDays(new Date(), 6).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '14',
    title: 'Heavy-Duty Mechanic',
    company: 'Hitachi Construction Machinery',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Kitwe, Copperbelt',
    salary: 'ZMW 12,000 - ZMW 18,000',
    type: 'Full-time',
    description: 'Service and repair heavy-duty mining and construction equipment.',
    tags: ['Mechanic', 'Mining', 'Artisan'],
    postedDate: subDays(new Date(), 40).toISOString(), // Older than 30 days
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '15',
    title: 'Human Resources Officer',
    company: 'Zambia Sugar PLC',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Mazabuka, Southern',
    salary: 'ZMW 11,000 - ZMW 16,000',
    type: 'Full-time',
    description: 'Manage recruitment, employee relations, and other HR functions at a large agricultural estate.',
    tags: ['Human Resources', 'HR', 'Agriculture'],
    postedDate: subDays(new Date(), 18).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '16',
    title: 'Data Analyst Intern',
    company: 'I-Venture',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Lusaka, Lusaka',
    salary: 'ZMW 3,000 - ZMW 5,000',
    type: 'Internship',
    description: 'An opportunity for a recent graduate to gain experience in data analysis, visualization, and reporting.',
    tags: ['Internship', 'Data Analysis', 'ICT'],
    postedDate: subDays(new Date(), 9).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '17',
    title: 'Electrician',
    company: 'ZESCO Limited',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Kasama, Northern',
    salary: 'ZMW 7,000 - ZMW 10,000',
    type: 'Government',
    description: 'Install, maintain, and repair electrical systems for the national power utility.',
    tags: ['Artisan', 'Electrical', 'Government'],
    postedDate: subDays(new Date(), 25).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '18',
    title: 'Sales Representative',
    company: 'Trade Kings Group',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Mansa, Luapula',
    salary: 'ZMW 6,000 + Commission',
    type: 'Full-time',
    description: 'Drive sales of FMCG products within the Luapula province. A driver\'s license is required.',
    tags: ['Sales', 'FMCG', 'Retail'],
    postedDate: subDays(new Date(), 28).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '19',
    title: 'Monitoring & Evaluation Officer',
    company: 'CARE International',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Chipata, Eastern',
    salary: 'ZMW 15,000 - ZMW 20,000',
    type: 'NGO',
    description: 'Track program performance and impact for an international NGO focused on poverty alleviation.',
    tags: ['NGO', 'M&E', 'Data'],
    postedDate: subDays(new Date(), 35).toISOString(), // Older than 30 days
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  },
  {
    id: '20',
    title: 'Veterinary Doctor',
    company: 'Ministry of Fisheries and Livestock',
    logo: 'https://drive.google.com/uc?export=view&id=1T0ZQJpT1egGN5TCIpCkFSfRwFmg1uwjf',
    location: 'Choma, Southern',
    salary: 'ZMW 12,000 - ZMW 17,000',
    type: 'Government',
    description: 'Provide veterinary services to farmers in the Southern province to improve livestock health and productivity.',
    tags: ['Government', 'Veterinary', 'Agriculture'],
    postedDate: subDays(new Date(), 1).toISOString(),
    details: {
        tasks: [],
        taskExamples: [],
        whoWeAreLookingFor: [],
        willBeAPlus: [],
        whatWeOffer: []
    }
  }
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
