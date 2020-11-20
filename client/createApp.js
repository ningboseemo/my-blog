import Vue from 'vue'
import { createRouter } from '@/router/index.js'
import App from './App.vue'
import { Button, Tag, Page, Dropdown, DropdownMenu, DropdownItem, Spin, Message, Icon } from 'view-design'
import VueMarkdown from 'vue-markdown'
import '@/assets/iconfont/ionicons.less'
import '@/styles/public.css'

Vue.component('VueMarkdown', VueMarkdown)
Vue.component('Button', Button)
Vue.component('Tag', Tag)
Vue.component('Page', Page)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Spin', Spin)
Vue.component('Icon', Icon)

export function createApp () {
	const router = createRouter()
  const app = new Vue({
		router,
    render: h => h(App)
	})
	return { app, router}
}
