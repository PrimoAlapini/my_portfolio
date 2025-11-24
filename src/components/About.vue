<template>
  <section
    class="w-full bg-green-900 text-white flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12"
  >
    <div class="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12">
      <!-- Left: Image + Tags -->
      <div class="relative w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
        <div class="bg-yellow-500 rounded-full w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 absolute"></div>
        <img
          src=""
          alt="profile"
          class="relative z-10 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover rounded-full"
        />
        <!-- Tags -->
        <div
          class="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 z-20 w-72"
        >
          <span class="px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
            >Coding</span
          >
          <span class="px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
            >Mobile App</span
          >
          <span class="px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
            >Front End</span
          >
          <span class="px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
            >Back End</span
          >
          <span class="px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
            >SEO</span
          >
          <span class="px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
            >Photoshop</span
          >
          <span class="px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
            >UI/UX Design</span
          >
        </div>
      </div>

      <!-- Right: Text -->
      <div class="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <p class="text-sm tracking-wide opacity-80"><span class="text-[#F4B400] text-xl">~ </span> About Me</p>
        <h2 class="text-3xl sm:text-4xl font-bold leading-tight">
          Qui est <span class="text-yellow-400">Primous Alapini?</span>
        </h2>
        <p class="text-gray-300 text-sm sm:text-base">
          Être développeur, c’est bien plus que transformer des lignes de code en fonctionnalités. C’est imaginer, construire et façonner des solutions capables de simplifier la vie de milliers de personnes. Chaque projet est un nouveau terrain d’exploration, un puzzle à résoudre, un défi à relever. <br> <strong class="text-white"> Passionné par l’innovation, j’aime donner vie à des idées qui semblaient impossibles, transformer des concepts abstraits en expériences fluides et intuitives. Mon objectif : créer des applications utiles, élégantes et performantes, pensées pour l’utilisateur et construites avec précision. Derrière chaque interface se cachent des heures d’apprentissage, d’expérimentation et de créativité. Le développement, c’est avancer chaque jour, repousser ses limites, apprendre de nouvelles technologies et trouver la meilleure manière de résoudre un problème. Ce métier n’est pas qu’une compétence : c’est une passion. Et chaque ligne de code est une nouvelle opportunité de construire quelque chose qui compte.</strong>
        </p>

        <!-- Stats -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 pt-4"
        >
          <div class="text-center">
            <p class="text-3xl text-[#F4B400] font-bold">50+</p>
            <p class="text-sm opacity-80">Projet Terminé</p>
          </div>
          <div class="text-center">
            <p class="text-3xl text-[#F4B400] font-bold">10+</p>
            <p class="text-sm opacity-80">Entreprise Couvert</p>
          </div>
          <div class="text-center">
            <p class="text-3xl text-[#F4B400] font-bold">3+</p>
            <p class="text-sm opacity-80">Années d'Expérience</p>
          </div>
        </div>

        <!-- Button + Signature -->
        <div
          class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6 justify-center lg:justify-start"
        >
          <button
            class="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400"
          >
            Télécharger mon CV
          </button>
          <span class="font-signature text-xl">Primous Alapini</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.font-signature {
  font-family: "Pacifico", cursive;
}
</style>
