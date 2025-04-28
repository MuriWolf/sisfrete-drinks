<script setup lang="js">
// import getCocktailByName from '../api/getCocktailByName'
import getCocktailsByFirstLetter from '../api/getCocktailsByFirstLetter'
// import filterCocktailsByCategory from '../api/filterCocktailsByCategory'
// import listCategories from '../api/listCategories'
import { onMounted, ref, watch } from 'vue'
import AzInput from '../components/AzInput.vue'
import AppCategories from '../components/AppCategories.vue'

const letter = ref('')

watch(letter, handleGetCocktailsByFirstLetter)

onMounted(() => {
  // getCocktailByName('Long')
  // getCocktailsByFirstLetter('a')
  // filterCocktailsByCategory('Shake')
  // listCategories()
})

async function handleGetCocktailsByFirstLetter() {
  if (letter.value != '') {
    const response = await getCocktailsByFirstLetter(letter.value)
    if (typeof response !== typeof Error) {
      console.log(response)
    }
  }
}
</script>

<template>
  <main>
    <h1>hey</h1>
    <AzInput v-model:letter="letter"></AzInput>
    {{ letter }}
    <AppCategories></AppCategories>
  </main>
</template>
