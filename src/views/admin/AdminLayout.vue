<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const route = useRoute()
const sidebarOpen = ref(false)

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: '📊' },
  { label: 'Projets', to: '/admin/projects', icon: '🗂️' },
  { label: 'Langages', to: '/admin/languages', icon: '💻' },
  { label: 'Témoignages', to: '/admin/testimonials', icon: '💬' },
]

function isActive(path) {
  return route.path === path
}

async function logout() {
  await supabase.auth.signOut()
  router.push('/admin/pass')
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-100">

    <!-- ── Overlay mobile ── -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/40 z-20 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- ── Sidebar ── -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full w-64 bg-[#33663b] text-white flex flex-col z-30 transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Logo -->
      <div class="p-6 border-b border-white/10">
        <img src="/logo-rzh.png" alt="Logo" class="w-28 bg-white rounded-full" />
        <p class="text-xs text-white/60 mt-2">Espace Administration</p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          @click="sidebarOpen = false"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition',
            isActive(item.to)
              ? 'bg-[#F4B400] text-[#33663b]'
              : 'hover:bg-white/10 text-white'
          ]"
        >
          <span>{{ item.icon }}</span>
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Déconnexion -->
      <div class="p-4 border-t border-white/10">
        <button
          @click="logout"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition"
        >
          <span>🚪</span> Déconnexion
        </button>
      </div>
    </aside>

    <!-- ── Contenu principal ── -->
    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen">

      <!-- Topbar -->
      <header class="bg-white shadow-sm px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <!-- Hamburger mobile -->
        <button
          class="lg:hidden text-[#33663b] text-2xl"
          @click="sidebarOpen = !sidebarOpen"
        >
          ☰
        </button>
        <h2 class="text-lg font-semibold text-gray-700">
          Portfolio <span class="text-[#F4B400]">Admin</span>
        </h2>
        <div class="ml-auto">
          <span class="text-sm text-gray-500">The Rezah</span>
        </div>
      </header>

      <!-- Vue enfant -->
      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
