// Complete the solution so that it strips all text
// that follows any of a set of comment markers passed in.
// Any whitespace at the end of the line should also be stripped out.
// Example:
// var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples",
//                       ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"
export function solution(input, markers) {
  let result = "";
  let index = 0;
  let notInTheComment = true;

  while (index < input.length) {
    if (notInTheComment && notStartAComment(index, input, markers)) {
      result += input[index++];
    } else if (input[index] !== "\n") {
      notInTheComment = false;
      index++;
    } else {
      notInTheComment = true;
      result += input[index++];
    }
  }

  return result;
}

function notStartAComment(index, input, markers) {
  const withSpace = input[index] === " ";
  const folowByMarker = markers.includes(input[index + 1]);

  return !(withSpace && folowByMarker);
}
