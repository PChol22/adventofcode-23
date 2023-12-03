const { readFileSync } = require('fs');
const { join } = require('path');

const adjacentSpots = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const findAdjacentSymbol = (input, i, j) => {
  for (const [x, y] of adjacentSpots) {
    const value = input[i + y]?.[j + x];

    if (value !== undefined && value !== '.' && !Number.isInteger(+value)) {
      return true;
    }
  }

  return false;
}

const findFullNumber = (input, i, j) => {
  let nb = input[i][j];

  for (let k = j - 1; k >= 0; k--) {
    if (Number.isInteger(+input[i][k])) {
      nb = `${input[i][k]}${nb}`;
    } else {
      break;
    }
  }

  for (let k = j + 1; k < input[0].length; k++) {
    if (Number.isInteger(+input[i][k])) {
      nb += input[i][k];
    } else {
      break;
    }
  }

  return nb;
}

const findAdjacentNumbers = (input, i, j) => {
  const adjacentNumbers = new Set();

  for (const [x, y] of adjacentSpots) {
    const value = input[i + y]?.[j + x];

    if (Number.isInteger(+value)) {
      adjacentNumbers.add(findFullNumber(input, i + y, j + x));
    }
  }

  return Array.from(adjacentNumbers);
}

const solveFirstPuzzle = (input) => {
  let solution = 0;

  for (let i = 0; i < input.length; i++) {
    let currentNb = '';
    let adjacent = false;
    
    for (let j = 0; j < input[0].length + 1; j++) {
      if (!Number.isInteger(+input[i][j])) {
        if (adjacent) {
          solution += +currentNb;
        }
        
        currentNb = '';
        adjacent = false;
        continue;
      }

      currentNb += input[i][j];

      if (findAdjacentSymbol(input, i, j)) {
        adjacent = true;
      }
    }
  }

  return solution
}

const solveSecondPuzzle = (input) => {
  let solution = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] !== '*') {
        continue;
      }

      const adjacentNumbers = findAdjacentNumbers(input, i, j);

      if (adjacentNumbers.length === 2) {
        const [nb1, nb2] = adjacentNumbers;
        solution += +nb1 * +nb2;
      }
    }

  }

  return solution
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
