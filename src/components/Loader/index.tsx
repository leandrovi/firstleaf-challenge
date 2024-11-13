import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { AnimatePresence, motion } from "framer-motion";

type LoaderProps = {
  show: boolean;
};

const Loader: React.FC<LoaderProps> = ({ show }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        initialSegment: [0, 100],
        path: "https://lottie.host/25b5ce52-d679-499f-be5c-3a6e59a99ae3/XbNXx0NaxY.json",
      });

      return () => animation.destroy();
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="presentation"
          className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-background z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div ref={containerRef} style={{ width: 300, height: 300 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
