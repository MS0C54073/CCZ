
import { subDays, subHours } from 'date-fns';

export type Notification = {
  id: string;
  message: string;
  date: string;
  read: boolean;
  type: 'application' | 'shortlist' | 'rejection' | 'general';
};

export const notifications: Notification[] = [
  {
    id: 'n1',
    message: 'Welcome to Career Connect Zambia! Complete your profile to start applying for jobs.',
    date: subDays(new Date(), 1).toISOString(),
    read: true,
    type: 'general',
  },
  {
    id: 'n2',
    message: 'Your application for Senior Accountant at Pro-Finance Ltd has been viewed by the recruiter.',
    date: subHours(new Date(), 8).toISOString(),
    read: true,
    type: 'application',
  },
  {
    id: 'n3',
    message: 'Congratulations! You have been shortlisted for the Registered Nurse position at Ndola Central Hospital. Expect an email with interview details soon.',
    date: subHours(new Date(), 2).toISOString(),
    read: false,
    type: 'shortlist',
  },
  {
    id: 'n4',
    message: 'Regarding your application for ICT Officer: the position has been filled. We wish you the best in your job search and encourage you to apply for other roles.',
    date: subDays(new Date(), 2).toISOString(),
    read: false,
    type: 'rejection',
  },
];
