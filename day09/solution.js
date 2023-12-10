const { readFileSync } = require('fs');
const { join } = require('path');

const solveFirstPuzzle = (input) => {
  let solution = 0;

  for (let line of input) {
    let newLines = [line.split(' ').map(n => +n)];   

    do {
      newLines.push([]);
      for (let j = 0; j < newLines[newLines.length - 2].length - 1; j++) {
        newLines[newLines.length - 1].push(newLines[newLines.length - 2][j+1] - newLines[newLines.length - 2][j]);
      }
    } while (newLines[newLines.length - 1].some((x) => x !== 0));

    let newValue = 0;
    for (let i = newLines.length - 2; i >= 0; i--) {
      newValue = newLines[i][newLines[i].length - 1] + newValue;
    }
    solution += newValue;
  }
  
  return solution;
}


const solveSecondPuzzle = (input) => {
  let solution = 0;

  for (let line of input) {
    let newLines = [line.split(' ').map(n => +n)];   

    do {
      newLines.push([]);
      for (let j = 0; j < newLines[newLines.length - 2].length - 1; j++) {
        newLines[newLines.length - 1].push(newLines[newLines.length - 2][j+1] - newLines[newLines.length - 2][j]);
      }
    } while (newLines[newLines.length - 1].some((x) => x !== 0));

    let newValue = 0;
    for (let i = newLines.length - 2; i >= 0; i--) {
      newValue = newLines[i][0] - newValue;
    }
    solution += newValue;
  }
  
  return solution;
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
