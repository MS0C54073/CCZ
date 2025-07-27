
'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function LoginDialog({ isOpen, onOpenChange }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const { signInWithGoogle, signInWithLinkedIn, signInWithEmail, signUpWithEmail, loading } = useAuth();
  const { toast } = useToast();


  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onOpenChange(false);
      toast({ title: "Success", description: "Logged in with Google." });
    } catch (e) {
      toast({ variant: 'destructive', title: "Google Sign-In Error", description: (e as Error).message });
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      await signInWithLinkedIn();
      onOpenChange(false);
      toast({ title: "Success", description: "Logged in with LinkedIn." });
    } catch (e) {
      toast({ variant: 'destructive', title: "LinkedIn Sign-In Error", description: (e as Error).message });
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      onOpenChange(false);
      toast({ title: "Success", description: "Logged in successfully." });
    } catch (e) {
        toast({ variant: 'destructive', title: "Error", description: (e as Error).message });
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpWithEmail(signUpEmail, signUpPassword);
      onOpenChange(false);
      toast({ title: "Success", description: "Signed up and logged in." });
    } catch (e) {
        toast({ variant: 'destructive', title: "Error", description: (e as Error).message });
    }
  };
  
  const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-65.7 64.3C335.5 103.9 294.8 88 248 88c-88.3 0-160 71.7-160 160s71.7 160 160 160c92.6 0 151.3-66.4 156.3-99.3H248v-65.4h236.2c2.4 12.7 3.8 25.9 3.8 39.3z"></path>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 53.79-54.3c29.7 0 53.79 24.2 53.79 54.3a53.79 53.79 0 0 1-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
    </svg>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Career Connect Zambia</DialogTitle>
          <DialogDescription>
            Sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><GoogleIcon /> Sign in with Google</>}
          </Button>
          <Button variant="outline" className="w-full" onClick={handleLinkedInSignIn} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><LinkedInIcon /> Sign in with LinkedIn</>}
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Tabs defaultValue="login" className="w-full pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleEmailSignIn}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleEmailSignUp}>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="m@example.com" value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} required />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign Up
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
