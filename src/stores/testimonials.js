import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useTestimonialsStore = defineStore('testimonials', () => {
  const testimonials = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ─── Lecture publique (is_visible = true) ───────────────────────────────────
  async function fetchVisible() {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false })
    if (err) error.value = err.message
    else testimonials.value = data
    loading.value = false
  }

  // ─── Lecture admin (toutes les entrées) ─────────────────────────────────────
  async function fetchAll() {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) error.value = err.message
    else testimonials.value = data
    loading.value = false
  }

  // ─── Ajouter ────────────────────────────────────────────────────────────────
  async function add(payload) {
    const { data, error: err } = await supabase
      .from('testimonials')
      .insert([payload])
      .select()
      .single()
    if (err) { error.value = err.message; return null }
    testimonials.value.unshift(data)
    return data
  }

  // ─── Modifier ───────────────────────────────────────────────────────────────
  async function update(id, payload) {
    const { data, error: err } = await supabase
      .from('testimonials')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (err) { error.value = err.message; return null }
    const idx = testimonials.value.findIndex(t => t.id === id)
    if (idx !== -1) testimonials.value[idx] = data
    return data
  }

  // ─── Supprimer ──────────────────────────────────────────────────────────────
  async function remove(id) {
    const { error: err } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
    if (err) { error.value = err.message; return false }
    testimonials.value = testimonials.value.filter(t => t.id !== id)
    return true
  }

  // ─── Basculer visibilité ────────────────────────────────────────────────────
  async function toggleVisibility(id, current) {
    return update(id, { is_visible: !current })
  }

  return { testimonials, loading, error, fetchVisible, fetchAll, add, update, remove, toggleVisibility }
})
