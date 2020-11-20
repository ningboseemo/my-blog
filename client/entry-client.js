import { createApp } from './createApp.js'

const { app, router } = createApp()
router.onReady(() => {
	app.$mount('#app')
})
