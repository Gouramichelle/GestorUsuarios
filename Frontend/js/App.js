/**
 * @file Componente raíz — layout + router-view
 */

export default {
  name: 'App',
  template: `
    <div class="app-shell">
      <header class="app-header">
        <h1>Gestor de Usuarios</h1>
        <p class="subtitle">Microservicios — Autenticación y Dashboard (Vue 3 + Pinia + Router)</p>
      </header>
      <router-view />
    </div>
  `,
}
