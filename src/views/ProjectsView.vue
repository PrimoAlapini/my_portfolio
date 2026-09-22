<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const store      = useProjectsStore()
const sectionRef = ref(null)
const search     = ref('')
const activeTag  = ref('Tous')

onMounted(() => store.fetchVisible())

// ── Liste de tous les tags uniques ────────────────────────────────────────────
const allTags = computed(() => {
  const tags = new Set(['Tous'])
  store.projects.forEach((p) => (p.tags ?? []).forEach((t) => tags.add(t)))
  return [...tags]
})

// ── Filtrage ──────────────────────────────────────────────────────────────────
const filtered = computed(() => {
  let list = store.projects
  if (activeTag.value !== 'Tous') {
    list = list.filter((p) => (p.tags ?? []).includes(activeTag.value))
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.category ?? '').toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q)),
    )
  }
  return list
})

useScrollAnimation((gsap) => {
  gsap.from('.pv-hero', {
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', immediateRender: false,
  })
}, sectionRef)
</script>

<template>
  <div ref="sectionRef" class="min-h-screen bg-gray-50">

    <!-- ── Hero ── -->
    <div class="pv-hero bg-[#33663b] text-white pt-32 pb-16 px-6 md:px-12 relative overflow-hidden">
      <div class="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none"></div>
      <div class="absolute bottom-0 left-12 w-48 h-48 rounded-full bg-[#F4B400]/10 pointer-events-none"></div>

      <div class="relative max-w-5xl mx-auto">
        <p class="text-[#F4B400] text-sm font-semibold tracking-widest uppercase mb-3">Portfolio</p>
        <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Tous mes <span class="text-[#F4B400]">Projets</span>
        </h1>
        <p class="text-white/70 max-w-xl text-base md:text-lg">
          Une sélection de réalisations concrètes — du web au mobile, du design à la mise en production.
        </p>

        <!-- Barre de recherche -->
        <div class="mt-8 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 max-w-md border border-white/20 focus-within:border-[#F4B400] transition">
          <svg class="w-4 h-4 text-white/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Rechercher un projet…"
            class="bg-transparent outline-none text-white placeholder-white/40 text-sm flex-1"
          />
        </div>
      </div>
    </div>

    <!-- ── Filtres tags ── -->
    <div class="max-w-5xl mx-auto px-6 md:px-12 pt-8">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="activeTag = tag"
          :class="activeTag === tag
            ? 'bg-[#33663b] text-white shadow-md'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-[#33663b] hover:text-[#33663b]'"
          class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- ── Contenu ── -->
    <div class="max-w-5xl mx-auto px-6 md:px-12 py-10">

      <!-- Chargement -->
      <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="bg-white rounded-3xl shadow-sm overflow-hidden animate-pulse">
          <div class="w-full h-48 bg-gray-200"></div>
          <div class="p-5 space-y-3">
            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      <!-- Erreur -->
      <p v-else-if="store.error" class="text-center text-red-500 py-12">{{ store.error }}</p>

      <!-- Vide -->
      <div v-else-if="filtered.length === 0" class="text-center py-20">
        <p class="text-5xl mb-4">🔍</p>
        <p class="text-gray-400 font-medium">Aucun projet ne correspond à votre recherche.</p>
        <button @click="search = ''; activeTag = 'Tous'" class="mt-4 text-[#33663b] font-semibold hover:underline text-sm">
          Réinitialiser les filtres
        </button>
      </div>

      <!-- Grille projets -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in filtered"
          :key="project.id"
          class="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col"
        >
          <!-- Image -->
          <div class="relative w-full h-48 bg-gray-100 overflow-hidden flex-shrink-0">
            <img
              v-if="project.image_url"
              :src="project.image_url"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-5xl">🖼️</div>

            <!-- Badge catégorie -->
            <span
              v-if="project.category"
              class="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full"
            >
              {{ project.category }}
            </span>
          </div>

          <div class="flex flex-col flex-1 p-5">
            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span
                v-for="tag in (project.tags ?? [])"
                :key="tag"
                class="px-2.5 py-0.5 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-full text-xs font-semibold"
              >{{ tag }}</span>
            </div>

            <!-- Titre -->
            <h3 class="font-bold text-gray-900 text-base leading-tight mb-2 group-hover:text-[#33663b] transition-colors flex-1">
              {{ project.title }}
            </h3>

            <!-- Lien -->
            <div class="mt-4 flex items-center justify-between">
              <span class="text-xs text-gray-400">{{ project.category }}</span>
              <component
                :is="project.link ? 'a' : 'span'"
                v-bind="project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {}"
                class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 text-sm font-bold"
                :class="project.link
                  ? 'bg-[#33663b] text-[#F4B400] hover:bg-[#F4B400] hover:text-[#33663b] cursor-pointer shadow-md hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-default'"
              >→</component>
            </div>
          </div>
        </div>
      </div>

      <!-- Compteur -->
      <p v-if="!store.loading && filtered.length > 0" class="text-center text-gray-400 text-sm mt-8">
        {{ filtered.length }} projet{{ filtered.length > 1 ? 's' : '' }} affiché{{ filtered.length > 1 ? 's' : '' }}
      </p>
    </div>

  </div>
</template>

<style scoped></style>
