import {
  reactive,
  provide,
  inject,
  computed,
} from 'vue';

import {
  getWords,
  parseRules,
  buildCykTable,
  createRange,
  getTrees,
} from './utils';


const rawRules = `S -> NP VP
NP -> NP,PP
VP -> VP,PP
VP -> V,NP
VP -> V
PP -> P,NP
NP -> N
N -> Google
N -> DeepMind
N -> $500M
N -> January
V -> bought
P -> for
P -> in`;

const sentence = 'Google bought DeepMind for $500M in January.';

//const rawRules = `S ⟶ NP VP
//VP ⟶ V NP
//VP ⟶ VP ADV
//VP ⟶ V
//NP ⟶ N
//V ⟶ fish
//N ⟶ Robots
//N ⟶ fish
//ADV ⟶ today`;

//const sentence = 'Robots fish fish today';

export const storeSymbol = Symbol('store');

export const createStore = () => {
  const state = reactive({
    sentence,
    rawRules,
    error: '',
  });


  const words = computed(() => getWords(state.sentence));
  const rules = computed(() => {
    try {
      const ruleResult = parseRules(state.rawRules, words.value);
      return ruleResult;
    } catch (e) {
      state.error = e.message;
      return {};
    }
  });

  const table = computed(() => {
    try {
      state.error = '';
      const tableResult = buildCykTable(rules.value, words.value);
      return tableResult;
    } catch (e) {
      return [];
    }
  });

  const range = computed(() => createRange(words.value.length));

  const trees = computed(() => {
    try {
      const treeResult = getTrees(table.value, words.value);
      return treeResult;
    } catch (e) {
      return [];
    }
  });

  const getters = {
    words,
    rules,
    table,
    range,
    trees,
  };

  return {
    state,
    getters,
  };
};

export const useStore = () => inject(storeSymbol);

export const provideState = () => provide(storeSymbol, createStore());
