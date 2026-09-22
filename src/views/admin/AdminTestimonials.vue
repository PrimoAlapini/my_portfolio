<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useTestimonialsStore } from '@/stores/testimonials'
import ImageUpload from '@/components/ImageUpload.vue'

const store = useTestimonialsStore()

// ─── Modal ───────────────────────────────────────────────────────────────────
const showModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const confirmDeleteId = ref(null)

const emptyForm = () => ({
  name: '',
  role: '',
  avatar_url: '',
  content: '',
  rating: 5,
  is_visible: true,
})

const form = reactive(emptyForm())
const editingId = ref(null)

function openAdd() {
  Object.assign(form, emptyForm())
  editingId.value = null
  isEditing.value = false
  showModal.value = true
}

function openEdit(t) {
  Object.assign(form, {
    name: t.name,
    role: t.role,
    avatar_url: t.avatar_url ?? '',
    content: t.content,
    rating: t.rating,
    is_visible: t.is_visible,
  })
  editingId.value = t.id
  isEditing.value = true
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function save() {
  if (!form.name || !form.content) return
  saving.value = true
  if (isEditing.value) {
    await store.update(editingId.value, { ...form })
  } else {
    await store.add({ ...form })
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
      <h1 class="text-2xl font-bold text-gray-800">Témoignages</h1>
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

    <!-- Table -->
    <div v-else class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
          <tr>
            <th class="px-4 py-3 text-left">Nom</th>
            <th class="px-4 py-3 text-left hidden sm:table-cell">Rôle</th>
            <th class="px-4 py-3 text-left hidden md:table-cell">Note</th>
            <th class="px-4 py-3 text-left hidden lg:table-cell">Visible</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="store.testimonials.length === 0">
            <td colspan="5" class="text-center py-10 text-gray-400">Aucun témoignage</td>
          </tr>
          <tr v-for="t in store.testimonials" :key="t.id" class="hover:bg-gray-50 transition">
            <!-- Nom + avatar -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img
                  v-if="t.avatar_url"
                  :src="t.avatar_url"
                  class="w-8 h-8 rounded-full object-cover"
                  :alt="t.name"
                />
                <div v-else class="w-8 h-8 rounded-full bg-[#33663b] text-white flex items-center justify-center text-xs font-bold">
                  {{ t.name.charAt(0).toUpperCase() }}
                </div>
                <span class="font-medium text-gray-800">{{ t.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-500 hidden sm:table-cell">{{ t.role }}</td>
            <!-- Étoiles -->
            <td class="px-4 py-3 hidden md:table-cell">
              <span v-for="i in 5" :key="i" :class="i <= t.rating ? 'text-[#F4B400]' : 'text-gray-200'">★</span>
            </td>
            <!-- Visibilité -->
            <td class="px-4 py-3 hidden lg:table-cell">
              <button
                @click="store.toggleVisibility(t.id, t.is_visible)"
                :class="t.is_visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                class="px-3 py-1 rounded-full text-xs font-semibold transition"
              >
                {{ t.is_visible ? 'Visible' : 'Masqué' }}
              </button>
            </td>
            <!-- Actions -->
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-2">
                <button @click="openEdit(t)" class="text-[#33663b] hover:underline text-xs font-medium">Modifier</button>
                <button @click="confirmDeleteId = t.id" class="text-red-500 hover:underline text-xs font-medium">Supprimer</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ── Modal Formulaire ── -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
          <h2 class="text-lg font-bold mb-5">{{ isEditing ? 'Modifier' : 'Ajouter' }} un témoignage</h2>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Nom *</label>
                <input v-model="form.name" type="text" placeholder="Jean Dupont" class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none" />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Rôle / Entreprise</label>
                <input v-model="form.role" type="text" placeholder="CEO, Acme Corp" class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none" />
              </div>
            </div>

            <ImageUpload v-model="form.avatar_url" label="Avatar (optionnel)" />

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-gray-600">Témoignage *</label>
              <textarea v-model="form.content" rows="3" placeholder="Contenu du témoignage..." class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none resize-none"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Note (1-5)</label>
                <select v-model="form.rating" class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none">
                  <option v-for="n in 5" :key="n" :value="n">{{ n }} ★</option>
                </select>
              </div>
              <div class="flex items-end gap-2 pb-1">
                <input id="vis-t" v-model="form.is_visible" type="checkbox" class="w-4 h-4 accent-[#33663b]" />
                <label for="vis-t" class="text-xs font-medium text-gray-600">Visible sur le portfolio</label>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-6 justify-end">
            <button @click="closeModal" class="px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition">Annuler</button>
            <button
              @click="save"
              :disabled="saving || !form.name || !form.content"
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
