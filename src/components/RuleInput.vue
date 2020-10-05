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
          placeholder="e.g S -> NP,VP"
          rows="5"
          v-model="store.state.rawRules"
        ></textarea>
      </div>
    </div>

    <article
      class="message is-danger"
      v-show="store.state.error.length > 0"
    >
      <div class="message-body">
        {{ store.state.error }}
      </div>
    </article>
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
