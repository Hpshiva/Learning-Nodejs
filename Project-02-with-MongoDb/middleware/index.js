const fs=require('fs')

function logReqRes(filename){
    return (request,response,next)=>{
         fs.appendFile(filename,`\n${Date.now()}:${request.method}:${request.path} -> ip:${request.ip}`,(error,data)=>{
                next()
            })
    }
}

module.exports=logReqRes