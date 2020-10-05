<template>
  <div>
    <h4 class="title is-4">CYK Table</h4>
    <table class="table is-bordered">
      <tbody>
        <tr
          v-for="row in store.getters.range.value"
          :key="row"
        >
          <td
            v-for="col in store.getters.range.value"
            :key="col"
          >
            <template v-if="col < row + 1">
              <b>
                {{ printSquare(row, col) }}
                {{ printCount(row, col) }}
              </b>
              <br />
              <span>
                ({{ col + 1 }}, {{ col + store.getters.words.value.length - row }})
              </span>
            </template>
          </td>
        </tr>
        <tr>
          <td
            v-for="(word, index) in store.getters.words.value"
            :key="`${word}${index}`"
          >
            {{ word }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useStore } from '../store';


export default {
  setup() {
    const store = useStore();

    const printSquare = (row, col) => {
      const {
        table,
        words,
      } = store.getters;

      try {
        const square = table.value[col][col + words.value.length - 1 - row];
        return Array.from(square.values).join(', ');
      } catch {
        return 'N/A';
      }
    }

    const printCount = (row, col) => {
      const {
        table,
        words,
      } = store.getters;

      try {
        const square = table.value[col][col + words.value.length - 1 - row];
        let count = 0;
        Object.values(square.children).forEach((childList) => {
          count += childList.length;
        });

        return count > 1 ? `(${count})` : '';
      } catch {
        return '';
      }
    }

    return {
      store,
      printSquare,
      printCount,
    };
  }
}
</script>
