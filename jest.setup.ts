import "@testing-library/jest-dom";

declare global {
  interface Window {
    analytics: {
      track: (eventName: string, params: Record<string, any>) => void;
    };
  }
}

window.HTMLElement.prototype.scrollIntoView = function () {};

jest.mock("lottie-web", () => ({
  loadAnimation: () => ({
    destroy: jest.fn(),
  }),
}));

window.analytics = {
  track: jest.fn(),
};

beforeEach(() => {
  (window.analytics.track as jest.Mock).mockClear();
});
