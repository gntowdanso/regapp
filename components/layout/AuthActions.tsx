'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthActions() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span>Loading...</span>; // Show loading while session is being fetched
  }

  if (session) {
    return (
      <div>
        <span>Welcome, {session.user?.name}</span>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
}
