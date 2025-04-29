<script setup lang="js">
import getCocktailsByFirstLetter from '../api/getCocktailsByFirstLetter'
import filterCocktailsByCategory from '../api/filterCocktailsByCategory'
import { onMounted, ref, watch } from 'vue'
import AzInput from '../components/AzInput.vue'
import AppCategories from '../components/AppCategories.vue'
import validateResponse from '@/api/utils/validateResponse'
import HomeHeader from '@/components/HomeHeader.vue'
import getCocktailByName from '@/api/getCocktailByName'
import { useFavoritesStore } from '@/stores/favorites'
import AppFooter from '@/components/AppFooter.vue'
import IconHeart from '@/components/icons/IconHeart.vue'

const favorites = useFavoritesStore()

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
    <section>
      <AzInput v-model:letter="letterSelected"></AzInput>
      <div class="layout-cocktail-result">
        <div v-for="cocktail in cocktails" :key="cocktail.idDrink" class="cocktail-result">
          <button @click="favorites.toggle(cocktail)" class="favorite-button">
            <IconHeart
              :style="
                favorites.cocktails.includes(cocktail.idDrink)
                  ? 'fill: rgb(209, 11, 11)'
                  : 'fill: rgb(66, 66, 66)'
              "
            />
          </button>
          <RouterLink :to="'/drink/' + cocktail.strDrink">
            <img :src="cocktail.strDrinkThumb + '/medium'" width="250" height="250" alt="" />
            <p>{{ cocktail.strDrink }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
    <section>
      <AppCategories v-model:categorySelected="categorySelected"></AppCategories>
    </section>
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
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0px 0.5rem;

  @media (min-width: 340px) {
    padding: 0px 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
}

.layout-cocktail-result {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 2rem;
  }

  .cocktail-result {
    position: relative;
    flex: 1;

    p {
      color: var(--color-light);
    }

    img {
      border-radius: 0.125rem;
      min-width: 200px;
      min-height: 200px;
      width: 100% !important;
      height: auto;
      aspect-ratio: 1 / 1;
      object-fit: cover;

      @media (min-width: 768px) {
        min-width: 250px;
        min-height: 250px;
      }
    }

    .favorite-button {
      position: absolute;
      right: 8px;
      top: 8px;
      border: none;
      background-color: transparent;
      cursor: pointer;
      transition: all 0.25s ease;

      svg {
        stroke: white;
        stroke-width: 0.125rem;
      }

      &:hover {
        filter: brightness(1.3);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }
}
</style>
