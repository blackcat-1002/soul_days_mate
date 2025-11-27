import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MateProfile from '../views/MateProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // 動態路由：:id 代表角色的代號 (如 yo, sun, fox)
      path: '/mate/:id',
      name: 'MateProfile',
      component: MateProfile
    }
  ],
})

export default router
