/**
 * useSeo.js
 * Composable pour mettre à jour dynamiquement les meta SEO par page.
 *
 * Usage :
 *   useSeo({
 *     title: 'Services — The Rezah',
 *     description: 'Découvrez tous les services proposés par The Rezah...',
 *     url: 'https://therezah.dev/services',
 *   })
 */

const BASE_TITLE       = 'The Rezah — Développeur Full-Stack | Cotonou, Bénin'
const BASE_DESCRIPTION = "Primous Alapini (The Rezah) est un développeur web et mobile full-stack basé à Cotonou, Bénin. Spécialisé en Vue.js, React, Flutter, Laravel, Node.js."
const BASE_URL         = 'https://therezah.dev'
const BASE_IMAGE       = 'https://therezah.dev/images/rzh-profil.png'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSeo({ title, description, url, image } = {}) {
  const finalTitle       = title       ? `${title} | The Rezah` : BASE_TITLE
  const finalDescription = description ?? BASE_DESCRIPTION
  const finalUrl         = url         ? `${BASE_URL}${url}` : BASE_URL
  const finalImage       = image       ?? BASE_IMAGE

  // ── <title> ────────────────────────────────────────────────────────────────
  document.title = finalTitle

  // ── Meta de base ───────────────────────────────────────────────────────────
  setMeta('description', finalDescription)

  // ── Canonical ──────────────────────────────────────────────────────────────
  setLink('canonical', finalUrl)

  // ── Open Graph ─────────────────────────────────────────────────────────────
  setMeta('og:title',       finalTitle,       'property')
  setMeta('og:description', finalDescription, 'property')
  setMeta('og:url',         finalUrl,         'property')
  setMeta('og:image',       finalImage,       'property')

  // ── Twitter Card ───────────────────────────────────────────────────────────
  setMeta('twitter:title',       finalTitle)
  setMeta('twitter:description', finalDescription)
  setMeta('twitter:url',         finalUrl)
  setMeta('twitter:image',       finalImage)
}
