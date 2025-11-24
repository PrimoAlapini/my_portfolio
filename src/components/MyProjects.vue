<script setup></script>

<template>
  <section class="w-full py-16 px-6 md:px-12">
    <div class="flex items-center justify-between w-full mb-10">
      <div>
        <p class="text-gray-500 text-sm">
          <span class="text-[#F4B400] text-xl">~ </span>Mon Portfolio
        </p>
        <h2 class="text-3xl font-bold">
          Mes récents <span class="text-[#F4B400]">Projets </span>
        </h2>
      </div>

      <button
        class="bg-[#F4B400] text-white font-semibold pr-1 rounded-full shadow hover:bg-green-700 transition flex items-center gap-2"
      >
        <span class="bg-[#33663b] py-2 px-5 rounded-full">Voir tout</span>

        <span
          class="bg-white text-[#33663b] rounded-full w-6 h-6 flex items-center justify-center"
          >→</span
        >
      </button>
    </div>

    <div
      class="w-full max-w-sm bg-white rounded-3xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
    >
      <!-- Image -->
      <div class="w-full rounded-2xl overflow-hidden">
        <img src="" alt="project" class="w-full h-auto object-cover" />
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mt-4">
        <span
          class="px-3 py-1 bg-yellow-400 text-black rounded-full text-xs font-semibold"
          >UI/UX Design</span
        >
        <span
          class="px-3 py-1 bg-yellow-400 text-black rounded-full text-xs font-semibold"
          >App Design</span
        >
        <span
          class="px-3 py-1 bg-yellow-400 text-black rounded-full text-xs font-semibold"
          >Wireframe</span
        >
      </div>

      
      <!-- Title -->
      <!-- Button bottom right -->
      <div class="flex justify-between items-center mt-4">
          <h3 class="mt-4 text-lg font-semibold text-gray-900 leading-tight">
            Coffee Shop App – Coffee Ordering App Solution
          </h3>
        <button
          class="bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold hover:bg-green-600 transition"
        >
          →
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
