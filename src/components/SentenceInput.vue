<template>
  <div>
    <div class="field">
      <label class="label">Sentence</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="e.g. Google bought DeepMind for $500M in January."
          rows="3"
          v-model="store.state.sentence"
        ></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Words</label>
      {{ store.getters.words.value }}
    </div>
  </div>
</template>

<script>
import { useStore } from '../store';


export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
}
</script>
