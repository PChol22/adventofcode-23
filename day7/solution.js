const { readFileSync } = require('fs');
const { join } = require('path');

const cardsOrder1 = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const cardsOrder2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

const findFiveOfKind = (cards, includeJokers) => {
  const nbOfJ = cards.filter((card) => card === 'J').length;

  if (nbOfJ > 0 && includeJokers) {
    for (card of cardsOrder2.slice(0, cardsOrder2.length -1)) {
      if (findFiveOfKind(cards.join('').replace('J', card).split(''), includeJokers)) {
        return true;
      }
    }

    return false;
  }

  const byRank = cards.reduce((acc, card) => {
    acc[card] = acc[card] ?? 0;
    acc[card] += 1;

    return acc;
  }, {});

  if (Object.values(byRank).includes(5)) {
    return true;
  }
}

const findFourOfKind = (cards, includeJokers) => {
  const nbOfJ = cards.filter((card) => card === 'J').length;

  if (nbOfJ > 0 && includeJokers) {
    for (card of cardsOrder2.slice(0, cardsOrder2.length -1)) {
      if (findFourOfKind(cards.join('').replace('J', card).split(''), includeJokers)) {
        return true;
      }
    }

    return false;
  }

  const byRank = cards.reduce((acc, card) => {
    acc[card] = acc[card] ?? 0;
    acc[card] += 1;

    return acc;
  }, {});

  if (Object.values(byRank).includes(4)) {
    return true;
  }
}

const findThreeOfKind = (cards, includeJokers) => {
  const nbOfJ = cards.filter((card) => card === 'J').length;

  if (nbOfJ > 0 && includeJokers) {
    for (card of cardsOrder2.slice(0, cardsOrder2.length -1)) {
      if (findThreeOfKind(cards.join('').replace('J', card).split(''), includeJokers)) {
        return true;
      }
    }

    return false;
  }
  
  const byRank = cards.reduce((acc, card) => {
    acc[card] = acc[card] ?? 0;
    acc[card] += 1;

    return acc;
  }, {});

  if (Object.values(byRank).includes(3)) {
    return true;
  }
}

const findPair = (cards, includeJokers) => {
  const nbOfJ = cards.filter((card) => card === 'J').length;

  if (nbOfJ > 0 && includeJokers) {
    for (card of cardsOrder2.slice(0, cardsOrder2.length -1)) {
      if (findPair(cards.join('').replace('J', card).split(''), includeJokers)) {
        return true;
      }
    }

    return false;
  }

  const byRank = cards.reduce((acc, card) => {
    acc[card] = acc[card] ?? 0;
    acc[card] += 1;

    return acc;
  }, {});

  if (Object.values(byRank).includes(2)) {
    return true;
  }
}

const findTwoPairs = (cards, includeJokers) => {
  const nbOfJ = cards.filter((card) => card === 'J').length;

  if (nbOfJ > 0 && includeJokers) {
    for (card of cardsOrder2.slice(0, cardsOrder2.length -1)) {
      if (findTwoPairs(cards.join('').replace('J', card).split(''), includeJokers)) {
        return true;
      }
    }

    return false;
  }

  const byRank = cards.reduce((acc, card) => {
    acc[card] = acc[card] ?? 0;
    acc[card] += 1;

    return acc;
  }, {});

  if (Object.values(byRank).filter((value) => value === 2).length === 2) {
    return true;
  }
}

const findFullHouse = (cards, includeJokers) => {
  const nbOfJ = cards.filter((card) => card === 'J').length;

  if (nbOfJ > 0 && includeJokers) {
    for (card of cardsOrder2.slice(0, cardsOrder2.length -1)) {
      if (findFullHouse(cards.join('').replace('J', card).split(''))) {
        return true;
      }
    }

    return false;
  }

  const byRank = cards.reduce((acc, card) => {
    acc[card] = acc[card] ?? 0;
    acc[card] += 1;

    return acc;
  }, {});

  if (Object.values(byRank).includes(3) && Object.values(byRank).includes(2)) {
    return true;
  }
}

