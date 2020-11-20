const { resolve } = require('../../build/webpack.base.config')

const MongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://test:test@106.12.8.153:27017'
const database = 'blog' // 数据库名称
const userCollection = 'user' // 保存用户信息的集合/表
const articleCollection = 'article' // 保存文章数据的集合/表


let mongodbClient
let db

function connectDB () {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db)
      return
    }
    MongoClient.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
      if (err) {
        return reject(err)
      }
      mongodbClient = client
      db = client.db(database)
      resolve(db)
      // 进程退出断开数据库连接
      process.on('exit', code => {
        console.error('服务退出：', code)
        dbClose
      })
    })
  })
}

function dbClose () {
  if (mongodbClient && mongodbClient.isConnected()) {
    mongodbClient.close()
  }
}

module.exports = {
  connectDB,
  db,
  database,
  userCollection,
  articleCollection
}