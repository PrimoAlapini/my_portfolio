<script setup>
import { ref } from 'vue'
import { services } from '@/data/services.js'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const sectionRef = ref(null)
const selected   = ref(null)  // service survolé / sélectionné pour la preview

const cardAccents = [
  { bg: 'bg-[#33663b]',   text: 'text-white',   light: 'bg-emerald-50'  },
  { bg: 'bg-[#F4B400]',   text: 'text-gray-900', light: 'bg-yellow-50'  },
  { bg: 'bg-gray-800',    text: 'text-white',   light: 'bg-gray-50'    },
  { bg: 'bg-rose-600',    text: 'text-white',   light: 'bg-rose-50'    },
  { bg: 'bg-violet-600',  text: 'text-white',   light: 'bg-violet-50'  },
  { bg: 'bg-sky-600',     text: 'text-white',   light: 'bg-sky-50'     },
  { bg: 'bg-orange-500',  text: 'text-white',   light: 'bg-orange-50'  },
  { bg: 'bg-teal-600',    text: 'text-white',   light: 'bg-teal-50'    },
  { bg: 'bg-indigo-600',  text: 'text-white',   light: 'bg-indigo-50'  },
]

useScrollAnimation((gsap) => {
  gsap.from('.sv-hero', {
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', immediateRender: false,
  })
  gsap.from('.sv-card', {
    scrollTrigger: { trigger: '.sv-grid', start: 'top 85%', once: true },
    opacity: 0, y: 50, scale: 0.95,
    duration: 0.55, stagger: 0.08, ease: 'power3.out', immediateRender: false,
  })
}, sectionRef)
</script>

<template>
  <div ref="sectionRef" class="min-h-screen bg-gray-50">

    <!-- ── Hero ── -->
    <div class="sv-hero bg-[#33663b] text-white pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      <!-- Déco géométrique -->
      <div class="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#F4B400]/10 pointer-events-none"></div>

      <div class="relative max-w-4xl mx-auto text-center">
        <p class="text-[#F4B400] text-sm font-semibold tracking-widest uppercase mb-3">Ce que je propose</p>
        <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Mes <span class="text-[#F4B400]">Services</span>
        </h1>
        <p class="text-white/70 max-w-xl mx-auto text-base md:text-lg">
          Du design à la mise en production, j'accompagne chaque projet avec précision, passion et une vision orientée résultat.
        </p>
        <!-- Stats rapides -->
        <div class="flex flex-wrap justify-center gap-8 mt-10">
          <div class="text-center">
            <p class="text-3xl font-bold text-[#F4B400]">9</p>
            <p class="text-white/60 text-sm">Services proposés</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-[#F4B400]">50+</p>
            <p class="text-white/60 text-sm">Projets réalisés</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-[#F4B400]">3+</p>
            <p class="text-white/60 text-sm">Années d'expérience</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Grille services ── -->
    <div class="sv-grid max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="(service, i) in services"
        :key="service.id"
        :to="{ name: 'ServiceDetail', params: { id: service.id } }"
        class="sv-card group flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
      >
        <!-- Bande colorée top -->
        <div class="h-2 w-full" :class="cardAccents[i % cardAccents.length].bg"></div>

        <div class="flex-1 p-6 flex flex-col">
          <!-- Icône -->
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
            :class="cardAccents[i % cardAccents.length].light"
          >
            <img :src="service.icon" :alt="service.title" class="w-7 h-7" />
          </div>

          <!-- Numéro + Titre -->
          <div class="flex items-start justify-between mb-2">
            <h2 class="font-bold text-lg text-gray-900 group-hover:text-[#33663b] transition-colors leading-tight">
              {{ service.title }}
            </h2>
            <span class="text-3xl font-black text-gray-100 leading-none ml-2 shrink-0 group-hover:text-[#F4B400] transition-colors">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{{ service.text }}</p>

          <!-- CTA -->
          <div class="mt-5 flex items-center gap-2 text-sm font-semibold text-[#33663b] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Découvrir
            <span class="w-6 h-6 rounded-full bg-[#33663b] text-white flex items-center justify-center text-xs">→</span>
          </div>
        </div>
      </router-link>
    </div>

    <!-- ── CTA bas de page ── -->
    <div class="bg-[#33663b] mx-6 md:mx-12 mb-16 rounded-3xl p-10 text-center text-white max-w-4xl lg:mx-auto relative overflow-hidden">
      <div class="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none"></div>
      <h3 class="text-2xl md:text-3xl font-bold mb-3">Prêt à lancer votre projet ?</h3>
      <p class="text-white/70 mb-7 max-w-md mx-auto">Discutons ensemble de vos besoins pour une solution sur mesure, livrée dans les délais.</p>
      <router-link
        to="/contact"
        class="inline-flex items-center gap-3 bg-[#F4B400] text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-yellow-400 transition shadow-lg"
      >
        Demander un devis gratuit
        <span class="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center text-sm">→</span>
      </router-link>
    </div>

  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
