"use client";

import { popupCenter } from "@/utils/popupCenter";
import { useSession, signOut } from "next-auth/react"

export default function LoginBtn() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : status === 'unauthenticated' ? (
        <>
          Not signed in <br />
          <button onClick={() => popupCenter('/google-sign-in', 'Sign in with Google')}>
            Sign in with Google
          </button>
        </>
      ) : (
        <>
          Loading...
        </>
      )}
    </>
  );
}