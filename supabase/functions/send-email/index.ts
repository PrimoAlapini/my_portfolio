import { SMTPClient } from 'https://deno.land/x/denomailer@1.4.0/mod.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import {
  escapeHtml,
  replyEmailTemplate,
  sanitizeReplyHtml,
} from '../_shared/email-template.ts'

const GMAIL_USER = Deno.env.get('GMAIL_USER')
const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Méthode non autorisée' }, 405)
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('GMAIL_USER ou GMAIL_APP_PASSWORD manquant')
    return jsonResponse({ error: 'Configuration email manquante' }, 500)
  }

  try {
    const body = await req.json()
    const mode = body.mode === 'reply' ? 'reply' : 'contact'

    if (mode === 'reply') {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        return jsonResponse({ error: 'Configuration Supabase manquante' }, 500)
      }

      const authorization = req.headers.get('Authorization')
      if (!authorization?.startsWith('Bearer ')) {
        return jsonResponse({ error: 'Authentification requise' }, 401)
      }

      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: authorization } },
      })
      const { error: userError } = await supabase.auth.getUser()
      if (userError) return jsonResponse({ error: 'Accès administrateur requis' }, 401)

      const to = typeof body.to === 'string' ? body.to.trim().toLowerCase() : ''
      const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
      const recipientName = typeof body.recipientName === 'string' ? body.recipientName.trim() : 'client'
      const replyHtml = typeof body.html === 'string' ? body.html.trim() : ''

      if (!to || !subject || !replyHtml || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
        return jsonResponse({ error: 'Données de réponse invalides' }, 400)
      }

      const client = new SMTPClient({
        connection: {
          hostname: 'smtp.gmail.com',
          port: 465,
          tls: true,
          auth: { username: GMAIL_USER, password: GMAIL_APP_PASSWORD },
        },
      })

      try {
        await client.send({
          from: GMAIL_USER,
          to,
          replyTo: GMAIL_USER,
          subject,
          html: replyEmailTemplate(sanitizeReplyHtml(replyHtml), recipientName),
        })
      } finally {
        await client.close()
      }

      return jsonResponse({ success: true })
    }

    const nom = typeof body.nom === 'string' ? body.nom.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const service = typeof body.service === 'string' ? body.service.trim() : ''
    const budget = typeof body.budget === 'string' ? body.budget.trim() : ''
    const pays = typeof body.pays === 'string' ? body.pays.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!nom || !email || !message) {
      return jsonResponse({ error: 'Champs requis manquants' }, 400)
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: 'Adresse email invalide' }, 400)
    }

    const details = [
      ['Nom', nom],
      ['Email', email],
      ['Téléphone', phone || 'Non renseigné'],
      ['Service', service || 'Non renseigné'],
      ['Budget', budget || 'Non renseigné'],
      ['Pays', pays || 'Non renseigné'],
    ]
      .map(([label, value]) => `<p><strong>${label} :</strong> ${escapeHtml(value)}</p>`)
      .join('')

    const client = new SMTPClient({
      connection: {
        hostname: 'smtp.gmail.com',
        port: 465,
        tls: true,
        auth: {
          username: GMAIL_USER,
          password: GMAIL_APP_PASSWORD,
        },
      },
    })

    try {
      await client.send({
        from: GMAIL_USER,
        to: GMAIL_USER,
        subject: `Nouveau message de ${nom}`,
        html: `
          <h2>Nouveau message depuis votre portfolio</h2>
          ${details}
          <h3>Message</h3>
          <p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
        `,
      })
    } finally {
      await client.close()
    }

    return jsonResponse({ success: true })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return jsonResponse({ error: 'Erreur lors de l’envoi du mail' }, 500)
  }
})
