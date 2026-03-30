import About from '@/components/About.vue'
import Home from '@/components/Home.vue'
import ContactView from '@/views/ContactView.vue'
import Index from '@/views/Index.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ServiceDetail from '@/views/ServiceDetail.vue'
import ServiceView from '@/views/ServiceView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/services',
      name: 'services',
      component: ServiceView
    },
    {
      path: '/services/:id',
      name: 'ServiceDetail',
      component: ServiceDetail
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth"
      };
    }

    return { top: 0 };
  }
})

export default router
