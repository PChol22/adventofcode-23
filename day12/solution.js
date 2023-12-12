const { readFileSync } = require('fs');
const { join } = require('path');

const cache = {};

const cachedMain = (currentNumberLength, row, numbers) => {
  const cachedResult = cache[`${currentNumberLength}-${row.join('')}-${numbers.join(',')}`]
  if (cachedResult !== undefined) {
    return cachedResult
  }

  const result = main(currentNumberLength, row, numbers);
  cache[`${currentNumberLength}-${row.join('')}-${numbers.join(',')}`] = result;

  return result;
}

const main = (currentNumberLength, row, numbers) => {
  if (row.length === 0) {
    if (currentNumberLength === undefined || currentNumberLength === 0) {
      return numbers.length === 0 ? 1 : 0;
    } else {
      return 0;
    }
  } else {
    const [firstSymbol, ...restRow] = row;

    if (firstSymbol === '?') {
      if (currentNumberLength === undefined) {
        if (numbers.length === 0) {
          return cachedMain(undefined, restRow, numbers);
        } else {
          const [firstNumber, ...restNumbers] = numbers;

          return cachedMain(firstNumber - 1, restRow, restNumbers) + cachedMain(undefined, restRow, numbers);
        }
      } else if (currentNumberLength === 0) {
        return cachedMain(undefined, restRow, numbers);
      } else {
        return cachedMain(currentNumberLength - 1, restRow, numbers);
      }
    } else if (firstSymbol === '#') {
      if (currentNumberLength === undefined) {
        if (numbers.length === 0) {
          return 0;
        } else {
          const [firstNumber, ...restNumbers] = numbers;

          return cachedMain(firstNumber - 1, restRow, restNumbers);
        }
      } else if (currentNumberLength === 0) {
        return 0;
      } else {
        return cachedMain(currentNumberLength - 1, restRow, numbers);
      }
    } else if (firstSymbol === '.') {
      if (currentNumberLength === undefined || currentNumberLength === 0) {
        return cachedMain(undefined, restRow, numbers)
      } else {
        return 0;
      }
    }  else {
      throw new Error('Unknown symbol' + firstSymbol);
    }
  }
}

const solveFirstPuzzle = (input) => {
  let solution = 0;

  for (let line of input) {
    const [rawSprings, rawNumbers] = line.split(' ');
    const springs = rawSprings.split('');
    const numbers = rawNumbers.split(',').map((n) => +n);

    solution += main(undefined, springs, numbers);
  }

  return solution;
}

const solveSecondPuzzle = (input) => {
  let solution = 0;

  for (let line of input) {
    const [rawSprings, rawNumbers] = line.split(' ');
    const springs = rawSprings.split('');
    const numbers = rawNumbers.split(',').map((n) => +n);

    solution += main(
      undefined,
      [...springs,'?',...springs,'?',...springs,'?',...springs,'?',...springs],
      [...numbers,...numbers,...numbers,...numbers,...numbers]
    );
  }

  return solution;
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
