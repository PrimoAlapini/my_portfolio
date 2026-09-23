<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { supabase } from '@/lib/supabase'
import QuillEditor from '@/components/QuillEditor.vue'

// ── État ───────────────────────────────────────────────────────────────────────
const messages        = ref([])
const loading         = ref(false)
const selected        = ref(null)
const replySubject    = ref('')
const replyHTML       = ref('')
const mailStatus      = ref(null)
const searchQuery     = ref('')
const filterUnread    = ref(false)
const confirmDeleteId = ref(null)
const quillRef        = ref(null)

// ── Chargement ─────────────────────────────────────────────────────────────────
async function fetchMessages() {
  loading.value = true
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (!error) messages.value = data ?? []
  loading.value = false
}

onMounted(fetchMessages)

// ── Filtres ────────────────────────────────────────────────────────────────────
const filtered = computed(() => {
  let list = messages.value
  if (filterUnread.value) list = list.filter(m => !m.lu)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(m =>
      m.nom.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q) ||
      (m.service ?? '').toLowerCase().includes(q)
    )
  }
  return list
})

const unreadCount = computed(() => messages.value.filter(m => !m.lu).length)

// ── Ouvrir un message ──────────────────────────────────────────────────────────
async function openMessage(msg) {
  selected.value     = msg
  replySubject.value = `Re: Votre message depuis le portfolio de Rezah`
  replyHTML.value    = ''
  mailStatus.value   = null

  await nextTick()
  quillRef.value?.clear()
  quillRef.value?.focus()

  if (!msg.lu) {
    await supabase.from('contact_messages').update({ lu: true }).eq('id', msg.id)
    msg.lu = true
  }
}

// ── Supprimer ──────────────────────────────────────────────────────────────────
async function confirmDelete() {
  await supabase.from('contact_messages').delete().eq('id', confirmDeleteId.value)
  messages.value = messages.value.filter(m => m.id !== confirmDeleteId.value)
  if (selected.value?.id === confirmDeleteId.value) selected.value = null
  confirmDeleteId.value = null
}

// ── Envoi via mailto ───────────────────────────────────────────────────────────
function sendReply() {
  const text = quillRef.value?.getText().trim()
  if (!text) return
  const to      = selected.value.email
  const subject = encodeURIComponent(replySubject.value)
  const body    = encodeURIComponent(quillRef.value.getText())
  window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_blank')
  mailStatus.value = 'success'
  setTimeout(() => { mailStatus.value = null }, 4000)
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function formatDate(d) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(d))
}

function timeAgo(d) {
  const diff = Date.now() - new Date(d).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'À l\'instant'
  if (mins < 60) return `il y a ${mins} min`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `il y a ${hrs}h`
  return `il y a ${Math.floor(hrs / 24)}j`
}

