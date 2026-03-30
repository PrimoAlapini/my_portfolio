<script setup>
import { ref } from "vue";

const testimonials = ref([
  {
    rating: 5,
    text: "Travailler avec Rzh a été un vrai plaisir. Il a rapidement compris nos besoins et a livré un site moderne, fluide et parfaitement responsive. Son professionnalisme et sa rapidité d’exécution nous ont impressionnés.",
    name: "Pascal Abiola",
    role: "Fondateur, SK Agency",
    avatar: "/avatar1.png",
  },
  {
    rating: 4,
    text: "Très bonne communication du début à la fin. Rezah a su transformer notre maquette en un site performant et pixel-perfect. Le code est propre, optimisé et facile à maintenir. Je recommande fortement.",
    name: "Alain Michel",
    role: "Chef de projet digital",
    avatar: "/avatar2.png",
  },
  {
    rating: 5,
    text: "Excellent développeur. Le travail est propre, structuré et très élégant. Le site reflète exactement notre identité. Il anticipe les problèmes, propose des solutions intelligentes et reste disponible même après livraison. La collaboration a été simple, efficace et agréable. Notre satisfaction est totale. Je continuerai à travailler avec lui.",
    name: "Michelle Oladogni",
    role: "Entrepreneur",
    avatar: "/avatar3.png",
  },
  {
    rating: 4,
    text: "Rezah a totalement refait notre plateforme et l’a rendue plus rapide, plus intuitive et plus esthétique. Il propose toujours de bonnes idées et reste très professionnel. Un développeur fiable et talentueux.",
    name: "Patrick Corradin",
    role: "CEO, Nova Corp",
    avatar: "/avatar3.png",
  },
  {
    rating: 4,
    text: "Nous avions un délai très court, et pourtant il a tout livré dans les temps avec une qualité incroyable. Son sens du détail et sa maîtrise des technologies web font vraiment la différence.",
    name: "Natacha Alakè",
    role: "Responsable Marketing",
    avatar: "/avatar3.png",
  },
  
]);

const current = ref(0);

const next = () => {
  current.value = (current.value + 1) % testimonials.value.length;
};

const prev = () => {
  current.value =
    (current.value - 1 + testimonials.value.length) %
    testimonials.value.length;
};
</script>

<template>
  <section id="testimonials" class="w-full bg-gray-100 py-16 px-4">
    <!-- title -->
    <div class="text-center mb-10">
      <p class="text-sm text-gray-500 tracking-wide"><span class="text-[#F4B400] text-xl">~ </span> Témoignages</p>

      <h2 class="text-3xl font-bold">
        L'impact de mon travail :
        <span class="text-yellow-500">Témoignages clients</span>
      </h2>
    </div>

    <!-- testimonial card -->
    <div
      class="max-w-4xl mx-auto bg-white shadow rounded-2xl p-8 transition-all duration-300 quote"
    >
      <!-- rating -->
      <div class="flex items-center gap-2 mb-4">
        <div class="flex text-xl">
          <span v-for="star in 5" :key="star" :class="star <= testimonials[current].rating ? 'text-[#F4B400]' : ''">★</span>
        </div>
        <span class="font-semibold text-gray-700">{{testimonials[current].rating}}.0</span>
      </div>

      <!-- text -->
      <p class="text-gray-600 leading-relaxed mb-6">
        {{ testimonials[current].text }}
      </p>

      <!-- user -->
      <div class="flex items-center gap-4">
        <img
          :src="testimonials[current].avatar"
          alt=""
          class="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h4 class="font-semibold text-gray-800">
            {{ testimonials[current].name }}
          </h4>
          <p class="text-sm text-gray-500">{{ testimonials[current].role }}</p>
        </div>
      </div>
    </div>

    <!-- pagination buttons -->
    <div class="flex justify-center gap-4 mt-8">
      <!-- prev -->
      <button
        @click="prev"
        class="w-10 h-10 bg-[#33663b] text-[#F4B400] flex items-center justify-center rounded-full hover:bg-[#F4B400] hover:text-[#33663b]"
      >
        <span class="text-2xl pb-2">‹</span>
      </button>

      <!-- next -->
      <button
        @click="next"
        class="w-10 h-10 bg-[#F4B400] text-[#33663b] flex items-center justify-center rounded-full hover:bg-[#33663b] hover:text-[#F4B400]"
      >
        <span class="text-2xl pb-2">›</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.quote{
    position: relative;
    background-image: url("/images/quott.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
}



</style>
