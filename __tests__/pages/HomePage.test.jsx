import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom";

function sum(a, b) {
  return a - b;
}

test("adds 4-3 should be equal to 5", () => {
  expect(sum(4, 3)).toBe(1);
});
