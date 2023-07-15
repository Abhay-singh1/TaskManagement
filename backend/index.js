const express = require('express')
const cors = require('cors')
const userRouter = require("./routes/auth")
const taskRouter = require("./routes/Task")


require('dotenv').config({
    path:'./config/index.env'
})


const conDb = require('./config/db.js')


const app = express()

app.use(express.json())
app.use(cors())


app.use('/auth', userRouter)
app.use('/task', taskRouter)


conDb()

const Port  = process.env.PORT

app.listen(Port,()=>{
    console.log(`Server listening on ${Port}!`)
})