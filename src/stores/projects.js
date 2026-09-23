import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ─── Lecture publique (is_visible = true) ───────────────────────────────────
  async function fetchVisible() {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
      .from('projects')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true })
    if (err) error.value = err.message
    else projects.value = data
    loading.value = false
  }

  // ─── Lecture admin (tous) ───────────────────────────────────────────────────
  async function fetchAll() {
    loading.value = true
    error.value = null
    const { data, error: err } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
    if (err) error.value = err.message
    else projects.value = data
    loading.value = false
  }

  // ─── Ajouter ────────────────────────────────────────────────────────────────
  async function add(payload) {
    const { data, error: err } = await supabase
      .from('projects')
      .insert([payload])
      .select()
      .single()
    if (err) { error.value = err.message; return null }
    projects.value.push(data)
    projects.value.sort((a, b) => a.sort_order - b.sort_order)
    return data
  }

  // ─── Modifier ───────────────────────────────────────────────────────────────
  async function update(id, payload) {
    const { data, error: err } = await supabase
      .from('projects')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (err) { error.value = err.message; return null }
    const idx = projects.value.findIndex(p => p.id === id)
    if (idx !== -1) projects.value[idx] = data
    return data
  }

  // ─── Réordonner ────────────────────────────────────────────────────────────
  async function reorder(orderedProjects) {
    const updates = orderedProjects.map((project, index) =>
      supabase
        .from('projects')
        .update({ sort_order: index })
        .eq('id', project.id)
    )
    const results = await Promise.all(updates)
    const failed = results.find(result => result.error)

    if (failed) {
      error.value = failed.error.message
      await fetchAll()
      return false
    }

    projects.value = orderedProjects.map((project, index) => ({
      ...project,
      sort_order: index,
    }))
    return true
  }

  // ─── Supprimer ──────────────────────────────────────────────────────────────
  async function remove(id) {
    const { error: err } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    if (err) { error.value = err.message; return false }
    projects.value = projects.value.filter(p => p.id !== id)
    return true
  }

  // ─── Basculer visibilité ────────────────────────────────────────────────────
  async function toggleVisibility(id, current) {
    return update(id, { is_visible: !current })
  }

  return { projects, loading, error, fetchVisible, fetchAll, add, update, reorder, remove, toggleVisibility }
})
