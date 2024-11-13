import { useEffect, useState } from "react";

declare global {
  interface Window {
    analytics: any;
  }
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAnalytics(window.analytics);
    }
  }, []);

  return analytics;
};
