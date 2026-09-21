<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  if (!email.value || !password.value) {
    errorMsg.value = 'Veuillez remplir tous les champs.'
    return
  }
  loading.value = true
  errorMsg.value = ''
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (error) {
    errorMsg.value = 'Email ou mot de passe incorrect.'
  } else {
    router.push('/admin')
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#33663b] flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
      <!-- Logo / titre -->
      <div class="text-center mb-8">
        <img src="/logo-rzh.png" alt="Logo Rezah" class="w-32 mx-auto mb-4" />
        <h1 class="text-2xl font-bold text-gray-800">Espace Admin</h1>
        <p class="text-gray-500 text-sm mt-1">Connexion requise pour accéder au tableau de bord</p>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="admin@example.com"
            autocomplete="email"
            class="rounded-xl bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-[#33663b] transition"
          />
        </div>

        <!-- Mot de passe -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            class="rounded-xl bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-[#33663b] transition"
          />
        </div>

        <!-- Erreur -->
        <p v-if="errorMsg" class="text-red-500 text-sm text-center">{{ errorMsg }}</p>

        <!-- Bouton -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-[#33663b] text-white font-semibold py-3 rounded-full hover:bg-[#29512e] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>
