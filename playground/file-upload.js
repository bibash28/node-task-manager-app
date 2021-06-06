var express = require('express')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.listen(port, () => console.log("Server is set up on " + port))