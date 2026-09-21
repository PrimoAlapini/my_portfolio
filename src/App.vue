<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Footer from './layouts/Footer.vue'
import Header from './layouts/Header.vue'

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
  </template>
</template>

<style scoped></style>
