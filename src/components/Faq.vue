<script setup>
import { ref } from "vue";

// Tableau de FAQs
const faqs = ref([
  {
    question: "What industries have you worked in as a product designer?",
    answer:
      "I have worked across multiple industries including tech, finance, health, and creative services.",
  },
  {
    question: "Can I download your resume/CV for information ?",
    answer:
      "Certainly! You can download my resume/CV directly from my website. It provides a comprehensive overview of my education, work experience, and design achievements.",
  },
  {
    question: "Are you available for freelance design work?",
    answer:
      "Yes, I regularly take on freelance projects depending on availability.",
  },
  {
    question: "How long does a typical project take to complete?",
    answer:
      "Project duration depends on scope, but most take between 2–6 weeks.",
  },
  {
    question: "Do you work with startups or only large companies?",
    answer:
      "I work with everyone — startups, agencies, and larger organizations.",
  },
  {
    question: "What tools do you use for your design projects?",
    answer:
      "Figma, Adobe XD, Illustrator, Photoshop, and Notion for project management.",
  },
]);

// index de la FAQ ouverte
const openIndex = ref(1); // 2ème FAQ ouverte par défaut

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
        Questions? <span class="text-[#F4B400]">Look here.</span>
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
