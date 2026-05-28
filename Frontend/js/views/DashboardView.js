/**
 * @file Dashboard de usuario — GET /api/profile al montar
 */

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'DashboardView',
  setup() {
    const router = useRouter()
    const auth = useAuthStore()

    onMounted(async () => {
      const ok = await auth.loadProfile()
      if (!ok) {
        await router.replace({ name: 'login' })
      }
    })

    async function onLogout() {
      await auth.doLogout()
      await router.push({ name: 'login' })
    }

    return { auth, onLogout }
  },
  template: `
    <div class="container">
      <div v-if="auth.loading && !auth.usuario" class="card">
        <p>Cargando dashboard…</p>
      </div>

      <div v-else-if="auth.usuario" class="card">
        <div class="profile-header">
          <div>
            <p class="subtitle" style="margin:0;text-align:left">Dashboard de usuario</p>
            <h2>{{ auth.usuario.nombre_completo }}</h2>
          </div>
          <span class="badge">{{ auth.usuario.rol.nombre }}</span>
        </div>

        <div class="dashboard-grid">
          <div class="stat-card">
            <dt>Email</dt>
            <dd>{{ auth.usuario.email }}</dd>
          </div>
          <div class="stat-card">
            <dt>RUT</dt>
            <dd>{{ auth.usuario.rut }}</dd>
          </div>
          <div class="stat-card">
            <dt>Teléfono</dt>
            <dd>{{ auth.usuario.telefono }}</dd>
          </div>
          <div class="stat-card">
            <dt>Estado</dt>
            <dd>{{ auth.usuario.activo ? 'Activo' : 'Inactivo' }}</dd>
          </div>
        </div>

        <div class="stat-card" style="margin-bottom:1.25rem">
          <dt>Rol del sistema</dt>
          <dd>{{ auth.usuario.rol.codigo }}</dd>
        </div>

        <section class="modules">
          <h3>Módulos accesibles (ROL_MODULO)</h3>
          <ul v-if="auth.usuario.modulos.length">
            <li v-for="mod in auth.usuario.modulos" :key="mod.nombre_modulo">
              <strong>{{ mod.nombre_modulo }}</strong>
              <div class="perm-tags">
                <span v-for="p in mod.permisos" :key="p" class="perm-tag">{{ p }}</span>
              </div>
            </li>
          </ul>
          <p v-else class="perm">Sin módulos asignados.</p>
        </section>

        <button class="btn btn-ghost" type="button" :disabled="auth.loading" @click="onLogout">
          Cerrar sesión
        </button>
      </div>
    </div>
  `,
}
