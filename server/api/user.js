const { connectDB, userCollection } = require('../config/mongo')

module.exports = {
  login (req, res) {
    connectDB().then(db => {
      const {username, password} = req.body
      const userC = db.collection(userCollection)
      userC.findOne({username}).then(result => {
        if (!result) {
          res.send({
            data: null,
            code: 6,
            message: '没有查询到此用户'
          })
        } else {
          if (result.password !== String(password)) {
            res.send({
              data: null,
              code: 6,
              message: '密码输入错误'
            })
          } else {
            res.send({
              data: true,
              code: 0,
              message: null
            })
          }
        }
      }).catch(err => {
        console.log(err)
        res.send({
          data: null,
          code: 500,
          message: '数据库查询错误'
        })
      })
    }).catch(err => {
      console.log(err)
      res.send({
        data: null,
        code: 500,
        message: '数据库查询错误'
      })
    })
  }
}
