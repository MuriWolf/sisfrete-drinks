<script setup lang="js">
import getCocktailsByFirstLetter from '../api/getCocktailsByFirstLetter'
import filterCocktailsByCategory from '../api/filterCocktailsByCategory'
import { ref, watch } from 'vue'
import AzInput from '../components/AzInput.vue'
import AppCategories from '../components/AppCategories.vue'
import validateResponse from '@/api/utils/validateResponse'
import HomeHeader from '@/components/HomeHeader.vue'
import getCocktailByName from '@/api/getCocktailByName'
import { useFavoritesStore } from '@/stores/favorites'

const favorites = useFavoritesStore()

const letterSelected = ref('')
const cocktails = ref([])
const categorySelected = ref('')

watch(letterSelected, handleGetCocktailsByFirstLetter)
watch(categorySelected, handleFilterCocktailsByCategory)

async function handleGetCocktailByName(searchText) {
  if (searchText != '') {
    const response = await getCocktailByName(searchText)
    let validation = validateResponse(response)

    switch (validation) {
      case 1:
        cocktails.value = []
        break
      case 2:
        cocktails.value = []
        break
      default:
        cocktails.value = response
        break
    }
  }
}

async function handleGetCocktailsByFirstLetter() {
  if (letterSelected.value !== '' && letterSelected.value !== null) {
    categorySelected.value = ''

    const response = await getCocktailsByFirstLetter(letterSelected.value)
    let validation = validateResponse(response)

    switch (validation) {
      case 1:
        cocktails.value = []
        break
      case 2:
        cocktails.value = []
        break
      default:
        cocktails.value = response
        break
    }
  }
}

async function handleFilterCocktailsByCategory() {
  if (categorySelected.value !== '' && categorySelected.value !== null) {
    letterSelected.value = ''

    const response = await filterCocktailsByCategory(categorySelected.value)
    let validation = validateResponse(response)

    switch (validation) {
      case 1:
        cocktails.value = []
        break
      case 2:
        cocktails.value = []
        break
      default:
        cocktails.value = response
        break
    }
  }
}
</script>

<template>
  <HomeHeader @send-search-cocktail="handleGetCocktailByName" />
  <!-- <AppHeader @update-cocktails="handleUpdateCocktails" /> -->
  <main>
    <h1>hey</h1>
    <button @click="() => console.log(favorites.getCocktails)">get favorites</button>
    <AzInput v-model:letter="letterSelected"></AzInput>
    {{ letterSelected }}
    <AppCategories v-model:categorySelected="categorySelected"></AppCategories>
    <ul>
      <li v-for="cocktail in cocktails" :key="cocktail.idDrink">
        <button @click="favorites.toggle(cocktail)">
          {{ cocktail }}
        </button>
        <p v-if="favorites.cocktails.includes(cocktail.idDrink)">i am a favorite</p>
      </li>
    </ul>

    <RouterLink to="/drink/gg">Go to drink</RouterLink>
  </main>
</template>
