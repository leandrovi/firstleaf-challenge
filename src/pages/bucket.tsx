import React from "react";
import { HeadFC } from "gatsby";

import ThreeButtons from "@/components/TheBucket";
import SEO from "@/components/Seo";

const BucketPage = (): JSX.Element => (
  <div>
    <h1>Sample content</h1>

    <ThreeButtons />
  </div>
);

export default BucketPage;

export const Head: HeadFC = () => <SEO />;
