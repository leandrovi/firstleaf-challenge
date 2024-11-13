import React from "react";

import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/useAnalytics";

type CountdownProps = {
  seconds: number;
  label?: string;
  loop?: boolean;
  customClass?: string;
  onFinish?: () => void;
};

export default function Countdown({
  seconds: initialSeconds,
  label = "Reserving your wines for",
  loop = false,
  customClass = "",
  onFinish = () => {},
}: CountdownProps) {
  const { track } = useAnalytics();

  const [seconds, setSeconds] = React.useState(initialSeconds);
  const [isBlinking, setIsBlinking] = React.useState(false);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const counter = `00:${`0${minutes}`.slice(-2)}:${`0${remainingSeconds}`.slice(
    -2
  )}`;

  React.useEffect(() => {
    setIsBlinking(seconds <= 10 && seconds > 0);
  }, [seconds]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const end = loop ? initialSeconds : 0;
        const remaining = prevSeconds > 0 ? prevSeconds - 1 : end;
        return remaining;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      track("promoCountdownStopped", { challenge: "Promo", seconds });
    };
  }, [loop, initialSeconds]);

  React.useEffect(() => {
    if (seconds === 0) {
      track("promoCountdownFinished", { challenge: "Promo", seconds: 0 });
      onFinish();
    }
  }, [seconds]);

  const containerClasses = cn(
    "font-sans flex flex-row items-center gap-1",
    customClass,
    isBlinking && "animate-blink"
  );

  const labelClasses = cn(
    "font-light leading-none tracking-wider text-primary md:block hidden",
    (isBlinking || seconds === 0) && "text-destructive"
  );

  const counterClasses = cn(
    "font-light leading-none tracking-wider text-success",
    (isBlinking || seconds === 0) && "text-destructive"
  );

  return (
    <div className={containerClasses}>
      {label && (
        <div className={cn(labelClasses, "countdown-label")}>{label}</div>
      )}
      <div className={cn(counterClasses, "countdown-counter")}>{counter}</div>
    </div>
  );
}
