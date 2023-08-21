const fs = require('fs')

const chatHistory = async (req,res)=>{
    fs.readFile('./src/chatHistory.txt','utf-8',(err,data)=>{
        res.render('message',{
            history: data
        })
    })
}

module.exports = chatHistory