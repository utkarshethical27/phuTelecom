const fs = require('fs')
const path = require('path')

const read = async (req,res,next)=>{
    fs.readdir('./storage/',(err,files)=>{
        res.render('download',{
            files: files
        })
    })
}

module.exports = read
