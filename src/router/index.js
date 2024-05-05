import { createRouter, createWebHashHistory } from 'vue-router'

/* 
* define routes
*/
const routes = [
    { 
      path: '/',
      name: 'notes', 
      component: () => import('@/views/ViewNotes.vue') 
    },
    { 
      path: '/stats',
      name: 'stats', 
      component: () => import('@/views/ViewStats.vue') 
    },
  ];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;