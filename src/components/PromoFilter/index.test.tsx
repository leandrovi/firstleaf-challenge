import React from "react";

import { render, screen } from "../../../test/test-utils";
import { useProducts } from "../../hooks/useProducts";

import PromoFilter from "./index";

jest.mock("../../hooks/useProducts");

const mockUseProducts = useProducts as jest.Mock;

describe("PromoFilter", () => {
  it("displays the correct number of filtered products", () => {
    const products = [
      { id: 1, color: "Red" },
      { id: 2, color: "Blue" },
      { id: 3, color: "Red" },
    ];

    const filteredProducts = products.filter(
      (product) => product.color === "Red"
    );

    mockUseProducts.mockReturnValue({
      state: { filteredProducts, products },
      dispatch: jest.fn(),
    });

    render(<PromoFilter />);

    expect(
      screen.getByText(`Showing ${filteredProducts.length} results`)
    ).toBeInTheDocument();
  });
});
