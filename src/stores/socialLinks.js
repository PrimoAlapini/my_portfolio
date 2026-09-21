import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useSocialLinksStore = defineStore('socialLinks', () => {
  const links = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ─── Lecture publique (is_visible = true) ───────────────────────────────────
  async function fetchVisible() {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
      .from('social_links')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true })
    if (err) error.value = err.message
    else links.value = data
    loading.value = false
  }

  // ─── Lecture admin (tous) ───────────────────────────────────────────────────
  async function fetchAll() {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
      .from('social_links')
      .select('*')
      .order('sort_order', { ascending: true })
    if (err) error.value = err.message
    else links.value = data
    loading.value = false
  }

  // ─── Ajouter ────────────────────────────────────────────────────────────────
  async function add(payload) {
    const { data, error: err } = await supabase
      .from('social_links')
      .insert([payload])
      .select()
      .single()
    if (err) { error.value = err.message; return null }
    links.value.push(data)
    links.value.sort((a, b) => a.sort_order - b.sort_order)
    return data
  }

  // ─── Modifier ───────────────────────────────────────────────────────────────
  async function update(id, payload) {
    const { data, error: err } = await supabase
      .from('social_links')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (err) { error.value = err.message; return null }
    const idx = links.value.findIndex(l => l.id === id)
    if (idx !== -1) links.value[idx] = data
    return data
  }

  // ─── Supprimer ──────────────────────────────────────────────────────────────
  async function remove(id) {
    const { error: err } = await supabase
      .from('social_links')
      .delete()
      .eq('id', id)
    if (err) { error.value = err.message; return false }
    links.value = links.value.filter(l => l.id !== id)
    return true
  }

  // ─── Basculer visibilité ────────────────────────────────────────────────────
  async function toggleVisibility(id, current) {
    return update(id, { is_visible: !current })
  }

  return { links, loading, error, fetchVisible, fetchAll, add, update, remove, toggleVisibility }
})
