
import { subDays, subHours, subMinutes } from 'date-fns';

type Participant = {
    id: string;
    name: string;
    avatar: string;
};

type Message = {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
};

type Conversation = {
    id: string;
    jobId: string;
    jobTitle: string;
    participants: Participant[];
    messages: Message[];
    read: boolean;
};

// Mock data for chat system
// In a real app, this would come from Firestore
export const conversations: Conversation[] = [
    {
        id: 'convo1',
        jobId: '2',
        jobTitle: 'Registered Nurse',
        read: false,
        participants: [
            { id: 'user1', name: 'John Doe', avatar: 'https://placehold.co/40x40.png' },
            { id: 'recruiter1', name: 'Jane Smith (Recruiter)', avatar: 'https://placehold.co/40x40.png' }
        ],
        messages: [
            { id: 'msg1', senderId: 'user1', text: 'Good morning, I have submitted my application for the Registered Nurse position. I look forward to hearing from you.', timestamp: subDays(new Date(), 1).toISOString() },
            { id: 'msg2', senderId: 'recruiter1', text: 'Thank you for your application, John. We have received it and are currently reviewing candidates.', timestamp: subHours(new Date(), 8).toISOString() },
            { id: 'msg3', senderId: 'recruiter1', text: 'Your profile looks promising. Could you tell us more about your experience at Ndola Central Hospital?', timestamp: subMinutes(new Date(), 5).toISOString() }
        ]
    },
    {
        id: 'convo2',
        jobId: '5',
        jobTitle: 'Accountant',
        read: true,
        participants: [
            { id: 'user1', name: 'John Doe', avatar: 'https://placehold.co/40x40.png' },
            { id: 'recruiter2', name: 'Peter Jones (Hiring Manager)', avatar: 'https://placehold.co/40x40.png' }
        ],
        messages: [
            { id: 'msg4', senderId: 'recruiter2', text: 'Hi John, we were impressed with your application for the Accountant role. Are you available for a brief call tomorrow?', timestamp: subDays(new Date(), 2).toISOString() },
            { id: 'msg5', senderId: 'user1', text: 'Hello Peter, thank you for reaching out. Yes, I am available tomorrow afternoon. What time works for you?', timestamp: subDays(new Date(), 1).toISOString() },
        ]
    }
];
