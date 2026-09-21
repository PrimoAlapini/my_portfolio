import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Utilitaire d'animation scroll réutilisable.
 * @param {Function} animationFn - Fonction recevant (gsap, ScrollTrigger) et définissant les animations.
 * @param {import('vue').Ref} [scopeRef] - Ref optionnel pour scoper les sélecteurs CSS au composant.
 */
export function useScrollAnimation(animationFn, scopeRef) {
  let ctx

  onMounted(() => {
    // Scope limité au composant si scopeRef fourni, sinon global
    const scope = scopeRef ? scopeRef.value : undefined
    ctx = gsap.context(() => {
      animationFn(gsap, ScrollTrigger)
    }, scope)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
