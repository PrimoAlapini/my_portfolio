<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

// ── Props & Emits ─────────────────────────────────────────────────────────────
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Rédigez votre message…',
  },
  toolbar: {
    type: Array,
    default: () => [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'blockquote'],
      [{ color: [] }],
      ['clean'],
    ],
  },
  minHeight: {
    type: String,
    default: '140px',
  },
  maxHeight: {
    type: String,
    default: '260px',
  },
})

const emit = defineEmits(['update:modelValue', 'text-change'])

// ── Refs ──────────────────────────────────────────────────────────────────────
const editorEl = ref(null)
let   quill    = null

// ── Init ──────────────────────────────────────────────────────────────────────
onMounted(() => {
  quill = new Quill(editorEl.value, {
    theme: 'snow',
    placeholder: props.placeholder,
    modules: { toolbar: props.toolbar },
  })

  // Sync initial value
  if (props.modelValue) {
    quill.root.innerHTML = props.modelValue
  }

  // Émet à chaque changement
  quill.on('text-change', () => {
    const html = quill.root.innerHTML
    const isEmpty = quill.getText().trim().length === 0
    emit('update:modelValue', isEmpty ? '' : html)
    emit('text-change', {
      html:  isEmpty ? '' : html,
      text:  quill.getText(),
      delta: quill.getContents(),
    })
  })
})

// Sync prop → éditeur (ex: reset externe)
watch(() => props.modelValue, (val) => {
  if (!quill) return
  const current = quill.root.innerHTML
  // Éviter la boucle infinie
  if (val === '' && quill.getText().trim() !== '') {
    quill.setContents([])
  } else if (val !== current) {
    quill.root.innerHTML = val ?? ''
  }
})

onUnmounted(() => {
  quill = null
})

// ── Exposer getText() et getHTML() pour usage depuis le parent ────────────────
defineExpose({
  getText: () => quill?.getText() ?? '',
  getHTML: () => quill?.root.innerHTML ?? '',
  clear:   () => quill?.setContents([]),
  focus:   () => quill?.focus(),
})
</script>

<template>
  <div class="quill-wrapper rounded-xl overflow-hidden border border-gray-200 focus-within:border-[#33663b] focus-within:ring-1 focus-within:ring-[#33663b]/20 transition">
    <div
      ref="editorEl"
      :style="{ minHeight, maxHeight, overflowY: 'auto' }"
    ></div>
  </div>
</template>

<style scoped>
/* ── Toolbar ──────────────────────────────────────────────────────────────── */
.quill-wrapper :deep(.ql-toolbar) {
  border: none;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  padding: 6px 8px;
}

/* ── Container ────────────────────────────────────────────────────────────── */
.quill-wrapper :deep(.ql-container) {
  border: none;
  font-size: 14px;
  font-family: inherit;
}

/* ── Éditeur ──────────────────────────────────────────────────────────────── */
.quill-wrapper :deep(.ql-editor) {
  padding: 10px 14px;
  color: #1f2937;
  line-height: 1.6;
}

.quill-wrapper :deep(.ql-editor.ql-blank::before) {
  color: #9ca3af;
  font-style: normal;
  left: 14px;
}

/* ── Icônes toolbar ───────────────────────────────────────────────────────── */
.quill-wrapper :deep(.ql-toolbar .ql-stroke) { stroke: #6b7280; }
.quill-wrapper :deep(.ql-toolbar .ql-fill)   { fill:   #6b7280; }

.quill-wrapper :deep(.ql-toolbar button:hover .ql-stroke),
.quill-wrapper :deep(.ql-toolbar button.ql-active .ql-stroke) { stroke: #33663b; }

.quill-wrapper :deep(.ql-toolbar button:hover .ql-fill),
.quill-wrapper :deep(.ql-toolbar button.ql-active .ql-fill)   { fill:   #33663b; }

.quill-wrapper :deep(.ql-toolbar .ql-picker-label:hover),
.quill-wrapper :deep(.ql-toolbar .ql-picker-label.ql-active),
.quill-wrapper :deep(.ql-toolbar .ql-picker-item:hover)        { color:  #33663b; }

.quill-wrapper :deep(.ql-toolbar button:hover),
.quill-wrapper :deep(.ql-toolbar button.ql-active) {
  background: #33663b12;
  border-radius: 4px;
}
</style>
