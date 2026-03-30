<template>
  <section
    id="about"
    class="w-full bg-[#33663b] text-white flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12"
  >
    <div class="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12">
      <!-- Left: Image + Tags -->
      <div class="relative w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
        <div
          class="bg-yellow-500 rounded-full w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 absolute"
        ></div>
        <img
          src="/images/rzh-avatar-ro.png"
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
            >DevOps</span
          >
          <span class="px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm"
            >UI/UX Design</span
          >
        </div>
      </div>

      <!-- Right: Text -->
      <div class="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <p class="text-sm tracking-wide opacity-80">
          <span class="text-[#F4B400] text-xl">~ </span> About Me
        </p>
        <h2 class="text-3xl sm:text-4xl font-bold leading-tight">
          Qui est <span class="text-yellow-400">Primous Alapini?</span>
        </h2>
        <div class="space-y-3 text-gray-300 text-sm sm:text-base">
          <p>
            Né un 04 de l’an 1999 dans une ville modeste qu’est la capitale du
            Bénin, j’y ai grandi et parcouru l’essentiel de mon cursus scolaire.
            Très tôt, j’ai développé une curiosité naturelle pour
            l’apprentissage. À l’âge de 9 ans, j’obtiens mon premier diplôme
            marquant mon entrée au collège, une étape déterminante qui ouvre la
            voie à une passion naissante pour les sciences.
          </p>
          <p>
            Au fil des années, cette passion s’est intensifiée, notamment pour
            les mathématiques. J’y découvre une véritable fascination pour la
            logique, la résolution de problèmes et la rigueur intellectuelle.
            Cette affinité me permet de bâtir des bases solides, que je
            consolide et expérimente sur d'autres horizons tout au long de mon
            parcours académique jusqu’à l’obtention de ma licence en 2021.
          </p>
          <p>
            Animé par une volonté constante d’évolution et d’ouverture, je
            décide ensuite de poursuivre mon apprentissage à l’international. Je
            m’envole pour la Côte d’Ivoire où j’intègre DIGITECH à Abidjan pour
            une formation d’initiation au numérique d’une durée de 18 mois.
            Cette expérience marque un tournant décisif dans mon parcours : j’y
            développe des compétences techniques, une culture digitale
            approfondie ainsi qu’une capacité d’adaptation dans un environnement
            dynamique et innovant qu'est notre monde d'aujourd'hui.
          </p>
          <p>
            Dans une logique de progression continue et de vision
            entrepreneuriale, j’intègre en 2024 HighFive University une école de
            l'entreprise française VIPP basé au Bénin pour suivre un programme
            de School Business en Programation et Developpement Web. Cette
            nouvelle étape me permet d’élargir mes compétences au-delà du
            technique, en développant une compréhension stratégique des projets,
            du management et de la création de valeur.
          </p>
          <p>
            Aujourd’hui, je me positionne comme un profil polyvalent, alliant
            codes, rigueur scientifique, compétences techniques et vision
            orientée solutions.
          </p>
          <div class="">
            Être développeur, c’est bien plus que transformer des lignes de code
            en fonctionnalités. C’est imaginer, construire et façonner des
            solutions capables de simplifier la vie de milliers de personnes.
            Chaque projet est un nouveau terrain d’exploration, un puzzle à
            résoudre, un défi à relever.
            <p class="h-1"></p>
            <br />
            <strong class="text-white">
              Passionné par l’innovation, j’aime donner vie à des idées qui
              semblaient impossibles, transformer des concepts abstraits en
              expériences fluides et intuitives. Mon objectif : créer des
              applications utiles, élégantes et performantes, pensées pour
              l’utilisateur et construites avec précision. Derrière chaque
              interface se cachent des heures d’apprentissage, d’expérimentation
              et de créativité. Le développement, c’est avancer chaque jour,
              repousser ses limites, apprendre de nouvelles technologies et
              trouver la meilleure manière de résoudre un problème. Ce métier
              n’est pas qu’une compétence : c’est une passion. Et chaque ligne
              de code est une nouvelle opportunité de construire quelque chose
              qui compte.</strong
            >
          </div>
        </div>

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
            @click="showModal = true"
            class="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition"
          >
            Télécharger mon CV
          </button>
          <span class="font-signature text-xl">Primous Alapini</span>
        </div>
      </div>
    </div>
  </section>
  <transition name="fade">
  <div
    v-if="showModal"
    class="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <!-- CARD -->
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-md w-[90%] p-6 text-center animate-scale"
    >
      <!-- ICON -->
      <div class="text-4xl mb-4">📄</div>

      <!-- TITLE -->
      <h3 class="text-xl font-bold mb-2">
        Accès au CV
      </h3>

      <!-- TEXT -->
      <p class="text-gray-600 mb-6">
        Veuillez me contacter en privé pour obtenir mon CV complet.
      </p>

      <!-- ACTIONS -->
      <div class="flex gap-4 justify-center">
        
        <!-- DEMANDER -->
        <router-link
          to="/#contact"
          @click="showModal = false"
          class="px-5 py-2 bg-[#33663b] text-white rounded-full hover:text-black hover:bg-yellow-500 transition"
        >
          Demander
        </router-link>

        <!-- ANNULER -->
        <button
          @click="showModal = false"
          class="px-5 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
        >
          Annuler
        </button>

      </div>
    </div>
  </div>
</transition>
</template>

<script setup>
import { ref } from "vue";

const showModal = ref(false);
</script>

<style scoped>
.font-signature {
  font-family: "Pacifico", cursive;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-scale {
  animation: scaleIn 0.25s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
