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
      path: '/editNote/:id',
      name: 'edit-note', 
      component: () => import('@/views/ViewEditNote.vue') 
    },
    { 
      path: '/stats',
      name: 'stats', 
      component: () => import('@/views/ViewStats.vue') 
    },
    { 
      path: '/test',
      name: 'test', 
      component: () => import('@/views/ViewTest.vue') 
    },
  ];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;