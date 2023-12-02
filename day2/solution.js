const { readFileSync } = require('fs');
const { join } = require('path');

const solveFirstPuzzle = (input) => {
  let solution = 0;

  input.replace(/,/g, ';').split('\n').map(l => l.split(': ')[1]).forEach((line, id) => {
    const colors = line.split('; ');

    let ok = true;

    colors.forEach((color) => {
      const [amount, name] = color.split(' ');
      
      if ((name === 'blue' && +amount > 14) || (name === 'green' && +amount > 13) || (name === 'red' && +amount > 12)) {
        ok = false;
      }
    });

    if (ok) {
      solution += (id+1);
    }
  });

  return solution
}

const solveSecondPuzzle = (input) => {
  let solution = 0;

  input.replace(/,/g, ';').split('\n').map(l => l.split(': ')[1]).forEach(line => {
    const colors = line.split('; ');

    let blue = 0;
    let green = 0;
    let red = 0;
    
    colors.forEach((color) => {
      const [amount, name] = color.split(' ');
      
      if (name === 'blue' && blue < Number(amount)) {
        blue = Number(amount);
      } else if (name === 'green' && green < Number(amount)) {
        green = Number(amount);
      } else if (name === 'red' && red < Number(amount)) {
        red = Number(amount);
      }
    });

    solution += blue * green * red;
  });

  return solution
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8')));
