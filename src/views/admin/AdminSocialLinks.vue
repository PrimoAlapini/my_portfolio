<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useSocialLinksStore } from '@/stores/socialLinks'

const store = useSocialLinksStore()

// ─── Modal ────────────────────────────────────────────────────────────────────
const showModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const confirmDeleteId = ref(null)
const editingId = ref(null)

// Icônes Remix disponibles pour les réseaux courants
const availableIcons = [
  { label: 'Facebook',   value: 'ri-facebook-fill' },
  { label: 'Twitter/X',  value: 'ri-twitter-fill' },
  { label: 'Instagram',  value: 'ri-instagram-line' },
  { label: 'LinkedIn',   value: 'ri-linkedin-fill' },
  { label: 'Behance',    value: 'ri-behance-fill' },
  { label: 'Dribbble',   value: 'ri-dribbble-line' },
  { label: 'GitHub',     value: 'ri-github-fill' },
  { label: 'YouTube',    value: 'ri-youtube-fill' },
  { label: 'TikTok',     value: 'ri-tiktok-fill' },
  { label: 'WhatsApp',   value: 'ri-whatsapp-fill' },
  { label: 'Telegram',   value: 'ri-telegram-fill' },
  { label: 'Discord',    value: 'ri-discord-fill' },
]

const emptyForm = () => ({
  platform: '',
  icon_class: 'ri-facebook-fill',
  url: '',
  sort_order: 0,
  is_visible: true,
})

const form = reactive(emptyForm())

function openAdd() {
  Object.assign(form, emptyForm())
  editingId.value = null
  isEditing.value = false
  showModal.value = true
}

function openEdit(link) {
  Object.assign(form, {
    platform:   link.platform,
    icon_class: link.icon_class,
    url:        link.url ?? '',
    sort_order: link.sort_order ?? 0,
    is_visible: link.is_visible,
  })
  editingId.value = link.id
  isEditing.value = true
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function save() {
  if (!form.platform || !form.url) return
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
      <h1 class="text-2xl font-bold text-gray-800">Réseaux Sociaux</h1>
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

    <!-- Liste -->
    <div v-else class="flex flex-col gap-3">
      <div v-if="store.links.length === 0" class="text-center py-10 text-gray-400">
        Aucun réseau social configuré.
      </div>

      <div
        v-for="link in store.links"
        :key="link.id"
        class="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition"
      >
        <!-- Icône preview -->
        <div class="w-10 h-10 bg-[#F4B400] rounded-full flex items-center justify-center text-[#33663b] text-xl flex-shrink-0">
          <i :class="link.icon_class"></i>
        </div>

        <!-- Infos -->
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-gray-800">{{ link.platform }}</p>
          <a
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-blue-500 hover:underline truncate block max-w-xs"
          >
            {{ link.url || '—' }}
          </a>
        </div>

        <!-- Ordre -->
        <span class="text-xs text-gray-400 hidden sm:block">Ordre : {{ link.sort_order }}</span>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <button
            @click="store.toggleVisibility(link.id, link.is_visible)"
            :class="link.is_visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
            class="px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            {{ link.is_visible ? 'Visible' : 'Masqué' }}
          </button>
          <button @click="openEdit(link)" class="text-[#33663b] text-xs font-medium hover:underline">Modifier</button>
          <button @click="confirmDeleteId = link.id" class="text-red-500 text-xs font-medium hover:underline">Supprimer</button>
        </div>
      </div>
    </div>

    <!-- ── Modal Formulaire ── -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
        <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
          <h2 class="text-lg font-bold mb-5">
            {{ isEditing ? 'Modifier' : 'Ajouter' }} un réseau social
          </h2>

          <div class="space-y-4">
            <!-- Plateforme -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-gray-600">Nom de la plateforme *</label>
              <input
                v-model="form.platform"
                type="text"
                placeholder="Facebook"
                class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none"
              />
            </div>

            <!-- Icône -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-gray-600">Icône</label>
              <div class="flex items-center gap-3">
                <select
                  v-model="form.icon_class"
                  class="flex-1 rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none"
                >
                  <option v-for="icon in availableIcons" :key="icon.value" :value="icon.value">
                    {{ icon.label }}
                  </option>
                  <option value="">Autre (saisir manuellement)</option>
                </select>
                <!-- Preview -->
                <div class="w-10 h-10 bg-[#F4B400] rounded-full flex items-center justify-center text-[#33663b] text-xl flex-shrink-0">
                  <i :class="form.icon_class || 'ri-links-fill'"></i>
                </div>
              </div>
              <!-- Saisie manuelle si "Autre" -->
              <input
                v-if="!availableIcons.find(i => i.value === form.icon_class)"
                v-model="form.icon_class"
                type="text"
                placeholder="ri-github-fill"
                class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none mt-2"
              />
            </div>

            <!-- URL -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-gray-600">URL *</label>
              <input
                v-model="form.url"
                type="url"
                placeholder="https://facebook.com/monprofil"
                class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none"
              />
            </div>

            <!-- Ordre + Visibilité -->
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-600">Ordre d'affichage</label>
                <input
                  v-model.number="form.sort_order"
                  type="number"
                  min="0"
                  class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none"
                />
              </div>
              <div class="flex items-end gap-2 pb-1">
                <input id="vis-sl" v-model="form.is_visible" type="checkbox" class="w-4 h-4 accent-[#33663b]" />
                <label for="vis-sl" class="text-xs font-medium text-gray-600">Visible dans le footer</label>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-6 justify-end">
            <button
              @click="closeModal"
              class="px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              @click="save"
              :disabled="saving || !form.platform || !form.url"
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
            <button
              @click="confirmDeleteId = null"
              class="px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              @click="confirmDelete"
              class="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
            >
              Supprimer
            </button>
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
