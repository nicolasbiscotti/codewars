export function solution(numbers) {
  let gcd = numbers[0];
  for (let index = 1; index < numbers.length; index++) {
    gcd = getGCD(gcd, numbers[index]);
    if (gcd === 1) {
      return numbers.length;
    }
  }
  return gcd * numbers.length;
}

export function getGCD(a, b) {
  let [max, min] = [Math.max(a, b), Math.min(a, b)];

  let resto = max % min; // 0 <= resto <= (min-1)

  if (resto === 0) {
    return min;
  }

  while (resto > 1) {
    console.log(resto);
    [max, min] = [Math.max(resto, min), Math.min(resto, min)];
    resto = max % min;
    if (resto === 0) {
      return min;
    }
  }

  return resto;
}

