<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useLanguagesStore } from '@/stores/languages'

const store = useLanguagesStore()

// ─── Modal ───────────────────────────────────────────────────────────────────
const showModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const confirmDeleteId = ref(null)

const emptyForm = () => ({
  name: '',
  percent: 80,
  icon_url: '',
  sort_order: 0,
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

function openEdit(l) {
  Object.assign(form, {
    name: l.name,
    percent: l.percent,
    icon_url: l.icon_url ?? '',
    sort_order: l.sort_order ?? 0,
    is_visible: l.is_visible,
  })
  editingId.value = l.id
  isEditing.value = true
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function save() {
  if (!form.name) return
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
      <h1 class="text-2xl font-bold text-gray-800">Langages & Technologies</h1>
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
            <th class="px-4 py-3 text-left">Langage</th>
            <th class="px-4 py-3 text-left hidden md:table-cell">Maîtrise</th>
            <th class="px-4 py-3 text-left hidden sm:table-cell">Ordre</th>
            <th class="px-4 py-3 text-left hidden lg:table-cell">Visible</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="store.languages.length === 0">
            <td colspan="5" class="text-center py-10 text-gray-400">Aucun langage</td>
          </tr>
          <tr v-for="l in store.languages" :key="l.id" class="hover:bg-gray-50 transition">
            <!-- Icône + nom -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img
                  v-if="l.icon_url"
                  :src="l.icon_url"
                  :alt="l.name"
                  class="w-8 h-8 object-contain rounded"
                />
                <div v-else class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">?</div>
                <span class="font-medium text-gray-800">{{ l.name }}</span>
              </div>
            </td>
            <!-- Barre de progression -->
            <td class="px-4 py-3 hidden md:table-cell">
              <div class="flex items-center gap-2">
                <div class="w-28 bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-[#33663b] h-2 rounded-full"
                    :style="{ width: l.percent + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-gray-500">{{ l.percent }}%</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-500 hidden sm:table-cell">{{ l.sort_order }}</td>
            <!-- Visibilité -->
            <td class="px-4 py-3 hidden lg:table-cell">
              <button
                @click="store.toggleVisibility(l.id, l.is_visible)"
                :class="l.is_visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                class="px-3 py-1 rounded-full text-xs font-semibold transition"
              >
                {{ l.is_visible ? 'Visible' : 'Masqué' }}
              </button>
            </td>
            <!-- Actions -->
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-2">
                <button @click="openEdit(l)" class="text-[#33663b] hover:underline text-xs font-medium">Modifier</button>
                <button @click="confirmDeleteId = l.id" class="text-red-500 hover:underline text-xs font-medium">Supprimer</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ── Modal Formulaire ── -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
          <h2 class="text-lg font-bold mb-5">{{ isEditing ? 'Modifier' : 'Ajouter' }} un langage</h2>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Nom *</label>
                <input v-model="form.name" type="text" placeholder="Vue.js" class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none" />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Maîtrise : {{ form.percent }}%</label>
                <input v-model.number="form.percent" type="range" min="0" max="100" step="5" class="mt-2 accent-[#33663b]" />
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-gray-600">URL Icône</label>
              <input v-model="form.icon_url" type="url" placeholder="/images/lang/vue.png ou https://..." class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Ordre d'affichage</label>
                <input v-model.number="form.sort_order" type="number" min="0" class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none" />
              </div>
              <div class="flex items-end gap-2 pb-1">
                <input id="vis-l" v-model="form.is_visible" type="checkbox" class="w-4 h-4 accent-[#33663b]" />
                <label for="vis-l" class="text-xs font-medium text-gray-600">Visible sur le portfolio</label>
              </div>
            </div>

            <!-- Aperçu icône -->
            <div v-if="form.icon_url" class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <img :src="form.icon_url" :alt="form.name" class="w-10 h-10 object-contain" />
              <span class="text-sm text-gray-600">{{ form.name || 'Aperçu' }}</span>
            </div>
          </div>

          <div class="flex gap-3 mt-6 justify-end">
            <button @click="closeModal" class="px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition">Annuler</button>
            <button
              @click="save"
              :disabled="saving || !form.name"
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
