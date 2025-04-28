<script lang="js" setup>
import SearchInput from './SearchInput.vue'
import { ref } from 'vue'
import getCocktailByName from '../api/getCocktailByName'

const searchText = ref('')
const cocktails = ref({})

async function handleGetCocktailByName() {
  if (searchText.value != '') {
    const response = await getCocktailByName(searchText.value)
    if (typeof response !== typeof Error) {
      console.log(response)
      cocktails.value = response
    }
  }
}
</script>

<template>
  <h1>Sisfrete Drinks</h1>
  <div>
    <SearchInput v-model:searchText="searchText"></SearchInput>
    <button type="button" @click="handleGetCocktailByName">procurar</button>
  </div>
  <p>{{ searchText }}</p>
</template>
