const mongoose = require('mongoose')
const validator = require('validator')

const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api'  

mongoose.connect(connectionUrl,{
    useNewUrlParser: true,
    useCreateIndex: true
})
 
const User = mongoose.model('User', {
    name: {
        type : String,
        required : true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
            }
        } 
    },    
    age: {
        type: Number,
        default : 100,
        trim : true,
        lowercase : true,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    password: {
        type: String,
        required : true,
        trim : true,
        minlength : 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password cannot contain 'password'")
            }
        }
    }
})
 
// const me = new User({
//     name : "Andrew", 
//     email : "bibash@gmail.com",
//     age : 25,
//     password : "passwodrdw" 
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error)=> {
//     console.log("Error!", error)
// })

const Task = mongoose.model('Task', {
    description: {
        type : String,
        required : true,
        trim : true,
    },
    completed: {
        type: Boolean,
        default : false,
        trim : true, 
    }
})


const task = new Task({
    description : "Clean the mirror",
    //completed : false
})

task.save().then((data) => {
    console.log(data)
}).catch(() => {
    console.log("Error!", error)
})