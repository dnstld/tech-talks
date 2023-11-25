import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginBtn from "@/components/login-btn";
import { useSession } from "next-auth/react"

jest.mock("next-auth/react")

describe("LoginBtn", () => {
  it('renders the sign in button when signed out', async () => {
    ;(useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: "unauthenticated",
    });

    render(<LoginBtn />);

    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });
  
  it("renders the sign out button when signed in", async () => {
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: { name: "test", email: "test@email.com", image: "image" }
      },
      status: "authenticated",
    })

    render(<LoginBtn />);

    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });

  it('renders the loading', async () => {
    ;(useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: "loading",
    });

    render(<LoginBtn />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  })
});
