// Importing jest-dom to add custom jest matchers for DOM node assertions
import "@testing-library/jest-dom/extend-expect";

// Optional: You can also configure any global mocks or setups here
// Example: Mocking localStorage or other browser APIs globally if needed
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

// You can also suppress warnings or errors globally if necessary (though not recommended generally)
// Example to suppress act() warnings:
jest.spyOn(console, "error").mockImplementation((msg) => {
  if (msg.includes("ReactDOMTestUtils.act")) {
    return;
  }
  console.error(msg);
});
