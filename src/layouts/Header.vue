<script setup>
import { ref, onMounted } from "vue";
import gsap from 'gsap'

const isOpen = ref(false);

const menu = [
  { name: "Home", to: "/" },
  { name: "Services", to: "/services" },
  { name: "About", to: "/#about" },
  { name: "Projects", to: "/#projects" },
  { name: "Testimonials", to: "/#testimonials" },
];

onMounted(() => {
  // Header drop-in depuis le haut
  gsap.from('.site-header', {
    y: -80, opacity: 0, duration: 0.8, ease: 'power3.out'
  })
  // Nav items stagger
  gsap.from('.nav-item', {
    opacity: 0, y: -15, duration: 0.5, stagger: 0.08, delay: 0.5, ease: 'back.out(1.5)'
  })
  // CTA button
  gsap.from('.header-cta', {
    opacity: 0, scale: 0.8, duration: 0.5, delay: 1, ease: 'back.out(2)'
  })
})
</script>

<template>
  <header
    class="site-header w-full bg-[#33663b] py-3 px-6 rounded-full flex items-center justify-between shadow-md fixed left-1/2 -translate-x-1/2 z-50 max-w-[95%]"
  >
    <!-- LOGO -->
    <router-link to="/" class="flex items-center bg-white rounded-full gap-2">
      <img src="/logo-rzh.png" alt="Rezah-logo" class="w-32" />
    </router-link>

    <!-- NAVIGATION (Desktop) -->
    <nav class="hidden md:block">
      <ul class="flex items-center gap-6 text-white">
        <li
          v-for="item in menu"
          :key="item.name"
          class="nav-item hover:text-yellow-400 cursor-pointer transition"
        >
          <router-link :to="item.to">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- BUTTON (Desktop only) -->
      <router-link to="/contact" class="header-cta bg-white text-[#33663b] font-semibold py-2 px-5 rounded-full shadow hover:bg-gray-100 transition hidden md:block">Contact Me</router-link> 

    <!-- HAMBURGER BUTTON (Mobile) -->
    <button
      @click="isOpen = true"
      class="md:hidden text-white text-3xl focus:outline-none"
    >
      ☰
    </button>
  </header>

  <!-- MOBILE MENU -->
<transition name="slide">
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 w-full h-full bg-[#33663b] text-white z-[999] flex flex-col p-6"
  >

    <!-- TOP BAR -->
    <div class="flex justify-between items-center mb-10">
      <img src="/logo-rzh.png" class="w-28 bg-white rounded-full" />

      <button @click="isOpen = false" class="text-3xl">
        ✕
      </button>
    </div>

    <!-- MENU -->
    <ul class="flex flex-col gap-6 text-2xl font-semibold text-center items-start">
      <li
        v-for="item in menu"
        :key="item.name"
      >
        <router-link
          :to="item.to"
          @click="isOpen = false"
          class="hover:text-yellow-400 transition"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>

    <!-- CTA -->
    <div class="mt-auto flex justify-center">
      <router-link
        to="/contact"
        @click="isOpen = false"
        class="bg-yellow-500 text-[#33663b] font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition"
      >
        Contact Me
      </router-link>
    </div>

  </div>
</transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
