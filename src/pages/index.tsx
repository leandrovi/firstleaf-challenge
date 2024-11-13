import React from "react";
import { HeadFC, Link } from "gatsby";

import SEO from "@/components/Seo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const HomePage = (): JSX.Element => (
  <main className="min-h-screen bg-background text-foreground p-8 flex items-center justify-center">
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <h1 className="text-3xl font-base">Firstleaf Challenge</h1>
        <p className="text-base font-thin">
          Select a challenge to check the results:
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <Button asChild variant="outline" className="w-full">
              <Link to="/countries">Countries</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="outline" className="w-full">
              <Link to="/bucket">Bucket</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="outline" className="w-full">
              <Link to="/promo">Promo</Link>
            </Button>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="text-center mt-4">
        <p className="text-xs">Built by Leandro Vieira</p>
      </CardFooter>
    </Card>
  </main>
);

export default HomePage;

export const Head: HeadFC = () => <SEO />;
