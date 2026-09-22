<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Footer from './layouts/Footer.vue'
import Header from './layouts/Header.vue'
import ChatWidget from './components/ChatWidget.vue'
import ScrollToTop from './components/ScrollToTop.vue'

const route = useRoute()

// On masque le Header/Footer pour toutes les routes admin
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <template v-if="isAdminRoute">
    <!-- Les vues admin gèrent leur propre layout (AdminLayout.vue) -->
    <RouterView />
  </template>

  <template v-else>
    <Header />
    <RouterView />
    <Footer />
    <!-- Widgets flottants sur toutes les pages publiques -->
    <ChatWidget />
    <ScrollToTop />
  </template>
</template>

<style scoped></style>
