<template>
  <div style="margin-top: 20px">
    <div class="field">
      <label class="label">Rules</label>
      <p>
        Each rule is written line by line.
      </p>
      <p>
        [Non-terminal symbol] -> [terminal symbols (separated by a comma ,)].
      </p>
      <p>
        For example: S -> NP,VP
      </p>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="e.g. Google bought DeepMind for $500M in January."
          rows="5"
          v-model="state.rawRules"
        ></textarea>
      </div>
    </div>

  </div>
</template>

<script>
import { watch } from 'vue';

import { useState } from '../store';
import { parseRules } from '../utils';


export default {
  setup() {
    const state = useState();

    watch(
      () => state.rawRules,
      (rawRules) => {
        state.rules = parseRules(rawRules);
      },
    )

    return {
      state,
    };
  },
}
</script>
