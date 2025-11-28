<script setup>
// Tableau contenant les services
const services = [
  {
    id: 1,
    icon: "/icons/site.svg",
    title: "Site web",
    text: "Création de sites modernes, rapides et entièrement responsive, optimisés pour offrir une expérience fluide et professionnelle.",
  },
  {
    id: 2,
    icon: "/icons/application.svg",
    title: "Application web",
    text: "Développement d'applications web performantes, sécurisées et évolutives, adaptées aux besoins spécifiques de votre entreprise.",
  },
  {
    id: 3,
    icon: "/icons/mobile.svg",
    title: "Application Mobile",
    text: "Conception et développement d'applications mobiles ergonomiques et intuitives pour Android et iOS.",
  },
  {
    id: 4,
    icon: "/icons/security.svg",
    title: "Sécurité Web",
    text: "Analyse, protection et sécurisation de vos plateformes contre les attaques courantes : injections, failles XSS, accès non autorisés…",
  },
  {
    id: 5,
    icon: "/icons/maintenance.svg",
    title: "Maintenance et évolution",
    text: "Suivi technique complet, correction de bugs, mises à jour et ajout de nouvelles fonctionnalités selon vos besoins.",
  },
  {
    id: 6,
    icon: "/icons/flyer.svg",
    title: "Flyer",
    text: "Création de flyers modernes et attractifs pour promouvoir vos services, événements ou produits avec une identité visuelle forte.",
  },
  {
    id: 7,
    icon: "/icons/pub.svg",
    title: "Affiche publicitaire",
    text: "Design d’affiches professionnelles et impactantes pour renforcer votre communication visuelle et attirer l’attention.",
  },
  {
    id: 8,
    icon: "/icons/logo.svg",
    title: "Création de Logo",
    text: "Conception de logos uniques et mémorables, adaptés à votre identité de marque et à vos valeurs.",
  },
  {
    id: 9,
    icon: "/icons/suivi.svg",
    title: "Conseil et Suivi Technique",
    text: "Accompagnement personnalisé pour vous guider dans vos choix technologiques et assurer la réussite de votre projet.",
  },
];
</script>

<template>
  <section class="w-full bg-gray-100 py-16 px-6 md:px-12">
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
        <button
          class="text-[#F4B400] font-semibold text-sm flex items-center gap-1 hover:underline"
        >
          Learn more
          <span>→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
