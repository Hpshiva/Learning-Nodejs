const User=require('../models/user')

async function handleGetAllUsers(request,response){

    const allDBUsers=await User.find({})
    return response.json(allDBUsers)

}

async function handleGetUserById(request,response){

    const user=await User.findById(request.params.id)
    if(!user) return response.status(404)
        return response.json(user)

}

async function updateUserById(request,response){

    await User.findByIdAndUpdate(request.params.id,{lastName:"Boruto"})
    return response.json({status:"User patch data Updated"})
    
}

async function deleteUserByID(request,response){
 
    await User.findByIdAndDelete(request.params.id)
    return response.json({status:"User Deleted"})
    
}

async function handleCreateNewUser(request,response){
    const body=request.body

    const result =await User.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        gender:body.gender,
        jobTitle:body.jobTitle
    })

console.log("Result",result)
   return response.status(201).json({msg:"user added",id:result._id})
}

module.exports={
    handleGetAllUsers,handleGetUserById,
    updateUserById,
    deleteUserByID,handleCreateNewUser
}