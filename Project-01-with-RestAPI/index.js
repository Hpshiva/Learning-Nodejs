const express=require('express')
const users=require('./Users_Mock_Data.json')
const app=express()
const fs=require('fs')
const { error } = require('console')
const port=8000

// Middleware
app.use(express.urlencoded({extended:false}))

app.use((request,response,next)=>{
    fs.appendFile('log.txt',`\n${Date.now()}:${request.method}:${request.path} -> ip:${request.ip}`,(error,data)=>{
        next()
    })
})

app.get('/users',(request,response)=>{
    const html=`
    <ul>
        ${users.map(item=>`<li>${item.first_name}</li>`).join("")}
    </ul>
    `
    response.send(html)
  
})
// REST API 
app.get('/api/users',(request,response)=>{
      return response.json(users)
})

// With ID params 
app.get('/api/users/:id',(request,response)=>{
    const id=Number(request.params.id)

    console.log(id)
    console.log(typeof id)

    const user=users.find(item=>item.id===id)
    return response.json(user)

})

app.route('/api/users/:id')
    .get((request,response)=>{
        const id=Number(request.params.id)

        console.log(id)
        console.log(typeof id)

        const user=users.find(item=>item.id===id)
        return response.json(user)
    })
    .patch((request,response)=>{
        // Edit user with Id 
        return response.json({status:"Pending"})
    })
    .delete((request,response)=>{
        // Delete user with Id
        return response.json({status:"Pending"})
    })


// Post
app.post('/api/users',(request,response)=>{
const body=request.body
users.push({id:users.length+1,...body})
fs.writeFile('./Users_Mock_Data.json',JSON.stringify(users),(error,data)=>{
 return response.json({status:"Success", id:users.length})
})
   
})

// To run or listen on which port 
app.listen({port},()=>console.log(`Server Started at ${port}`))