export const getWords = (sentence) => {
  return sentence.split(/[ .,]+/)
    .filter(word => word.length > 0);
}

export const parseRules = (rawRules, words) => {
  const ruleLines = rawRules.split('\n');

  const rules = {};
  for (let i = 0; i < ruleLines.length; i += 1) {
    const symbols = ruleLines[i].split(/\s+[->⟶]+\s+/);
    if (symbols.length !== 2) {
      throw new Error(`Line ${i}: ${ruleLines[i]} doesn't follow the syntax [NS] -> [TS1],[TS2].`);
    }

    const left = symbols[0];
    const rights = symbols[1].split(/[ ,]/).filter(symbol => symbol.length > 0);

    if (rights.length !== 1 && rights.length !== 2) {
      throw new Error(`Line ${i}: ${ruleLines[i]} should have only 1 or 2 terminal symbols.`);
    }

    const ruleKey = rights.join('|');
    if (!(ruleKey in rules)) {
      rules[ruleKey] = new Set();
    }

    rules[ruleKey].add(left);
  }

  for (let i = 0; i < words.length; i += 1) {
    if (!(words[i] in rules)) {
      throw new Error(`Word ${words[i]} does not exist in rules.`)
    }
  }

  return rules;
}

class Square {
  constructor(start, end, label = '') {
    this.values = new Set();
    this.start = start;
    this.end = end;
    this.children = {};
    this.label = label;
  }

  addValueList(values) {
    values.forEach((value) => {
      this.values.add(value);
    });
  }

  isNone() {
    return this.values.size === 0;
  }

  addChild(value, leftValue, leftChild, rightValue, rightChild) {
    if (!(value in this.children)) {
      this.children[value] = [];
    }

    this.children[value].push({
      leftValue,
      rightValue,
      leftChild,
      rightChild,
    });
  }
}

export const createRange = (n) => {
  const range = new Array(n);
  for (let i = 0; i < n; i += 1) range[i] = i;
  return range;
}

export const buildCykTable = (rules, words) => {
  const tables = new Array(words.length);
  for (let start = 0; start < words.length; start += 1) {
    tables[start] = new Array(words.length);
    for (let end = start; end < words.length; end += 1) {
      tables[start][end] = new Square(start, end);
    }
  }

  // Init for each words
  for (let start = 0; start < words.length; start += 1) {
    const square = tables[start][start];
    square.label = words[start];
    square.addValueList(rules[words[start]]);

    square.values.forEach((value) => {
      if (value in rules) {
        square.addValueList(rules[value]);
      }
    });
  }

  // CYK algorithm
  for (let dist = 1; dist < words.length; dist += 1) {
    for (let start = 0; start < words.length; start += 1) {
      const end = start + dist;
      if (end >= words.length) break;

      const square = tables[start][end];
      for (let k = start; k <= end - 1; k += 1) {
        const leftSquare = tables[start][k];
        const rightSquare = tables[k + 1][end];

        if (leftSquare.isNone() || rightSquare.isNone()) continue;
        leftSquare.values.forEach((leftValue) => {
          rightSquare.values.forEach((rightValue) => {
            const ruleKey = `${leftValue}|${rightValue}`;
            if (ruleKey in rules) {
              square.addValueList(rules[ruleKey]) ;
              rules[ruleKey].forEach((value) => {
                square.addChild(value, leftValue, leftSquare, rightValue, rightSquare);
              });
            }
          });
        });
      }
    }
  }

  return tables;
}


export const getTrees = (table, words) => {
  const currentSquare = table[0][words.length - 1];

  const getSquareId = (square) => (square.start * words.length + square.end);

  const traverse = (square, squareValue, parentSquare) => {
    const tree = {
      nodes: [],
      edges: [],
    };

    tree.nodes.push({
      id: getSquareId(square),
      label: square.start == square.end ? `${squareValue} (${square.label})` : squareValue,
      color: square.start == square.end ? '#34ebb4' : '#ebcbf2',
    });

    if (parentSquare) {
      tree.edges.push({
        from: getSquareId(parentSquare),
        to: getSquareId(square),
      });
    }

    if (square.start == square.end) {
      return [tree];
    }

    const trees = [];
    square.children[squareValue].forEach(({
      leftChild,
      rightChild,
      leftValue,
      rightValue,
    }) => {
      const leftTrees = traverse(leftChild, leftValue, square);
      const rightTrees = traverse(rightChild, rightValue, square);

      leftTrees.forEach((leftTree) => {
        rightTrees.forEach((rightTree) => {
          trees.push({
            nodes: tree.nodes.concat(leftTree.nodes).concat(rightTree.nodes),
            edges: tree.edges.concat(leftTree.edges).concat(rightTree.edges),
          });
        });
      });
    });

    return trees;
  }

  const fullTrees = [];
  currentSquare.values.forEach((value) => {
    fullTrees.push(...traverse(currentSquare, value, null));
  });

  return fullTrees;
}
