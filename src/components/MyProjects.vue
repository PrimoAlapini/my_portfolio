<script setup>
import { onMounted, computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()

// Limiter à 3 projets sur la page d'accueil
const visibleProjects = computed(() => store.projects.slice(0, 3))

onMounted(() => store.fetchVisible())
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
        </h2>
      </div>

      <router-link
        to="/projects"
        class="bg-[#F4B400] text-white font-semibold pr-1 rounded-full shadow hover:bg-green-700 hover:text-[#F4B400] transition flex items-center gap-2"
      >
        <span class="bg-[#33663b] py-2 px-5 rounded-full">Voir tout</span>
        <span class="bg-white text-[#33663b] rounded-full w-6 h-6 flex items-center justify-center">→</span>
      </router-link>
    </div>

    <!-- Chargement -->
    <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      <div
        v-for="n in 3"
        :key="n"
        class="w-full bg-white rounded-3xl shadow-md p-4 animate-pulse"
      >
        <div class="w-full h-56 bg-gray-200 rounded-2xl"></div>
        <div class="mt-4 h-4 bg-gray-200 rounded w-1/3"></div>
        <div class="mt-2 h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>

    <!-- Erreur -->
    <p v-else-if="store.error" class="text-center text-red-500 py-8">{{ store.error }}</p>

    <!-- Aucun projet -->
    <p v-else-if="visibleProjects.length === 0" class="text-center text-gray-400 py-8">
      Aucun projet à afficher pour le moment.
    </p>

    <!-- Liste -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      <div
        v-for="project in visibleProjects"
        :key="project.id"
        class="w-full bg-white rounded-3xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
      >
        <!-- Image -->
        <div class="w-full rounded-2xl overflow-hidden">
          <img
            :src="project.image_url"
            :alt="project.title"
            class="w-full h-56 object-cover"
          />
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in (project.tags ?? [])"
            :key="tag"
            class="px-3 py-1 bg-yellow-400 text-black rounded-full text-xs font-semibold"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Category -->
        <p class="text-sm text-gray-500 mt-1">{{ project.category }}</p>

        <!-- Title + bouton -->
        <div class="flex justify-between items-center mt-2">
          <h3 class="text-lg font-semibold text-gray-900 leading-tight">
            {{ project.title }}
          </h3>
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-[#33663b] text-[#F4B400] w-10 h-10 rounded-full text-center text-2xl font-bold hover:bg-[#F4B400] hover:text-[#33663b] transition pb-1 flex items-center justify-center"
          >→</a>
          <div
            v-else
            class="bg-[#33663b] text-[#F4B400] w-10 h-10 rounded-full text-center text-2xl font-bold pb-1 flex items-center justify-center opacity-40"
          >→</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
