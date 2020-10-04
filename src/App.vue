<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <SentenceInput />
        <RuleInput />
      </div>
      <div class="column">
        Hello world
      </div>
    </div>
  </div>
</template>

<script>
import SentenceInput from './components/SentenceInput.vue';
import RuleInput from './components/RuleInput.vue';

export default {
  components: {
    SentenceInput,
    RuleInput,
  },
}
</script>
