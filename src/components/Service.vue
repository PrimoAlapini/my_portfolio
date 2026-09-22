<script setup>
import { ref } from 'vue'
import { services } from '@/data/services.js'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const sectionRef = ref(null)

// Catégories visuelles pour les icônes de fond
const cardAccents = [
  'from-green-50 to-emerald-100 border-green-200',
  'from-yellow-50 to-amber-100 border-yellow-200',
  'from-blue-50 to-sky-100 border-blue-200',
  'from-red-50 to-rose-100 border-red-200',
  'from-purple-50 to-violet-100 border-purple-200',
  'from-orange-50 to-amber-100 border-orange-200',
  'from-teal-50 to-cyan-100 border-teal-200',
  'from-pink-50 to-rose-100 border-pink-200',
  'from-indigo-50 to-blue-100 border-indigo-200',
]

useScrollAnimation((gsap) => {
  gsap.from('.services-header', {
    scrollTrigger: { trigger: '.services-header', start: 'top 88%', once: true },
    opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', immediateRender: false,
  })
  gsap.from('.service-card', {
    scrollTrigger: { trigger: '.services-grid', start: 'top 85%', once: true },
    opacity: 0, y: 50, scale: 0.95,
    duration: 0.55, stagger: 0.09, ease: 'power3.out', immediateRender: false,
  })
}, sectionRef)
</script>

<template>
  <section ref="sectionRef" id="services" class="w-full bg-gray-50 py-20 px-6 md:px-12">

    <!-- ── Header ── -->
    <div class="services-header flex items-center justify-between w-full mb-12">
      <div>
        <p class="text-sm text-gray-400 tracking-wide mb-1">
          <span class="text-[#F4B400] text-xl">~ </span>Ce que je propose
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
          Les Services <span class="text-[#33663b]">Que j'offre</span>
        </h2>
      </div>
      <router-link
        to="/services"
        class="hidden sm:flex items-center gap-2 bg-[#F4B400] text-white font-semibold pr-1 rounded-full shadow-md hover:shadow-lg hover:bg-[#33663b] transition-all"
      >
        <span class="bg-[#33663b] py-2 px-5 rounded-full">Voir tout</span>
        <span class="bg-white text-[#33663b] rounded-full w-6 h-6 flex items-center justify-center text-sm">→</span>
      </router-link>
    </div>

    <!-- ── Grille ── -->
    <div class="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="(item, i) in services"
        :key="item.id"
        :to="{ name: 'ServiceDetail', params: { id: item.id } }"
        class="service-card group relative bg-white border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        :class="cardAccents[i % cardAccents.length]"
      >
        <!-- Déco cercle fond -->
        <div class="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 bg-current pointer-events-none transition-transform duration-500 group-hover:scale-150"></div>

        <!-- Icône -->
        <div class="relative w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          <img :src="item.icon" :alt="item.title" class="w-7 h-7" />
        </div>

        <!-- Contenu -->
        <h3 class="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#33663b] transition-colors">
          {{ item.title }}
        </h3>
        <p class="text-gray-500 text-sm leading-relaxed line-clamp-3">{{ item.text }}</p>

        <!-- Footer card -->
        <div class="flex items-center gap-1 mt-4 text-[#33663b] text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          En savoir plus <span>→</span>
        </div>
      </router-link>
    </div>

    <!-- CTA mobile — même style que le bouton desktop -->
    <div class="mt-8 flex justify-center sm:hidden">
      <router-link
        to="/services"
        class="flex items-center gap-2 bg-[#F4B400] text-white font-semibold pr-1 rounded-full shadow-md hover:shadow-lg hover:bg-[#33663b] transition-all"
      >
        <span class="bg-[#33663b] py-2 px-5 rounded-full">Voir tout</span>
        <span class="bg-white text-[#33663b] rounded-full w-6 h-6 flex items-center justify-center text-sm">→</span>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
