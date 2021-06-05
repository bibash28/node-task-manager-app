const { request, response } = require('express')
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
 
const app = express()
const port = process.env.PORT || 3000

//middleware
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use(express.json()) 

//router
app.use(userRouter)
app.use(taskRouter)
 
app.listen(port, () =>  console.log("Server is set up on " + port))

