import React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { useProducts } from "../../hooks/useProducts";
import Loader from "../Loader";
import { Separator } from "../ui/separator";

const ProductGrid = () => {
  const { state, isLoading } = useProducts();
  const { filteredProducts } = state;

  return (
    <>
      <Loader show={isLoading || !filteredProducts.length} />

      {!isLoading && filteredProducts.length && (
        <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 py-8">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="bg-background flex flex-col w-full max-w-sm md:max-w-full mx-auto md:max-0 sm:flex-col md:flex-row lg:flex-col xl:flex-row items-start md:items-stretch lg:items-start xl:items-stretch border rounded-lg"
            >
              <div
                className={cn(
                  "flex justify-center items-center py-4 px-8 bg-muted ",
                  "w-full md:w-1/3 lg:w-full xl:w-1/3", // Manage widths
                  "h-56 md:h-full lg:h-56 xl:h-full", // Manage heights
                  "rounded-tl-lg rounded-tr-lg rounded-bl-none md:rounded-tr-none md:rounded-bl-lg lg:rounded-tr-lg lg:rounded-bl-none xl:rounded-tr-none xl:rounded-bl-lg" // Manage borders radius
                )}
              >
                <img
                  src={product.images}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col gap-3 justify-between mx-auto md:mx-0 md:w-full">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-tag bg-tag-foreground rounded-full px-2 py-1 w-fit text-xs font-medium">
                      {product.origin}
                    </span>

                    <div className="flex">
                      {Array.from(
                        {
                          length:
                            product.award_highlights?.["silver-medal"] || 0,
                        },
                        (_, index) => (
                          <Star key={index} size={14} color="#AF4276" />
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="text-sm font-medium">{product.name}</h2>
                    <p className="text-xs">{product.tag_line}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <Separator />

                  <div className="flex h-5 items-center justify-between w-full space-x-4 text-xs text-muted-foreground">
                    <p className="flex-1 text-center">{product.vintage}</p>
                    <Separator orientation="vertical" />
                    <p className="flex-1 text-center">{product.color}</p>
                    <Separator orientation="vertical" />
                    <p className="flex-1 text-center">
                      {product.display_price}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductGrid;
