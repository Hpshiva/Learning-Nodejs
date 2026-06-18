
const fs=require('fs')
// console.log(fs)

//sync
fs.writeFileSync('./created.txt',"this is created with file system")


// Async
// fs.writeFile('./created.txt',"this is created with file system",(error)=>{})


// const res=fs.readFileSync('./sample.txt',"utf-8")
// console.log(res)

fs.readFile('./sample.txt',"utf-8",(err,result)=>{
    if(err){
        console.log(err)
    }
    else console.log("File read with async",result)
})


// Append (add things after )
fs.appendFileSync('./created.txt',`\nhey there boy!!`)
// check created and content is added


fs.copyFileSync('./created.txt','./created-copy.txt')


const os=require('os')
console.log(os.cpus().length)