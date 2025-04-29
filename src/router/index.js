import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CocktailDetailsView from '@/views/CocktailDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/drink/:name',
      name: 'detalhes-drinks',
      component: CocktailDetailsView,
    },
  ],
})

export default router
