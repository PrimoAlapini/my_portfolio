<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <transition name="scroll-top">
    <button
      v-if="visible"
      @click="scrollToTop"
      aria-label="Retour en haut"
      class="fixed bottom-6 left-6 z-[9999] w-12 h-12 rounded-full bg-[#33663b] text-white shadow-xl flex items-center justify-center hover:bg-[#F4B400] hover:text-[#33663b] transition-colors duration-300 scroll-top-btn"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
      </svg>
    </button>
  </transition>
</template>

<style scoped>
.scroll-top-enter-active {
  transition: opacity .25s ease, transform .3s cubic-bezier(.34,1.56,.64,1);
}
.scroll-top-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}
.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(.8);
}

.scroll-top-btn:active {
  transform: scale(.9);
}
</style>
