import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useLanguagesStore = defineStore('languages', () => {
  const languages = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ─── Lecture publique (is_visible = true) ───────────────────────────────────
  async function fetchVisible() {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
      .from('languages')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true })
    if (err) error.value = err.message
    else languages.value = data
    loading.value = false
  }

  // ─── Lecture admin (tous) ───────────────────────────────────────────────────
  async function fetchAll() {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
      .from('languages')
      .select('*')
      .order('sort_order', { ascending: true })
    if (err) error.value = err.message
    else languages.value = data
    loading.value = false
  }

  // ─── Ajouter ────────────────────────────────────────────────────────────────
  async function add(payload) {
    const { data, error: err } = await supabase
      .from('languages')
      .insert([payload])
      .select()
      .single()
    if (err) { error.value = err.message; return null }
    languages.value.push(data)
    languages.value.sort((a, b) => a.sort_order - b.sort_order)
    return data
  }

  // ─── Modifier ───────────────────────────────────────────────────────────────
  async function update(id, payload) {
    const { data, error: err } = await supabase
      .from('languages')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (err) { error.value = err.message; return null }
    const idx = languages.value.findIndex(l => l.id === id)
    if (idx !== -1) languages.value[idx] = data
    return data
  }

  // ─── Supprimer ──────────────────────────────────────────────────────────────
  async function remove(id) {
    const { error: err } = await supabase
      .from('languages')
      .delete()
      .eq('id', id)
    if (err) { error.value = err.message; return false }
    languages.value = languages.value.filter(l => l.id !== id)
    return true
  }

  // ─── Basculer visibilité ────────────────────────────────────────────────────
  async function toggleVisibility(id, current) {
    return update(id, { is_visible: !current })
  }

  return { languages, loading, error, fetchVisible, fetchAll, add, update, remove, toggleVisibility }
})
