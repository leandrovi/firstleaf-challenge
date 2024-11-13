import React from "react";
import { render, screen, act } from "../../../test/test-utils";
import Countdown from "./index";

jest.useFakeTimers();

describe("Countdown", () => {
  test("renders Countdown component", () => {
    render(<Countdown seconds={300} />);
    const countdownElement = screen.getByText(/reserving your wines for/i);
    expect(countdownElement).toBeInTheDocument();
  });

  it("renders with initial seconds", () => {
    render(<Countdown seconds={120} />);
    expect(screen.getByText("00:02:00")).toBeInTheDocument();
  });

  it("counts down every second", () => {
    render(<Countdown seconds={2} />);

    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText("00:00:01")).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it("calls onFinish when countdown reaches zero", () => {
    const mockOnFinish = jest.fn();
    render(<Countdown seconds={1} onFinish={mockOnFinish} />);
    act(() => jest.advanceTimersByTime(1000));
    expect(mockOnFinish).toHaveBeenCalled();
  });

  it("restarts countdown when loop is true", () => {
    render(<Countdown seconds={1} loop={true} />);

    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText("00:00:00")).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText("00:00:01")).toBeInTheDocument();
  });

  it("does not restart countdown when loop is false", () => {
    render(<Countdown seconds={2} loop={false} />);

    act(() => jest.advanceTimersByTime(2000));
    expect(screen.getByText("00:00:00")).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByText("00:00:02")).not.toBeInTheDocument();
  });
});
