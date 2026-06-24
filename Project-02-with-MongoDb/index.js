const express=require('express')

const logReqRes =require('./middleware')
const userRouter =require('./routes/user')
const {connectMongoDb} =require('./connection')

const app=express()
const port=8000



// Connection
connectMongoDb('mongodb://127.0.0.1:27017/mongodb01').then(()=>console.log("MongoDB Connected"))



// Middleware
app.use(express.urlencoded({extended:false}))
app.use(logReqRes('log.txt'))



// Routers
app.use('/api/users',userRouter)



// To run or listen on which port 
app.listen({port},()=>console.log(`Server Started at ${port}`))