const solveFirstPuzzle = (input) => {
  let solution = 0;

  const sortedLines = [...input].sort((a, b) => {
    let aRank = 0;
    let bRank = 0;

    const aCards = a.split(' ')[0].split('');
    const bCards = b.split(' ')[0].split('');

    switch(true) {
      case findFiveOfKind(aCards, false):
        aRank = 10;
        break;
      case findFourOfKind(aCards, false):
        aRank = 9;
        break;
      case findFullHouse(aCards, false):
        aRank = 8;
        break;
      case findThreeOfKind(aCards, false):
        aRank = 7;
        break;
      case findTwoPairs(aCards, false):
        aRank = 6;
        break;
      case findPair(aCards, false):
        aRank = 5;
        break;
      default:
        aRank = 0;
    }

    switch(true) {
      case findFiveOfKind(bCards, false):
        bRank = 10;
        break;
      case findFourOfKind(bCards, false):
        bRank = 9;
        break;
      case findFullHouse(bCards, false):
        bRank = 8;
        break;
      case findThreeOfKind(bCards, false):
        bRank = 7;
        break;
      case findTwoPairs(bCards, false):
        bRank = 6;
        break;
      case findPair(bCards, false):
        bRank = 5;
        break;
      default:
        bRank = 0;
    }

    if (aRank > bRank) {
      return 1;
    } else if (aRank < bRank) {
      return -1;
    }

    for (let i = 0; i < aCards.length; i++) {
      if (cardsOrder1.indexOf(aCards[i]) > cardsOrder1.indexOf(bCards[i])) {
        return -1;
      } else if (cardsOrder1.indexOf(aCards[i]) < cardsOrder1.indexOf(bCards[i])) {
        return 1;
      }
    }
  });

  sortedLines.forEach((line, index) => {
    const bid = +line.split(' ')[1];
    solution += bid * (index+1);
  });

  return solution;
}


const solveSecondPuzzle = (input) => {
  let solution = 0;

  const sortedLines = [...input].sort((a, b) => {
    let aRank = 0;
    let bRank = 0;

    const aCards = a.split(' ')[0].split('');
    const bCards = b.split(' ')[0].split('');

    switch(true) {
      case findFiveOfKind(aCards, true):
        aRank = 10;
        break;
      case findFourOfKind(aCards, true):
        aRank = 9;
        break;
      case findFullHouse(aCards, true):
        aRank = 8;
        break;
      case findThreeOfKind(aCards, true):
        aRank = 7;
        break;
      case findTwoPairs(aCards, true):
        aRank = 6;
        break;
      case findPair(aCards, true):
        aRank = 5;
        break;
      default:
        aRank = 0;
    }

    switch(true) {
      case findFiveOfKind(bCards, true):
        bRank = 10;
        break;
      case findFourOfKind(bCards, true):
        bRank = 9;
        break;
      case findFullHouse(bCards, true):
        bRank = 8;
        break;
      case findThreeOfKind(bCards, true):
        bRank = 7;
        break;
      case findTwoPairs(bCards, true):
        bRank = 6;
        break;
      case findPair(bCards, true):
        bRank = 5;
        break;
      default:
        bRank = 0;
    }

    if (aRank > bRank) {
      return 1;
    } else if (aRank < bRank) {
      return -1;
    }

    for (let i = 0; i < aCards.length; i++) {
      if (cardsOrder2.indexOf(aCards[i]) > cardsOrder2.indexOf(bCards[i])) {
        return -1;
      } else if (cardsOrder2.indexOf(aCards[i]) < cardsOrder2.indexOf(bCards[i])) {
        return 1;
      }
    }
  });

  sortedLines.forEach((line, index) => {
    const bid = +line.split(' ')[1];
    solution += bid * (index+1);
  });

  return solution;
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
