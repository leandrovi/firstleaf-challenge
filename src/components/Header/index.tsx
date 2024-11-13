import React from "react";

import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import Logo from "../../images/logo.svg";
import Countdown from "../Countdown";

export default function Header() {
  const { track } = useAnalytics();

  const handleCheckout = () => {
    track("promoCheckoutClicked", { challenge: "Promo" });
  };

  return (
    <header className="w-full px-6 py-3 sticky top-0 z-50 border-b bg-background">
      <div className="min-[1352px]:container mx-auto flex items-center gap-4">
        <img src={Logo} alt="Firstleaf" width={100} height={20.9} />
        <div className="ml-auto flex items-center gap-4">
          <Countdown seconds={300} />
          <Button variant="active" size="active" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    </header>
  );
}
