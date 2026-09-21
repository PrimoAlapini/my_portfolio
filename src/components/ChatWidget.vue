<script setup>
import { ref, nextTick, watch, onMounted } from 'vue'
import { useChat, QUICK_SUGGESTIONS } from '@/composables/useChat'

const { messages, isLoading, sendMessage, clearMessages } = useChat()

const isOpen = ref(false)
const input = ref('')
const messagesEl = ref(null)
const inputEl = ref(null)
const hasOpened = ref(false)

// ── Scroll automatique vers le bas ────────────────────────────────────────────
async function scrollToBottom(behavior = 'smooth') {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTo({ top: messagesEl.value.scrollHeight, behavior })
  }
}

watch(() => messages.value.length, () => scrollToBottom())
watch(
  () => messages.value[messages.value.length - 1]?.content,
  () => scrollToBottom()
)

// ── Ouvrir/fermer ─────────────────────────────────────────────────────────────
function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    hasOpened.value = true
    nextTick(() => {
      inputEl.value?.focus()
      scrollToBottom('instant')
    })
  }
}

// ── Envoi ─────────────────────────────────────────────────────────────────────
function handleSubmit() {
  const text = input.value.trim()
  if (!text || isLoading.value) return
  input.value = ''
  sendMessage(text)
}

function handleSuggestion(text) {
  sendMessage(text)
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}

// ── Markdown minimal (gras + sauts de ligne) ─────────────────────────────────
function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="inline-code">$1</code>')
    .replace(/\n/g, '<br>')
}
</script>

