import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignedOut>
        <SignIn path="/login" routing="path" signUpUrl="/signup" />
      </SignedOut>

      <SignedIn>
        <div className="text-center">
          <UserButton afterSignOutUrl="/" />
          <p className="mt-4 text-lg">You're already signed in!</p>
        </div>
      </SignedIn>
    </div>
  );
}
