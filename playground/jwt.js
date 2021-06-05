const jwt = require('jsonwebtoken')

const myFuntion = async () => {
    const token = jwt.sign({ id: "abc123" }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFuntion()