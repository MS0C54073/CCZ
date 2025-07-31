
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Bell, MessageSquare } from 'lucide-react';
import { AuthWidget } from './auth-widget';
import { ThemeToggle } from './theme-toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/hooks/use-notifications';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';

export function Header() {
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/profile', label: 'My Profile' },
  ];

  const { notifications, markAsRead } = useNotifications();
  const router = useRouter();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId);
    router.push('/messages');
  };

  const handleViewAllClick = () => {
    notifications.forEach(n => {
      if (!n.read) {
        markAsRead(n.id);
      }
    });
    router.push('/messages');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block text-lg">
              <span className="text-red-600">C</span>
              <span className="text-orange-500">C</span>
              <span className="text-green-600">Z</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <span className="font-bold text-lg">
                  <span className="text-red-600">C</span>
                  <span className="text-orange-500">C</span>
                  <span className="text-green-600">Z</span>
                </span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex relative">
                  <MessageSquare className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0">{unreadCount}</Badge>
                  )}
                  <span className="sr-only">Messages</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Messages</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.slice(0, 4).map(notification => (
                  <DropdownMenuItem key={notification.id} onSelect={() => handleNotificationClick(notification.id)} className="flex flex-col items-start gap-1 whitespace-normal">
                    <p className={`text-sm ${!notification.read ? 'font-bold' : ''}`}>
                      {notification.message.substring(0, 70)}...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                    </p>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleViewAllClick} className="justify-center">
                  View All Messages
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/post-job">Post a Job</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Post a Job</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AuthWidget />
        </div>
      </div>
    </header>
  );
}
