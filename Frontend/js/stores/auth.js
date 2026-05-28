/**
 * @file Store Pinia — sesión de autenticación
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getProfile, getStoredToken, isApiError, login, logout } from '../api/auth-api.js'

/** @typedef {import('../models.js').UsuarioAutenticado} UsuarioAutenticado */
/** @typedef {import('../contracts.js').LoginRequest} LoginRequest */

export const useAuthStore = defineStore('auth', () => {
  /** @type {import('vue').Ref<UsuarioAutenticado|null>} */
  const usuario = ref(null)
  /** @type {import('vue').Ref<string|null>} */
  const token = ref(getStoredToken())
  const loading = ref(false)
  const error = ref(/** @type {string|null} */ (null))

  const isAuthenticated = computed(() => !!token.value && !!usuario.value)

  /**
   * POST /api/auth/login
   * @param {LoginRequest} credentials
   */
  async function doLogin(credentials) {
    loading.value = true
    error.value = null
    try {
      const response = await login(credentials)
      token.value = response.token
      usuario.value = response.usuario
      return true
    } catch (e) {
      error.value = isApiError(e) ? e.message : 'Error al iniciar sesión'
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * GET /api/profile — recarga datos del dashboard desde el microservicio
   */
  async function loadProfile() {
    loading.value = true
    error.value = null
    try {
      const { perfil } = await getProfile()
      usuario.value = perfil
      token.value = getStoredToken()
      return true
    } catch (e) {
      error.value = isApiError(e) ? e.message : 'No se pudo cargar el perfil'
      usuario.value = null
      token.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  async function doLogout() {
    loading.value = true
    try {
      await logout()
    } finally {
      token.value = null
      usuario.value = null
      loading.value = false
      error.value = null
    }
  }

  return {
    usuario,
    token,
    loading,
    error,
    isAuthenticated,
    doLogin,
    loadProfile,
    doLogout,
  }
})
