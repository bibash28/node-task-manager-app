const { request, response } = require('express')
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
 

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/users", (request, response) => { 
    const user = new User(request.body)
    user.save().then((user) => {
        response.status(201).send(user)
    }).catch((error) => {
        response.status(400).send(error)
    })
})


app.get("/users", (request, response) => {
    User.find({}).then((user) => {
        response.status(200).send(user) 
    }).catch((error)=>{
        response.status(500).send(error) 
    })
})

app.get("/users/:id", (request, response) => {
    const _id = request.params.id
    User.findById(_id).then((user) => {
        if(!user) return response.status(400).send() 
        response.status(200).send(user) 
    }).catch((error)=>{
        response.status(500).send(error) 
    })
})

app.get("/tasks", (request, response) => {
    Task.find({}).then((task) => {
        response.status(200).send(task) 
    }).catch((error)=>{
        response.status(500).send(error) 
    })
})


app.post("/tasks", (request, response) => { 
    const user = new Task(request.body)
    user.save().then((user) => {
        response.status(200).send(user)
    }).catch((error) => {
        response.status(400).send(error)
    })
}) 

app.get("/tasks/:id", (request, response) => {
    const _id = request.params.id
    Task.findById(_id).then((task) => {
        if(!task) return response.status(400).send() 
        response.status(200).send(task) 
    }).catch((error)=>{
        response.status(500).send(error) 
    })
})

app.listen(port, () => {
    console.log("Server is set up on " + port)
})

