<script setup>
import { ref, nextTick, watch, onMounted, onUnmounted, computed } from 'vue'
import { useChatStore, QUICK_SUGGESTIONS } from '@/stores/chat'

const store = useChatStore()

const input      = ref('')
const messagesEl = ref(null)
const inputEl    = ref(null)

// ── Bouton scroll-to-bottom dans le chat ──────────────────────────────────────
const showScrollDown = ref(false)

function onMessagesScroll() {
  if (!messagesEl.value) return
  const { scrollTop, scrollHeight, clientHeight } = messagesEl.value
  // Afficher le bouton si l'utilisateur est à plus de 100px du bas
  showScrollDown.value = scrollHeight - scrollTop - clientHeight > 100
}

// ── Scroll automatique ────────────────────────────────────────────────────────
async function scrollToBottom(behavior = 'smooth') {
  await nextTick()
  messagesEl.value?.scrollTo({ top: messagesEl.value.scrollHeight, behavior })
}

// Scroll à chaque nouveau token streamé (seulement si déjà en bas)
watch(() => store.messages[store.messages.length - 1]?.content, () => {
  if (!showScrollDown.value) scrollToBottom()
})
// Scroll à chaque nouveau message
watch(() => store.messages.length, () => scrollToBottom())

// ── Focus + scroll à l'ouverture ──────────────────────────────────────────────
watch(() => store.isOpen, (open) => {
  if (open) {
    nextTick(() => {
      inputEl.value?.focus()
      scrollToBottom('instant')
    })
  }
})

// ── Détection fond vert — montée différée pour attendre le DOM des sections ──
// ChatWidget est monté dans App.vue avant que RouterView ne rende les sections.
// On utilise un MutationObserver pour démarrer l'IntersectionObserver dès que
// les sections apparaissent dans le DOM.
onMounted(() => {
  setTimeout(() => store.notifyWelcome(), 2000)

  let io = null
  const visibleGreenSections = new Set()

  function startObserver() {
    const sections = document.querySelectorAll('section')
    if (sections.length === 0) return false

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target
          const isGreen =
            (el.id && el.id === 'about') ||
            getComputedStyle(el).backgroundColor === 'rgb(51, 102, 59)'

          if (isGreen) {
            if (entry.isIntersecting) visibleGreenSections.add(el)
            else visibleGreenSections.delete(el)
          }
        })
        store.setGreenBg(visibleGreenSections.size > 0)
      },
      // Zone active = 25% basse de l'écran où vit le FAB
      { rootMargin: '-75% 0px 0px 0px', threshold: 0 }
    )

    sections.forEach((el) => io.observe(el))
    return true
  }

  // Essai immédiat (cas où les sections sont déjà là)
  if (!startObserver()) {
    // Sinon on attend que le DOM soit peuplé via MutationObserver
    const mo = new MutationObserver(() => {
      if (startObserver()) mo.disconnect()
    })
    mo.observe(document.body, { childList: true, subtree: true })
    onUnmounted(() => mo.disconnect())
  }

  onUnmounted(() => { if (io) io.disconnect() })
})

// ── Envoi ─────────────────────────────────────────────────────────────────────
function handleSubmit() {
  const text = input.value.trim()
  if (!text || store.isLoading) return
  input.value = ''
  store.sendMessage(text)
}

function handleSuggestion(s) {
  store.sendMessage(s)
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}

// ── Markdown minimal ──────────────────────────────────────────────────────────
function md(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    .replace(/`(.+?)`/g,       '<code class="ic">$1</code>')
    .replace(/\n/g,            '<br>')
}
</script>

