<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabase'

const stats = ref({ projects: 0, languages: 0, testimonials: 0 })
const loading = ref(true)

onMounted(async () => {
  const [p, l, t] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('languages').select('id', { count: 'exact', head: true }),
    supabase.from('testimonials').select('id', { count: 'exact', head: true }),
  ])
  stats.value = {
    projects: p.count ?? 0,
    languages: l.count ?? 0,
    testimonials: t.count ?? 0,
  }
  loading.value = false
})

const cards = [
  { label: 'Projets', key: 'projects', icon: '🗂️', to: '/admin/projects', color: 'bg-blue-50 border-blue-200' },
  { label: 'Langages', key: 'languages', icon: '💻', to: '/admin/languages', color: 'bg-yellow-50 border-yellow-200' },
  { label: 'Témoignages', key: 'testimonials', icon: '💬', to: '/admin/testimonials', color: 'bg-green-50 border-green-200' },
]
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h1>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      <div
        v-for="card in cards"
        :key="card.key"
        :class="['border rounded-2xl p-6 flex items-center gap-4', card.color]"
      >
        <span class="text-4xl">{{ card.icon }}</span>
        <div>
          <p class="text-3xl font-bold text-gray-800">
            <span v-if="loading" class="inline-block w-6 h-6 border-2 border-gray-300 border-t-[#33663b] rounded-full animate-spin"></span>
            <span v-else>{{ stats[card.key] }}</span>
          </p>
          <p class="text-sm text-gray-500">{{ card.label }}</p>
        </div>
      </div>
    </div>

    <!-- Liens rapides -->
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Accès rapide</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <router-link
        v-for="card in cards"
        :key="card.key"
        :to="card.to"
        class="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-3 text-[#33663b] font-semibold border border-gray-100 hover:border-[#33663b]"
      >
        <span class="text-2xl">{{ card.icon }}</span>
        Gérer les {{ card.label.toLowerCase() }}
        <span class="ml-auto text-[#F4B400]">→</span>
      </router-link>
    </div>
  </div>
</template>
