const express = require('express')
const User = require("../models/user.js") 
const router = new express.Router()

router.post("/users", async (request, response) => {
    const userData = new User(request.body)
    try {
        const user = await userData.save()
        const token = await user.generateAuthToken()
        response.status(201).send({user, token})
    } catch (error) {
        response.status(400).send(error)
    }
})

router.post("/users/login", async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password)
        const token = await user.generateAuthToken()
        response.status(200).send({user, token})
    } catch (error) {
        response.status(400).send(error)
    }
})

router.get("/users", async (request, response) => {
    try {
        const user = await User.find({})
        response.status(200).send(user)
    } catch (error) {
        response.status(400).send(error)
    }
})

router.get("/users/:id", async (request, response) => {
    const _id = request.params.id
    try {
        const user = await User.findById(_id)
        if (!user) return response.status(404).send()
        response.status(200).send(user)
    } catch (error) {
        response.status(400).send(error)
    }
})

router.patch("/users/:id", async (request, response) => {
    const _id = request.params.id
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) response.status(400).send({ error: "Invalid data" })

    try {
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = request.body[update])
        await user.save()
        //const user = await User.findByIdAndUpdate(_id, request.body, { new : true, runValidators: true})
        if (!user) return response.status(404).send()
        response.status(200).send(user)
    } catch (error) {
        response.status(400).send(error)
    }
})

router.delete("/users/:id", async (request, response) => {
    const _id = request.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) return response.status(404).send()
        response.status(200).send(user)
    } catch (error) {
        response.status(400).send(error)
    }
})


module.exports = router