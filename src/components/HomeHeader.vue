<script setup lang="js">
import AppHeader from './AppHeader.vue'
import IconSearch from './icons/IconSearch.vue'
import SearchInput from './SearchInput.vue'
import { ref } from 'vue'

const searchText = ref('')
</script>

<template>
  <AppHeader>
    <div class="layout-search-input">
      <SearchInput v-model:searchText="searchText"></SearchInput>
      <button type="button" @click="$emit('send-search-cocktail', searchText)">
        <IconSearch />
      </button>
    </div>
  </AppHeader>
</template>

<style scoped lang="scss">
header {
  .layout-search-input {
    display: flex;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;

    button {
      all: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-secondary);
      color: var(--color-dark);
      padding: 0.25rem;
      border-radius: 0.125rem;
      cursor: pointer;

      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>
