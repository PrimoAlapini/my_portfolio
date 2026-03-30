<template>
  <div v-if="service" class="min-h-screen bg-white py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <router-link
        to="/#services"
        class="text-gray-500 hover:text-black flex items-center gap-2 mb-8"
      >
        ← Retour aux services
      </router-link>

      <div class="flex items-center gap-6 mb-10">
        <div
          class="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center"
        >
          <img :src="service.icon" class="w-10 h-10" alt="icon" />
        </div>
        <h1 class="text-4xl font-bold text-gray-900">{{ service.title }}</h1>
      </div>
      <p class="text-green-900">{{ service.text }}</p>
      <div class="prose" v-html="service.fullDescription"></div>

      <div
        class="bg-blue-600 rounded-3xl p-6 sm:p-10 text-center text-white shadow-xl shadow-blue-200  mx-auto"
      >
        <h3 class="text-xl sm:text-2xl font-bold mb-4">
          Prêt à lancer votre projet ?
        </h3>

        <p class="mb-6 sm:mb-8 text-blue-100 text-sm sm:text-base">
          Discutons ensemble de vos besoins pour une solution sur mesure.
        </p>

        <div class="flex justify-center">
          <router-link
            to="/contact"
            class="w-full sm:w-fit bg-white text-blue-600 font-bold px-5 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-gray-100 transition"
          >
            Demander un devis gratuit
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { services } from "@/data/services.js";

const route = useRoute();
const service = computed(() =>
  services.find((s) => s.id === parseInt(route.params.id)),
);
</script>

<style scoped></style>
