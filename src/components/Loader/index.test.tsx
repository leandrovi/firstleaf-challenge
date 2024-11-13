import React from "react";

import { render, screen } from "../../../test/test-utils";
import Loader from "./index";

describe("Loader", () => {
  it("renders when show is true", () => {
    render(<Loader show={true} />);
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    render(<Loader show={false} />);
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });
});
