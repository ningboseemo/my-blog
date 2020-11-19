const fs = require('fs')
const path = require('path')
const compression = require('compression')
const favicon = require('serve-favicon')
const { resovle } = require('./util')

console.log(process.NODE_ENV)

const app = require('express')()
// 开启 gzip 压缩
app.use(compression)
app.use(favicon(resovle('public/favicon.ico', true)))
app.use()
app.

app.listen(9000)