const { request, response } = require('express')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//router
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log("Server is set up on " + port))

