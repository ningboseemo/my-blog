import VueRouter from 'vue-router'

export function createRouter () {
	return new VueRouter({
		mode: 'history',
    routes: [{
			path: '/',
			component: () => import('../pages/Home.vue')
		}]
	})
}