/**
 * @file Vista Login
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const auth = useAuthStore()

    const email = ref('admin@gestorusuarios.cl')
    const password = ref('Demo123!')

    async function onSubmit() {
      const ok = await auth.doLogin({
        email: email.value,
        password: password.value,
      })
      if (ok) {
        await router.push({ name: 'dashboard' })
      }
    }

    return { auth, email, password, onSubmit }
  },
  template: `
    <div class="container">
      <div class="card">
        <h2>Iniciar sesión</h2>
        <p class="hint">
          Mock: <code>admin@gestorusuarios.cl</code>,
          <code>supervisor@gestorusuarios.cl</code>,
          <code>usuario@gestorusuarios.cl</code> — contraseña <code>Demo123!</code>
        </p>
        <p v-if="auth.error" class="error">{{ auth.error }}</p>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" required autocomplete="username" />
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
            />
          </div>
          <button class="btn btn-primary" type="submit" :disabled="auth.loading">
            {{ auth.loading ? 'Entrando…' : 'Entrar' }}
          </button>
        </form>
      </div>
    </div>
  `,
}
