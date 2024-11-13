import React from "react";
import { useSiteMetadata } from "../../hooks/useSiteMetadata";

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
}

const SEO = ({ title, description, pathname, children }: SEOProps) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link
        rel="icon"
        href="https://www.firstleaf.com/favicon-32x32.png?v=7b7f9aa145c31aa0e609358ef9dd6eff"
      />
      {children}
    </>
  );
};

export default SEO;
