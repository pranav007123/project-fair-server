// loads
require('dotenv') .config()
const express =require('express')
const cors = require('cors')
const router =require('./Routes/router')
require('./DB/connection')

// creates an Express application
const pfserver = express()

// use cors in express server
pfserver.use(cors())
// parse json
pfserver.use(express.json())

pfserver.use(router)

pfserver.use('/uploads',express.static('./uploads'))
const PORT = 3000 || process.env.PORT

pfserver.listen(PORT,()=>{
console.log(`Projectfair started at:${PORT}`);
})

pfserver.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:violet">Project Fair Server Started and waiting for client request!!!</h1>`)
})

pfserver.post("/",(req,res)=>{
    res.status(200).send(`POST REQUEST`)
})