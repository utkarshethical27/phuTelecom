const fs = require('fs')
const path = require('path')
const Client = require('ftp')

const read = async (req,res,next)=>{
    const server = new Client()
    server.on('ready',async ()=>{
        server.list('./Storage/',(err,dir)=>{
            if(err) console.log(err)
            res.send(dir)/*render('download',{
                files: files
            })*/
        })
    })
}

module.exports = read
