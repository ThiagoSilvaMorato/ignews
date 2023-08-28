import { render, screen } from "@testing-library/react";
import { Header } from ".";
import "@testing-library/jest-dom";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return { asPath: "/" };
    },
  };
});

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return { data: null, status: "loading" } as any;
    },
  };
});

describe("Header component", () => {
  it("should renders correctly", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
