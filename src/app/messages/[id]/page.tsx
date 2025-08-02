
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks/use-chat';
import { cn } from '@/lib/utils';
import { FormEvent } from 'react';

export default function ChatPage() {
  const params = useParams();
  const conversationId = params.id as string;
  const { user } = useAuth();
  const router = useRouter();
  const { messages, conversation, sendMessage } = useChat(conversationId);
  const otherParticipant = conversation?.participants.find(p => p.id !== (user?.uid || 'user1'));

  if (!conversation) {
    return <div className="flex justify-center items-center h-full">Loading chat...</div>;
  }
  
  const getInitials = (name: string = '') => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.message as HTMLInputElement;
    const text = input.value.trim();
    if (text) {
      sendMessage(text);
      input.value = '';
    }
  };


  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.14))] bg-muted/40">
       <header className="flex items-center gap-4 border-b bg-background p-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar>
                <AvatarImage src={otherParticipant?.avatar} />
                <AvatarFallback>{getInitials(otherParticipant?.name)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">{otherParticipant?.name}</p>
                <p className="text-xs text-muted-foreground">{conversation.jobTitle}</p>
            </div>
       </header>
       <main className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(message => {
                const isSender = message.senderId === (user?.uid || 'user1');
                return (
                    <div key={message.id} className={cn("flex items-end gap-2", isSender ? "justify-end" : "justify-start")}>
                         {!isSender && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={otherParticipant?.avatar} />
                                <AvatarFallback>{getInitials(otherParticipant?.name)}</AvatarFallback>
                            </Avatar>
                         )}
                        <div className={cn(
                            "max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2", 
                            isSender ? "bg-primary text-primary-foreground" : "bg-background"
                        )}>
                            <p className="text-sm">{message.text}</p>
                            <p className={cn("text-xs mt-1", isSender ? "text-primary-foreground/70" : "text-muted-foreground")}>
                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                );
            })}
       </main>
       <footer className="border-t bg-background p-4">
           <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
            <Input name="message" placeholder="Type your message..." autoComplete="off" />
            <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
            </Button>
           </form>
       </footer>
    </div>
  );
}
