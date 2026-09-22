<script setup>
import { ref, onMounted, watch } from "vue";
import gsap from 'gsap'

const isOpen = ref(false);

const menu = [
  { name: "Accueil",         to: "/" },
  { name: "Services",     to: "/services" },
  { name: "À propos",        to: "/#about" },
  { name: "Projets",     to: "/#projects" },
  { name: "Témoignages", to: "/#testimonials" },
];

onMounted(() => {
  gsap.from('.site-header', {
    y: -80, opacity: 0, duration: 0.8, ease: 'power3.out'
  })
  gsap.from('.nav-item', {
    opacity: 0, y: -15, duration: 0.5, stagger: 0.08, delay: 0.5,
    ease: 'back.out(1.5)', clearProps: 'opacity,transform'
  })
  gsap.from('.header-cta', {
    opacity: 0, scale: 0.8, duration: 0.5, delay: 1,
    ease: 'back.out(2)', clearProps: 'opacity,transform'
  })
})

// ── Animation GSAP à l'ouverture du menu mobile ───────────────────────────────
watch(isOpen, async (val) => {
  if (val) {
    // Assure que le DOM est monté
    await new Promise(r => setTimeout(r, 10))

    const tl = gsap.timeline()

    // 1. Overlay fond : clip-circle depuis le coin haut-droit
    tl.fromTo('.mobile-overlay',
      { clipPath: 'circle(0% at calc(100% - 40px) 40px)', opacity: 1 },
      { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.65, ease: 'power4.inOut' }
    )

    // 2. Logo slide in
    .fromTo('.mob-logo',
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
      '-=0.25'
    )

    // 3. Bouton close tourne en apparaissant
    .fromTo('.mob-close',
      { rotate: -180, opacity: 0, scale: 0.5 },
      { rotate: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
      '-=0.35'
    )

    // 4. Ligne décorative gauche : scaleY de bas en haut
    .fromTo('.mob-line',
      { scaleY: 0, transformOrigin: 'bottom' },
      { scaleY: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )

    // 5. Items menu : stagger spectaculaire depuis la gauche avec rotation
    .fromTo('.mob-item',
      { x: -80, opacity: 0, rotateY: -30 },
      { x: 0, opacity: 1, rotateY: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
      '-=0.3'
    )

    // 6. Numéro de l'item en stagger décalé
    .fromTo('.mob-num',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, stagger: 0.08, ease: 'power2.out' },
      '-=0.45'
    )

    // 7. CTA + footer slide depuis le bas
    .fromTo('.mob-cta',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' },
      '-=0.2'
    )

    .fromTo('.mob-footer',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
      '-=0.3'
    )

  } else {
    // Fermeture : collapse rapide
    gsap.to('.mobile-overlay', {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      duration: 0.45,
      ease: 'power3.inOut',
    })
  }
})
</script>

<template>
  <header
    class="site-header w-full bg-[#33663b] py-3 px-6 rounded-full flex items-center shadow-md fixed left-1/2 -translate-x-1/2 z-50 max-w-[95%]"
  >
    <!-- LOGO -->
    <router-link to="/" class="flex items-center bg-white rounded-full gap-2">
      <img src="/logo-rzh.png" alt="Rezah-logo" class="w-32" />
    </router-link>

    <!-- NAVIGATION Desktop (centre) -->
    <nav class="hidden md:flex flex-1 justify-center">
      <ul class="flex items-center gap-6 text-white">
        <li
          v-for="item in menu"
          :key="item.name"
          class="nav-item hover:text-yellow-400 cursor-pointer transition"
        >
          <router-link :to="item.to">{{ item.name }}</router-link>
        </li>
      </ul>
    </nav>

    <!-- CTA Desktop -->
    <router-link
      to="/contact"
      class="header-cta bg-white text-[#33663b] font-semibold py-2 px-5 rounded-full shadow hover:bg-gray-100 transition hidden md:block"
    >
      Contact Me
    </router-link>

    <!-- HAMBURGER Mobile — poussé à droite, espaceur à gauche pour équilibrer -->
    <div class="md:hidden flex flex-1 justify-end">
      <button
        @click="isOpen = true"
        class="relative z-10 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group"
        aria-label="Ouvrir le menu"
      >
        <span class="w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-7"></span>
        <span class="w-4 h-0.5 bg-[#F4B400] rounded-full transition-all duration-300 group-hover:w-7"></span>
        <span class="w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-7"></span>
      </button>
    </div>
  </header>

  <!-- ── OVERLAY MENU MOBILE ─────────────────────────────────────────────────── -->
  <div
    v-show="isOpen"
    class="mobile-overlay fixed inset-0 z-[9990] bg-[#1a3320] text-white flex flex-col overflow-hidden"
    style="clip-path: circle(0% at calc(100% - 40px) 40px)"
  >
    <!-- Éléments décoratifs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <!-- Grand cercle décoratif -->
      <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5"></div>
      <div class="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/5"></div>
      <!-- Cercle jaune -->
      <div class="absolute bottom-20 -left-20 w-72 h-72 rounded-full bg-[#F4B400]/5"></div>
      <!-- Texte décoratif en arrière plan -->
      <div class="absolute bottom-36 right-6 text-[120px] font-black text-white/[0.03] leading-none select-none">RZH</div>
    </div>

    <!-- TOP BAR -->
    <div class="flex justify-between items-center px-8 pt-8 pb-6 relative z-10">
      <img src="/logo-rzh.png" class="mob-logo w-28 bg-white rounded-full opacity-0" alt="logo" />
      <button
        @click="isOpen = false"
        class="mob-close w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F4B400] hover:text-[#1a3320] transition-colors opacity-0"
        aria-label="Fermer"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- CONTENU PRINCIPAL -->
    <div class="flex flex-1 overflow-hidden relative z-10">

      <!-- Ligne latérale décorative -->
      <div class="mob-line w-px bg-gradient-to-b from-transparent via-[#F4B400]/40 to-transparent mx-8 flex-shrink-0 scale-y-0"></div>

      <!-- ITEMS MENU -->
      <nav class="flex-1 flex flex-col justify-center px-6 gap-2">
        <div
          v-for="(item, index) in menu"
          :key="item.name"
          class="mob-item opacity-0"
        >
          <router-link
            :to="item.to"
            @click="isOpen = false"
            class="mob-link group flex items-center gap-4 py-3 px-4 rounded-2xl hover:bg-white/5 transition-all duration-200"
          >
            <!-- Numéro -->
            <span class="mob-num text-[#F4B400]/60 text-xs font-mono w-6 text-right opacity-0">
              0{{ index + 1 }}
            </span>
            <!-- Texte -->
            <span class="text-3xl font-bold tracking-tight text-white group-hover:text-[#F4B400] transition-colors duration-200">
              {{ item.name }}
            </span>
            <!-- Flèche au hover -->
            <span class="ml-auto text-[#F4B400] opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200 text-xl">
              →
            </span>
          </router-link>
        </div>
      </nav>
    </div>

    <!-- FOOTER MENU -->
    <div class="mob-footer opacity-0 px-8 pb-10 flex flex-col gap-4 relative z-10">
      <!-- Séparateur -->
      <div class="h-px bg-gradient-to-r from-[#F4B400]/30 via-white/10 to-transparent mb-2"></div>

      <!-- CTA -->
      <router-link
        to="/contact"
        @click="isOpen = false"
        class="mob-cta opacity-0 inline-flex items-center gap-3 bg-[#F4B400] text-[#1a3320] font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition self-start"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        Travaillons ensemble
      </router-link>

      <!-- Infos contact -->
      <div class="flex items-center gap-2 text-white/40 text-xs">
        <span>therezahdev@gmail.com</span>
        <span class="text-[#F4B400]">·</span>
        <span>Cotonou, Bénin</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Perspective pour l'effet rotateY des items */
.mob-link {
  perspective: 800px;
}

/* Underline animé sur les items */
.mob-link::after {
  content: '';
  display: block;
  height: 1px;
  width: 0;
  background: linear-gradient(to right, #F4B400, transparent);
  transition: width 0.3s ease;
  margin-top: 2px;
  margin-left: calc(1.5rem + 1rem); /* aligner avec le texte */
}
.mob-link:hover::after {
  width: 60%;
}
</style>
