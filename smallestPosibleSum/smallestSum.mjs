import { insert, removeMax } from "../maxHeap/createMaxHeap.mjs";

export function solution(numbers) {
  const store = maxHeapWithoutRepetitions(numbers);
  let sum = 0;

  while (store.maxHeap.length > 1) {
    const [indexOfMax, maxValue, secondValue] = grabTheTwoBiggest(store);
    numbers[indexOfMax] = maxValue - secondValue;
    insertValue({ index: indexOfMax, value: maxValue - secondValue }, store);
  }

  if (store.maxHeap.length === 1) {
    sum = peek(store)[1] * numbers.length;
  }

  return sum;
}

function grabTheTwoBiggest(store) {
  const [indexOfMax, maxValue] = peek(store);
  removeMaxValue(store);
  let [, second] = peek(store);

  if (second === maxValue) {
    const left = store.maxHeap[1] ? store.maxHeap[1] : Number.MIN_VALUE;
    const right = store.maxHeap[2] ? store.maxHeap[2] : Number.MIN_VALUE;
    second = Math.max(left, right);
  }

  return [indexOfMax, maxValue, second];
}

export function maxHeapWithoutRepetitions(numbers) {
  const store = {
    maxHeap: [],
    indexesOfNumbers: {},
  };
  for (let index = 0; index < numbers.length; index++) {
    insertValue({ index, value: numbers[index] }, store);
  }
  return store;
}

export function removeMaxValue(store) {
  const [, value] = peek(store);
  if (store.indexesOfNumbers[value].length > 1) {
    store.indexesOfNumbers[value].pop();
  } else {
    delete store.indexesOfNumbers[value];
    removeMax(store.maxHeap);
  }
}

function insertValue({ index, value }, { maxHeap, indexesOfNumbers }) {
  if (!indexesOfNumbers[value]) {
    indexesOfNumbers[value] = [index];
    insert(value, maxHeap);
  } else {
    indexesOfNumbers[value].push(index);
  }
}

function peek(store) {
  const value = store.maxHeap[0];
  const index = store.indexesOfNumbers[value][0];
  return [index, value];
}
