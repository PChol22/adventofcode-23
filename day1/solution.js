const { readFileSync } = require('fs');
const { join } = require('path');

const solveFirstPuzzle = (input) => {
    let solution = 0;
    input.split('\n').forEach(line => {
        const matches = [];
    
        for (let i = 0; i < line.length; i++) {
            if (+line[i] == line[i]) {
                matches.push(line[i]);
            }
        }
    
        solution += +(matches[0] + matches[matches.length - 1])
    })
    
    return solution;
}

const solveSecondPuzzle = (input) => {
  const numbersMapping = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
  };

  let solution = 0;
  input.split('\n').forEach(line => {
      const matches = [];

      for (let i = 0; i < line.length; i++) {
          if (+line[i] == line[i]) {
              matches.push(line[i]);
              continue;
          }

          for (let j = 0; j < 9; j++) {
              const word = line.slice(i, i + j + 1);
              
              if (numbersMapping[word]) {
                  matches.push(numbersMapping[word]);
                  break;
              }
          }
      }

      solution += +(matches[0] + matches[matches.length -1])
  })

  return solution;
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8')));
