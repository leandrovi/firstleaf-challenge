import { useEffect, useState } from "react";

declare global {
  interface Window {
    analytics: {
      track: (eventName: string, params: Record<string, any>) => void;
    };
  }
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<Window["analytics"] | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAnalytics(window.analytics);
    }
  }, []);

  const track = (eventName: string, params: Record<string, any>) => {
    if (process.env.NODE_ENV === "test") return;
    analytics?.track(eventName, { ...params });
  };

  return { track };
};
