const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "Bibash",
    email: "bibashshrestha@gmail.com",
    password: "2332332432",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "Biplov",
    email: "bibash31s28@gmail.com",
    password: "2332332432",
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}
 
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "I am task",
    owner: userOne._id 
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "I am task",
    completed : true,
    owner: userOne._id 
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "I am task",
    completed : true,
    owner: userTwo._id 
}


const setupDatabse = async () => {
    //user
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    //task
    await Task.deleteMany()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabse
}