<template>
  <!-- ── Conteneur fixe ────────────────────────────────────────────────────── -->
  <div class="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

    <!-- Bulle de ping (avant première ouverture) -->
    <transition name="bubble">
      <div
        v-if="!store.isOpen && !store.hasOpened"
        class="cursor-pointer mb-1"
        @click="store.openChat()"
      >
        <div class="relative w-4 h-4 flex items-center justify-center">
          <span class="absolute inset-0 rounded-full bg-[#F4B400]/50 animate-ping"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#F4B400] shadow"></span>
        </div>
      </div>
    </transition>

    <!-- ── FAB ───────────────────────────────────────────────────────────── -->
    <button
      @click="store.toggleChat()"
      class="chat-fab relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
      :class="store.isOpen
        ? 'bg-gray-600'
        : store.onGreenBg ? 'bg-white' : 'bg-[#33663b]'"
      aria-label="Chat"
    >
      <!-- Pulse ring -->
      <span
        v-if="!store.isOpen"
        class="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none"
        :class="store.onGreenBg ? 'bg-white' : 'bg-[#33663b]'"
      ></span>

      <!-- Badge non-lu -->
      <transition name="badge">
        <span
          v-if="!store.isOpen && store.unreadCount > 0"
          class="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10 border-2 border-white shadow-lg"
        >
          {{ store.unreadCount > 9 ? '9+' : store.unreadCount }}
        </span>
      </transition>

      <!-- Icône -->
      <transition name="icon-swap" mode="out-in">
        <!-- Fermer -->
        <svg v-if="store.isOpen" key="close" class="w-6 h-6 text-white" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>

        <!-- IA sparkle + message -->
        <svg v-else key="ai" viewBox="0 0 32 32" class="w-8 h-8" fill="none">
          <path d="M16 3C16 3 17.5 10 20 12C22.5 14 29 15.5 29 16C29 16 22.5 17.5 20 20C17.5 22 16 29 16 29C16 29 14.5 22 12 20C9.5 18 3 16.5 3 16C3 16 9.5 14.5 12 12C14.5 10 16 3 16 3Z"
            :fill="store.onGreenBg ? '#33663b' : 'white'" opacity="0.95"/>
          <path d="M25 5C25 5 25.6 7.8 26.8 8.6C28 9.4 31 9.8 31 10C31 10.2 28 10.6 26.8 11.4C25.6 12.2 25 15 25 15C25 15 24.4 12.2 23.2 11.4C22 10.6 19 10.2 19 10C19 9.8 22 9.4 23.2 8.6C24.4 7.8 25 5 25 5Z"
            fill="#F4B400" opacity="0.9"/>
          <rect x="11" y="13" width="10" height="7" rx="1.5"
            :fill="store.onGreenBg ? 'white' : '#33663b'" opacity="0.9"/>
          <path d="M13 19.5L11.5 22L14.5 19.5"
            :fill="store.onGreenBg ? 'white' : '#33663b'" opacity="0.9"/>
          <line x1="13" y1="15.5" x2="19" y2="15.5"
            :stroke="store.onGreenBg ? '#33663b' : 'white'"
            stroke-width="1" stroke-linecap="round" opacity="0.8"/>
          <line x1="13" y1="17.5" x2="17" y2="17.5"
            :stroke="store.onGreenBg ? '#33663b' : 'white'"
            stroke-width="1" stroke-linecap="round" opacity="0.8"/>
        </svg>
      </transition>
    </button>
  </div>

  <!-- ── Backdrop mobile (visible uniquement < lg) ────────────────────────── -->
  <transition name="backdrop">
    <div
      v-if="store.isOpen"
      class="fixed inset-0 bg-black/40 z-[9997] sm:hidden"
      @click="store.closeChat()"
    />
  </transition>

  <!-- ── Fenêtre chat ───────────────────────────────────────────────────────── -->
  <transition name="chat-window">
    <div
      v-if="store.isOpen"
      class="fixed bottom-24 right-6 z-[9998] w-[370px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
      style="height:540px; max-height:calc(100vh - 120px)"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-[#33663b] to-[#4a8f55] px-5 py-4 flex items-center gap-3 flex-shrink-0">
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-[#F4B400] flex items-center justify-center text-[#33663b] font-bold text-lg shadow-md overflow-hidden">
            <img src="/images/rzh-avatar-ro.png" alt="R" class="w-full h-full object-cover" onerror="this.style.display='none'"/>
            <span class="absolute">R</span>
          </div>
          <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-white font-semibold text-sm">The Rezah</p>
          <p class="text-white/70 text-xs">Assistant Portfolio · En ligne</p>
        </div>
        <!-- Reset -->
        <button @click="store.clearMessages()" class="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition" title="Nouvelle conversation">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
        <!-- Fermer -->
        <button @click="store.closeChat()" class="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>

      <!-- Messages -->
      <div
        ref="messagesEl"
        class="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative"
        @scroll="onMessagesScroll"
      >
        <!-- Suggestions rapides -->
        <div v-if="store.messages.length === 1" class="flex flex-wrap gap-2 mt-1">
          <button
            v-for="s in QUICK_SUGGESTIONS" :key="s"
            @click="handleSuggestion(s)"
            class="text-xs px-3 py-1.5 bg-[#33663b]/10 text-[#33663b] rounded-full border border-[#33663b]/20 hover:bg-[#33663b] hover:text-white transition font-medium"
          >{{ s }}</button>
        </div>

        <transition-group name="msg" tag="div" class="space-y-3">
          <div
            v-for="msg in store.messages" :key="msg.id"
            class="flex gap-2"
            :class="msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
          >
            <!-- Avatar assistant -->
            <div v-if="msg.role === 'assistant'"
              class="w-7 h-7 rounded-full bg-[#F4B400] flex items-center justify-center text-[#33663b] font-bold text-xs flex-shrink-0 mt-0.5 overflow-hidden shadow">
              <img src="/images/rzh-avatar-ro.png" alt="R" class="w-full h-full object-cover" onerror="this.style.display='none'"/>
            </div>

            <!-- Bulle message -->
            <div class="max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm"
              :class="{
                'bg-[#33663b] text-white rounded-tr-sm': msg.role === 'user',
                'bg-gray-100 text-gray-800 rounded-tl-sm': msg.role === 'assistant',
              }"
            >
              <span v-html="md(msg.content)" class="chat-content"></span>
              <span v-if="msg.streaming"
                class="inline-block w-2 h-4 bg-[#33663b] ml-0.5 rounded-sm animate-pulse align-middle">
              </span>
            </div>
          </div>
        </transition-group>

        <!-- Typing dots -->
        <transition name="msg">
          <div v-if="store.isLoading && !store.messages[store.messages.length - 1]?.streaming"
            class="flex gap-2 items-end">
            <div class="w-7 h-7 rounded-full bg-[#F4B400] flex items-center justify-center flex-shrink-0 overflow-hidden shadow">
              <img src="/images/rzh-avatar-ro.png" alt="R" class="w-full h-full object-cover" onerror="this.style.display='none'"/>
            </div>
            <div class="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center shadow-sm">
              <span class="w-2 h-2 bg-[#33663b]/60 rounded-full animate-bounce" style="animation-delay:0ms"></span>
              <span class="w-2 h-2 bg-[#33663b]/60 rounded-full animate-bounce" style="animation-delay:150ms"></span>
              <span class="w-2 h-2 bg-[#33663b]/60 rounded-full animate-bounce" style="animation-delay:300ms"></span>
            </div>
          </div>
        </transition>

        <!-- ── Bouton scroll-to-bottom ── -->
        <transition name="fade-up">
          <button
            v-if="showScrollDown"
            @click="scrollToBottom()"
            class="sticky bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-[#33663b] text-white text-xs font-semibold rounded-full shadow-lg hover:bg-[#29512e] transition z-10"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
            Retour en bas
          </button>
        </transition>
      </div>

      <!-- Zone saisie -->
      <div class="flex-shrink-0 border-t border-gray-100 px-3 py-3 bg-gray-50">
        <div class="flex items-end gap-2 bg-white rounded-2xl border border-gray-200 px-3 py-2 shadow-sm focus-within:border-[#33663b] focus-within:ring-1 focus-within:ring-[#33663b]/20 transition">
          <textarea
            ref="inputEl"
            v-model="input"
            @keydown="handleKeydown"
            :disabled="store.isLoading"
            placeholder="Posez votre question…"
            rows="1"
            class="flex-1 resize-none outline-none text-sm text-gray-800 bg-transparent placeholder-gray-400 leading-relaxed max-h-24 disabled:opacity-60"
            style="field-sizing:content; min-height:24px"
          ></textarea>
          <button @click="handleSubmit"
            :disabled="!input.trim() || store.isLoading"
            class="w-8 h-8 rounded-xl bg-[#33663b] flex items-center justify-center flex-shrink-0 hover:bg-[#29512e] transition disabled:opacity-40 disabled:cursor-not-allowed">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
            </svg>
          </button>
        </div>
        <p class="text-center text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
          <svg viewBox="0 0 12 12" class="w-2.5 h-2.5 text-[#33663b]" fill="currentColor">
            <path d="M6 0.5C6 0.5 6.6 3.5 7.8 4.5C9 5.5 12 6 12 6C12 6 9 6.5 7.8 7.5C6.6 8.5 6 11.5 6 11.5C6 11.5 5.4 8.5 4.2 7.5C3 6.5 0 6 0 6C0 6 3 5.5 4.2 4.5C5.4 3.5 6 0.5 6 0.5Z"/>
          </svg>
          Propulsé par <span class="font-bold text-[#33663b]">RZH</span>
        </p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.chat-window-enter-active { transition: opacity .25s ease, transform .3s cubic-bezier(.34,1.56,.64,1); }
.chat-window-leave-active { transition: opacity .2s ease, transform .2s ease; }
.chat-window-enter-from, .chat-window-leave-to { opacity:0; transform:translateY(16px) scale(.96); }

.bubble-enter-active { transition: opacity .4s ease 2s, transform .4s cubic-bezier(.34,1.56,.64,1) 2s; }
.bubble-leave-active { transition: opacity .15s ease; }
.bubble-enter-from, .bubble-leave-to { opacity:0; transform:translateY(6px) scale(.9); }

.badge-enter-active { transition: opacity .2s ease, transform .3s cubic-bezier(.34,1.8,.64,1); }
.badge-leave-active { transition: opacity .15s ease, transform .15s ease; }
.badge-enter-from, .badge-leave-to { opacity:0; transform:scale(0); }

.icon-swap-enter-active, .icon-swap-leave-active { transition: opacity .15s ease, transform .2s ease; }
.icon-swap-enter-from { opacity:0; transform:rotate(-90deg) scale(.6); }
.icon-swap-leave-to   { opacity:0; transform:rotate(90deg)  scale(.6); }

.msg-enter-active { transition: opacity .3s ease, transform .3s cubic-bezier(.34,1.2,.64,1); }
.msg-leave-active { transition: opacity .2s ease; }
.msg-enter-from   { opacity:0; transform:translateY(10px); }
.msg-leave-to     { opacity:0; }

.fade-up-enter-active { transition: opacity .2s ease, transform .25s cubic-bezier(.34,1.4,.64,1); }
.fade-up-leave-active { transition: opacity .15s ease, transform .15s ease; }
.fade-up-enter-from, .fade-up-leave-to { opacity:0; transform:translateX(-50%) translateY(8px); }

.backdrop-enter-active { transition: opacity .25s ease; }
.backdrop-leave-active { transition: opacity .2s ease; }
.backdrop-enter-from, .backdrop-leave-to { opacity: 0; }

.chat-fab { transition: transform .3s cubic-bezier(.34,1.56,.64,1), background-color .3s ease; }
.chat-fab:hover  { transform:scale(1.1); }
.chat-fab:active { transform:scale(.95); }

.chat-content :deep(strong) { font-weight:700; }
.chat-content :deep(em)     { font-style:italic; }
.chat-content :deep(.ic)    { background:rgba(0,0,0,.08); padding:1px 5px; border-radius:4px; font-family:monospace; font-size:.85em; }

.overflow-y-auto::-webkit-scrollbar       { width:4px; }
.overflow-y-auto::-webkit-scrollbar-track { background:transparent; }
.overflow-y-auto::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:99px; }
.overflow-y-auto::-webkit-scrollbar-thumb:hover { background:#9ca3af; }
</style>
