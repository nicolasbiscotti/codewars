export function insert(value, array) {
  array.push(value);
  let rootIndex = Math.floor(array.length / 2) - 1;
  let valueIndex = array.length - 1;

  while (rootIndex >= 0 && value > array[rootIndex]) {
    changeValues({ index: valueIndex, value }, rootIndex, array);
    valueIndex = rootIndex;
    rootIndex = Math.floor((rootIndex + 1) / 2) - 1;
  }
}

export function removeMax(array) {
  let rootIndex = 0;
  const lastValue = array[array.length - 1];

  array[rootIndex] = lastValue;
  array.pop();

  let maxIndex = nextRoot(array, rootIndex);

  while (maxIndex && array[rootIndex] < array[maxIndex]) {
    changeValues({ index: rootIndex, value: lastValue }, maxIndex, array);
    rootIndex = maxIndex;
    maxIndex = nextRoot(array, rootIndex);
  }
}

function nextRoot(array, rootIndex) {
  let leftIndex = 2 * rootIndex + 1;
  let rightIndex = 2 * rootIndex + 2;

  let maxIndex;
  if (!array[leftIndex] && array[rightIndex]) {
    maxIndex = rightIndex;
  } else if (array[leftIndex] && !array[rightIndex]) {
    maxIndex = leftIndex;
  } else if (array[leftIndex] && array[rightIndex]) {
    maxIndex = array[leftIndex] > array[rightIndex] ? leftIndex : rightIndex;
  } else {
    maxIndex = null;
  }
  return maxIndex;
}

function changeValues({ index, value }, toIndex, array) {
  array[index] = array[toIndex];
  array[toIndex] = value;
}

export function createMaxHeap(numbers = [], insert) {
  const result = [];

  for (const number of numbers) {
    insert(number, result);
  }

  return result;
}
