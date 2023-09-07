const fs = require('fs')
const path = require('path')
const Client = require('ftp')

const read = async (req,res,next)=>{
    const server = new Client()
    server.on('ready',async ()=>{
        server.list('./Storage',(err,dir)=>{
            if(err) res.send(err)
            res.send(dir)
        })
    })
}

module.exports = read
