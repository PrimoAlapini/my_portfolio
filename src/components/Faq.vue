<script setup>
import { ref } from "vue";

// Tableau de FAQs
const faqs = ref([
  {
    question: "Dans quels secteurs avez-vous travaillé en tant que développeur web ?",
    answer:
      "J'ai travaillé dans de nombreux secteurs d'activité, notamment la technologie, la finance, la santé et les services créatifs.",
  },
  {
    question: "Puis-je télécharger votre CV pour information ?",
    answer:
      "Bien sûr ! Vous pouvez télécharger mon CV directement depuis mon site web. Il présente un aperçu complet de ma formation, de mon expérience professionnelle et de mes réalisations en développement web.",
  },
  {
    question: "Êtes-vous disponible pour des projets en freelance ?",
    answer:
      "Oui, je réalise régulièrement des projets en freelance en fonction de mes disponibilités.",
  },
  {
    question: "Combien de temps faut-il généralement pour mener à bien un projet ?",
    answer:
      "La durée d'un projet dépend de son envergure, mais la plupart durent entre 4 et 12 semaines.",
  },
  {
    question: "Travaillez-vous avec des startups ou seulement avec de grandes entreprises ?",
    answer:
      "Je travaille avec tout le monde : startups, agences et grandes entreprises.",
  },
  {
    question: "Quels outils utilisez-vous pour vos projets de conception ?",
    answer:
      "J'utilise beaucoup d'outils(figma, git etc...) pour realiser mes projets et cela dépend aussi du language avec lequel je code(developpe).",
  },
]);

// index de la FAQ ouverte
const openIndex = ref(); // 2ème FAQ ouverte par défaut

// toggle strict
function toggleFAQ(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
  <section class="w-full bg-[#33663b] py-16 px-4">
    <!-- Header -->
    <div class="text-center mb-10">
      <p class="text-white/70 tracking-wide text-sm">
        <span class="text-[#F4B400] text-xl">~ </span> FAQs
      </p>
      <h2 class="text-3xl font-semibold text-white">
        Questions? <span class="text-[#F4B400]">Voir ici</span>
      </h2>
    </div>

    <!-- FAQ List -->
    <div class="max-w-3xl mx-auto space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        @click="toggleFAQ(index)"
        class="cursor-pointer transition-all duration-300 rounded-xl overflow-hidden border"
        :class="
          openIndex === index
            ? 'bg-[#F4B400] text-[#33663b] border-[#F4B400] shadow-lg'
            : 'bg-white/10 text-white border-white/10'
        "
      >
        <!-- Question + Icon -->
        <div class="p-5 flex justify-between items-center">
          <p class="text-lg font-medium">{{ faq.question }}</p>

          <!-- Icon -->
          <div
            class="text-2xl font-bold transition-transform duration-300"
            :class="openIndex === index ? 'rotate-180' : ''"
          >
          
            <span >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <!-- Answer -->
        <transition name="fade">
          <div
            v-if="openIndex === index"
            class="px-5 pb-5 text-sm leading-relaxed"
          >
            {{ faq.answer }}
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
