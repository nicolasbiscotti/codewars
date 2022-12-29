export function solution(numbers, getIndexes, needsTranformation, transform) {
  // const values = createValuesTracker(numbers);

  // while (values.size() > 1) {
  //   let index = values.pop();
  //   numbers[index] = numbers[index] - numbers[values.peek()];
  //   values.add({ index, value: numbers[index] });
  // }

  let indexes = getIndexes(numbers);

  while (needsTranformation(indexes)) {
    numbers = transform(numbers, indexes);
    indexes = getIndexes(numbers);
  }

  return numbers[0] * numbers.length;
}

export function getIndexes(numbers) {
  const indexes = {
    greater: -1,
    second: -1,
  };

  for (let index = 0; index < numbers.length; index++) {
    if (isTheGreater(numbers, index, indexes.greater)) {
      indexes.second = indexes.greater;
      indexes.greater = index;
    } else if (isTheSecond(numbers, index, indexes)) {
      indexes.second = index;
    }
  }

  if (indexes.second === -1) {
    indexes.greater = -1;
  }

  return indexes;
}

function isTheGreater(numbers, currentIndex, greater) {
  const noGreaterYet = greater < 0;
  const isGreater = numbers[currentIndex] > numbers[greater];
  return noGreaterYet || isGreater;
}
function isTheSecond(numbers, currentIndex, indexes) {
  const isSecond = isTheGreater(numbers, currentIndex, indexes.second);
  const isNotTheGreater = numbers[currentIndex] !== numbers[indexes.greater];
  return isSecond && isNotTheGreater;
}

export function needsTransformation(indexes) {
  if (indexes.greater === -1 && indexes.second === -1) {
    return false;
  } else {
    return true;
  }
}

export function transform(numbers, indexes) {
  numbers[indexes.greater] = numbers[indexes.greater] - numbers[indexes.second];
  return numbers;
}

export function createValuesTracker(numbers) {
  let length = 0;
  let peekTheSecondValue = false;
  const values = { next: null };

  for (let index = 0; index < numbers.length; index++) {
    add({ index, value: numbers[index] });
  }

  function pop() {
    if (values.next !== null) {
      const index = values.next.index.pop();
      if (values.next.index.length === 0) {
        values.next = values.next.next;
        length--;
        peekTheSecondValue = false;
        return index;
      } else {
        peekTheSecondValue = true;
        return index;
      }
    }
  }

  function peek() {
    if (values.next === null) {
      return null;
    } else {
      if (peekTheSecondValue) {
        return values.next.next.index[values.next.next.index.length - 1];
      } else {
        return values.next.index[values.next.index.length - 1];
      }
    }
  }

  function add(toAdd) {
    const { index, value } = toAdd;

    let current = values;
    let keepGoing = true;
    let equal = false;

    while (current.next !== null && keepGoing) {
      if (current.next.value < value) {
        keepGoing = false;
      } else if (current.next.value === value) {
        equal = true;
        keepGoing = false;
      } else {
        current = current.next;
      }
    }

    if (equal) {
      current.next.index.unshift(index);
    } else {
      current.next = { value, index: [index], next: current.next };
      length++;
    }
  }

  function size() {
    return length;
  }

  function isEmpty() {
    return values.next === null;
  }

  return {
    pop,
    peek,
    add,
    size,
  };
}
