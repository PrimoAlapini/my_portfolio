<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '@/data/services.js'

const route   = useRoute()
const service = computed(() => services.find((s) => s.id === parseInt(route.params.id)))

const idx     = computed(() => services.findIndex((s) => s.id === parseInt(route.params.id)))
const prev    = computed(() => idx.value > 0                 ? services[idx.value - 1] : null)
const next    = computed(() => idx.value < services.length - 1 ? services[idx.value + 1] : null)

const cardAccents = [
  'bg-emerald-50', 'bg-yellow-50', 'bg-gray-50', 'bg-rose-50',
  'bg-violet-50',  'bg-sky-50',   'bg-orange-50','bg-teal-50', 'bg-indigo-50',
]
const accentBar = [
  'bg-[#33663b]', 'bg-[#F4B400]', 'bg-gray-800', 'bg-rose-600',
  'bg-violet-600','bg-sky-600',   'bg-orange-500','bg-teal-600','bg-indigo-600',
]
</script>

<template>
  <!-- Page introuvable -->
  <div v-if="!service" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-6xl mb-4">🔍</p>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Service introuvable</h2>
      <router-link to="/services" class="text-[#33663b] font-semibold hover:underline">← Retour aux services</router-link>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gray-50">

    <!-- ── Hero ── -->
    <div class="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden" :class="accentBar[idx % accentBar.length]">
      <div class="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent pointer-events-none"></div>
      <div class="absolute -bottom-12 right-0 w-64 h-64 rounded-full bg-white/10 pointer-events-none"></div>

      <div class="relative max-w-4xl mx-auto">
        <router-link to="/services" class="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition">
          ← Tous les services
        </router-link>

        <div class="flex items-center gap-6">
          <div class="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
            <img :src="service.icon" :alt="service.title" class="w-10 h-10" />
          </div>
          <div>
            <p class="text-white/60 text-sm uppercase tracking-widest mb-1">Service</p>
            <h1 class="text-3xl md:text-4xl font-bold text-white leading-tight">{{ service.title }}</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Contenu ── -->
    <div class="max-w-4xl mx-auto px-6 md:px-12 py-14">

      <!-- Résumé -->
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
        <p class="text-gray-600 text-lg leading-relaxed">{{ service.text }}</p>
      </div>

      <!-- Description complète -->
      <div
        class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 prose prose-headings:text-[#33663b] prose-li:text-gray-600 prose-p:text-gray-600 max-w-none"
        v-html="service.fullDescription"
      ></div>

      <!-- ── CTA ── -->
      <div class="bg-[#33663b] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden mb-12">
        <div class="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none"></div>
        <h3 class="text-2xl font-bold mb-3">Prêt à lancer votre projet ?</h3>
        <p class="text-white/70 mb-7 max-w-md mx-auto">Discutons ensemble de vos besoins pour une solution sur mesure.</p>
        <router-link
          to="/contact"
          class="inline-flex items-center gap-3 bg-[#F4B400] text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-yellow-400 transition shadow-lg"
        >
          Demander un devis gratuit →
        </router-link>
      </div>

      <!-- ── Navigation entre services ── -->
      <div class="flex gap-4">
        <router-link
          v-if="prev"
          :to="{ name: 'ServiceDetail', params: { id: prev.id } }"
          class="flex-1 flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[#33663b] hover:shadow-md transition group"
        >
          <span class="text-gray-400 group-hover:text-[#33663b] transition text-xl">←</span>
          <div class="overflow-hidden">
            <p class="text-xs text-gray-400 mb-0.5">Précédent</p>
            <p class="font-semibold text-gray-800 text-sm truncate group-hover:text-[#33663b] transition">{{ prev.title }}</p>
          </div>
        </router-link>
        <div v-else class="flex-1"></div>

        <router-link
          v-if="next"
          :to="{ name: 'ServiceDetail', params: { id: next.id } }"
          class="flex-1 flex items-center justify-end gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[#33663b] hover:shadow-md transition group text-right"
        >
          <div class="overflow-hidden">
            <p class="text-xs text-gray-400 mb-0.5">Suivant</p>
            <p class="font-semibold text-gray-800 text-sm truncate group-hover:text-[#33663b] transition">{{ next.title }}</p>
          </div>
          <span class="text-gray-400 group-hover:text-[#33663b] transition text-xl flex-shrink-0">→</span>
        </router-link>
        <div v-else class="flex-1"></div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.prose h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; }
.prose h4 { font-size: 1rem; font-weight: 600; margin: 1rem 0 0.4rem; }
.prose ul  { list-style: disc; padding-left: 1.4rem; }
.prose li  { margin-bottom: 0.3rem; }
.prose p   { margin-bottom: 0.75rem; }
</style>
