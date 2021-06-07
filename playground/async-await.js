const { count } = require("../src/models/user")
const User = require("../src/models/user")
const Task = require("../src/models/task")
require('../src/db/mongoose')

const add = (a, b) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if(a < 0 || b < 0)
          return reject("Numbers must be non-negative")
        resolve(a + b) 
    }, 2000)
})

const doWork = async () => {
  const sum1 = await add(1,2)
  const sum2 = await add(sum1, 2)
  const sum3 = await add(sum2, 3)
  return sum3
}

// doWork().then((result) => {
//     console.log('result', result)
//    }).catch((e) => {
//     console.log('e', e)
//    }) 

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {age})
  const count = await User.countDocuments({age})
  return count
}

// updateAgeAndCount("60ba125597bc0f3bbcb72fef", 99).then((count) => {
//   console.log(count)
// }).catch((error) => {
//   console.log(error) 
// })


deleteTaskAndCount = async(id) => {
  await Task.findByIdAndDelete(id)
  return await Task.count()
}

deleteTaskAndCount("60ba139d23e9df394030cc7b").then((count) => {
  console.log(count)
}).catch((error) => {
  console.log(error) 
})
