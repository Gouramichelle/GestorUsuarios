/**
 * @file Contratos REST — Autenticación y perfil
 */

/** @typedef {import('./models.js').UsuarioAutenticado} UsuarioAutenticado */
/** @typedef {import('./models.js').PerfilUsuario} PerfilUsuario */

/**
 * POST /api/auth/login — Request
 * @typedef {{ email: string, password: string }} LoginRequest
 */

/**
 * POST /api/auth/login — Response 200
 * @typedef {{
 *   token: string,
 *   token_type: 'Bearer',
 *   expires_in: number,
 *   usuario: UsuarioAutenticado
 * }} LoginResponse
 */

/**
 * POST /api/auth/logout — Response 204 (sin cuerpo)
 */

/**
 * GET /api/profile — Response 200
 * @typedef {{ perfil: PerfilUsuario }} ProfileResponse
 */

/**
 * Error estándar de la API
 * @typedef {{
 *   timestamp: string,
 *   status: number,
 *   error: string,
 *   message: string,
 *   path: string
 * }} ApiErrorResponse
 */

export const API_ROUTES = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  PROFILE: '/profile',
}

export const TOKEN_KEY = 'gestor_usuarios_token'
export const SESSION_EMAIL_KEY = 'gestor_usuarios_email'

/** Mock activo por defecto en desarrollo local */
export const USE_MOCK = true

/** Base URL del microservicio Spring Boot */
export const API_BASE = '/api'
