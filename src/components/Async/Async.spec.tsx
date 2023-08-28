import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { Async } from ".";

it("should render correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello World")).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByText("Button"));
  await waitFor(() => {
    return expect(screen.getByText("Visible Button")).toBeInTheDocument();
  });
});
