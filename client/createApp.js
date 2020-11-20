import Vue from 'vue'
import { createRouter } from '@/router/index.js'
import App from './App.vue'


export function createApp () {
	const router = createRouter()
  const app = new Vue({
		router,
    render: h => h(App)
	})
	return { app, router}
}
