<script setup lang="js">
import getCocktailsByFirstLetter from '../api/getCocktailsByFirstLetter'
import filterCocktailsByCategory from '../api/filterCocktailsByCategory'
import { onMounted, ref, watch } from 'vue'
import AzInput from '../components/AzInput.vue'
import AppCategories from '../components/AppCategories.vue'
import validateResponse from '@/api/utils/validateResponse'
import HomeHeader from '@/components/HomeHeader.vue'
import getCocktailByName from '@/api/getCocktailByName'
// import { useFavoritesStore } from '@/stores/favorites'
import AppFooter from '@/components/AppFooter.vue'

// const favorites = useFavoritesStore()

const letterSelected = ref('A')
const cocktails = ref([])
const categorySelected = ref('')

watch(letterSelected, handleGetCocktailsByFirstLetter)
watch(categorySelected, handleFilterCocktailsByCategory)

onMounted(() => {
  handleGetCocktailsByFirstLetter()
})

async function handleGetCocktailByName(searchText) {
  if (searchText != '') {
    letterSelected.value = ''
    categorySelected.value = ''

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
  <main>
    <!-- <button @click="() => console.log(favorites.getCocktails)">get favorites</button> -->
    <section>
      <AzInput v-model:letter="letterSelected"></AzInput>
      <div class="layout-cocktail-result">
        <RouterLink
          v-for="cocktail in cocktails"
          :key="cocktail.idDrink"
          :to="'/drink/' + cocktail.strDrink"
        >
          <div class="cocktail-result">
            <img :src="cocktail.strDrinkThumb + '/medium'" width="250" height="250" alt="" />
            <p>{{ cocktail.strDrink }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
    <section>
      <AppCategories v-model:categorySelected="categorySelected"></AppCategories>
    </section>
    <!-- <RouterLink to="/drink/gg">Go to drink</RouterLink> -->
  </main>
  <AppFooter />
</template>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  gap: 1rem;
  width: 100%;
  max-width: 1280px;
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 0px 1rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
}

.layout-cocktail-result {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 2rem;
  .cocktail-result {
    p {
      color: var(--color-light);
    }

    img {
      border-radius: 0.125rem;
    }
  }
}
</style>
