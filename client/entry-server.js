import { createApp } from './createApp.js'

export default context => {
	const url = context.url
	return new Promise((resolve, reject) => {
		const { app, router } = createApp()
		console.log('---router----')
		router.push(context.url)
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()
			if (!matchedComponents.length) {
				return reject({code: 404})
			}
			resolve(app)
		})
	})
}
