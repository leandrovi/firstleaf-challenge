import React, { ReactNode } from "react";
import * as Sentry from "@sentry/react";

interface SentryWrapperProps {
  children: ReactNode;
}

const SentryWrapper: React.FC<SentryWrapperProps> = ({ children }) => {
  const fallback = ({
    error,
    resetError,
  }: {
    error: unknown;
    componentStack: string;
    eventId: string;
    resetError: () => void;
  }) => (
    <div>
      <h1>Something went wrong</h1>
      <pre>{error instanceof Error ? error.message : String(error)}</pre>
    </div>
  );

  return (
    <Sentry.ErrorBoundary fallback={fallback}>{children}</Sentry.ErrorBoundary>
  );
};

export default SentryWrapper;
