import React from "react";
import { render, screen, fireEvent, act } from "../../../test/test-utils";

import ThreeButtons from "./index";

jest.mock("../Countdown", () => {
  return function MockCountdown({ onFinish }: { onFinish: () => void }) {
    React.useEffect(() => {
      setTimeout(onFinish, 0);
    }, [onFinish]);

    return <div data-testid="countdown">Countdown</div>;
  };
});

jest.mock("./index.module.scss", () => ({
  button: "mock-button-class",
}));

describe("ThreeButtons Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("increments count when clicked", () => {
    render(<ThreeButtons />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText(/1 glasses poured/i)).toBeInTheDocument();
  });

  it("shows countdown after completing a batch", () => {
    render(<ThreeButtons />);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByTestId("countdown")).toBeInTheDocument();
  });

  it("shows total when time is up", () => {
    render(<ThreeButtons />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByText(/Total 1/)).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("increments batch count correctly", () => {
    render(<ThreeButtons />);

    const button = screen.getByRole("button");

    // First and second batches
    for (let i = 0; i < 6; i++) {
      fireEvent.click(button);
    }

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByText(/Total 2/)).toBeInTheDocument();
  });
});
