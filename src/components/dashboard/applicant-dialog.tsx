
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface ApplicantDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    job: {
        id: string;
        title: string;
        applicantsList: {
            id: string;
            applicantName: string;
            avatar: string;
        }[];
    } | null;
}

export function ApplicantDialog({ isOpen, onOpenChange, job }: ApplicantDialogProps) {
    const router = useRouter();

    const handleMessageClick = (applicantId: string) => {
        // In a real app, you would have a robust way to find or create a conversationId
        // For this demo, we'll use a mock one, assuming it's the first conversation.
        const conversationId = 'convo1';
        router.push(`/messages/${conversationId}`);
        onOpenChange(false);
    };

    if (!job) return null;

    const getInitials = (name: string = '') => {
        const names = name.split(' ');
        if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Applicants for {job.title}</DialogTitle>
                    <DialogDescription>
                        Review and message applicants who applied for this role.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    {job.applicantsList.map(applicant => (
                        <div key={applicant.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={applicant.avatar} />
                                    <AvatarFallback>{getInitials(applicant.applicantName)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{applicant.applicantName}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleMessageClick(applicant.id)}>
                                Message
                            </Button>
                        </div>
                    ))}
                    {job.applicantsList.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No applicants yet.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

