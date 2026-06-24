const express=require('express')
const router=express.Router()

const {handleGetAllUsers,handleGetUserById,updateUserById,deleteUserByID,handleCreateNewUser} = require('../controllers/user')


// Route
router.route('/')
.get(handleGetAllUsers)
.post(handleCreateNewUser)


// With ID params 
router.route('/:id')
    .get(handleGetUserById)
    .patch(updateUserById)
    .delete(deleteUserByID)


module.exports =router