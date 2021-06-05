const express = require('express')
const Task = require("../models/task.js") 
const auth = require('../middleware/auth')
const { findOne } = require('../models/task.js')
const router = new express.Router()

router.get("/tasks", auth, async (request, response) => {
    try {
        //const task = await Task.find({owner : request.user._id})
        //or
        await request.user.populate('tasks').execPopulate()
        const task = request.user.tasks
        response.status(200).send(task)
    } catch (error) {
        response.status(400).send(error)
    }   
}) 

router.post("/tasks", auth, async (request, response) => { 
    //const taskData = new Task(request.body)
    const taskData = new Task({
        ...request.body,
        owner: request.user._id
    })
    try {
        const task = await taskData.save()
        response.status(201).send(task)
    } catch (error) {
        response.status(400).send(error)
    }   
}) 

router.get("/tasks/:id", auth, async (request, response) => {
    const _id = request.params.id 
    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id , owner : request.user._id})
        if(!task) return response.status(404).send()
        response.status(201).send(task)
    } catch (error) {
        response.status(400).send({error})
    } 
})

router.patch("/tasks/:id", auth, async (request, response) => { 
    const updates = Object.keys(request.body)  
    const allowedUpdates = ['description', 'completed'] 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) response.status(400).send({error: "Invalid data"}) 

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id : request.params.id, owner : request.user._id})
        if(!task) return response.status(404).send()
        updates.forEach((update) => task[update] = request.body[update])
        await task.save()
        //const task = await Task.findByIdAndUpdate(_id, request.body, { new : true, runValidators: true})
        response.status(200).send(task)
    } catch (error) {
        response.status(400).send(error) 
    }
})

router.delete("/tasks/:id", auth, async (request, response) => {
    const _id = request.params.id 
    try {
        //const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOneAndDelete({_id : request.params.id, owner : request.user._id})
        if(!task) return response.status(404).send()
        response.status(200).send(task)
    } catch (error) {
        response.status(400).send(error) 
    }
})
 

module.exports = router