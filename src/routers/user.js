const express = require('express')
const User = require("../models/user.js")
const auth = require('../middleware/auth.js')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()

router.post("/users", async (request, response) => {
    const userData = new User(request.body)
    try {
        const user = await userData.save()
        const token = await user.generateAuthToken()
        response.status(201).send({ user, token })
    } catch (error) {
        response.status(400).send(error)
    }
})

router.post("/users/login", async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password)
        const token = await user.generateAuthToken()
        response.status(200).send({ user, token })
    } catch (error) {
        response.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})


router.get("/users/me", auth, async (request, response) => {
    response.send(request.user)
})

//this api is not needed now
// router.get("/users/:id", auth, async (request, response) => {
//     const _id = request.params.id
//     try {
//         const user = await User.findById(_id)
//         if (!user) return response.status(404).send()
//         response.status(200).send(user)
//     } catch (error) {
//         response.status(400).send(error)
//     }
// })

//this api is not needed now
// router.patch("/users/:id", auth, async (request, response) => {
//     const _id = request.params.id
//     const updates = Object.keys(request.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) response.status(400).send({ error: "Invalid data" })

//     try {
//         const user = await User.findById(_id)
//         updates.forEach((update) => user[update] = request.body[update])
//         await user.save()
//         //const user = await User.findByIdAndUpdate(_id, request.body, { new : true, runValidators: true})
//         if (!user) return response.status(404).send()
//         response.status(200).send(user)
//     } catch (error) {
//         response.status(400).send(error)
//     }
// })

router.patch("/users/me", auth, async (request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) response.status(400).send({ error: "Invalid data" })

    try {
        //const user = await User.findById(request.user._id)
        updates.forEach((update) => request.user[update] = request.body[update])
        await request.user.save()
        //if (!user) return response.status(404).send() //removed because we know user is already logged in => auth middleware
        response.status(200).send(request.user)
    } catch (error) {
        response.status(400).send(error)
    }
})

// router.delete("/users/:id", async (request, response) => {
//     const _id = request.params.id
//     try {
//         const user = await User.findByIdAndDelete(_id)
//         if (!user) return response.status(404).send()
//         response.status(200).send(user)
//     } catch (error) {
//         response.status(400).send(error)
//     }
// })

const upload = multer({
    //dest: 'avatars',   //this is to save for directory
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // if(!file.originalname.endsWith('pdf'))
        //  return cb(new Error('Please upload a pdf'))
        // if(!file.originalname.match(/\.(doc|docx)$/))
        //     return cb(new Error('Please upload a Word Document'))
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('Please upload an image'))
        cb(undefined, true)
    }
})


router.post("/users/me/avatar", auth, upload.single('avatar'), async (request, response) => {
    const buffer = await sharp(request.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    //request.user.avatar = request.file.buffer
    request.user.avatar = buffer
    await request.user.save()
    response.send()
}, (error, request, response, next) => {
    response.status(400).send({ error: error.message })
})

router.delete("/users/me/avatar", auth, async (request, response) => {
    try {
        response.send()
    } catch (error) {
        response.status(400).send(error)
    }
})

router.get("/users/:id/avatar", async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        if (!user || !user.avatar)
            throw new Error()
        response.set("Content-Type", "image/jpg")
        response.send(user.avatar)
    } catch (error) {
        response.status(404).send(error)
    }
})


router.delete("/users/me", auth, async (request, response) => {
    try {
        // const user = await User.findByIdAndDelete(request.user._id)
        // if (!user) return response.status(404).send()
        await request.user.remove()
        response.send(request.user)
    } catch (error) {
        response.status(400).send(error)
    }
})



module.exports = router