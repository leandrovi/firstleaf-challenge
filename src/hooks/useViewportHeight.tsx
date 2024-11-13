import React from "react";

export const useViewportHeight = () => {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return height;
};
