const fs = require('fs')
const compression = require('compression')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const favicon = require('serve-favicon')
const { resolve } = require('./util.js')
const template = fs.readFileSync(resolve('public/index.template.html', true), 'utf-8')
const serverBundle = require('../statics/vue-ssr-server-bundle.json')
const clientManifest = require('../statics/vue-ssr-client-manifest.json')
const { config, interface } = require('./base.js')
const app = express()

const renderer = createBundleRenderer(serverBundle, {
	template,
	clientManifest
})

const static = (path) => {
	return express.static(resolve(path, true), {
		maxAge: 0
		// maxAge: 1000 * 60 * 60 * 24 * 30
	})
}
// 开启 gzip 压缩
app.use(compression())
app.use(favicon(resolve('public/favicon.ico', true)))
app.use('/statics', static('statics'))

// 初始化数据
config(app)
interface(app)

app.get(/^(?!\/statics\/)(?!\/api\/)/, (req, res) => {
	res.setHeader('Content-Type', 'text/html')
	let context = {
		url: req.url
	}
	renderer.renderToString(context).then(html => {
		res.send(html || '')
	}).catch(err => {
		if (err.url) {
			res.redirect(err.url)
		} else if (err.code === 404) {
			res.status(404).send('404 | Page Not Found')
		} else {
			res.status(500).send('500 | Internal Server Error~')
		}
	})
})

app.listen(9000, function () {
	console.log(`server started in port: 9000`)
})
