// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const localStorageMock = (() => {
  let storage = {};
  return {
    setItem: (key, value) => {
      storage[key] = value || "";
    },
    getItem: (key) => {
      return storage[key] || null;
    },
    removeItem: (key) => {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (i) => {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear: () => {
      storage = {};
    },
  };
})();
Object.defineProperty(global, "localStorage", { value: localStorageMock });
