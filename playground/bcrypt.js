const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const pass = "Bibash"
    const hashedPassword = await bcrypt.hash(pass, 8)
    console.log(hashedPassword)
    console.log(await bcrypt.compare(pass,  hashedPassword))
}

myFunction()