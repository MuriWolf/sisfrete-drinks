<script lang="js" setup>
import { onMounted, ref } from 'vue'
import listCategories from '../api/listCategories'
const categories = ref([])
const categorySelected = defineModel('categorySelected')

onMounted(async () => {
  categories.value = await listCategories()
})
</script>

<template>
  <div class="layout">
    <div class="header">
      <h2>Categorias</h2>
    </div>
    <ul>
      <li
        v-for="category in categories"
        :key="category"
        v-bind:style="categorySelected === category.strCategory ? 'filter: brightness(1.5)' : ''"
      >
        <button @click="categorySelected = category.strCategory">
          {{ category.strCategory }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.layout {
  min-width: 300px;
}

.header {
  background-color: var(--color-secondary);
  border-radius: 0.125rem;
  padding: 0 0.7rem;

  h2 {
    font-family: 'DM Serif Display';
    font-size: 1.5rem;
    color: var(--color-dark);
  }
}

ul {
  padding-left: 0;
  background-color: var(--color-primary);
  padding: 0.5rem;

  li {
    all: unset;
    display: block;

    button {
      width: 100%;
      border: none;
      background-color: var(--color-primary);
      color: var(--color-light);
      border-radius: 0.125rem;
      text-align: start;
      cursor: pointer;
      padding: 0.35rem;
      transition: all 0.25s ease;

      &:hover {
        filter: brightness(1.5);
      }

      &:active {
        filter: brightness(0.75);
      }
    }
  }
}
</style>
