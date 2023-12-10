const { readFileSync } = require('fs');
const { join } = require('path');

const solveFirstPuzzle = (input) => {
  const lines = input.map(l => l.replace(/( )( )*/g, ' ').split(': ')[1].split(' ').map(n => +n));
  
  let solution = 1;

  for (let i = 0; i < lines[0].length; i++) {
    const time = lines[0][i];
    const distance = lines[1][i];
    let waysToWin = 0

    for (let j = 0; j <= time; j++) {
      const traveled = (time - j) * (j);
      if (traveled > distance) {
        waysToWin++;
      }
    }

    solution *= waysToWin;
  }

  return solution;
}

// time * x - x2 - distance = 0
// b=time
// c=-distance
// a=1
// x1 = (-b - sqrt(b^2 - 4ac)) / 2a
// x2 = (-b + sqrt(b^2 - 4ac)) / 2a
// range = x2 - x1 = sqrt(b^2 - 4ac) / a

const solveSecondPuzzle = (input) => {
  console.log('Just take a piece of paper and do it by hand it will be faster 🙃')

  const lines = input.map(l => l.replace(/ /g, '').split(':')[1]).map(n => +n);
  const [time, distance] = lines;

  const delta = (time * time) - (4 * distance);
  const x1 = Math.floor((-time - Math.sqrt(delta)) / 2);
  const x2 = Math.floor((-time + Math.sqrt(delta)) / 2);

  return x2 - x1;
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
