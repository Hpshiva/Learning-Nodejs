const express=require('express')
// const users=require('./Users_Mock_Data.json')
const app=express()
const fs=require('fs')
const { error } = require('console')
const { default: mongoose } = require('mongoose')
const port=8000

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/mongodb01')
.then(()=>console.log("MongoDb Connected"))
.catch((err)=>console.log("Mongodb Error",err))


//Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    jobTitle:{
        type:String
    },
    gender:{
        type:String
    }
},{timestamps:true})

// Modal
const User=mongoose.model("user",userSchema)




// Middleware
app.use(express.urlencoded({extended:false}))

app.use((request,response,next)=>{
    fs.appendFile('log.txt',`\n${Date.now()}:${request.method}:${request.path} -> ip:${request.ip}`,(error,data)=>{
        next()
    })
})

app.get('/users',async (request,response)=>{
    const dbuser=await User.find({})
    const html=`
    <ul>
        ${dbuser.map(item=>`<li>${item.firstName} -> ${item.email}</li>`).join("")}
    </ul>
    `
    response.send(html)
  
})


// REST API - get all user in json format
app.get('/api/users',async(request,response)=>{
     const dbuser=await User.find({})
      return response.json(dbuser)
})


// With ID params 
app.route('/api/users/:id')
    .get(async(request,response)=>{
        const user=await User.findById(request.params.id)


   if(!user) return response.status(404)
        return response.json(user)
    })
    .patch(async(request,response)=>{
        await User.findByIdAndUpdate(request.params.id,{lastName:"changed"})
        return response.json({status:"User patch data Updated"})
    })
    .delete(async(request,response)=>{
        await User.findByIdAndDelete(request.params.id)
        return response.json({status:"User Deleted successfully"})
    })


// Post
app.post('/api/users',async (request,response)=>{
const body=request.body

const result =await User.create({
    firstName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.jobTitle
})
console.log("Result",result)
   return response.status(201).json({msg:"user added"})
})

// To run or listen on which port 
app.listen({port},()=>console.log(`Server Started at ${port}`))