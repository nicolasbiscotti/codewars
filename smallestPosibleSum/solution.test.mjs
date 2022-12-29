import { expect } from "chai";
import {
  createValuesTracker,
  getIndexes,
  needsTransformation,
  solution,
  transform,
} from "./solution.mjs";

describe("Smallest Posible sum", () => {
  // it("should return 6 for [3, 3]", function () {
  //   function getIndexes() {
  //     return [0, 0];
  //   }
  //   function needsTranformation() {
  //     return false;
  //   }
  //   expect(solution([3, 3], getIndexes, needsTranformation)).to.equal(6);
  // });

  // it("should return 4 for [2, 4]", function () {
  //   function transform(numbers) {
  //     if (numbers[0] === 2 && numbers[1] === 4) {
  //       return [2, 2];
  //     }
  //   }
  //   function getIndexes(numbers) {
  //     if (numbers[1] === 4) {
  //       return [1, 0];
  //     } else {
  //       return [0, 0];
  //     }
  //   }
  //   function needsTranformation(indexes) {
  //     if (indexes[0] === indexes[1]) {
  //       return false;
  //     }
  //     return true;
  //   }

  //   expect(
  //     solution([2, 4], getIndexes, needsTranformation, transform)
  //   ).to.equal(4);
  // });

  it("should return 9 for [6, 9, 21]", function () {
    expect(
      solution([6, 9, 21], getIndexes, needsTransformation, transform)
    ).to.equal(9);
  });
});

describe("Get Indexes", function () {
  it("should return 0, 1 for [5, 3]", function () {
    expect(getIndexes([5, 3])).to.deep.equal({ greater: 0, second: 1 });
  });

  it("should return 0, 1 for [5, 3, 5]", function () {
    expect(getIndexes([5, 3, 5])).to.deep.equal({ greater: 0, second: 1 });
  });

  it("should return 0, 2 for [5, 5, 3]", function () {
    expect(getIndexes([5, 5, 3])).to.deep.equal({ greater: 0, second: 2 });
  });

  it("should return -1, -1 for [4, 4, 4]", function () {
    expect(getIndexes([4, 4, 4])).to.deep.equal({ greater: -1, second: -1 });
  });
});

describe("Needs Transformation", () => {
  it("should return false for -1, -1", function () {
    expect(needsTransformation({ greater: -1, second: -1 })).to.equal(false);
  });

  it("should return true for greater and second >= 0", function () {
    expect(needsTransformation({ greater: 1, second: 2 })).to.equal(true);
  });
});

describe("Transform", () => {
  it("should return [2, 3] for [5, 3] and {greater: 0, second: 1}", function () {
    expect(transform([5, 3], { greater: 0, second: 1 })).to.deep.equal([2, 3]);
  });
});

describe("Value Tracker", () => {
  it("should return 0", function () {
    const values = createValuesTracker([5]);
    expect(values.pop()).to.equal(0);
    expect(values.peek()).to.equal(null);
  });

  it("should return 1", function () {
    const values = createValuesTracker([6, 9]);
    expect(values.pop()).to.equal(1);
    expect(values.peek()).to.equal(0);
  });

  it("should return 1", function () {
    const numbers = [6, 9];
    const values = createValuesTracker(numbers);
    let greater = values.pop();
    let second = values.peek();
    values.add({ index: greater, value: numbers[greater] - numbers[second] });
    values.pop();
    expect(values.peek()).to.equal(1);
  });

  it("should return 1", function () {
    const values = createValuesTracker([9, 6]);
    values.pop();
    expect(values.peek()).to.equal(1);
  });

  it("should return 1", function () {
    const values = createValuesTracker([9, 6, 3]);
    values.pop();
    expect(values.peek()).to.equal(1);
    values.pop();
    expect(values.peek()).to.equal(2);
  });

  it("should return 2 and then 1", function () {
    const numbers = [9, 6, 3];
    const values = createValuesTracker(numbers);
    let index = values.pop();
    numbers[index] = numbers[index] - numbers[values.peek()];
    values.add({ index, value: numbers[index] });
    expect(values.size()).to.equal(2);
    index = values.pop();
    numbers[index] = numbers[index] - numbers[values.peek()];
    values.add({ index, value: numbers[index] });
    expect(values.size()).to.equal(1);
  });

  it("should peek the index of the second in the list", function () {
    const numbers = [3, 3, 3, 2, 1];
    const values = createValuesTracker(numbers);
    values.pop();
    expect(values.peek()).to.equal(3);
    values.pop();
    expect(values.peek()).to.equal(3);
    values.pop();
    values.pop();
    expect(values.peek()).to.equal(4);
  });
});
