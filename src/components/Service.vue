<script setup>
import { services } from '@/data/services.js';
// Tableau contenant les services

</script>

<template>
  <section id="services" class="w-full bg-gray-100 py-16 px-6 md:px-12">
    <!-- HEADER TITRE -->
    <div class="flex items-center justify-between w-full mb-10">
      <div>
        <p class="text-gray-500 text-sm">
          <span class="text-[#F4B400] text-xl">~ </span>Services
        </p>
        <h2 class="text-3xl font-bold">
          Les Services <span class="text-[#33663b]">Que j'offre </span>
        </h2>
      </div>

      <router-link to="/services"
        class="bg-[#F4B400] cursor-pointer text-white hover:text-[#F4B400] font-semibold pr-1 rounded-full shadow hover:bg-green-700 transition flex items-center gap-2"
      >
        <span class="bg-[#33663b] py-2 px-5 rounded-full">Voir tout</span>

        <span
          class="bg-white text-[#33663b] rounded-full w-6 h-6 flex items-center justify-center"
          >→</span
        >
      </router-link>
    </div>

    <!-- LISTE DES SERVICES -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="item in services"
        :key="item.id"
        class="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
      >
        <!-- Icône -->
        <div
          class="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4"
        >
          <img :src="item.icon" alt="icon" class="w-7 h-7" />
        </div>

        <!-- Titre -->
        <h3 class="font-bold text-lg mb-2">{{ item.title }}</h3>

        <!-- Description -->
        <p class="text-gray-500 text-sm mb-4">{{ item.text }}</p>

        <!-- Learn more -->
        <router-link
          :to="{ name: 'ServiceDetail', params: { id: item.id } }"
          class="text-[#F4B400] font-semibold text-sm flex items-center gap-1 hover:underline"
        >
          Learn more
          <span>→</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
