const express=require('express')
const URL =require('../models/url')
const router=express.Router()

router.get('/', async(request,response)=>{
    const allUrls=await  URL.find({})
    return response.render('home',{
        urls:allUrls
    })
})

module.exports=router