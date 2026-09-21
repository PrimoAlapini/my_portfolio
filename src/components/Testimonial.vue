<script setup>
import { ref, onMounted } from 'vue'
import { useTestimonialsStore } from '@/stores/testimonials'

const store = useTestimonialsStore()
const current = ref(0)

onMounted(() => store.fetchVisible())

const next = () => {
  if (store.testimonials.length === 0) return
  current.value = (current.value + 1) % store.testimonials.length
}

const prev = () => {
  if (store.testimonials.length === 0) return
  current.value = (current.value - 1 + store.testimonials.length) % store.testimonials.length
}
</script>

<template>
  <section id="testimonials" class="w-full bg-gray-100 py-16 px-4">
    <!-- Titre -->
    <div class="text-center mb-10">
      <p class="text-sm text-gray-500 tracking-wide">
        <span class="text-[#F4B400] text-xl">~ </span> Témoignages
      </p>
      <h2 class="text-3xl font-bold">
        L'impact de mon travail :
        <span class="text-yellow-500">Témoignages clients</span>
      </h2>
    </div>

    <!-- Chargement -->
    <div v-if="store.loading" class="max-w-4xl mx-auto bg-white shadow rounded-2xl p-8 animate-pulse">
      <div class="flex gap-2 mb-4">
        <div v-for="n in 5" :key="n" class="w-6 h-6 bg-gray-200 rounded-full"></div>
      </div>
      <div class="space-y-2 mb-6">
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-32"></div>
          <div class="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>

    <!-- Erreur -->
    <p v-else-if="store.error" class="text-center text-red-500 py-8">{{ store.error }}</p>

    <!-- Aucun témoignage -->
    <p v-else-if="store.testimonials.length === 0" class="text-center text-gray-400 py-8">
      Aucun témoignage à afficher pour le moment.
    </p>

    <!-- Card testimonial -->
    <template v-else>
      <div class="max-w-4xl mx-auto bg-white shadow rounded-2xl p-8 transition-all duration-300 quote">
        <!-- Rating -->
        <div class="flex items-center gap-2 mb-4">
          <div class="flex text-xl">
            <span
              v-for="star in 5"
              :key="star"
              :class="star <= store.testimonials[current].rating ? 'text-[#F4B400]' : 'text-gray-200'"
            >★</span>
          </div>
          <span class="font-semibold text-gray-700">{{ store.testimonials[current].rating }}.0</span>
        </div>

        <!-- Texte -->
        <p class="text-gray-600 leading-relaxed mb-6">
          {{ store.testimonials[current].content }}
        </p>

        <!-- Auteur -->
        <div class="flex items-center gap-4">
          <!-- Avatar avec initiale en fallback -->
          <img
            v-if="store.testimonials[current].avatar_url"
            :src="store.testimonials[current].avatar_url"
            :alt="store.testimonials[current].name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div
            v-else
            class="w-12 h-12 rounded-full bg-[#33663b] text-white flex items-center justify-center text-lg font-bold"
          >
            {{ store.testimonials[current].name.charAt(0).toUpperCase() }}
          </div>

          <div>
            <h4 class="font-semibold text-gray-800">{{ store.testimonials[current].name }}</h4>
            <p class="text-sm text-gray-500">{{ store.testimonials[current].role }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation + indicateurs -->
      <div class="flex flex-col items-center gap-4 mt-8">
        <!-- Boutons prev / next -->
        <div class="flex gap-4">
          <button
            @click="prev"
            class="w-10 h-10 bg-[#33663b] text-[#F4B400] flex items-center justify-center rounded-full hover:bg-[#F4B400] hover:text-[#33663b] transition"
          >
            <span class="text-2xl pb-2">‹</span>
          </button>
          <button
            @click="next"
            class="w-10 h-10 bg-[#F4B400] text-[#33663b] flex items-center justify-center rounded-full hover:bg-[#33663b] hover:text-[#F4B400] transition"
          >
            <span class="text-2xl pb-2">›</span>
          </button>
        </div>

        <!-- Dots -->
        <div class="flex gap-2">
          <button
            v-for="(_, i) in store.testimonials"
            :key="i"
            @click="current = i"
            :class="i === current ? 'bg-[#33663b] w-5' : 'bg-gray-300 w-2'"
            class="h-2 rounded-full transition-all duration-300"
          ></button>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.quote {
  position: relative;
  background-image: url("/images/quott.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
}
</style>
