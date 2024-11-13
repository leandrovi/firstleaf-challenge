import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProductsProvider } from "./src/hooks/useProducts";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./src/styles/global.css";

const queryClient = new QueryClient();

export const wrapRootElement = ({ element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>{element}</ProductsProvider>
    </QueryClientProvider>
  );
};
