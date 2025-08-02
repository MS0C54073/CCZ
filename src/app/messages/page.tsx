
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { conversations as mockConversations } from '@/lib/messages';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useClientOnlyValue } from '@/hooks/use-client-only-value';
import { cn } from '@/lib/utils';

export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const conversations = mockConversations.filter(c => c.participants.some(p => p.id === user?.uid || 'user1'));

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">My Messages</h1>
        <p className="text-muted-foreground mt-2">
          Keep track of all your conversations with recruiters and applicants here.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>You have {conversations.filter(c => !c.read).length} unread conversations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {conversations.map(convo => {
              const otherParticipant = convo.participants.find(p => p.id !== (user?.uid || 'user1'));
              const lastMessage = convo.messages[convo.messages.length - 1];
              const formattedDate = useClientOnlyValue(formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true }));

              return (
                <div 
                  key={convo.id} 
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
                    !convo.read && "bg-muted"
                    )}
                  onClick={() => router.push(`/messages/${convo.id}`)}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={otherParticipant?.avatar} alt={otherParticipant?.name} />
                    <AvatarFallback>{getInitials(otherParticipant?.name || '')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <p className={cn("font-semibold", !convo.read && "text-primary")}>{otherParticipant?.name}</p>
                      <p className="text-xs text-muted-foreground">{formattedDate}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{lastMessage.text}</p>
                  </div>
                </div>
              )
            })}
             {conversations.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <Mail className="mx-auto h-12 w-12 mb-4"/>
                    <h3 className="text-xl font-semibold">Your inbox is empty</h3>
                    <p>Application updates and messages from recruiters will appear here.</p>
                </div>
             )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
