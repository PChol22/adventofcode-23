const { readFileSync } = require('fs');
const { join } = require('path');

const solveFirstPuzzle = (input) => {
  let solution = 0;

  input.forEach((line) => {
    const [winningNumbers, cardNumbers] = line.split(': ')[1].split(' | ');

    const parsedWinningNumbers = winningNumbers.split(' ').map((number) => parseInt(number));
    const parsedCardNumbers = cardNumbers.split(' ').map((number) => parseInt(number));
    
    const winningCount = parsedCardNumbers.filter((number) => parsedWinningNumbers.includes(number)).length;

    if (winningCount >= 1) {
      solution += 2 ** (winningCount - 1);
    }
  });

  return solution
}



const solveSecondPuzzle = (input) => {
  const cards = Object.fromEntries(input.map((_, i) => [i, 1]));  

  input.forEach((line, index) => {
    const [winningNumbers, cardNumbers] = line.split(': ')[1].split(' | ');
    
    const parsedWinningNumbers = winningNumbers.split(' ').map((number) => parseInt(number));
    const parsedCardNumbers = cardNumbers.split(' ').map((number) => parseInt(number));
    
    const winningCount = parsedCardNumbers.filter((number) => parsedWinningNumbers.includes(number)).length;

    for (let i = 0; i < winningCount; i++) {
      if (cards[index + i + 1] !== undefined) {
        cards[index+ i + 1] += cards[index];
      } 
    }

  });

  return Object.values(cards).reduce((acc, curr) => acc + curr, 0);
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').replace(/  /g, ' 0').split('\n')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').replace(/  /g, ' 0').split('\n')));
