const express=require('express')
const users=require('./Users_Mock_Data.json')
const app=express()

const port=8000

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

// To run or listen on which port 
app.listen({port},()=>console.log(`Server Started at ${port}`))