<script setup>
import { onMounted } from 'vue'
import { useSeo } from '@/composables/useSeo'
import About from '@/components/About.vue';
import Academy from '@/components/Academy.vue';
import Contact from '@/components/Contact.vue';
import Faq from '@/components/Faq.vue';
import HeadSection from '@/components/HeadSection.vue';
import Home from '@/components/Home.vue';
import MyLanguages from '@/components/MyLanguages.vue';
import MyProjects from '@/components/MyProjects.vue';
import Service from '@/components/Service.vue';
import Testimonial from '@/components/Testimonial.vue';

onMounted(() => useSeo({
  title: 'Développeur Full-Stack | Cotonou, Bénin',
  description: 'Primous Alapini alias The Rezah — développeur web et mobile full-stack. Vue.js, React, Flutter, Laravel, Node.js. Disponible pour vos projets.',
  url: '/',
}))
</script>

<template>
  <Home  />

  <Service />

  <About />

  <MyLanguages />

  <MyProjects />

  <Academy />

  <Contact />

  <Testimonial />

  <Faq />
</template>

<style scoped>

</style>