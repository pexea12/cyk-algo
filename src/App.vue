<template>
  <div class="container" style="margin-top: 20px">
    <h2 class="title is-2">CYK Algorithm Visualization</h2>

    <p>
      For more information about CYK algorithm:
      <a href="https://en.wikipedia.org/wiki/CYK_algorithm">Wikipedia</a>
    </p>

    <p>
      GitHub: <a href="https://github.com/pexea12/cyk-algo">cyk-algo</a>
    </p>

    <p>
      Author: <a href="https://github.com/pexea12">@pexea12</a>
    </p>

    <div class="columns" style="margin-top: 20px">
      <div class="column">
        <SentenceInput />
        <RuleInput />
      </div>
      <div class="column">
        <CykTable />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <ParseTrees />
      </div>
    </div>
  </div>
</template>

<script>
import SentenceInput from './components/SentenceInput.vue';
import RuleInput from './components/RuleInput.vue';
import CykTable from './components/CykTable.vue';
import ParseTrees from './components/ParseTrees.vue';

export default {
  components: {
    SentenceInput,
    RuleInput,
    CykTable,
    ParseTrees,
  },
}
</script>
