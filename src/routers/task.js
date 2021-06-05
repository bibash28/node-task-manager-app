const express = require('express')
const Task = require("../models/task.js")
const User = require('../models/user.js')
const router = new express.Router()

router.get("/tasks", async (request, response) => {
    try {
        const task = await Task.find({})
        response.status(200).send(task)
    } catch (error) {
        response.status(400).send(error)
    }   
})

router.post("/tasks", async (request, response) => { 
    const taskData = new Task(request.body)
    try {
        const task = await taskData.save()
        response.status(201).send(task)
    } catch (error) {
        response.status(400).send(error)
    }   
}) 

router.get("/tasks/:id", async (request, response) => {
    const _id = request.params.id 
    try {
        const task = await Task.findById(_id)
        if(!task) return response.status(404).send()
        response.status(201).send(task)
    } catch (error) {
        response.status(400).send(error)
    } 
})

router.patch("/tasks/:id", async (request, response) => {
    const _id = request.params.id
    const updates = Object.keys(request.body)  
    const allowedUpdates = ['description', 'completed'] 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) response.status(400).send({error: "Invalid data"}) 

    try {
        const task = await Task.findById(_id)
        updates.forEach((update) => task[update] = request.body[update])
        await task.save()
        //const task = await Task.findByIdAndUpdate(_id, request.body, { new : true, runValidators: true})
        if(!task) return response.status(404).send()
        response.status(200).send(task)
    } catch (error) {
        response.status(400).send(error) 
    }
})

router.delete("/tasks/:id", async (request, response) => {
    const _id = request.params.id 
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task) return response.status(404).send()
        response.status(200).send(task)
    } catch (error) {
        response.status(400).send(error) 
    }
})
 

module.exports = router