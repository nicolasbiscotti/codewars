import { expect } from "chai";
import { solution } from "./stripComment.mjs";

describe("Strip Comments", () => {
  it("should return 'function' for 'function'", function () {
    expect(solution("function", ["#"])).to.equal("function");
  });

  it("should return 'function' for 'function # bananas and'", function () {
    expect(solution("function # bananas and", ["#"])).to.equal("function");
  });

  it("should return 'function\\n' for 'function # bananas and\\n'", function () {
    expect(solution("function # bananas and\n", ["#"])).to.equal("function\n");
  });

  it("should return 'apples, pears\\ngrapes\\nbananas'", () => {
    expect(
      solution("apples, pears # and bananas\ngrapes\nbananas #apples", ["#"])
    ).to.equal("apples, pears\ngrapes\nbananas");
  });

  it("should return 'function' for 'function !bananas and'", function () {
    expect(solution("function !bananas and", ["#", "!"])).to.equal("function");
  });
});
