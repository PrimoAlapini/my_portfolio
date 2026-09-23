<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Contact from '@/components/Contact.vue'
import { useSocialLinksStore } from '@/stores/socialLinks'

gsap.registerPlugin(ScrollTrigger)

const socialStore = useSocialLinksStore()
onMounted(() => {
  socialStore.fetchVisible()

  // Hero animations
  gsap.from('.cv-hero-badge', {
    opacity: 0, y: -20, duration: 0.6, ease: 'back.out(1.7)',
  })
  gsap.from('.cv-hero-title', {
    opacity: 0, y: 40, duration: 0.8, delay: 0.15, ease: 'power3.out',
  })
  gsap.from('.cv-hero-sub', {
    opacity: 0, y: 20, duration: 0.6, delay: 0.35, ease: 'power2.out',
  })
  gsap.from('.cv-hero-chips', {
    opacity: 0, y: 20, duration: 0.5, delay: 0.5, ease: 'power2.out',
  })

  // Cards infos
  gsap.from('.cv-info-card', {
    scrollTrigger: { trigger: '.cv-info-grid', start: 'top 85%', once: true },
    opacity: 0, y: 40, scale: 0.96,
    duration: 0.55, stagger: 0.1, ease: 'power3.out', immediateRender: false,
  })

  // FAQ section
  gsap.from('.cv-faq-item', {
    scrollTrigger: { trigger: '.cv-faq-list', start: 'top 85%', once: true },
    opacity: 0, x: 50,
    duration: 0.5, stagger: 0.08, ease: 'power3.out', immediateRender: false,
  })
})

// ── Mini FAQ ──────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Quel est votre délai de réponse ?',
    a: 'Je réponds généralement sous 24h en jours ouvrables. Pour les urgences, préférez un appel direct.',
  },
  {
    q: 'Travaillez-vous à distance ?',
    a: 'Oui, je collabore avec des clients partout dans le monde. Visioconférence, email, WhatsApp — je m\'adapte à vos outils.',
  },
  {
    q: 'Comment se déroule un projet type ?',
    a: 'Découverte → Conception → Développement → Tests → Livraison. Chaque étape fait l\'objet d\'un point avec vous.',
  },
  {
    q: 'Proposez-vous des devis gratuits ?',
    a: 'Absolument. Décrivez votre projet via le formulaire ci-dessus et je vous ferai parvenir une estimation sans engagement.',
  },
]

const openFaq = ref(null)
function toggleFaq(i) {
  openFaq.value = openFaq.value === i ? null : i
}
</script>