<template>
  <!-- ── Bouton flottant ───────────────────────────────────────────────────── -->
  <div class="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

    <!-- Bulle d'accroche (visible avant première ouverture) -->
    <transition name="bubble">
      <div
        v-if="!isOpen && !hasOpened"
        class="bg-white rounded-2xl rounded-br-sm shadow-xl px-4 py-3 max-w-[200px] text-sm text-gray-700 border border-gray-100 cursor-pointer"
        @click="toggleChat"
      >
        <span class="text-[#33663b] font-semibold">The Rezah</span> peut répondre à vos questions 💬
        <div class="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
      </div>
    </transition>

    <!-- Bouton principal -->
    <button
      @click="toggleChat"
      class="chat-fab w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden"
      :class="isOpen ? 'bg-gray-700 rotate-0' : 'bg-[#33663b]'"
      aria-label="Ouvrir le chat"
    >
      <!-- Pulse ring quand fermé -->
      <span v-if="!isOpen" class="absolute inset-0 rounded-full bg-[#33663b] animate-ping opacity-30"></span>

      <transition name="icon-swap" mode="out-in">
        <svg v-if="isOpen" key="close" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else key="chat" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </transition>
    </button>
  </div>

  <!-- ── Fenêtre de chat ───────────────────────────────────────────────────── -->
  <transition name="chat-window">
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-6 z-[9998] w-[370px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
      style="height: 540px; max-height: calc(100vh - 120px)"
    >

      <!-- ── Header ───────────────────────────────────────────────────────── -->
      <div class="bg-gradient-to-r from-[#33663b] to-[#4a8f55] px-5 py-4 flex items-center gap-3 flex-shrink-0">
        <!-- Avatar -->
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-[#F4B400] flex items-center justify-center text-[#33663b] font-bold text-lg shadow-md overflow-hidden">
            <img src="/images/rzh-avatar-ro.png" alt="Rezah" class="w-full h-full object-cover" onerror="this.style.display='none'" />
            <span class="absolute">R</span>
          </div>
          <!-- Indicateur en ligne -->
          <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-white font-semibold text-sm leading-tight">The Rezah</p>
          <p class="text-white/70 text-xs">Assistant Portfolio · En ligne</p>
        </div>

        <!-- Bouton reset -->
        <button
          @click="clearMessages"
          class="text-white/60 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
          title="Nouvelle conversation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <!-- Fermer -->
        <button
          @click="toggleChat"
          class="text-white/60 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <!-- ── Zone messages ─────────────────────────────────────────────────── -->
      <div
        ref="messagesEl"
        class="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
        style="scroll-behavior: smooth"
      >

        <!-- Suggestions rapides (affichées uniquement au début) -->
        <div v-if="messages.length === 1" class="flex flex-wrap gap-2 mt-1">
          <button
            v-for="s in QUICK_SUGGESTIONS"
            :key="s"
            @click="handleSuggestion(s)"
            class="text-xs px-3 py-1.5 bg-[#33663b]/10 text-[#33663b] rounded-full border border-[#33663b]/20 hover:bg-[#33663b] hover:text-white transition font-medium"
          >
            {{ s }}
          </button>
        </div>

        <!-- Messages -->
        <transition-group name="msg" tag="div" class="space-y-3">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex gap-2"
            :class="msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
          >
            <!-- Avatar assistant -->
            <div
              v-if="msg.role === 'assistant'"
              class="w-7 h-7 rounded-full bg-[#F4B400] flex items-center justify-center text-[#33663b] font-bold text-xs flex-shrink-0 mt-0.5 overflow-hidden shadow"
            >
              <img src="/images/rzh-avatar-ro.png" alt="R" class="w-full h-full object-cover" onerror="this.style.display='none'" />
            </div>

            <!-- Bulle -->
            <div
              class="max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm"
              :class="{
                'bg-[#33663b] text-white rounded-tr-sm': msg.role === 'user',
                'bg-gray-100 text-gray-800 rounded-tl-sm': msg.role === 'assistant',
              }"
            >
              <!-- Contenu avec rendu markdown minimal -->
              <span
                v-html="renderMarkdown(msg.content)"
                class="chat-content"
              ></span>

              <!-- Curseur de streaming -->
              <span
                v-if="msg.streaming"
                class="inline-block w-2 h-4 bg-[#33663b] ml-0.5 rounded-sm animate-pulse align-middle"
              ></span>
            </div>
          </div>
        </transition-group>

        <!-- Indicateur de frappe -->
        <transition name="msg">
          <div v-if="isLoading && !messages[messages.length - 1]?.streaming" class="flex gap-2 items-end">
            <div class="w-7 h-7 rounded-full bg-[#F4B400] flex items-center justify-center text-[#33663b] font-bold text-xs flex-shrink-0 overflow-hidden shadow">
              <img src="/images/rzh-avatar-ro.png" alt="R" class="w-full h-full object-cover" onerror="this.style.display='none'" />
            </div>
            <div class="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center shadow-sm">
              <span class="w-2 h-2 bg-[#33663b]/60 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2 h-2 bg-[#33663b]/60 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 bg-[#33663b]/60 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </transition>
      </div>

      <!-- ── Zone de saisie ────────────────────────────────────────────────── -->
      <div class="flex-shrink-0 border-t border-gray-100 px-3 py-3 bg-gray-50">
        <div class="flex items-end gap-2 bg-white rounded-2xl border border-gray-200 px-3 py-2 shadow-sm focus-within:border-[#33663b] focus-within:ring-1 focus-within:ring-[#33663b]/20 transition">
          <textarea
            ref="inputEl"
            v-model="input"
            @keydown="handleKeydown"
            :disabled="isLoading"
            placeholder="Posez votre question…"
            rows="1"
            class="flex-1 resize-none outline-none text-sm text-gray-800 bg-transparent placeholder-gray-400 leading-relaxed max-h-24 disabled:opacity-60"
            style="field-sizing: content; min-height: 24px"
          ></textarea>

          <button
            @click="handleSubmit"
            :disabled="!input.trim() || isLoading"
            class="w-8 h-8 rounded-xl bg-[#33663b] flex items-center justify-center flex-shrink-0 transition hover:bg-[#29512e] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>

        <p class="text-center text-[10px] text-gray-400 mt-2">
          Propulsé par <span class="font-semibold text-[#33663b]">Grok AI</span> · Portfolio de Rezah
        </p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* ── Transitions fenêtre chat ────────────────────────────────────────────── */
.chat-window-enter-active {
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.chat-window-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.chat-window-enter-from,
.chat-window-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}

/* ── Transition bulle d'accroche ─────────────────────────────────────────── */
.bubble-enter-active {
  transition: opacity 0.4s ease 1.2s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s;
}
.bubble-leave-active {
  transition: opacity 0.15s ease;
}
.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}

/* ── Transition icône bouton ─────────────────────────────────────────────── */
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-swap-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.7); }
.icon-swap-leave-to   { opacity: 0; transform: rotate(90deg) scale(0.7); }

/* ── Transition messages ─────────────────────────────────────────────────── */
.msg-enter-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.msg-leave-active {
  transition: opacity 0.2s ease;
}
.msg-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.msg-leave-to {
  opacity: 0;
}

/* ── FAB ─────────────────────────────────────────────────────────────────── */
.chat-fab {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease;
}
.chat-fab:hover {
  transform: scale(1.1);
}
.chat-fab:active {
  transform: scale(0.95);
}

/* ── Contenu markdown ────────────────────────────────────────────────────── */
.chat-content :deep(strong) {
  font-weight: 700;
}
.chat-content :deep(em) {
  font-style: italic;
}
.chat-content :deep(.inline-code) {
  background: rgba(0, 0, 0, 0.08);
  padding: 1px 5px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85em;
}

/* ── Scrollbar custom ────────────────────────────────────────────────────── */
div[ref="messagesEl"]::-webkit-scrollbar,
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 99px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
