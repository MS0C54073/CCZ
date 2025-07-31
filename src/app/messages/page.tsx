
'use client';

import { useNotifications } from '@/hooks/use-notifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Mail, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function MessagesPage() {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">My Messages</h1>
        <p className="text-muted-foreground mt-2">
          Keep track of all your application updates and notifications here.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>You have {notifications.filter(n => !n.read).length} unread messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={cn(
                  'flex items-start gap-4 p-4 rounded-lg border transition-colors',
                  notification.read ? 'bg-transparent text-muted-foreground' : 'bg-muted/50'
                )}
              >
                <div className="flex-shrink-0 mt-1">
                    {notification.read ? <Check className="h-5 w-5 text-gray-400" /> : <Mail className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex-grow">
                  <p className={cn('text-sm', !notification.read && 'font-semibold text-foreground')}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(notification.date), "PPP p")}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  {!notification.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                      Mark as Read
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
             {notifications.length === 0 && (
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
