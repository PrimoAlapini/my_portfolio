<script setup>
/**
 * ImageUpload.vue
 * Composant réutilisable : saisie URL manuelle OU upload vers bucket Supabase "images".
 * Émet update:modelValue avec l'URL publique finale.
 *
 * Usage :
 *   <ImageUpload v-model="form.image_url" label="Image du projet" />
 */
import { ref, watch } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label:      { type: String, default: 'Image' },
  bucket:     { type: String, default: 'images' },
})

const emit = defineEmits(['update:modelValue'])

// ── Mode actif : 'url' | 'upload' ────────────────────────────────────────────
const mode      = ref(props.modelValue?.startsWith('http') || props.modelValue === '' ? 'url' : 'url')
const urlInput  = ref(props.modelValue ?? '')
const uploading = ref(false)
const uploadErr = ref('')
const preview   = ref(props.modelValue ?? '')

// Sync preview si la valeur externe change
watch(() => props.modelValue, (v) => {
  urlInput.value = v ?? ''
  preview.value  = v ?? ''
})

// Quand l'URL est tapée manuellement
function onUrlInput() {
  preview.value = urlInput.value
  emit('update:modelValue', urlInput.value)
}

// Upload vers Supabase Storage
async function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return

  // Validation type + taille (max 5 Mo)
  if (!file.type.startsWith('image/')) {
    uploadErr.value = 'Fichier non supporté. Choisissez une image.'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    uploadErr.value = 'Fichier trop lourd (max 5 Mo).'
    return
  }

  uploading.value = true
  uploadErr.value = ''

  // Nom unique pour éviter les collisions
  const ext      = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error: upErr } = await supabase.storage
    .from(props.bucket)
    .upload(filename, file, { upsert: false })

  if (upErr) {
    uploadErr.value = `Erreur upload : ${upErr.message}`
    uploading.value = false
    return
  }

  const { data } = supabase.storage.from(props.bucket).getPublicUrl(filename)
  const publicUrl = data?.publicUrl ?? ''

  preview.value  = publicUrl
  urlInput.value = publicUrl
  emit('update:modelValue', publicUrl)
  uploading.value = false
}

function clearImage() {
  preview.value  = ''
  urlInput.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-xs font-medium text-gray-600">{{ label }}</label>

    <!-- Onglets mode -->
    <div class="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
      <button
        type="button"
        @click="mode = 'url'"
        :class="mode === 'url' ? 'bg-white shadow text-[#33663b]' : 'text-gray-400 hover:text-gray-600'"
        class="px-3 py-1 rounded-lg text-xs font-semibold transition"
      >
        🔗 URL
      </button>
      <button
        type="button"
        @click="mode = 'upload'"
        :class="mode === 'upload' ? 'bg-white shadow text-[#33663b]' : 'text-gray-400 hover:text-gray-600'"
        class="px-3 py-1 rounded-lg text-xs font-semibold transition"
      >
        ☁️ Uploader
      </button>
    </div>

    <!-- Mode URL -->
    <input
      v-if="mode === 'url'"
      v-model="urlInput"
      @input="onUrlInput"
      type="url"
      placeholder="https://..."
      class="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#33663b]/30"
    />

    <!-- Mode Upload -->
    <div v-else>
      <label
        class="flex flex-col items-center justify-center gap-2 w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#33663b] hover:bg-[#33663b]/5 transition"
        :class="{ 'opacity-60 pointer-events-none': uploading }"
      >
        <span v-if="uploading" class="w-5 h-5 border-2 border-[#33663b] border-t-transparent rounded-full animate-spin"></span>
        <template v-else>
          <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
          </svg>
          <span class="text-xs text-gray-400">Cliquez ou déposez une image (max 5 Mo)</span>
        </template>
        <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
      </label>
      <p v-if="uploadErr" class="text-red-500 text-xs mt-1">{{ uploadErr }}</p>
    </div>

    <!-- Aperçu -->
    <div v-if="preview" class="relative mt-1 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
      <img :src="preview" alt="Aperçu" class="w-full h-32 object-cover" />
      <button
        type="button"
        @click="clearImage"
        class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow hover:bg-red-600 transition"
        title="Supprimer"
      >×</button>
    </div>
  </div>
</template>
