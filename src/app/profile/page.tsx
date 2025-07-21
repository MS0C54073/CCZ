import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfilePage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-8 px-4 md:px-6 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Keep your profile up-to-date to attract the best opportunities.
          </p>
        </header>
        <ProfileForm />
      </div>
    </div>
  );
}
