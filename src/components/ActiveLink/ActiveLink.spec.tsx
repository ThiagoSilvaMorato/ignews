import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";
import "@testing-library/jest-dom";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return { asPath: "/" };
    },
  };
});

describe("ActiveLink component", () => {
  it("should renders correctly", () => {
    render(
      <ActiveLink href='/test' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should receive active class if the link is currently active", () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  });
});
