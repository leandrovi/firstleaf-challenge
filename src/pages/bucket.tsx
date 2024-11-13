import React from "react";
import { HeadFC, Link } from "gatsby";

import ThreeButtons from "@/components/TheBucket";
import SEO from "@/components/Seo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BucketPage = (): JSX.Element => (
  <main className="mx-auto min-h-screen flex flex-col items-center justify-center px-6 py-6 xl:container">
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">The Bucket Challenge</h1>
      </CardHeader>
      <CardContent>
        <ThreeButtons />
      </CardContent>
    </Card>
    <Button variant="outline" className="mt-4" asChild>
      <Link to="/" className="flex items-center gap-1">
        <ArrowLeft size={16} />
        Go Back
      </Link>
    </Button>
  </main>
);

export default BucketPage;

export const Head: HeadFC = () => <SEO />;
