require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// const add = (a, b) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         if(a < 0 || b < 0)
//           return reject("Numbers must be non-negative")
//         resolve(a + b) 
//     }, 2000)
// })

// add(1,2).then((sum) => { 
//     console.log('Sum!', sum)
//     return add(sum, 4)
// }).then((sum2) => { 
//     console.log('Sum2!', sum2)
// }).catch((error) => {
//     console.log('Error!', error)
// })

//60ba125597bc0f3bbcb72fef

// User.findByIdAndUpdate('60ba125597bc0f3bbcb72fef', {age: 10}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age : 27}) 
// }).then((count)=>{
//     console.log(count) 
// }).catch((e) => {
//     console.log(e)  
// })

User.findByIdAndDelete('60ba129ff1fc1831b0900b23').then((user) => {
    console.log(user)
    return User.countDocuments({age : 27}) 
}).then((count)=>{
    console.log(count) 
}).catch((e) => {
    console.log(e)  
})

// Task.findByIdAndUpdate('60ba139d23e9df394030cc7b', {completed: true}).then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed : true}) 
// }).then((count)=>{
//     console.log(count) 
// }).catch((e) => {
//     console.log(e)  
// })

