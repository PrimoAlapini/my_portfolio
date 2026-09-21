import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

// ── Vues publiques ──────────────────────────────────────────────────────────
import Index from '@/views/Index.vue'
import ContactView from '@/views/ContactView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ServiceView from '@/views/ServiceView.vue'
import ServiceDetail from '@/views/ServiceDetail.vue'

// ── Vues admin ──────────────────────────────────────────────────────────────
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminProjects from '@/views/admin/AdminProjects.vue'
import AdminLanguages from '@/views/admin/AdminLanguages.vue'
import AdminTestimonials from '@/views/admin/AdminTestimonials.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ── Public ──────────────────────────────────────────────────────────────
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServiceView,
    },
    {
      path: '/services/:id',
      name: 'ServiceDetail',
      component: ServiceDetail,
    },

    // ── Login admin (hors layout) ────────────────────────────────────────────
    {
      path: '/admin/pass',
      name: 'AdminLogin',
      component: AdminLogin,
      meta: { isAdminLogin: true },
    },

    // ── Espace admin (layout avec sidebar) ──────────────────────────────────
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: AdminDashboard,
        },
        {
          path: 'projects',
          name: 'AdminProjects',
          component: AdminProjects,
        },
        {
          path: 'languages',
          name: 'AdminLanguages',
          component: AdminLanguages,
        },
        {
          path: 'testimonials',
          name: 'AdminTestimonials',
          component: AdminTestimonials,
        },
      ],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

// ── Navigation Guard ────────────────────────────────────────────────────────
router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((r) => r.meta.requiresAuth)
  const isAdminLogin = to.meta.isAdminLogin

  if (requiresAuth || isAdminLogin) {
    const { data } = await supabase.auth.getSession()
    const session = data.session

    // Page admin protégée sans session → login
    if (requiresAuth && !session) {
      return { name: 'AdminLogin' }
    }

    // Déjà connecté et tente d'aller sur /admin/pass → dashboard
    if (isAdminLogin && session) {
      return { name: 'AdminDashboard' }
    }
  }
})

export default router
