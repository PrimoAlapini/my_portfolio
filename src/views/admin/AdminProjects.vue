<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import ImageUpload from '@/components/ImageUpload.vue'

const store = useProjectsStore()

// ─── Modal ───────────────────────────────────────────────────────────────────
const showModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const confirmDeleteId = ref(null)
const tagInput = ref('')

const emptyForm = () => ({
  title: '',
  category: '',
  tags: [],
  image_url: '',
  link: '',
  sort_order: 0,
  is_visible: true,
})

const form = reactive(emptyForm())
const editingId = ref(null)

function openAdd() {
  Object.assign(form, emptyForm())
  form.tags = []
  tagInput.value = ''
  editingId.value = null
  isEditing.value = false
  showModal.value = true
}

function openEdit(p) {
  Object.assign(form, {
    title: p.title,
    category: p.category,
    tags: [...(p.tags ?? [])],
    image_url: p.image_url ?? '',
    link: p.link ?? '',
    sort_order: p.sort_order ?? 0,
    is_visible: p.is_visible,
  })
  tagInput.value = ''
  editingId.value = p.id
  isEditing.value = true
  showModal.value = true
}

function addTag() {
  const tag = tagInput.value.trim()
  if (tag && !form.tags.includes(tag)) form.tags.push(tag)
  tagInput.value = ''
}

function removeTag(tag) {
  form.tags = form.tags.filter(t => t !== tag)
}

function closeModal() {
  showModal.value = false
}

async function save() {
  if (!form.title) return
  saving.value = true
  const payload = { ...form }
  if (isEditing.value) {
    await store.update(editingId.value, payload)
  } else {
    await store.add(payload)
  }
  saving.value = false
  showModal.value = false
}

async function confirmDelete() {
  await store.remove(confirmDeleteId.value)
  confirmDeleteId.value = null
}

onMounted(() => store.fetchAll())
</script>

<template>
  <div>
    <!-- En-tête -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Projets</h1>
      <button
        @click="openAdd"
        class="bg-[#33663b] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#29512e] transition"
      >
        + Ajouter
      </button>
    </div>

    <!-- Chargement -->
    <div v-if="store.loading" class="flex justify-center py-16">
      <span class="w-8 h-8 border-4 border-[#33663b] border-t-transparent rounded-full animate-spin"></span>
    </div>

    <!-- Erreur -->
    <p v-else-if="store.error" class="text-red-500 text-center py-8">{{ store.error }}</p>

    <!-- Grille projets -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <div v-if="store.projects.length === 0" class="col-span-3 text-center py-10 text-gray-400">Aucun projet</div>

      <div
        v-for="p in store.projects"
        :key="p.id"
        class="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
      >
        <!-- Image -->
        <div class="w-full h-36 bg-gray-100 overflow-hidden">
          <img
            v-if="p.image_url"
            :src="p.image_url"
            :alt="p.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-4xl">🖼️</div>
        </div>

        <div class="p-4">
          <!-- Tags -->
          <div class="flex flex-wrap gap-1 mb-2">
            <span
              v-for="tag in (p.tags ?? [])"
              :key="tag"
              class="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold"
            >{{ tag }}</span>
          </div>

          <p class="text-xs text-gray-400">{{ p.category }}</p>
          <h3 class="font-semibold text-gray-800 mt-0.5">{{ p.title }}</h3>

          <!-- Actions -->
          <div class="flex items-center justify-between mt-3">
            <button
              @click="store.toggleVisibility(p.id, p.is_visible)"
              :class="p.is_visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
              class="px-3 py-1 rounded-full text-xs font-semibold transition"
            >
              {{ p.is_visible ? 'Visible' : 'Masqué' }}
            </button>
            <div class="flex gap-3">
              <button @click="openEdit(p)" class="text-[#33663b] text-xs font-medium hover:underline">Modifier</button>
              <button @click="confirmDeleteId = p.id" class="text-red-500 text-xs font-medium hover:underline">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Modal Formulaire ── -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
          <h2 class="text-lg font-bold mb-5">{{ isEditing ? 'Modifier' : 'Ajouter' }} un projet</h2>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Titre *</label>
                <input v-model="form.title" type="text" placeholder="Hub Liquors" class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none" />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Catégorie</label>
                <input v-model="form.category" type="text" placeholder="Application Web" class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none" />
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-gray-600">Tags</label>
              <div class="flex gap-2">
                <input
                  v-model="tagInput"
                  @keydown.enter.prevent="addTag"
                  type="text"
                  placeholder="Vue.js — Entrée pour ajouter"
                  class="flex-1 rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none"
                />
                <button @click="addTag" type="button" class="px-3 py-2 bg-[#33663b] text-white rounded-xl text-sm">+</button>
              </div>
              <div class="flex flex-wrap gap-2 mt-1">
                <span
                  v-for="tag in form.tags"
                  :key="tag"
                  class="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold"
                >
                  {{ tag }}
                  <button @click="removeTag(tag)" class="ml-1 text-yellow-600 hover:text-red-500">×</button>
                </span>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <ImageUpload v-model="form.image_url" label="Image du projet" />
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-gray-600">Lien du projet</label>
              <input v-model="form.link" type="url" placeholder="https://..." class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Ordre d'affichage</label>
                <input v-model.number="form.sort_order" type="number" min="0" class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none" />
              </div>
              <div class="flex items-end gap-2 pb-1">
                <input id="vis-p" v-model="form.is_visible" type="checkbox" class="w-4 h-4 accent-[#33663b]" />
                <label for="vis-p" class="text-xs font-medium text-gray-600">Visible sur le portfolio</label>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-6 justify-end">
            <button @click="closeModal" class="px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition">Annuler</button>
            <button
              @click="save"
              :disabled="saving || !form.title"
              class="px-5 py-2 rounded-full bg-[#33663b] text-white text-sm font-semibold hover:bg-[#29512e] transition disabled:opacity-60"
            >
              <span v-if="saving">Enregistrement...</span>
              <span v-else>{{ isEditing ? 'Mettre à jour' : 'Ajouter' }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ── Confirmation suppression ── -->
    <transition name="fade">
      <div v-if="confirmDeleteId" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center">
          <p class="text-2xl mb-3">🗑️</p>
          <h3 class="font-bold text-gray-800 mb-2">Confirmer la suppression</h3>
          <p class="text-gray-500 text-sm mb-6">Cette action est irréversible.</p>
          <div class="flex gap-3 justify-center">
            <button @click="confirmDeleteId = null" class="px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50">Annuler</button>
            <button @click="confirmDelete" class="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Supprimer</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