<template>
  <div class="w-full">

    <!-- ── HERO ──────────────────────────────────────────────────────────────── -->
    <section class="w-full bg-[#33663b] pt-36 pb-20 px-6 text-white text-center relative overflow-hidden">
      <!-- Déco cercles -->
      <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none"></div>
      <div class="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/5 pointer-events-none"></div>
      <div class="absolute top-10 left-10 w-3 h-3 rounded-full bg-[#F4B400]/40 pointer-events-none"></div>
      <div class="absolute bottom-10 right-16 w-2 h-2 rounded-full bg-[#F4B400]/30 pointer-events-none"></div>

      <div class="relative z-10 max-w-3xl mx-auto">
        <span class="cv-hero-badge inline-block bg-white/10 border border-white/20 text-white/80 text-xs px-4 py-1.5 rounded-full mb-5">
          📬 Contactez-moi
        </span>
        <h1 class="cv-hero-title text-4xl md:text-6xl font-black leading-tight mb-4">
          Transformons vos<br/>
          <span class="text-[#F4B400]">idées en réalité</span>
        </h1>
        <p class="cv-hero-sub text-white/70 text-lg max-w-xl mx-auto mb-8">
          Que vous ayez un projet concret ou juste une idée, je suis là pour vous accompagner de A à Z.
        </p>
        <!-- Chips disponibilité -->
        <div class="cv-hero-chips flex items-center justify-center gap-3 flex-wrap">
          <span class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Disponible pour de nouveaux projets
          </span>
          <span class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
            ⚡ Réponse sous 24h
          </span>
          <span class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
            🌍 Remote & Cotonou
          </span>
        </div>
      </div>
    </section>

    <!-- ── CARTES INFO ─────────────────────────────────────────────────────── -->
    <section class="w-full bg-white py-14 px-6">
      <div class="cv-info-grid max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <!-- Téléphone -->
        <div class="cv-info-card group bg-gray-50 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div class="w-11 h-11 bg-[#F4B400] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-[#33663b]" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-400 mb-0.5">Téléphone</p>
            <a href="tel:+22901974752" class="font-semibold text-gray-800 hover:text-[#33663b] transition text-sm">(229) 01-9747-5218</a>
          </div>
        </div>

        <!-- Email -->
        <div class="cv-info-card group bg-gray-50 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div class="w-11 h-11 bg-[#F4B400] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-[#33663b]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/>
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/>
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-400 mb-0.5">Email</p>
            <a href="mailto:therezahdev@gmail.com" class="font-semibold text-gray-800 hover:text-[#33663b] transition text-sm break-all">therezahdev@gmail.com</a>
          </div>
        </div>

        <!-- Localisation -->
        <div class="cv-info-card group bg-gray-50 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div class="w-11 h-11 bg-[#F4B400] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-[#33663b]" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <p class="text-xs text-gray-400 mb-0.5">Localisation</p>
            <p class="font-semibold text-gray-800 text-sm">Akpakpa, Cotonou<br/><span class="text-gray-500 font-normal">Bénin 🇧🇯</span></p>
          </div>
        </div>

        <!-- Réseaux sociaux -->
        <div class="cv-info-card group bg-[#33663b] rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div class="w-11 h-11 bg-[#F4B400] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-[#33663b]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z"/>
            </svg>
          </div>
          <div>
            <p class="text-xs text-white/60 mb-1.5">Réseaux sociaux</p>
            <div class="flex items-center gap-2 flex-wrap">
              <template v-if="socialStore.loading">
                <div v-for="n in 3" :key="n" class="w-7 h-7 rounded-full bg-white/20 animate-pulse"></div>
              </template>
              <a v-else v-for="link in socialStore.links" :key="link.id"
                :href="link.url !== '#' ? link.url : undefined"
                :target="link.url !== '#' ? '_blank' : undefined"
                rel="noopener noreferrer"
                class="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#F4B400] hover:text-[#33663b] transition text-xs"
                :title="link.platform">
                <i :class="link.icon_class"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FORMULAIRE (composant Contact.vue) ─────────────────────────────── -->
    <section class="w-full bg-gray-50 py-4">
      <Contact />
    </section>

    <!-- ── MINI FAQ ───────────────────────────────────────────────────────── -->
    <section class="w-full bg-white py-16 px-6">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <p class="text-sm text-gray-500 mb-2">
            <span class="text-[#F4B400] text-xl">~ </span> Questions fréquentes
          </p>
          <h2 class="text-3xl font-bold">
            Avant de m'écrire,<br/>
            <span class="text-[#F4B400]">peut-être la réponse est ici</span>
          </h2>
        </div>

        <div class="cv-faq-list space-y-3">
          <div v-for="(faq, i) in faqs" :key="i"
            class="cv-faq-item rounded-2xl border border-gray-100 overflow-hidden">
            <button
              @click="toggleFaq(i)"
              class="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
              :class="openFaq === i ? 'bg-gray-50' : 'bg-white'"
            >
              <span class="font-semibold text-gray-800 text-sm pr-4">{{ faq.q }}</span>
              <span class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
                :class="openFaq === i ? 'bg-[#33663b] text-white rotate-45' : 'bg-gray-100 text-gray-500'">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
              </span>
            </button>
            <transition name="accordion">
              <div v-if="openFaq === i" class="px-5 pb-4 text-sm text-gray-500 leading-relaxed bg-gray-50">
                {{ faq.a }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA FINAL ──────────────────────────────────────────────────────── -->
    <section class="w-full bg-[#33663b] py-16 px-6 text-center text-white relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-4 right-8 text-[100px] font-black text-white/[0.03] leading-none select-none">RZH</div>
      </div>
      <div class="relative z-10 max-w-xl mx-auto">
        <p class="text-[#F4B400] text-sm font-semibold mb-3">Prêt à démarrer ?</p>
        <h2 class="text-3xl md:text-4xl font-black mb-4">
          Votre projet mérite le meilleur.
        </h2>
        <p class="text-white/70 mb-8">
          Remplissez le formulaire ci-dessus ou écrivez-moi directement. Je vous répondrai dans les 24h.
        </p>
        <a href="mailto:therezahdev@gmail.com"
          class="inline-flex items-center gap-3 bg-[#F4B400] text-[#33663b] font-bold py-3 px-7 rounded-full hover:bg-yellow-400 transition shadow-lg">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/>
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/>
          </svg>
          therezahdev@gmail.com
        </a>
      </div>
    </section>

  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
  max-height: 200px;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
