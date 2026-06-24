const shortid =require('shortid')
const URL=require('../models/url')

async function handleGenerateShortUrl (request,response){

    const body=request.body

    if(!body.url) return response.status(400).json({error:"URL is required !!"})

        const shortID=shortid.generate()
        await URL.create({
            shortId:shortID,
            redirectURL:body.url,
            visitHistory:[{
                timestamp: Date.now()
            }]

        })
        return response.render('home',{
            id:shortID
        })

        return response.json({id:shortID})

}

async function handleGetAnalytics(request,response){

    const shortId=request.params.shortId

    const result =await URL.findOne({shortId})

    return response.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
        Ip:request.ip
    })

}

module.exports={
    handleGenerateShortUrl,handleGetAnalytics
}