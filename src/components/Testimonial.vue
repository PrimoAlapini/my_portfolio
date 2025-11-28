<script setup>
import { ref } from "vue";

const testimonials = ref([
  {
    rating: 5,
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    name: "Pascal Abiola",
    role: "Founder, EV Charger Station",
    avatar: "/avatar1.png",
  },
  {
    rating: 4,
    text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
    name: "Alain Michel",
    role: "CTO, Software Agency",
    avatar: "/avatar2.png",
  },
  {
    rating: 4,
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi.",
    name: "Patrick Corradin",
    role: "CEO, Nexa Corp",
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
  <section class="w-full bg-gray-100 py-16 px-4">
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
