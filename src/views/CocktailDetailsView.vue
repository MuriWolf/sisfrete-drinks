<script setup lang="js">
import getCocktailByName from '@/api/getCocktailByName'
import validateResponse from '@/api/utils/validateResponse'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

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
  {{ drinkName }}
  <h1>drink</h1>
  <div v-if="cocktail !== undefined && cocktail !== null">
    {{ cocktail }}
    <img :src="cocktail.strDrinkThumb" alt="" />
  </div>
</template>
