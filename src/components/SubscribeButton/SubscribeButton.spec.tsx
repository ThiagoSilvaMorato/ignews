import { render, screen, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";
import "@testing-library/jest-dom";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("should renders correctly when user is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" } as any);

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now!")).toBeInTheDocument();
  });

  it("should redirect the user to sign in when not authenticated", () => {
    const signInMocked = jest.mocked(signIn);
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now!");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("sould redirect to posts when user already has a subscription", () => {
    const useRouterMocked = jest.mocked(useRouter);
    const useSessionMocked = jest.mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        activeSubscription: "fake-active-subscription",
        expires: "fake-expires",
      },
    } as any);

    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now!");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
