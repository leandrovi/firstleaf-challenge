import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useQuery } from "react-query";
import { Product } from "../types/Products";

type ProductsContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
};

type State = {
  products: Product[];
  filteredProducts: Product[];
};

type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_FILTERED_PRODUCTS"; payload: string }
  | { type: "INIT_FILTERED_PRODUCTS"; payload: Product[] };

const initialState: State = {
  products: [],
  filteredProducts: [],
};

function productsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_FILTERED_PRODUCTS":
      const filteredProducts = state.products.filter(
        (product) => product.color === action.payload
      );
      return { ...state, filteredProducts };
    case "INIT_FILTERED_PRODUCTS":
      return { ...state, filteredProducts: action.payload };
    default:
      return state;
  }
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  // const fetchProducts = async () => {
  //   const cachedProducts = window.localStorage.getItem("products");
  //   const cachedTimestamp = window.localStorage.getItem("productsTimestamp");
  //   const isStale = cachedTimestamp
  //     ? Date.now() - parseInt(cachedTimestamp, 10) > 5 * 60 * 1000 // 5 minutes
  //     : true;

  //   if (cachedProducts && !isStale) {
  //     setTimeout(() => {
  //       return JSON.parse(cachedProducts) as Array<Product>;
  //     }, 1000); // Small delay to show the loader
  //   }

  //   const products = (await fetch(
  //     "https://my-json-server.typicode.com/YofretRios/jsondetails/products"
  //   ).then((res) => res.json())) as Array<Product>;

  //   window.localStorage.setItem("products", JSON.stringify(products));
  //   window.localStorage.setItem("productsTimestamp", Date.now().toString());

  //   // Small delay to keep the loader for more time
  //   // Note: This is only for this sample app, should not be used in a real app
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   return products;
  // };

  // const { data, isLoading } = useQuery("products", fetchProducts, {
  //   initialData: [],
  //   staleTime: 0,
  //   cacheTime: 30 * 60 * 1000, // 30 minutes
  //   refetchOnWindowFocus: true,
  //   refetchOnReconnect: true,
  // });

  // useEffect(() => {
  //   if (data) {
  //     dispatch({ type: "SET_PRODUCTS", payload: data });

  //     if (state.products.length === 0) {
  //       // Initialize only on first load
  //       dispatch({ type: "INIT_FILTERED_PRODUCTS", payload: data });
  //     }
  //   }
  // }, [data]);

  return (
    <ProductsContext.Provider value={{ state, dispatch, isLoading: true }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
