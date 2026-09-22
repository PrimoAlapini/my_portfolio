<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Compteur de redirect automatique
const countdown = ref(10)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">

    <!-- Déco fond -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#33663b]/5"></div>
      <div class="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#F4B400]/5"></div>
    </div>

    <div class="relative z-10 max-w-lg">
      <!-- 404 géant -->
      <div class="relative mb-6">
        <p class="text-[150px] md:text-[200px] font-black leading-none text-gray-100 select-none">404</p>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-24 h-24 rounded-3xl bg-[#33663b] flex items-center justify-center shadow-2xl">
            <svg class="w-12 h-12 text-[#F4B400]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008z"/>
            </svg>
          </div>
        </div>
      </div>

      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Page introuvable</h1>
      <p class="text-gray-500 mb-8 leading-relaxed">
        Cette page n'existe pas ou a été déplacée.<br>
        Retournez à l'accueil pour continuer votre visite.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <router-link
          to="/"
          class="flex items-center gap-2 bg-[#33663b] text-white font-semibold px-7 py-3 rounded-full shadow-lg hover:bg-[#29512e] transition"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75L12 3l9 6.75V20.25A.75.75 0 0 1 20.25 21H3.75A.75.75 0 0 1 3 20.25V9.75z"/>
          </svg>
          Retour à l'accueil
        </router-link>
        <router-link
          to="/contact"
          class="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-7 py-3 rounded-full hover:border-[#33663b] hover:text-[#33663b] transition shadow-sm"
        >
          Me contacter
        </router-link>
      </div>

      <!-- Liens rapides -->
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <router-link
          v-for="link in [{ label: 'Services', to: '/services' }, { label: 'Projets', to: '/projects' }, { label: 'À propos', to: '/#about' }]"
          :key="link.to"
          :to="link.to"
          class="text-sm text-gray-400 hover:text-[#33663b] transition font-medium"
        >
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
