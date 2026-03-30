<script setup>
const projects = [
  {
    category: "Application Web",
    title: "Hub Liquors",
    tag: ["Vue.js", "Laravel", "Figma"],
    image: "/images/hub.PNG",
    link: 'https://estern'
  },
  {
    category: "Application Web",
    title: "Cinemax",
    tag: ["Nuxt", "Laravel"],
    image: "/images/hub.PNG",
  },
  {
    category: "Application Web",
    title: "Eastern",
    tag: ["Vue.js", "NodeJs", "Figma"],
    image: "/images/hub.PNG",
  },
];
</script>

<template>
  <section id="projects" class="w-full bg-gray-100 py-16 px-6 md:px-12">
    <div class="flex items-center justify-between w-full mb-10">
      <div>
        <p class="text-gray-500 text-sm">
          <span class="text-[#F4B400] text-xl">~ </span>Mon Portfolio
        </p>
        <h2 class="text-3xl font-bold">
          Mes récents <span class="text-[#F4B400]">Projets </span>
        </h2>np
      </div>

      <router-link to="/projects"
        class="bg-[#F4B400] text-white font-semibold pr-1 rounded-full shadow hover:bg-green-700 hover:text-[#F4B400] transition flex items-center gap-2"
      >
        <span class="bg-[#33663b] py-2 px-5 rounded-full">Voir tout</span>

        <span
          class="bg-white text-[#33663b] rounded-full w-6 h-6 flex items-center justify-center"
          >→</span
        >
      </router-link>
    </div>

    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      <div
        v-for="project in projects"
        :key="project.title"
        class="w-full bg-white rounded-3xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
      >
        <!-- Image -->
        <div class="w-full rounded-2xl overflow-hidden">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-56 object-cover"
          />
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in project.tag"
            :key="tag"
            class="px-3 py-1 bg-yellow-400 text-black rounded-full text-xs font-semibold"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Category -->
        <p class="text-sm text-gray-500 mt-1">{{ project.category }}</p>

        <!-- Title -->
        <!-- Button bottom right -->
        <div class="flex justify-between items-center mt-2">
          <h3 class="text-lg font-semibold text-gray-900 leading-tight">
            {{ project.title }}
          </h3>
          <button
            class="bg-[#33663b] text-[#F4B400] w-10 h-10 rounded-full text-center text-2xl font-bold hover:bg-[#F4B400] hover:text-[#33663b] transition pb-1"
          >
            →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
