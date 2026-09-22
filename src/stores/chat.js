/**
 * Store Pinia — Chat IA portfolio
 *
 * Singleton global : tout l'état (messages, badge, isOpen, onGreenBg)
 * vit ici. Le badge se déclenche directement dans sendMessage()
 * sans passer par un watch externe fragile.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const EDGE_URL          = `${SUPABASE_URL}/functions/v1/chat-portfolio`

const SESSION_ID = crypto.randomUUID()

export const QUICK_SUGGESTIONS = [
  'Quels sont tes services ?',
  'Parle-moi de ton parcours',
  'Combien coûte un site web ?',
  'Comment te contacter ?',
]

const makeWelcome = () => ({
  role: 'assistant',
  content: "Bonjour 👋 Je suis l'assistant de **The Rezah**. Posez-moi vos questions sur son parcours, ses services, ses projets ou comment travailler avec lui !",
  id: 'welcome',
  streaming: false,
})

export const useChatStore = defineStore('chat', () => {
  // ── État ─────────────────────────────────────────────────────────────────
  const messages    = ref([makeWelcome()])
  const isLoading   = ref(false)
  const isOpen      = ref(false)
  const hasOpened   = ref(false)
  const unreadCount = ref(0)
  const onGreenBg   = ref(false)

  // ── UI ────────────────────────────────────────────────────────────────────
  function openChat() {
    isOpen.value      = true
    hasOpened.value   = true
    unreadCount.value = 0      // reset badge à l'ouverture
  }

  function closeChat() {
    isOpen.value = false
  }

  function toggleChat() {
    isOpen.value ? closeChat() : openChat()
  }

  function setGreenBg(val) {
    onGreenBg.value = !!val
  }

  /** Appelé par App.vue après le timeout de bienvenue (2s) */
  function notifyWelcome() {
    if (!isOpen.value) unreadCount.value = 1
  }

  function clearMessages() {
    messages.value  = [makeWelcome()]
    isLoading.value = false
  }

  // ── Envoi + streaming ─────────────────────────────────────────────────────
  async function sendMessage(userText) {
    const text = userText?.trim()
    if (!text || isLoading.value) return

    // Message utilisateur
    messages.value.push({
      role: 'user',
      content: text,
      id: crypto.randomUUID(),
      streaming: false,
    })

    isLoading.value = true

    // Placeholder assistant (sera muté directement ici — même référence garantie)
    const assistantMsg = {
      role: 'assistant',
      content: '',
      id: crypto.randomUUID(),
      streaming: true,
    }
    messages.value.push(assistantMsg)

    // Historique (sans welcome, sans placeholder en cours)
    const history = messages.value
      .filter((m) => m.id !== 'welcome' && m.id !== assistantMsg.id)
      .slice(-12)
      .map(({ role, content }) => ({ role, content }))

    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ message: text, history, sessionId: SESSION_ID }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        assistantMsg.content = res.status === 429
          ? '⏳ Trop de messages. Patientez quelques secondes.'
          : (errData.error ?? 'Une erreur est survenue. Contactez Rezah directement.')
      } else {
        // Si la Edge Function a dû retenter, afficher "En réflexion..." le temps
        // que les chunks arrivent (le stream est déjà en mémoire côté serveur,
        // il arrive d'un coup — le label reste visible ~100ms mais c'est suffisant)
        if (res.headers.get('X-Retry') === 'true') {
          assistantMsg.content = '🔄 En réflexion...'
          assistantMsg.retrying = true
        }

        // Lecture SSE
        const reader  = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer    = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const raw = line.slice(6).trim()
            if (raw === '[DONE]') continue
            try {
              const delta = JSON.parse(raw)?.choices?.[0]?.delta?.content
              if (delta) {
                // Premier vrai token après un retry : effacer "En réflexion..."
                if (assistantMsg.retrying) {
                  assistantMsg.content = ''
                  assistantMsg.retrying = false
                }
                assistantMsg.content += delta
              }
            } catch { /* ignore */ }
          }
        }

        if (!assistantMsg.content || assistantMsg.content === '🔄 En réflexion...') {
          assistantMsg.content = "Je n'ai pas pu générer de réponse. Contactez Rezah à therezahdev@gmail.com."
        }
      }
    } catch (err) {
      console.error('[chat store]', err)
      assistantMsg.content = 'Connexion impossible. Vérifiez votre réseau ou contactez Rezah directement.'
    } finally {
      // ← C'est ici que le badge s'incrémente — même référence, même endroit, garanti
      assistantMsg.streaming = false
      isLoading.value        = false
      if (!isOpen.value) {
        unreadCount.value++
      }
    }
  }

  return {
    messages, isLoading, isOpen, hasOpened, unreadCount, onGreenBg,
    openChat, closeChat, toggleChat, setGreenBg,
    notifyWelcome, clearMessages, sendMessage,
  }
})
