import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import GoogleSignIn from "@/app/google-sign-in/page";
import { signIn, useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
}));

describe("GoogleSignIn", () => {
  const windowLocationCopy = global.window.location;

  beforeEach(() => {
    global.window = Object.assign({}, global.window, { location: { href: 'testUrl' } });
  });

  afterEach(() => {
    global.window.location = windowLocationCopy;
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    ;(useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    render(<GoogleSignIn />);

    expect(screen.getByTestId('google-sign-in')).toBeInTheDocument();
    expect(screen.getByTestId('google-sign-in')).toHaveClass('absolute left-0 top-0 h-screen w-screen bg-white');
  });

  it('calls useSession hook', async () => {
    ;(useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    render(<GoogleSignIn />);

    expect(useSession).toHaveBeenCalled();
  });

  it('calls signIn with "google" provider when there is no session', async () => {
    ;(useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      status: "authenticated",
    });

    render(<GoogleSignIn />);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('google');
    });
  });
});
