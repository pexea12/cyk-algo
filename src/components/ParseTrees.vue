<template>
  <div style="margin-top: 20px">
    <h4 class="title is-4">Parse Trees</h4>

    <div id="network">
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  watch,
} from 'vue';
import { Network } from 'vis-network';
import 'vis-network/styles/vis-network.css';

import { useStore } from '../store';


export default {
  setup() {
    const store = useStore();

    console.log(store.getters.trees.value);

    const options = {
      edges: {
        arrows: { to: true },
      },
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'LR',
          sortMethod: 'directed',
        },
      },
    };

    const visualizeTrees = () => {
      const container = document.getElementById("network");
      container.innerHTML = '';

      store.getters.trees.value.forEach((tree) => {
        const networkEl = document.createElement('div');
        networkEl.classList.add('tree');
        new Network(networkEl, tree, options);
        container.append(networkEl);
      });
    };

    watch(
      () => store.getters.trees,
      visualizeTrees,
      {
        deep: true,
      },
    );

    onMounted(() => {
      visualizeTrees();
    });
  }
}
</script>

<style>
  .tree {
    height: 400px;
    border: 1px solid lightgray;
  }
</style>
