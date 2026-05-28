/**
 * @file Punto de entrada — Vue 3 + Pinia + Vue Router (sin Vite)
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.js'
import router from './router.js'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.config.errorHandler = (err) => {
  console.error(err)
  const el = document.getElementById('app')
  if (el) {
    el.innerHTML =
      '<div style="max-width:640px;margin:2rem auto;padding:1rem;background:#fef2f2;border-radius:8px;color:#991b1b">' +
      '<strong>Error en la aplicación</strong><pre style="white-space:pre-wrap;font-size:0.85rem">' +
      (err && err.message ? err.message : String(err)) +
      '</pre></div>'
  }
}

app.mount('#app')
