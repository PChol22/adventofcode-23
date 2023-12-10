const { readFileSync } = require('fs');
const { join } = require('path');

const solveFirstPuzzle = (input) => {
  const seeds = input.split('\n')[0].split(': ')[1].split(' ').map(n => +n);
  const maps = input.split('\n\n').slice(1).map(l => l.split('\n').slice(1).map(r => r.split(' ').map(n => +n)));

  let minSeed = Infinity;

  seeds.forEach((seed) => {
    maps.forEach((_, i) => {
      const correspondingMap = maps[i].find(m => seed >= m[1] && seed < m[1] + m[2]);

      if (correspondingMap !== undefined) {
        seed = correspondingMap[0] - correspondingMap[1] + seed;
      }
    });

    if (seed < minSeed) {
      minSeed = seed;
    }
  })

  return minSeed;
}

const solveSecondPuzzle = (input) => {
  const seeds = input.split('\n')[0].split(': ')[1].split(' ').map(n => +n);
  // Go through the mappings backwards to exit on first match (~100M iterations instead of ~10B)
  const maps = input.split('\n\n').slice(1).map(l => l.split('\n').slice(1).map(r => r.split(' ').map(n => +n))).reverse();

  for (let i = 0; i < 10_000_000_000; i++) {
    let goal = i;

    maps.forEach((_, j) => {
      const correspondingMap = maps[j].find(m => goal >= m[0] && goal < m[0] + m[2]);

      if (correspondingMap !== undefined) {
        goal = correspondingMap[1] + goal - correspondingMap[0];
      }
    });

    for (let j = 0; j < seeds.length / 2; j++) {
      if (goal >= seeds[j * 2] && goal < seeds[j * 2] + seeds[j * 2 + 1]) {
        return i;
      }
    }
  }
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8')));
