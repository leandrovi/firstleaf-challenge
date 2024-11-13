import React from "react";

import { render, screen } from "../../../test/test-utils";
import { useProducts } from "../../hooks/useProducts";
import ProductGrid from "./index";

jest.mock("../../hooks/useProducts");

const mockedUseProducts = useProducts as jest.Mock;

describe("ProductGrid", () => {
  it("renders loader when no products are available", () => {
    mockedUseProducts.mockReturnValue({ state: { filteredProducts: [] } });
    render(<ProductGrid />);
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  it("renders products when available", () => {
    const products = [
      {
        id: 1,
        name: "Product 1",
        images: "",
        origin: "",
        award_highlights: {},
        tag_line: "",
        vintage: "",
        color: "",
        display_price: "",
      },
    ];
    mockedUseProducts.mockReturnValue({
      state: { filteredProducts: products },
    });
    render(<ProductGrid />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });
});
