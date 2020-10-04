<template>
  <div>
    <div class="field">
      <label class="label">Sentence</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="e.g. Google bought DeepMind for $500M in January."
          rows="3"
          v-model="state.sentence"
        ></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Words</label>
      {{ getWords(state.sentence) }}
    </div>
  </div>
</template>

<script>
import { useState } from '../store';
import { getWords } from '../utils';


export default {
  setup() {
    const state = useState();

    return {
      state,
      getWords,
    };
  },
}
</script>
