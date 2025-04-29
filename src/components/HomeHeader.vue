<script setup lang="js">
import AppHeader from './AppHeader.vue'
import SearchInput from './SearchInput.vue'
import { ref } from 'vue'

const searchText = ref('')
</script>

<template>
  <AppHeader>
    <div>
      <SearchInput v-model:searchText="searchText"></SearchInput>
      <button type="button" @click="$emit('send-search-cocktail', searchText)">procurar</button>
    </div>
    <p>{{ searchText }}</p>
  </AppHeader>
</template>
