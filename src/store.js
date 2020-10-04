import {
  reactive,
  provide,
  inject,
} from 'vue';

import { parseRules } from './utils';


const ruleExample = `S -> NP VP
NP -> NP PP
VP -> VP PP
VP -> V NP
VP -> V
PP -> P NP
NP -> N
N -> Google
N -> DeepMind
N -> $500M
N -> January
V -> bought
P -> for
P -> in`;

export const stateSymbol = Symbol('state');
export const createState = () => reactive({
  sentence: 'Google bought DeepMind for $500M in January.',
  rawRules: ruleExample,
  rules: parseRules(ruleExample),
});

console.log(parseRules(ruleExample))

export const useState = () => inject(stateSymbol);

export const provideState = () => provide(stateSymbol, createState());
