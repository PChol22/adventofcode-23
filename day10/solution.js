const { readFileSync } = require('fs');
const { join } = require('path');

const getOrientations = (symbol) => {
  switch (symbol) {
    case ('|'):
      return [[1, 0], [-1, 0]];
    case ('-'):
      return [[0, 1], [0, -1]];
    case ('F'):
      return [[1, 0], [0, 1]];
    case ('7'):
      return [[1, 0], [0, -1]];
    case ('J'):
      return [[-1, 0], [0, -1]];
    case ('L'):
      return [[-1, 0], [0, 1]];
    case 'S':
      return [[1, 0], [0, 1], [-1, 0], [0, -1]];
    default:
      return [];
  }
}

const getLoopSizeAndFillWalls = (grid) => {
  const startI = grid.findIndex((line) => line.includes('S'));
  const startJ = grid[startI].findIndex((char) => char === 'S');

  let I1 = startI;
  let J1 = startJ;
  let I2 = startI;
  let J2 = startJ;

  let step = 0;

  do {
    step ++;
    const spot1 = grid[I1][J1];
    const spot2 = grid[I2][J2];
    const orientations1 = getOrientations(spot1);
    const orientations2 = getOrientations(spot2);
    grid[I1][J1] = '█';
    grid[I2][J2] = '█';

    for (let [y, x] of orientations1) {
      const newSpot = grid[I1 + y]?.[J1 + x];
      if (newSpot === undefined) {
        continue;
      }

      const newOrientations = getOrientations(newSpot);
      if (newOrientations.some(([yy, xx]) => yy === -y && xx === -x)) {
        I1 += y;
        J1 += x;
        break;
      }
    }

    for (let [y, x] of orientations2) {
      // THE 2 PATHS SHOULD START IN DIFFERENT DIRECTIONS
      if (step === 1 && I2 + y === I1 && J2 + x === J1) {
        continue;
      }

      const newSpot = grid[I2 + y]?.[J2 + x];
      
      if (newSpot === undefined) {
        continue;
      }
      
      const newOrientations = getOrientations(newSpot);
      if (newOrientations.some(([yy, xx]) => yy === -y && xx === -x)) {
        I2 += y;
        J2 += x;
        break;
      }
    }
  } while (I1 !== I2 || J1 !== J2);
  grid[I1][J1] = '█';

  return step;
};

const solveFirstPuzzle = (input) => {
  const grid = input.map((line) => line.split(''));

  return getLoopSizeAndFillWalls(grid);
}


const solveSecondPuzzle = (input) => {
  // ADD EXTRA EDGES AROUND THE GRID
  const input2 = ['.'.repeat(input[0].length + 2), ...input.map((line) => '.' + line + '.'), '.'.repeat(input[0].length + 2)];
  let grid = input2.map((line) => line.split(''));

  // SPREAD THE GRID BY ADDING EXTRA LINES AND COLUMNS (TO MAKE IT EASIER TO MOVE AROUND)
  const height = grid.length;
  for (let i = 0; i < height - 1; i++) {
    grid = [...grid.slice(0, 2*i+1), '.'.repeat(grid[i].length).split(''), ...grid.slice(2*i+1)];

    for (let j = 0; j < grid[i].length; j++) {
      if (['7', 'F', '|', 'S'].includes(grid[2*i][j]) && ['L', 'J', '|', 'S'].includes(grid[2*i+2][j])) {
        grid[2*i+1][j] = '|';
      }
    }
  }

  const width = grid[0].length;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < width - 1; j++) {
      grid[i] = [...grid[i].slice(0, 2*j+1), '.', ...grid[i].slice(2*j+1)];
      if (['L', 'F', '-', 'S'].includes(grid[i][2*j]) && ['J', '7', '-', 'S'].includes(grid[i][2*j+2])) {
        grid[i][2*j+1] = '-';
      }
    }
  }

  // FIND THE LOOP AND MARK IT WITH █ (BUILD A WALL)
  getLoopSizeAndFillWalls(grid);
  
  // GO THROUGH THE GRAPH FROM THE OUTSIDE AND MARK EXTERNAL SPOTS (DFS)
  const edge = [[0, 0]];

  while (edge.length > 0) {
    const [i, j] = edge.pop();

    for (let [y, x] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const newI = i + y;
      const newJ = j + x;

      if (!['█', ' '].includes(grid[newI]?.[newJ] ?? '█')) {
        edge.push([newI, newJ]);
        grid[newI][newJ] = ' ';
      }
    }
  }

  if (process.env.DISPLAY_GRAPH === 'true') {
    console.log(grid.map((line) => line.join('')).join('\n'));
  }

  // REMOVE EXTERNAL SPOTS, WALLS AND SPOTS THAT WERE ADDED IN STEP 1 AND 2
  return grid.map((line, indexI) =>
    line.filter((char, indexJ) =>
      char !== '█' && char !== ' ' && indexI % 2 !== 1 && indexJ % 2 !== 1 && indexI > 0 && indexI < grid.length - 1 && indexJ > 0 && indexJ < grid[0].length - 1
    ).length
  ).reduce((a, b) => a + b, 0);
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
