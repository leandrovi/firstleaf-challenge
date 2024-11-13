import React from "react";

import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "../../../test/test-utils";
import mockProducts from "../../../test/db.json";
import { useProducts } from "../../hooks/useProducts";
import ColorFilter from "./index";

jest.mock("../../hooks/useProducts");

const mockedUseProducts = useProducts as jest.Mock;
const mockOnColorChange = jest.fn();

const colors = [
  { name: "Red", quantity: 10 },
  { name: "White", quantity: 5 },
];

describe("ColorFilter", () => {
  beforeEach(() => {
    mockedUseProducts.mockReturnValue({
      state: {
        products: mockProducts,
        filteredProducts: mockProducts,
        filters: {},
        cart: [],
      },
      dispatch: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  it("renders color options", async () => {
    await act(async () => {
      render(<ColorFilter colors={colors} onColorChange={mockOnColorChange} />);
    });

    fireEvent.click(screen.getByRole("combobox"));

    expect(screen.getByText("Red (10)")).toBeInTheDocument();
    expect(screen.getByText("White (5)")).toBeInTheDocument();
  });

  it("calls onColorChange when a color is selected", async () => {
    await act(async () => {
      render(<ColorFilter colors={colors} onColorChange={mockOnColorChange} />);
    });

    fireEvent.click(screen.getByRole("combobox"));

    await waitFor(() =>
      expect(screen.getByText("Red (10)")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Red (10)"));
    expect(mockOnColorChange).toHaveBeenCalledWith("Red");
  });
});
