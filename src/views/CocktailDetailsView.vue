<script setup lang="js">
import getCocktailByName from '@/api/getCocktailByName'
import validateResponse from '@/api/utils/validateResponse'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const favorites = useFavoritesStore()
const route = useRoute()
const drinkName = route.params.name
const cocktail = ref()

onMounted(async () => {
  if (drinkName.trim().length > 0) {
    const response = await getCocktailByName(drinkName)

    let validation = validateResponse(response)

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
    console.log(cocktail.value)
  }
})
</script>

<template>
  <AppHeader />
  <main>
    <div class="layout-cocktail" v-if="cocktail !== undefined && cocktail !== null">
      <section>
        <!-- <p v-if="favorites.cocktails.includes(cocktail.idDrink)">i am a favorite</p> -->
        <h1>{{ cocktail.strDrink }}</h1>
        <h2>Ingredientes</h2>
        <h2>Modo de preparo</h2>
        <!-- {{ cocktail }} -->
      </section>
      <section>
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
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 0px 1rem;

  h1 {
    font-family: 'DM Serif Display';
    font-size: 3rem;
  }

  h2 {
    font-family: 'DM Serif Display';
    font-size: 1.5rem;
  }

  .layout-cocktail {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    gap: 2rem;

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }
}
</style>
