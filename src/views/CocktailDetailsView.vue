<script setup lang="js">
import getCocktailByName from '@/api/getCocktailByName'
import validateResponse from '@/api/utils/validateResponse'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const MAX_QUANTITY_OF_INGREDIENTS_AND_MEASURES = 15
const favorites = useFavoritesStore()
const route = useRoute()
const drinkName = route.params.name
const cocktail = ref()
const ingredientCombinedWithMeasure = ref([])

onMounted(async () => {
  if (drinkName.trim().length > 0) {
    const response = await getCocktailByName(drinkName)
    let validation = validateResponse(response)
    let cocktailIngredients = []
    let cocktailMeasures = []

    switch (validation) {
      case 1:
        cocktail.value = []
        break
      case 2:
        cocktail.value = []
        break
      default:
        cocktail.value = response[0]
        break
    }

    getIngredientsOrMeasures(cocktail.value, cocktailIngredients, 'ingredient')
    getIngredientsOrMeasures(cocktail.value, cocktailMeasures, 'measure')

    ingredientCombinedWithMeasure.value = combineMeasuresWithIngredients(
      cocktailIngredients,
      cocktailMeasures,
    )
  }
})

function getIngredientsOrMeasures(cocktail, array, searchedItem) {
  for (let i = 0; i < MAX_QUANTITY_OF_INGREDIENTS_AND_MEASURES; i++) {
    let seached =
      cocktail[`str${searchedItem.charAt(0).toUpperCase() + searchedItem.slice(1)}${i + 1}`]

    if (seached === null) {
      break
    }
    array.push(seached)
  }
}

function combineMeasuresWithIngredients(ingredients, measures) {
  let combined = []

  for (let i = 0; i < ingredients.length; i++) {
    if (measures[i]) {
      combined.push(measures[i] + 'of ' + ingredients[i])
    } else {
      combined.push(ingredients[i])
    }
  }

  return combined
}
</script>

<template>
  <AppHeader />
  <main>
    <div class="layout-cocktail" v-if="cocktail !== undefined && cocktail !== null">
      <section>
        <!-- <p v-if="favorites.cocktails.includes(cocktail.idDrink)">i am a favorite</p> -->
        <h1>{{ cocktail.strDrink }}</h1>
        <h2>Ingredientes</h2>
        <div class="items">
          <span v-for="combined in ingredientCombinedWithMeasure" :key="combined">
            {{ combined }}
          </span>
        </div>
        <h2>Modo de preparo</h2>
        <div class="items">
          <span>
            {{ cocktail.strInstructions }}
          </span>
        </div>
      </section>
      <section class="section-image">
        <button @click="favorites.toggle(cocktail)" class="favorite-button">
          <IconHeart
            :style="
              favorites.cocktails.includes(cocktail.idDrink)
                ? 'fill: rgb(209, 11, 11)'
                : 'fill: rgb(66, 66, 66)'
            "
          />
        </button>
        <img :src="cocktail.strDrinkThumb" width="600px" height="600px" alt="" />
      </section>
    </div>
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

  padding: 0px 0.5rem;

  @media (min-width: 340px) {
    padding: 0px 1rem;
    margin-top: 2rem;
  }

  h1 {
    font-family: 'DM Serif Display';
    font-size: 3rem;
  }

  h2 {
    font-family: 'DM Serif Display';
    font-size: 1.75rem;
  }

  .layout-cocktail {
    display: flex;

    flex-direction: column-reverse;
    justify-content: space-between;
    gap: 2rem;

    .items {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;

      span {
        display: flex;
        align-items: center;
        width: fit-content;
        min-height: 80px;
        height: fit-content;
        padding: 1rem;
        border-radius: 0.125rem;

        color: var(--color-primary);
        background-color: var(--color-secondary);

        @media (min-width: 1280px) {
          min-height: 120px;
        }
      }
    }

    .section-image {
      position: relative;

      img {
        display: block;
        width: 100%;
        height: auto;
        margin: auto;
        aspect-ratio: 1 / 1;
        border-radius: 0.125rem;

        @media (min-width: 768px) {
          width: 50%;
          min-height: 120px;
        }

        @media (min-width: 1024px) {
          width: 400px;
          height: 400px;
        }

        @media (min-width: 1280px) {
          width: 600px;
          height: 600px;
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

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }
}
</style>
