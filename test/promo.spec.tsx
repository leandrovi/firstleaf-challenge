import React from "react";

import { useProducts } from "../src/hooks/useProducts";
import Promo from "../src/pages/promo";
import mockProducts from "./db.json";
import { render } from "./test-utils";

const mockedUseProduct = useProducts as jest.Mock<object>;

jest.mock("../src/hooks/useProducts");

describe("promo page", () => {
  beforeEach(() => {
    mockedUseProduct.mockImplementation(() => ({
      state: {
        products: mockProducts,
        filteredProducts: mockProducts,
      },
      isLoading: true,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without errors", async () => {
    expect.assertions(0);

    render(<Promo />);
  });

  it("render a checkout button", async () => {
    expect.assertions(1);
    const { getByText } = render(<Promo />);

    expect(getByText("Checkout")).toBeInTheDocument();
  });

  it("should default to 5 mins", async () => {
    expect.assertions(1);
    const { getByText } = render(<Promo />);

    expect(getByText(/5:00/i)).toBeInTheDocument();
  });

  it("should show 10 products", async () => {
    expect.assertions(1);
    mockedUseProduct.mockImplementation(() => ({
      isLoading: false,
      state: {
        products: mockProducts,
        filteredProducts: mockProducts,
      },
    }));

    const { getAllByRole } = render(<Promo />);

    expect(getAllByRole("listitem")).toHaveLength(10);
  });
});
