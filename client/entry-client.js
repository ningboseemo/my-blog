import { createApp } from './createApp.js'

const { app, router } = createApp()

router.onReady(() => {
	console.log('--------')
	app.$mount('#app')
})
