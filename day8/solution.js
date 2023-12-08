const { readFileSync } = require('fs');
const { join } = require('path');

const solveFirstPuzzle = (input) => {
  const instructions = input[0].split('');
  const rawNodes = input.slice(2, input.length);

  const nodes = {};

  rawNodes.forEach((rawNode) => {
    const [node, rawEdges] = rawNode.split(' = ');
    const edges = rawEdges.replace(/(\(|\))/g, '').split(', ');

    nodes[node] = edges;
  });

  let currentNode = 'AAA';
  let instructionsIndex = 0;

  while (currentNode !== 'ZZZ') {
    const edges = nodes[currentNode];

    if (instructions[instructionsIndex % instructions.length] === 'L') {
      currentNode = edges[0];
    } else if (instructions[instructionsIndex % instructions.length] === 'R') {
      currentNode = edges[1];
    }

    instructionsIndex += 1;
  }

  return instructionsIndex;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function calculateLCM(numbers) {
  if (numbers.length < 2) {
      throw new Error("At least two numbers are required to calculate LCM.");
  }

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
      result = lcm(result, numbers[i]);
  }

  return result;
}

const solveSecondPuzzle = (input) => {
  const instructions = input[0].split('');
  const rawNodes = input.slice(2, input.length);

  const nodes = {};

  rawNodes.forEach((rawNode) => {
    const [node, rawEdges] = rawNode.split(' = ');
    const edges = rawEdges.replace(/(\(|\))/g, '').split(', ');

    nodes[node] = edges;
  });

  const nodesEndingWithA = Object.keys(nodes).filter((node) => node[2] === 'A');
  
  const steps = [];
  
  for (let startingNode of nodesEndingWithA) {
    let currentNode = startingNode;
    let instructionsIndex = 0;

    while (currentNode[2] !== 'Z') {
      const edges = nodes[currentNode];

      if (instructions[instructionsIndex % instructions.length] === 'L') {
        currentNode = edges[0];
      } else if (instructions[instructionsIndex % instructions.length] === 'R') {
        currentNode = edges[1];
      }

      instructionsIndex += 1;
    }

    steps.push(instructionsIndex);
  }

  return calculateLCM(steps);
}

console.log(solveFirstPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
console.log(solveSecondPuzzle(readFileSync(join(__dirname, 'input.txt'), 'utf8').split('\n')));
