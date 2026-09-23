<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useSocialLinksStore } from '@/stores/socialLinks'

const isAdmin = ref(false)
const socialStore = useSocialLinksStore()

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  isAdmin.value = !!data.session

  supabase.auth.onAuthStateChange((_event, session) => {
    isAdmin.value = !!session
  })

  socialStore.fetchVisible()
})

useScrollAnimation((gsap, ScrollTrigger) => {
  gsap.from('.footer-brand', {
    scrollTrigger: { trigger: '.footer-brand', start: 'top 90%', once: true },
    opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', immediateRender: false
  })
  gsap.from('.footer-col', {
    scrollTrigger: { trigger: '.footer-cols', start: 'top 90%', once: true },
    opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power2.out', immediateRender: false
  })
})
</script>

<template>
  <footer class="w-full bg-white pt-16 border-t">
    <!-- Top Section -->
    <div
      class="footer-cols max-w-6xl mx-auto flex px-6 md:px-12 flex-col md:flex-row justify-between gap-12"
    >
      <!-- Left Brand -->
      <div class="footer-brand max-w-sm">
        <h2 class="text-3xl font-semibold mb-3">
          Rejoignez-moi sur mes <span class="text-[#F4B400]">Réseaux Sociaux</span>
        </h2>

        <div class="flex items-center gap-3 mt-6">
          <div
            class="w-12 h-12 bg-[#F4B400] rounded-full flex items-center justify-center text-[#33663b] font-bold text-xl"
          >
            R
          </div>
          <h3 class="text-xl font-semibold text-[#33663b]">Rezah</h3>
        </div>

        <p class="text-gray-500 mt-3 text-sm leading-relaxed">
          Un projet ? Une idée ? Parlons-en. Je suis disponible pour échanger et
          vous aider à transformer vos ambitions en réalité.
        </p>

        <!-- Social icons -->
        <div class="flex items-center gap-4 mt-5">
          <!-- Skeleton pendant le chargement -->
          <template v-if="socialStore.loading">
            <div
              v-for="n in 6" :key="n"
              class="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
            ></div>
          </template>
          <!-- Liens dynamiques -->
          <a
            v-else
            v-for="link in socialStore.links"
            :key="link.id"
            :href="link.url !== '#' ? link.url : undefined"
            :target="link.url !== '#' ? '_blank' : undefined"
            rel="noopener noreferrer"
            class="w-8 h-8 bg-[#F4B400] rounded-full flex items-center justify-center text-[#33663b] font-bold text-xl hover:bg-[#33663b] hover:text-[#F4B400] cursor-pointer transition"
            :title="link.platform"
          >
            <i :class="link.icon_class + ' text-xl'"></i>
          </a>
        </div>
      </div>

      <!-- Navigation -->
      <div class="footer-col flex-1">
        <h4 class="text-lg font-semibold text-[#33663b] mb-4">Navigation</h4>
        <ul class="text-gray-600 space-y-3 text-sm">
          <li>
            <router-link to="/" class="footer-nav-link">Accueil</router-link>
          </li>
          <li>
            <router-link to="/services" class="footer-nav-link">Services</router-link>
          </li>
          <li>
            <router-link to="/#about" class="footer-nav-link">À propos</router-link>
          </li>
          <li>
            <router-link to="/projects" class="footer-nav-link">Projets</router-link>
          </li>
          <li>
            <router-link to="/#testimonials" class="footer-nav-link">Témoignages</router-link>
          </li>
          <li>
            <router-link to="/#faq" class="footer-nav-link">FAQs</router-link>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer-col flex-1">
        <h4 class="text-lg font-semibold text-[#33663b] mb-4">Contact</h4>
        <ul class="text-gray-600 space-y-3 text-sm">
          <li>(229) 01-9747-5218</li>
          <li>primoalapini.rezah.com</li>
          <li>therezahdev@gmail.com</li>
          <li>Akpakpa - Cotonou, Benin</li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="footer-col flex-1">
        <h4 class="text-lg font-semibold text-[#33663b]">Newsletter</h4>
        <p class="mb-4 text-gray-600">Avoir nos dernieres information</p>
        <div
          class="flex items-center bg-gray-100 rounded-full overflow-hidden w-full"
        >
          <input
            type="email"
            placeholder="Email address"
            class="flex-1 px-4 py-3 bg-transparent outline-none text-sm"
          />
          <button
            class="w-12 h-12 bg-[#33663b] flex items-center justify-center text-white hover:opacity-90 cursor-pointer"
          >
            <i class="ri-arrow-right-s-line text-[#F4B400] text-2xl"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Separator -->
    <div class="w-fuul bg-[#33663b] px-6 md:px-12 mt-12 py-6">
      <div class="flex flex-col md:flex-row justify-between text-sm text-white">
        <p>
          Copyright © 2025 <span class="text-[#F4B400]">Rezah</span>. Tout
          droits réservés.
        </p>

        <div class="flex gap-5 mt-3 md:mt-0 items-center">
          <router-link to="/terms"   class="hover:text-[#F4B400] transition">Termes et Conditions</router-link>
          <router-link to="/privacy" class="hover:text-[#F4B400] transition">Politique et Confidentialité</router-link>
          <router-link
            v-if="isAdmin"
            to="/admin"
            class="flex items-center gap-1 text-[#F4B400] hover:text-white font-semibold transition"
          >
            <span>⚙️</span> Espace Admin
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-nav-link {
  position: relative;
  display: inline-block;
  transition: color 0.25s ease;
  padding-bottom: 2px;
}

.footer-nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 1.5px;
  background: linear-gradient(to right, #33663b, #F4B400);
  border-radius: 99px;
  transition: width 0.3s ease;
}

.footer-nav-link:hover {
  color: #33663b;
}

.footer-nav-link:hover::after {
  width: 100%;
}
</style>