function initials(nom) {
  return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const avatarColors = [
  'bg-violet-500','bg-blue-500','bg-emerald-500','bg-orange-500',
  'bg-pink-500','bg-teal-500','bg-amber-500','bg-cyan-500',
]
function avatarColor(nom) {
  return avatarColors[nom.charCodeAt(0) % avatarColors.length]
}
</script>

<template>
  <div class="h-full flex flex-col gap-0">

    <!-- ── En-tête ───────────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Messages</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          {{ messages.length }} message{{ messages.length > 1 ? 's' : '' }}
          <span v-if="unreadCount > 0" class="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            {{ unreadCount }} non lu{{ unreadCount > 1 ? 's' : '' }}
          </span>
        </p>
      </div>
      <button @click="fetchMessages" class="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-gray-600" title="Actualiser">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      </button>
    </div>

    <!-- ── Layout 2 colonnes ─────────────────────────────────────────────────── -->
    <div class="flex flex-1 gap-4 min-h-0" style="height: calc(100vh - 180px)">

      <!-- ── Colonne gauche : liste ─────────────────────────────────────────── -->
      <div class="w-full md:w-80 lg:w-96 flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden flex-shrink-0">

        <!-- Barre de recherche + filtre -->
        <div class="p-3 border-b border-gray-100 space-y-2">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Rechercher…"
              class="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#33663b] border border-transparent focus:border-[#33663b] transition"/>
          </div>
          <button @click="filterUnread = !filterUnread"
            class="w-full flex items-center justify-center gap-2 py-1.5 rounded-xl text-xs font-medium transition"
            :class="filterUnread ? 'bg-[#33663b] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'">
            <span class="w-2 h-2 rounded-full" :class="filterUnread ? 'bg-[#F4B400]' : 'bg-gray-300'"></span>
            {{ filterUnread ? 'Non lus uniquement' : 'Tous les messages' }}
          </button>
        </div>

        <!-- Chargement -->
        <div v-if="loading" class="flex-1 flex items-center justify-center">
          <span class="w-7 h-7 border-4 border-[#33663b] border-t-transparent rounded-full animate-spin"></span>
        </div>

        <!-- Vide -->
        <div v-else-if="filtered.length === 0" class="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2 p-6 text-center">
          <svg class="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
          </svg>
          <p class="text-sm">Aucun message trouvé</p>
        </div>

        <!-- Liste des fils -->
        <div v-else class="flex-1 overflow-y-auto divide-y divide-gray-50">
          <button
            v-for="msg in filtered"
            :key="msg.id"
            @click="openMessage(msg)"
            class="w-full text-left px-4 py-3.5 hover:bg-gray-50 transition flex items-start gap-3"
            :class="selected?.id === msg.id ? 'bg-[#33663b]/5 border-l-4 border-l-[#33663b]' : 'border-l-4 border-l-transparent'"
          >
            <!-- Avatar -->
            <div class="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
              :class="avatarColor(msg.nom)">
              {{ initials(msg.nom) }}
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1 mb-0.5">
                <span class="text-sm font-semibold text-gray-800 truncate" :class="!msg.lu ? 'font-bold' : ''">
                  {{ msg.nom }}
                </span>
                <span class="text-[10px] text-gray-400 flex-shrink-0">{{ timeAgo(msg.created_at) }}</span>
              </div>
              <p class="text-xs text-gray-500 truncate mb-0.5">{{ msg.email }}</p>
              <p class="text-xs text-gray-400 truncate">{{ msg.message }}</p>

              <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span v-if="msg.service" class="text-[10px] bg-[#33663b]/10 text-[#33663b] px-2 py-0.5 rounded-full">{{ msg.service }}</span>
                <span v-if="msg.budget"  class="text-[10px] bg-[#F4B400]/20 text-amber-700 px-2 py-0.5 rounded-full">{{ msg.budget }}</span>
                <span v-if="!msg.lu" class="ml-auto w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- ── Colonne droite : détail + réponse ──────────────────────────────── -->
      <div class="flex-1 flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden min-w-0">

        <!-- Placeholder vide -->
        <div v-if="!selected" class="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3">
          <svg class="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
          </svg>
          <p class="text-sm">Sélectionnez un message pour le lire</p>
        </div>

        <!-- Détail du message -->
        <template v-else>

          <!-- Header conversation -->
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                :class="avatarColor(selected.nom)">
                {{ initials(selected.nom) }}
              </div>
              <div class="min-w-0">
                <p class="font-bold text-gray-800 truncate">{{ selected.nom }}</p>
                <a :href="`mailto:${selected.email}`" class="text-xs text-[#33663b] hover:underline">{{ selected.email }}</a>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-xs text-gray-400 hidden sm:block">{{ formatDate(selected.created_at) }}</span>
              <button @click="confirmDeleteId = selected.id"
                class="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition" title="Supprimer">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Infos client (chips) -->
          <div class="px-6 py-3 flex flex-wrap gap-2 border-b border-gray-50 bg-gray-50/50">
            <span v-if="selected.phone" class="flex items-center gap-1.5 text-xs bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm text-gray-600">
              📞 {{ selected.phone }}
            </span>
            <span v-if="selected.pays" class="flex items-center gap-1.5 text-xs bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm text-gray-600">
              🌍 {{ selected.pays }}
            </span>
            <span v-if="selected.service" class="flex items-center gap-1.5 text-xs bg-[#33663b]/10 text-[#33663b] border border-[#33663b]/20 px-3 py-1 rounded-full font-medium">
              🛠 {{ selected.service }}
            </span>
            <span v-if="selected.budget" class="flex items-center gap-1.5 text-xs bg-[#F4B400]/20 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-medium">
              💰 {{ selected.budget }}
            </span>
          </div>

          <!-- Corps du message -->
          <div class="flex-1 overflow-y-auto px-6 py-5">
            <div class="bg-gray-50 rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100">
              {{ selected.message }}
            </div>
          </div>

          <!-- Zone de réponse -->
          <div class="border-t border-gray-100 px-6 py-4 space-y-3">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Répondre à {{ selected.nom }}</p>

            <!-- Sujet -->
            <input v-model="replySubject" type="text" placeholder="Objet du mail"
              class="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#33663b] focus:ring-1 focus:ring-[#33663b]/20 transition"/>

            <!-- Éditeur Quill -->
            <QuillEditor
              ref="quillRef"
              v-model="replyHTML"
              placeholder="Rédigez votre réponse…"
              min-height="130px"
              max-height="220px"
            />

            <!-- Feedback envoi -->
            <transition name="fade">
              <p v-if="mailStatus === 'success'" class="text-xs text-green-600 bg-green-50 px-3 py-2 rounded-xl">
                ✅ Votre client mail s'est ouvert avec la réponse prête à envoyer.
              </p>
            </transition>

            <!-- Actions -->
            <div class="flex items-center gap-3">
              <button @click="sendReply"
                class="flex items-center gap-2 px-5 py-2.5 bg-[#33663b] text-white text-sm font-semibold rounded-full hover:bg-[#29512e] transition disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                </svg>
                Ouvrir dans mon client mail
              </button>
              <a :href="`mailto:${selected.email}`"
                class="text-xs text-gray-400 hover:text-[#33663b] transition underline underline-offset-2">
                Ou écrire directement
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- ── Modale confirmation suppression ───────────────────────────────────── -->
    <transition name="fade">
      <div v-if="confirmDeleteId" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center">
          <p class="text-2xl mb-3">🗑️</p>
          <h3 class="font-bold text-gray-800 mb-2">Supprimer ce message ?</h3>
          <p class="text-gray-500 text-sm mb-6">Cette action est irréversible.</p>
          <div class="flex gap-3 justify-center">
            <button @click="confirmDeleteId = null" class="px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50">Annuler</button>
            <button @click="confirmDelete" class="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Supprimer</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
