import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/manage',
      // name: 'home',
      component: () => import('@/views/ManageView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/song/:id',
      // name: 'home',
      component: () => import('@/views/SongView.vue'),
      // meta: {
      //   requiresAuth: true,
      // },
    },
    {
      path: '/:catchAll(.*)*',
      redirect: {
        path: '/',
      },
    },
  ],
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  if (!to.meta?.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (store.loggedIn) {
    next();
  } else {
    next('/');
  }
});

export default router;
