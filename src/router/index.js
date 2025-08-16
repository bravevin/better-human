import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/books', // Redirect root to /books
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../pages/Index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
