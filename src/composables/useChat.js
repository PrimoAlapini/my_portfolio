import { ref, readonly } from 'vue'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const EDGE_URL = `${SUPABASE_URL}/functions/v1/chat-portfolio`

// Session stable pour toute la durée de vie de la page
const SESSION_ID = crypto.randomUUID()

// ── Messages de bienvenue ────────────────────────────────────────────────────
const WELCOME_MESSAGE = {
  role: 'assistant',
  content: 'Bonjour 👋 Je suis l\'assistant de **The Rezah**. Posez-moi vos questions sur son parcours, ses services, ses projets ou comment travailler avec lui !',
  id: 'welcome',
}

// ── Suggestions rapides ──────────────────────────────────────────────────────
export const QUICK_SUGGESTIONS = [
  'Quels sont tes services ?',
  'Parle-moi de ton parcours',
  'Combien coûte un site web ?',
  'Comment te contacter ?',
]

export function useChat() {
  const messages = ref([{ ...WELCOME_MESSAGE }])
  const isLoading = ref(false)
  const error = ref(null)
  const isRateLimited = ref(false)

  // ── Envoi d'un message ─────────────────────────────────────────────────────
  async function sendMessage(userText) {
    const text = userText?.trim()
    if (!text || isLoading.value) return

    error.value = null
    isRateLimited.value = false

    // Ajouter le message utilisateur
    const userMsg = { role: 'user', content: text, id: crypto.randomUUID() }
    messages.value.push(userMsg)
    isLoading.value = true

    // Placeholder assistant pour le streaming
    const assistantMsg = { role: 'assistant', content: '', id: crypto.randomUUID(), streaming: true }
    messages.value.push(assistantMsg)

    // Historique à envoyer (sans le placeholder actuel ni le welcome)
    const history = messages.value
      .filter((m) => m.id !== 'welcome' && m.id !== assistantMsg.id)
      .slice(-12) // max 12 messages d'historique
      .map(({ role, content }) => ({ role, content }))

    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          message: text,
          history,
          sessionId: SESSION_ID,
        }),
      })

      // ── Gestion des erreurs HTTP ───────────────────────────────────────────
      if (!res.ok) {
        if (res.status === 429) {
          isRateLimited.value = true
          assistantMsg.content = '⏳ Vous envoyez trop de messages. Patientez quelques secondes avant de réessayer.'
        } else {
          const errData = await res.json().catch(() => ({}))
          assistantMsg.content = errData.error ?? 'Une erreur est survenue. Réessayez ou contactez Rezah directement.'
        }
        assistantMsg.streaming = false
        isLoading.value = false
        return
      }

      // ── Lecture du stream SSE ─────────────────────────────────────────────
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        // Garder la dernière ligne potentiellement incomplète dans le buffer
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (raw === '[DONE]') continue
          try {
            const parsed = JSON.parse(raw)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) {
              assistantMsg.content += delta
            }
          } catch {
            // Ligne non-JSON, on ignore
          }
        }
      }

      // Traiter le buffer restant
      if (buffer.startsWith('data: ')) {
        const raw = buffer.slice(6).trim()
        if (raw && raw !== '[DONE]') {
          try {
            const parsed = JSON.parse(raw)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) assistantMsg.content += delta
          } catch { /* ignore */ }
        }
      }

      // Fallback si aucun contenu reçu
      if (!assistantMsg.content) {
        assistantMsg.content = 'Je n\'ai pas pu générer de réponse. Réessayez ou contactez Rezah directement à therezahdev@gmail.com.'
      }

    } catch (err) {
      console.error('[useChat] fetch error:', err)
      assistantMsg.content = 'Connexion impossible. Vérifiez votre réseau ou contactez Rezah directement.'
      error.value = err.message
    } finally {
      assistantMsg.streaming = false
      isLoading.value = false
    }
  }

  // ── Réinitialiser la conversation ──────────────────────────────────────────
  function clearMessages() {
    messages.value = [{ ...WELCOME_MESSAGE }]
    error.value = null
    isRateLimited.value = false
  }

  return {
    messages: readonly(messages),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isRateLimited: readonly(isRateLimited),
    sendMessage,
    clearMessages,
  }
}
