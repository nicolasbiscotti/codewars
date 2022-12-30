import { expect } from "chai";
import { gcd, getGCD, solution } from "./solution.mjs";

describe("Smallest Posible sum", () => {
  it("should return 3 for [6, 9, 13]", () => {
    expect(solution([6, 9, 13])).to.equal(3);
  });

  it("should return 9 for [6, 9, 21]", () => {
    expect(solution([6, 9, 21])).to.equal(9);
  });
});

describe("getGCD", () => {
  it("should return 3", function () {
    expect(getGCD(3, 3)).to.equal(3);
  });
  it("should return 4", function () {
    expect(getGCD(4, 8)).to.equal(4);
  });
  it("should return 3", function () {
    expect(getGCD(9, 21)).to.equal(3);
  });
  it("should return 1", function () {
    expect(getGCD(9, 22)).to.equal(1);
  });
  it("exaMPLE", function () {
    getGCD(1251, 523);
  });
});
