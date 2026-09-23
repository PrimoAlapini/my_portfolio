<template>
  <section ref="sectionRef" class="w-full py-16 px-4">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- LEFT SIDE -->
      <div class="contact-left">
        <p class="text-sm text-gray-500 mb-2">
          <span class="text-[#F4B400] text-xl">~ </span> Contact Us
        </p>
        <h2 class="text-4xl font-bold leading-tight mb-4">
          Parlons de <span class="text-[#F4B400]">Vos Prochains Projets</span>
        </h2>
        <p class="text-gray-500 max-w-md mb-8">
          Discutons de vos idées, de vos objectifs et de la manière dont je peux
          vous aider à les concrétiser. Que ce soit pour un nouveau projet, une
          refonte ou simplement un conseil professionnel, je suis disponible
          pour vous accompagner.
        </p>

        <!-- INFO LIST -->
        <div class="space-y-5">
          <div class="contact-info-item flex items-center gap-4">
            <div class="w-10 h-10 bg-[#F4B400] rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#33663b]">
                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-gray-700">(229) 01-9747-5218</span>
          </div>

          <div class="contact-info-item flex items-center gap-4">
            <div class="w-10 h-10 bg-[#F4B400] rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#33663b]">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/>
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/>
              </svg>
            </div>
            <span class="text-gray-700">therezahdev@gmail.com</span>
          </div>

          <div class="contact-info-item flex items-center gap-4">
            <div class="w-10 h-10 bg-[#F4B400] rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#33663b]">
                <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-gray-700">Akpakpa - Cotonou, Bénin</span>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE — FORM -->
      <div class="contact-right">
        <!-- Succès -->
        <transition name="fade">
          <div v-if="success" class="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
            <div class="w-16 h-16 rounded-full bg-[#33663b]/10 flex items-center justify-center">
              <svg class="w-8 h-8 text-[#33663b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800">Message envoyé !</h3>
            <p class="text-gray-500 max-w-xs">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
            <button @click="reset" class="mt-2 px-5 py-2 rounded-full border border-[#33663b] text-[#33663b] text-sm hover:bg-[#33663b] hover:text-white transition">
              Envoyer un autre message
            </button>
          </div>
        </transition>

        <!-- Formulaire -->
        <form v-if="!success" @submit.prevent="handleSubmit" class="space-y-5" novalidate>

          <!-- ROW 1 : Nom + Email -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">Votre Nom <span class="text-red-500">*</span></label>
              <input v-model="form.nom" type="text" placeholder="Ex. John Doe"
                class="rounded-xl px-4 py-3 outline-none transition border"
                :class="errors.nom ? 'border-red-400 bg-red-50' : 'bg-gray-100 border-transparent focus:border-[#33663b] focus:bg-white'" />
              <span v-if="errors.nom" class="text-xs text-red-500">{{ errors.nom }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">Email <span class="text-red-500">*</span></label>
              <input v-model="form.email" type="email" placeholder="example@gmail.com"
                class="rounded-xl px-4 py-3 outline-none transition border"
                :class="errors.email ? 'border-red-400 bg-red-50' : 'bg-gray-100 border-transparent focus:border-[#33663b] focus:bg-white'" />
              <span v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</span>
            </div>
          </div>

          <!-- ROW 2 : Téléphone + Service -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">Téléphone</label>
              <input v-model="form.phone" @input="sanitizePhone" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="Ex. +229 01 00 00 00"
                class="rounded-xl px-4 py-3 outline-none transition border"
                :class="errors.phone ? 'border-red-400 bg-red-50' : 'bg-gray-100 border-transparent focus:border-[#33663b] focus:bg-white'" />
              <span v-if="errors.phone" class="text-xs text-red-500">{{ errors.phone }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">Je suis intéressé par <span class="text-red-500">*</span></label>
              <select v-model="form.service"
                class="rounded-xl px-4 py-3 outline-none transition border"
                :class="errors.service ? 'border-red-400 bg-red-50' : 'bg-gray-100 border-transparent focus:border-[#33663b] focus:bg-white'">
                <option value="">Sélectionner un service</option>
                <option v-for="s in services" :key="s.id" :value="s.title">{{ s.title }}</option>
              </select>
              <span v-if="errors.service" class="text-xs text-red-500">{{ errors.service }}</span>
            </div>
          </div>

          <!-- ROW 3 : Budget + Pays -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">Fourchette budgétaire (EUR)</label>
              <select v-model="form.budget"
                class="rounded-xl bg-gray-100 border border-transparent focus:border-[#33663b] focus:bg-white px-4 py-3 outline-none transition">
                <option value="">Sélectionner</option>
                <option value="< 50€">Moins de 50 €</option>
                <option value="50€ - 100€">50 € – 100 €</option>
                <option value="100€ - 200€">100 € – 200 €</option>
                <option value="200€ - 350€">200 € – 350 €</option>
                <option value="350€ - 500€">350 € – 500 €</option>
                <option value="500€ - 1000€">500 € – 1 000 €</option>
                <option value="1000€ - 3000€">1 000 € – 3 000 €</option>
                <option value="3000€ - 5000€">3 000 € – 5 000 €</option>
                <option value="> 5000€">Plus de 5 000 €</option>
                <option value="À discuter">À discuter</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium">Pays <span class="text-red-500">*</span></label>
              <select v-model="form.pays"
                class="rounded-xl px-4 py-3 outline-none transition border"
                :class="errors.pays ? 'border-red-400 bg-red-50' : 'bg-gray-100 border-transparent focus:border-[#33663b] focus:bg-white'">
                <option value="">Sélectionner</option>
                <option v-for="p in pays" :key="p" :value="p">{{ p }}</option>
              </select>
              <span v-if="errors.pays" class="text-xs text-red-500">{{ errors.pays }}</span>
            </div>
          </div>

          <!-- Message -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium">Votre Message <span class="text-red-500">*</span></label>
            <textarea v-model="form.message" rows="4" placeholder="Décrivez votre projet..."
              class="rounded-xl px-4 py-3 outline-none transition border resize-none"
              :class="errors.message ? 'border-red-400 bg-red-50' : 'bg-gray-100 border-transparent focus:border-[#33663b] focus:bg-white'"></textarea>
            <span v-if="errors.message" class="text-xs text-red-500">{{ errors.message }}</span>
          </div>

          <!-- Erreur globale -->
          <p v-if="globalError" class="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{{ globalError }}</p>

          <!-- Submit -->
          <button type="submit" :disabled="loading"
            class="flex items-center gap-4 px-6 py-3 bg-[#33663b] text-white font-semibold rounded-full hover:bg-[#29512e] transition disabled:opacity-60 disabled:cursor-not-allowed">
            <span v-if="loading">Envoi en cours…</span>
            <span v-else>Envoyer le message</span>
            <div class="w-8 h-8 bg-[#F4B400] rounded-full flex items-center justify-center">
              <svg v-if="loading" class="animate-spin w-4 h-4 text-[#33663b]" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              <span v-else class="text-[#33663b] text-lg">➜</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { supabase } from '@/lib/supabase'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { services } from '@/data/services.js'

const sectionRef = ref(null)
const loading    = ref(false)
const success    = ref(false)
const globalError = ref('')

// ── Liste complète des pays du monde (triée alphabétiquement) ────────────────
const pays = [
  'Afghanistan','Afrique du Sud','Albanie','Algérie','Allemagne','Andorre',
  'Angola','Antigua-et-Barbuda','Arabie Saoudite','Argentine','Arménie',
  'Australie','Autriche','Azerbaïdjan','Bahamas','Bahreïn','Bangladesh',
  'Barbade','Belgique','Belize','Bénin','Bhoutan','Biélorussie','Bolivie',
  'Bosnie-Herzégovine','Botswana','Brésil','Brunei','Bulgarie',
  'Burkina Faso','Burundi','Cabo Verde','Cambodge','Cameroun','Canada',
  'Centrafrique','Chili','Chine','Chypre','Colombie','Comores','Congo',
  'Corée du Nord','Corée du Sud','Costa Rica','Côte d\'Ivoire','Croatie',
  'Cuba','Danemark','Djibouti','Dominique','Égypte','Émirats Arabes Unis',
  'Équateur','Érythrée','Espagne','Estonie','Eswatini','États-Unis',
  'Éthiopie','Fidji','Finlande','France','Gabon','Gambie','Géorgie',
  'Ghana','Grèce','Grenade','Guatemala','Guinée','Guinée-Bissau',
  'Guinée équatoriale','Guyana','Haïti','Honduras','Hongrie','Inde',
  'Indonésie','Irak','Iran','Irlande','Islande','Israël','Italie',
  'Jamaïque','Japon','Jordanie','Kazakhstan','Kenya','Kirghizistan',
  'Kiribati','Kosovo','Koweït','Laos','Lesotho','Lettonie','Liban',
  'Liberia','Libye','Liechtenstein','Lituanie','Luxembourg','Madagascar',
  'Malawi','Maldives','Malaisie','Mali','Malte','Maroc','Marshall',
  'Maurice','Mauritanie','Mexique','Micronésie','Moldavie','Monaco',
  'Mongolie','Monténégro','Mozambique','Myanmar','Namibie','Nauru',
  'Népal','Nicaragua','Niger','Nigeria','Norvège','Nouvelle-Zélande',
  'Oman','Ouganda','Ouzbékistan','Pakistan','Palaos','Palestine',
  'Panama','Papouasie-Nouvelle-Guinée','Paraguay','Pays-Bas','Pérou',
  'Philippines','Pologne','Portugal','Qatar','RDC','République dominicaine',
  'République tchèque','Roumanie','Royaume-Uni','Russie','Rwanda',
  'Saint-Kitts-et-Nevis','Saint-Marin','Saint-Vincent-et-les-Grenadines',
  'Sainte-Lucie','Salvador','Samoa','São Tomé-et-Príncipe','Sénégal',
  'Serbie','Seychelles','Sierra Leone','Singapour','Slovaquie','Slovénie',
  'Somalie','Soudan','Soudan du Sud','Sri Lanka','Suède','Suisse',
  'Suriname','Syrie','Tadjikistan','Tanzanie','Tchad','Thaïlande',
  'Timor oriental','Togo','Tonga','Trinité-et-Tobago','Tunisie',
  'Turkménistan','Turquie','Tuvalu','Ukraine','Uruguay','Vanuatu',
  'Vatican','Venezuela','Vietnam','Yémen','Zambie','Zimbabwe','Autre',
]

// ── Formulaire ────────────────────────────────────────────────────────────────
const form = reactive({
  nom: '', email: '', phone: '', service: '', budget: '', pays: '', message: '',
})

const errors = reactive({
  nom: '', email: '', phone: '', service: '', pays: '', message: '',
})

// ── Validation ────────────────────────────────────────────────────────────────
function validate() {
  let valid = true

  errors.nom     = form.nom.trim()     ? '' : 'Le nom est requis.'
  errors.email   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? '' : 'Email invalide.'

  // Téléphone optionnel mais validé si renseigné
  // Accepte : +229 01 97 47 52 18 | 0022901974752 | +33612345678 etc.
  if (form.phone.trim()) {
    const phone = form.phone.trim()
    const phoneDigits = phone.replace(/\D/g, '')
    errors.phone = /^\+?[\d\s\-().]{7,20}$/.test(phone) && phoneDigits.length >= 7
      ? '' : 'Numéro invalide (ex. +229 01 97 47 52 18).'
  } else {
    errors.phone = ''
  }

  errors.service = form.service        ? '' : 'Veuillez choisir un service.'
  errors.pays    = form.pays           ? '' : 'Veuillez sélectionner votre pays.'
  errors.message = form.message.trim().length >= 10
    ? '' : 'Le message doit faire au moins 10 caractères.'

  valid = !Object.values(errors).some(Boolean)
  return valid
}

function sanitizePhone(event) {
  let value = event.target.value.replace(/[^\d\s+().-]/g, '')
  const hasLeadingPlus = value.startsWith('+')
  value = value.replace(/\+/g, '')
  form.phone = (hasLeadingPlus ? '+' : '') + value
}

// ── Envoi ─────────────────────────────────────────────────────────────────────
async function handleSubmit() {
  globalError.value = ''
  if (!validate()) return

  loading.value = true
  const contact = {
    nom:     form.nom.trim(),
    email:   form.email.trim().toLowerCase(),
    phone:   form.phone.trim() || null,
    service: form.service || null,
    budget:  form.budget  || null,
    pays:    form.pays    || null,
    message: form.message.trim(),
  }

  const { error: saveError } = await supabase.from('contact_messages').insert(contact)

  if (saveError) {
    loading.value = false
    globalError.value = 'Une erreur est survenue. Réessayez ou contactez directement therezahdev@gmail.com'
    return
  }

  const { error: emailError } = await supabase.functions.invoke('send-email', {
    body: contact,
  })

  loading.value = false

  if (emailError) {
    globalError.value = 'Votre message a été enregistré, mais la notification email n’a pas pu être envoyée. Réessayez plus tard.'
    return
  }

  success.value = true
}

function reset() {
  Object.assign(form, { nom: '', email: '', phone: '', service: '', budget: '', pays: '', message: '' })
  Object.assign(errors, { nom: '', email: '', phone: '', service: '', pays: '', message: '' })
  globalError.value = ''
  success.value = false
}

// ── Animations ────────────────────────────────────────────────────────────────
useScrollAnimation((gsap, ScrollTrigger) => {
  gsap.from('.contact-left', {
    scrollTrigger: { trigger: '.contact-left', start: 'top 82%', once: true },
    opacity: 0, x: -70, duration: 0.9, ease: 'power3.out', immediateRender: false,
  })
  gsap.from('.contact-right', {
    scrollTrigger: { trigger: '.contact-right', start: 'top 82%', once: true },
    opacity: 0, x: 70, duration: 0.9, ease: 'power3.out', immediateRender: false,
  })
  gsap.from('.contact-info-item', {
    scrollTrigger: { trigger: '.contact-left', start: 'top 78%', once: true },
    opacity: 0, x: -30, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power2.out', immediateRender: false,
  })
}, sectionRef)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
