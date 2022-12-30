import { expect } from "chai";
import {
  maxHeapWithoutRepetitions,
  removeMaxValue,
  solution,
} from "./smallestSum.mjs";

describe("Smallest Posible Sum", () => {
  it("should return 0 for []", function () {
    expect(solution([])).to.equal(0);
  });
  it("should return 3 for [3]", function () {
    expect(solution([3])).to.equal(3);
  });
  it("should return 6 for [3, 3]", function () {
    expect(solution([3, 3])).to.equal(6);
  });
  it("should return 2 for [5, 3]", function () {
    expect(solution([5, 3])).to.equal(2);
  });
  it("should return 3 for [5, 3, 10]", function () {
    expect(solution([5, 3, 10])).to.equal(3);
  });
});

describe("Create Max Heap Without Repetitions", () => {
  it("should return [3] for [3, 3]", function () {
    expect(maxHeapWithoutRepetitions([3, 3])).to.deep.equal({
      maxHeap: [3],
      indexesOfNumbers: { 3: [0, 1] },
    });
  });
});

describe("Remove Max Value From store", () => {
  it("should remove 5 from the maxHeap and indexesOfNumbers", function () {
    const store = {
      maxHeap: [5, 3],
      indexesOfNumbers: { 5: [0], 3: [1] },
    };
    removeMaxValue(store);
    expect(store).to.deep.equal({ maxHeap: [3], indexesOfNumbers: { 3: [1] } });
  });

  // fragil test
  it("should keep 5 on the maxHeap and remove the first index", function () {
    const store = {
      maxHeap: [5, 3],
      indexesOfNumbers: { 5: [0, 2], 3: [1] },
    };
    removeMaxValue(store);
    expect(store).to.deep.equal({
      maxHeap: [5, 3],
      indexesOfNumbers: { 5: [0], 3: [1] },
    });
  });
});
