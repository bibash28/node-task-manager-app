const { request, response } = require('express')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express()

app.use(express.json())

//router
app.use(userRouter)
app.use(taskRouter)

module.exports = app