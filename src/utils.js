export const getWords = (sentence) => {
  return sentence.split(/[ .,]+/)
    .filter(word => word.length > 0)
    .join(' | ');
}

export const parseRules = (rawRules) => {
  const ruleLines = rawRules.split('\n');

  const rules = {};
  for (let i = 0; i < ruleLines.length; i += 1) {
    const symbols = ruleLines[i].split(/\s+->\s+/);
    if (symbols.length !== 2) {
      throw new Error(`Line ${i}: ${ruleLines[i]} doesn't follow the syntax [NS] -> [TS1],[TS2]`);
    }

    const left = symbols[0];
    const rights = symbols[1].split(/[ ,]/).filter(symbol => symbol.length > 0);

    if (rights.length !== 1 && rights.length !== 2) {
      throw new Error(`Line ${i}: ${ruleLines[i]} should have only 1 or 2 terminal symbols`);
    }

    const ruleKey = rights.join('|');
    if (ruleKey in rules) {
      throw new Error(`Line ${i}: ${ruleLines[i]} is duplicated`);
    }

    rules[ruleKey] = left;
  }

  return rules;
}
