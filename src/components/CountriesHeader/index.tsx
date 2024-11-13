import { Link } from "gatsby";
import React from "react";
import { Button } from "../ui/button";

export default function CountriesHeader() {
  return (
    <header className="w-full bg-[#222]">
      <nav className="xl:container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/countries" className="uppercase text-primary text-sm">
          Countries Visualizer
        </Link>
        <Button asChild variant="outline">
          <Link to="/" className="text-primary">
            Back to Challenges
          </Link>
        </Button>
      </nav>
    </header>
  );
}
