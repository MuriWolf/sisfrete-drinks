import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    cocktails: [],
  }),
  actions: {
    toggle(newCocktail) {
      if (this.cocktails.includes(newCocktail.idDrink)) {
        this.cocktails.pop(newCocktail.idDrink)
      } else {
        this.cocktails.push(newCocktail.idDrink)
      }
    },
  },
  getters: {
    getCocktails() {
      return this.cocktails
    },
  },
})
