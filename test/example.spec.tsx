import React from "react";
import { render } from "@testing-library/react";
import ExamplePage from "../src/pages/example";

describe("example page", () => {
  it("renders without errors", async () => {
    expect.assertions(0);

    render(<ExamplePage />);
  });
});
