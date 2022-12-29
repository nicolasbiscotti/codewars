import { expect } from "chai";
import { createMaxHeap, insert, removeMax } from "./createMaxHeap.mjs";

describe("Insert", () => {
  it("should insert the value at index 0", function () {
    const array = [];
    insert(2, array);
    expect(array).to.deep.equal([2]);
  });
  it("should move 3 at index 0", function () {
    const array = [2];
    insert(3, array);
    expect(array).to.deep.equal([3, 2]);
  });
  it("should move 15 at index 0", function () {
    const array = [5, 2, 3];
    insert(15, array);
    expect(array).to.deep.equal([15, 5, 3, 2]);
  });
  it("should move 37 at index 0", function () {
    const array = [36, 25, 5, 11, 14, 1, 5, 2, 7, 4, 6];
    insert(37, array);
    expect(array).to.deep.equal([37, 25, 36, 11, 14, 5, 5, 2, 7, 4, 6, 1]);
  });
});

describe("removeMax", () => {
  it("should remove the largest value", function () {
    const array = [5, 2];
    removeMax(array);
    expect(array).to.deep.equal([2]);
  });

  it("should reorder the array", function () {
    const array = [5, 2, 4];
    removeMax(array);
    expect(array).to.deep.equal([4, 2]);
  });

  it("should reorder the array [25, 4, 5, 2, 3]", function () {
    const array = [25, 4, 5, 2, 3];
    removeMax(array);
    expect(array).to.deep.equal([5, 4, 3, 2]);
  });

  it("should reorder the array", function () {
    // [25, 10, 8, 5, 3]
    const array = [25, 10, 8, 5, 3];
    removeMax(array);
    expect(array).to.deep.equal([10, 5, 8, 3]);
  });

  // [2, 5, 4, 25, 3, 12]

  // [2, 5, 3, 25, 3, 4]
});

describe("Create Max Heap", () => {
  it("should return []", function () {
    expect(createMaxHeap()).to.deep.equal([]);
  });

  it("should return [37, 36, 5, 11, 25]", function () {
    expect(createMaxHeap([11, 25, 5, 37, 36], insert)).to.deep.equal([
      37, 36, 5, 11, 25,
    ]);
  });
});
