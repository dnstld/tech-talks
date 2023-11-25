'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function GoogleSignIn() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === 'loading') && !session) void signIn('google');
    if (session) window.close();
  }, [session, status]);

  return (
    <div
      className="absolute left-0 top-0 h-screen w-screen bg-white"
      data-testid="google-sign-in"
    ></div>
  );
}
