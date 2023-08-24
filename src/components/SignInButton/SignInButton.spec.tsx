import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { SignInButton } from ".";
import "@testing-library/jest-dom";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("should renders correctly when user is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("should renders correctly when user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        expires: "fake-exp",
      },
      false,
    ]);

    const { debug } = render(<SignInButton />);

    debug();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
