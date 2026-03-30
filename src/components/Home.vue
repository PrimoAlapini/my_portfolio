<template>
  <section
    class="w-full bg-white py-20 px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
  >
    <!-- Left Text Block -->
    <div class="space-y-6">
      <!-- Badge -->
      <div
        class="inline-block bg-gray-100 border border-gray-300 px-3 py-1 rounded-full text-sm text-gray-700"
      >
        Hello There! Welcome
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
        Je suis <span class="text-[#F4B400]">Primous Alapini</span>,<br />
        Developpeur Web et Programmeur<br />
        Basé au Benin.
      </h1>

      <!-- Subtitle -->
      <p class="text-gray-600 max-w-md">
        Mais vous pouvez m'appeler
        <span class="text-xl text-[#F4B400]">The Rezah</span>. Je suis un
        concepteur de sites web et applications, expérimenté avec plus de 3 ans
        d'expérience dans le domaine, et j'ai collaboré avec diverses
        entreprises et startups.
      </p>

      <!-- Buttons -->
      <div class="flex gap-4">
        <button
          class="bg-[#33663b] hover:bg-[#29512e] text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 cursor-pointer"
        >
          Voir Mon Portfolio
        </button>
        <button
          class="border border-gray-400 hover:border-green-800 text-gray-700 hover:text-green-800 px-6 py-3 rounded-full font-medium cursor-pointer"
        >
          Embauchez Moi
        </button>
      </div>
    </div>

    <!-- Right Image Block -->
    <div class="relative flex justify-center items-center">
      <!-- Cercle jaune -->
      <div
        class="relative w-72 h-72 bg-[#F4B400] rounded-full flex items-center justify-center overflow-hidden shadow-lg"
      >
        <!-- Image -->
        <img
          src="/images/rzh-profil.png"
          alt="designer photo"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Badge -->
      <div
        class="absolute -top-4 md:right-70 right-5 bg-[#33663b] text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
      >
        Dev Full-Stack
      </div>
    </div>
  </section>
</template>

<script setup></script>
