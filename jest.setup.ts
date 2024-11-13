import "@testing-library/jest-dom";

window.HTMLElement.prototype.scrollIntoView = function () {};

jest.mock("lottie-web", () => ({
  loadAnimation: () => ({
    destroy: jest.fn(),
  }),
}));
