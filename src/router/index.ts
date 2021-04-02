import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/home/index.vue';
import Chrome from '@/components/layouts/chrome.vue';
import { getProductRoutes } from './routes/product';

const ProductRoutes = getProductRoutes();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: ProductRoutes[0].path,
    children: [
      ...ProductRoutes
    ]
  },
  {
    path: '/chrome',
    name: 'Chrome',
    component: Chrome
  },
  {
    path: '/*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL as string),
  routes
})

export default router;
