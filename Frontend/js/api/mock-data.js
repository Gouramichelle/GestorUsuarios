/**
 * @file Datos mock — persistencia en memoria (simula backend JSON/memoria)
 */

/** @typedef {import('../models.js').UsuarioAutenticado} UsuarioAutenticado */

/** @type {Record<string, { password: string, usuario: UsuarioAutenticado }>} */
export const MOCK_CREDENTIALS = {
  'admin@gestorusuarios.cl': {
    password: 'Demo123!',
    usuario: {
      nombre_completo: 'Ana María González Pérez',
      email: 'admin@gestorusuarios.cl',
      rut: '12.345.678-9',
      telefono: '+56 9 1234 5678',
      activo: true,
      rol: { codigo: 'ROLE_ADMIN', nombre: 'Administrador' },
      modulos: [
        {
          nombre_modulo: 'Gestión de Usuarios',
          permisos: ['CREAR', 'LEER', 'ACTUALIZAR', 'ELIMINAR'],
        },
        {
          nombre_modulo: 'Gestión de Roles',
          permisos: ['CREAR', 'LEER', 'ACTUALIZAR', 'ELIMINAR'],
        },
        {
          nombre_modulo: 'Gestión de Módulos',
          permisos: ['CREAR', 'LEER', 'ACTUALIZAR', 'ELIMINAR'],
        },
      ],
    },
  },
  'supervisor@gestorusuarios.cl': {
    password: 'Demo123!',
    usuario: {
      nombre_completo: 'Carlos Andrés Muñoz Rojas',
      email: 'supervisor@gestorusuarios.cl',
      rut: '18.765.432-1',
      telefono: '+56 9 8765 4321',
      activo: true,
      rol: { codigo: 'ROLE_SUPERVISOR', nombre: 'Supervisor' },
      modulos: [
        {
          nombre_modulo: 'Gestión de Usuarios',
          permisos: ['LEER', 'ACTUALIZAR'],
        },
        {
          nombre_modulo: 'Gestión de Roles',
          permisos: ['LEER'],
        },
      ],
    },
  },
  'usuario@gestorusuarios.cl': {
    password: 'Demo123!',
    usuario: {
      nombre_completo: 'Valentina Ignacia Soto Díaz',
      email: 'usuario@gestorusuarios.cl',
      rut: '16.234.567-8',
      telefono: '+56 9 5555 1212',
      activo: true,
      rol: { codigo: 'ROLE_USER', nombre: 'Usuario' },
      modulos: [
        {
          nombre_modulo: 'Gestión de Usuarios',
          permisos: ['LEER'],
        },
      ],
    },
  },
  'inactivo@gestorusuarios.cl': {
    password: 'Demo123!',
    usuario: {
      nombre_completo: 'Usuario Inactivo Demo',
      email: 'inactivo@gestorusuarios.cl',
      rut: '16.234.567-8',
      telefono: '+56 9 5555 1212',
      activo: false,
      rol: { codigo: 'ROLE_USER', nombre: 'Usuario' },
      modulos: [],
    },
  },
}

/**
 * @param {string} email
 */
export function generarTokenMock(email) {
  const payload = btoa(JSON.stringify({ sub: email, iat: Date.now(), mock: true }))
  return `mock.jwt.${payload}`
}
