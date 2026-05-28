/**
 * @file Modelos de dominio — tablas USUARIO, ROL, ROL_MODULO
 */

/** @typedef {'CREAR'|'LEER'|'ACTUALIZAR'|'ELIMINAR'} Permiso */

/** @typedef {'ROLE_ADMIN'|'ROLE_USER'|'ROLE_SUPERVISOR'} RolCodigo */

/**
 * @typedef {Object} ModuloAcceso
 * @property {string} nombre_modulo
 * @property {Permiso[]} permisos
 */

/**
 * @typedef {Object} RolUsuario
 * @property {RolCodigo} codigo
 * @property {string} nombre
 */

/**
 * @typedef {Object} Usuario
 * @property {string} nombre_completo
 * @property {string} email
 * @property {string} rut
 * @property {string} telefono
 * @property {boolean} activo
 */

/**
 * @typedef {Usuario & { rol: RolUsuario, modulos: ModuloAcceso[] }} UsuarioAutenticado
 */

/** @typedef {UsuarioAutenticado} PerfilUsuario */

export const PERMISOS = /** @type {const} */ ([
  'CREAR',
  'LEER',
  'ACTUALIZAR',
  'ELIMINAR',
])

export const ROLES = /** @type {const} */ ([
  'ROLE_ADMIN',
  'ROLE_USER',
  'ROLE_SUPERVISOR',
])

/**
 * @param {Permiso[]} permisos
 * @param {Permiso} requerido
 */
export function tienePermiso(permisos, requerido) {
  return permisos.includes(requerido)
}
