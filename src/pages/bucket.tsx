import React from "react";
import { HeadFC } from "gatsby";

import ThreeButtons from "@/components/TheBucket";
import SEO from "@/components/Seo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
  </main>
);

export default BucketPage;

export const Head: HeadFC = () => <SEO />;
