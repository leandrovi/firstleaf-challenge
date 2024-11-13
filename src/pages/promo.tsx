import React from "react";

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import PromoFilter from "@/components/PromoFilter";

const Promo = (): JSX.Element => {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Header />
      <section className="pt-4 pb-14">
        <h1 className="text-[40px] leading-[36px] font-light tracking-wide pt-8 pb-4 text-center w-full mt-5 mb-2.5 px-6">
          Our most popular wines
        </h1>
        <p className="max-w-[640px] mx-auto text-center font-light leading-7 tracking-wide px-6">
          Enjoy a selection of our members' favorite bottles in your first box.
        </p>
      </section>
      <section className="w-full px-6 py-6 bg-primary-foreground flex-1">
        <div className="min-[1352px]:container mx-auto">
          <PromoFilter />
          <ProductGrid />
        </div>
      </section>
    </main>
  );
};

export default Promo;
