import { RouteRecordRaw } from 'vue-router';

export const getProductRoutes = (res?: any): Array<RouteRecordRaw> => {
  return [
    {
      path: '/product/list',
      name: 'Product',
      components: {
        default: () => import(/* webpackChunkName: "Product" */ '@/views/product/index.vue')
      },
      meta: {
      },
      props: {
        default: () => ({
          res
        })
      }
    },
    {
      path: '/product/detail',
      name: 'ProductDetail',
      components: {
        default: () => import(/* webpackChunkName: "Product" */ '@/views/product/detail.vue')
      },
      meta: {
      },
      props: {
        default: () => ({
          res
        })
      }
    }
  ];
}
