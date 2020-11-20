const bodyParser = require('body-parser')
const userApi = require('./api/user.js')

module.exports = {
  config (app) {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}))

    // parse application/json
    app.use(bodyParser.json())

    app.use((req, res, next) => {
      const url = req.url
      const startTime = Date.now()
      console.log(startTime)
      res.once('close', () => {
        const endTime = Date.now()
        console.log(url + '请求时长:', startTime - endTime)
      })
      // 将html不缓存
      if (url === '/') {
        res.setHeader('Cache-control', 'no-cache')
      }
      next()
    })
  },
  interface (app) {
    function api (method, path, cb) {
      app[method]('/api/' + path, cb)
    }
    // user
    for (let route in userApi) {
      api('post', route, userApi[route])
    }
    // article
  }
}
