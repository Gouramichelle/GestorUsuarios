/**
 * @file Cliente API — login, logout, profile (fetch)
 */

import {
  API_BASE,
  API_ROUTES,
  SESSION_EMAIL_KEY,
  TOKEN_KEY,
  USE_MOCK,
} from '../contracts.js'
import { MOCK_CREDENTIALS, generarTokenMock } from './mock-data.js'

/** @typedef {import('../contracts.js').LoginRequest} LoginRequest */
/** @typedef {import('../contracts.js').LoginResponse} LoginResponse */
/** @typedef {import('../contracts.js').ProfileResponse} ProfileResponse */
/** @typedef {import('../contracts.js').ApiErrorResponse} ApiErrorResponse */

const MOCK_DELAY_MS = 400

/** @type {string|null} */
let sesionEmail = null

/**
 * @param {number} status
 * @param {string} message
 * @param {string} path
 * @returns {ApiErrorResponse}
 */
function apiError(status, message, path) {
  return {
    timestamp: new Date().toISOString(),
    status,
    error: status === 401 ? 'Unauthorized' : status === 403 ? 'Forbidden' : 'Bad Request',
    message,
    path,
  }
}

/**
 * @template T
 * @param {T} value
 * @param {number} [ms]
 */
function delay(value, ms = MOCK_DELAY_MS) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * @param {string|null} token
 */
export function setStoredToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

/**
 * POST /api/auth/login
 * @param {LoginRequest} body
 * @returns {Promise<LoginResponse>}
 */
export async function login(body) {
  if (USE_MOCK) {
    const key = body.email.trim().toLowerCase()
    const cred = MOCK_CREDENTIALS[key]

    if (!cred || cred.password !== body.password) {
      throw apiError(401, 'Credenciales inválidas', `/api${API_ROUTES.LOGIN}`)
    }
    if (!cred.usuario.activo) {
      throw apiError(403, 'La cuenta de usuario está desactivada', `/api${API_ROUTES.LOGIN}`)
    }

    sesionEmail = cred.usuario.email
    localStorage.setItem(SESSION_EMAIL_KEY, cred.usuario.email)
    const token = generarTokenMock(body.email)
    setStoredToken(token)

    return delay({
      token,
      token_type: 'Bearer',
      expires_in: 3600,
      usuario: JSON.parse(JSON.stringify(cred.usuario)),
    })
  }

  const res = await fetch(`${API_BASE}${API_ROUTES.LOGIN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw apiError(res.status, err.message || 'Error al iniciar sesión', `/api${API_ROUTES.LOGIN}`)
  }

  /** @type {LoginResponse} */
  const data = await res.json()
  setStoredToken(data.token)
  return data
}

/**
 * POST /api/auth/logout
 * @returns {Promise<void>}
 */
export async function logout() {
  if (USE_MOCK) {
    sesionEmail = null
    localStorage.removeItem(SESSION_EMAIL_KEY)
    setStoredToken(null)
    return delay(undefined)
  }

  const token = getStoredToken()
  await fetch(`${API_BASE}${API_ROUTES.LOGOUT}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  sesionEmail = null
  setStoredToken(null)
}

/**
 * GET /api/profile
 * @returns {Promise<ProfileResponse>}
 */
export async function getProfile() {
  if (USE_MOCK) {
    const email = sesionEmail || localStorage.getItem(SESSION_EMAIL_KEY)
    if (!email || !getStoredToken()) {
      throw apiError(401, 'Sesión no válida o expirada', `/api${API_ROUTES.PROFILE}`)
    }
    sesionEmail = email
    const cred = MOCK_CREDENTIALS[email]
    if (!cred) {
      throw apiError(401, 'Sesión no válida o expirada', `/api${API_ROUTES.PROFILE}`)
    }
    return delay({ perfil: JSON.parse(JSON.stringify(cred.usuario)) })
  }

  const token = getStoredToken()
  const res = await fetch(`${API_BASE}${API_ROUTES.PROFILE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!res.ok) {
    throw apiError(401, 'Sesión no válida o expirada', `/api${API_ROUTES.PROFILE}`)
  }

  return res.json()
}

/**
 * @param {unknown} e
 * @returns {e is ApiErrorResponse}
 */
export function isApiError(e) {
  return typeof e === 'object' && e !== null && 'message' in e && 'status' in e
}
