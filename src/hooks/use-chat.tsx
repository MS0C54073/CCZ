
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';
import { conversations as mockConversations } from '@/lib/messages';

// In a real app, you would use Firestore here
// import { db } from '@/lib/firebase';
// import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';

type Message = typeof mockConversations[0]['messages'][0];
type Conversation = typeof mockConversations[0];


export function useChat(conversationId: string) {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    // Mock fetching conversation details
    const foundConversation = mockConversations.find(c => c.id === conversationId);

    if (foundConversation) {
      setConversation(foundConversation);
      setMessages(foundConversation.messages.sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
    }
    setLoading(false);

    // Real Firestore implementation would look something like this:
    /*
    const q = query(collection(db, `conversations/${conversationId}/messages`), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[];
      setMessages(msgs);
      setLoading(false);
    });
    return () => unsubscribe();
    */
  }, [conversationId]);

  const sendMessage = async (text: string) => {
    if (!user || !conversation) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      senderId: user.uid,
      text,
      timestamp: new Date().toISOString(),
    };
    
    // Optimistically update the UI
    setMessages(prev => [...prev, newMessage]);

    // Update the mock data (for demo purposes)
    const convoIndex = mockConversations.findIndex(c => c.id === conversationId);
    if (convoIndex !== -1) {
        mockConversations[convoIndex].messages.push(newMessage);
    }

    // Real Firestore implementation:
    /*
    await addDoc(collection(db, `conversations/${conversationId}/messages`), {
        senderId: user.uid,
        text,
        timestamp: serverTimestamp()
    });
    // Also update the 'lastMessage' field on the parent conversation document
    */
  };

  return { messages, conversation, sendMessage, loading };
}
