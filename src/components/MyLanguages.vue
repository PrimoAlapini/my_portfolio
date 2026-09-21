<script setup>
import { ref, onMounted, watch } from 'vue'
import { useLanguagesStore } from '@/stores/languages'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const store = useLanguagesStore()
const sectionRef = ref(null)

onMounted(() => store.fetchVisible())

useScrollAnimation((gsap, ScrollTrigger) => {
  gsap.from('.langs-header', {
    scrollTrigger: { trigger: '.langs-header', start: 'top 88%', once: true },
    opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', immediateRender: false
  })
}, sectionRef)

watch(() => store.loading, (loading) => {
  if (!loading) {
    gsap.from('.lang-item', {
      scrollTrigger: { trigger: '.langs-grid', start: 'top 88%', once: true },
      opacity: 0, scale: 0, rotation: 20,
      duration: 0.5, stagger: 0.06, ease: 'back.out(1.7)', immediateRender: false
    })
  }
})
</script>

<template>
  <section ref="sectionRef" class="w-full bg-white text-center py-16 px-6">
    <div class="langs-header">
    <p class="text-sm text-gray-500 mb-2">
      <span class="text-[#F4B400] text-xl">~ </span> Mes Languages
    </p>
    <h2 class="text-3xl font-semibold">
      <span class="text-yellow-600">Explores mes languages</span><br />
      Maitrisés et utilisés dans mes projets
    </h2>
    </div>

    <!-- Chargement -->
    <div v-if="store.loading" class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8 mt-12 max-w-6xl mx-auto">
      <div
        v-for="n in 12"
        :key="n"
        class="flex flex-col items-center animate-pulse"
      >
        <div class="w-24 h-24 bg-gray-200 rounded-full"></div>
        <div class="mt-2 h-3 bg-gray-200 rounded w-14"></div>
      </div>
    </div>

    <!-- Erreur -->
    <p v-else-if="store.error" class="text-red-500 mt-8">{{ store.error }}</p>

    <!-- Aucun langage -->
    <p v-else-if="store.languages.length === 0" class="text-gray-400 mt-8">
      Aucun langage à afficher pour le moment.
    </p>

    <!-- Liste -->
    <div
      v-else
      class="langs-grid grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8 mt-12 max-w-6xl mx-auto"
    >
      <div
        v-for="tool in store.languages"
        :key="tool.id"
        class="lang-item flex flex-col items-center"
      >
        <div class="flex flex-col items-center gap-3 bg-gray-100 p-6 rounded-full w-24 shadow-sm hover:shadow-md transition">
          <div class="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow">
            <img
              :src="tool.icon_url"
              :alt="tool.name"
              class="w-10 h-10 object-contain"
            />
          </div>
          <p class="text-xl font-bold">{{ tool.percent }}%</p>
        </div>
        <p class="text-gray-600 mt-2 text-sm">{{ tool.name }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
