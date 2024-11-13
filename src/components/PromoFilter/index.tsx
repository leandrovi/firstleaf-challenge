import React from "react";
import { useProducts } from "../../hooks/useProducts";
import ColorFilter from "../ColorFilter";

const PromoFilter = () => {
  const { state, dispatch } = useProducts();

  const handleColorChange = (color: string) => {
    if (color === "all") {
      dispatch({ type: "INIT_FILTERED_PRODUCTS", payload: state.products });
    } else {
      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: color });
    }
  };

  const colors = React.useMemo(() => {
    const colorMap = state?.products.reduce((acc, product) => {
      if (acc[product.color]) {
        acc[product.color] += 1;
      } else {
        acc[product.color] = 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(colorMap).map(([name, quantity]) => ({
      name,
      quantity,
    }));
  }, [state?.products]);

  if (!state?.filteredProducts) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
      <p className="text-sm uppercase tracking-wider">
        Showing {state?.filteredProducts.length} results
      </p>
      {colors && (
        <ColorFilter colors={colors} onColorChange={handleColorChange} />
      )}
    </section>
  );
};

export default PromoFilter;
