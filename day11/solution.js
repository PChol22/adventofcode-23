const { readFileSync } = require('fs');
const { join } = require('path');


const solveFirstPuzzle = (input) => {
  let grid = input.map((line) => line.split(''));
  
  const height = grid.length;
  const gapsH = [];
  for (let i = 0; i < height; i++) {
    if (grid[i].every((seat) => seat === '.')) {
      gapsH.push(i);
    }
  }

  const width = grid[0].length;
  const gapsV = [];
  for (let j = 0; j < width; j++) {
    let empty = true;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i][j] !== '.') {
        empty = false;
        break;
      }
    }

    if (empty) {
      gapsV.push(j);
    }
  }

  const points = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '#') {
        points.push([i, j]);
      }
    }
  }

  let solution = 0;

  for (let [i, j] of points) {
    for (let [y, x] of points) {
      const amountOfGapsH = gapsH.filter((gap) => gap > Math.min(i, y) && gap < Math.max(i, y)).length;
      const amountOfGapsV = gapsV.filter((gap) => gap > Math.min(j, x) && gap < Math.max(j, x)).length;
      solution += Math.abs(y - i) + Math.abs(x - j) + 1 * (amountOfGapsH + amountOfGapsV);
    }
  }

  return solution / 2;
}


const solveSecondPuzzle = (input) => {
  let grid = input.map((line) => line.split(''));
  
  const height = grid.length;
  const gapsH = [];
  for (let i = 0; i < height; i++) {
    if (grid[i].every((seat) => seat === '.')) {
      gapsH.push(i);
    }
  }

  const width = grid[0].length;
  const gapsV = [];
  for (let j = 0; j < width; j++) {
    let empty = true;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i][j] !== '.') {
        empty = false;
        break;
      }
    }

    if (empty) {
      gapsV.push(j);
    }
  }

  const points = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '#') {
        points.push([i, j]);
      }
    }
  }

  let solution = 0;

  for (let [i, j] of points) {
    for (let [y, x] of points) {
      const amountOfGapsH = gapsH.filter((gap) => gap > Math.min(i, y) && gap < Math.max(i, y)).length;
      const amountOfGapsV = gapsV.filter((gap) => gap > Math.min(j, x) && gap < Math.max(j, x)).length;
      solution += Math.abs(y - i) + Math.abs(x - j) + 999999 * (amountOfGapsH + amountOfGapsV);
    }
  }

  return solution / 2;
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
