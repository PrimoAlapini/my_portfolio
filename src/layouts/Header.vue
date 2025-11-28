<script setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <header
    class="w-full bg-[#33663b] py-3 px-6 rounded-full flex items-center justify-between shadow-md fixed left-1/2 -translate-x-1/2 z-50 max-w-[95%]"
  >
    <!-- LOGO -->
    <div class="flex items-center bg-white rounded-full gap-2">
      <img src="/logo-rzh.png" alt="Rezah-logo" class="w-32" />
    </div>

    <!-- NAVIGATION (Desktop) -->
    <nav class="hidden md:block">
      <ul class="flex items-center gap-6 text-white">
        <li class="hover:text-yellow-400 cursor-pointer transition">Home</li>
        <li class="hover:text-yellow-400 cursor-pointer transition">
          Services
        </li>
        <li class="hover:text-yellow-400 cursor-pointer transition">About</li>
        <li class="hover:text-yellow-400 cursor-pointer transition">
          Projects
        </li>
        <li class="hover:text-yellow-400 cursor-pointer transition">Blog</li>
        <li class="hover:text-yellow-400 cursor-pointer transition">
          Testimonials
        </li>
      </ul>
    </nav>

    <!-- BUTTON (Desktop only) -->
    <button
      class="bg-white text-[#33663b] font-semibold py-2 px-5 rounded-full shadow hover:bg-gray-100 transition hidden md:block"
    >
      Contact Me
    </button>

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
      class="fixed top-0 right-0 w-full h-full bg-[#33663b] text-white shadow-xl p-6 flex flex-col gap-6 z-70"
    >
      <div class="flex justify-between">
        <div class="flex items-center bg-white rounded-full gap-2">
          <img src="/logo-rzh.png" alt="Rezah-logo" class="w-32" />
        </div>
        <button
          @click="isOpen = false"
          class="md:hidden text-white text-3xl focus:outline-none"
        >
          ✕
        </button>
      </div>
      <ul class="flex flex-col gap-4 text-lg">
        <li class="hover:text-yellow-400 cursor-pointer transition">Home</li>
        <li class="hover:text-yellow-400 cursor-pointer transition">
          Services
        </li>
        <li class="hover:text-yellow-400 cursor-pointer transition">About</li>
        <li class="hover:text-yellow-400 cursor-pointer transition">
          Projects
        </li>
        <li class="hover:text-yellow-400 cursor-pointer transition">Blog</li>
        <li class="hover:text-yellow-400 cursor-pointer transition">
          Testimonials
        </li>
      </ul>

      <button
        class="bg-white text-[#33663b] font-semibold py-2 px-5 rounded-full shadow hover:bg-gray-100 transition w-fit"
      >
        Contact Me
      </button>
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
