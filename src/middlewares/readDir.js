const fs = require('fs')
const path = require('path')
const Client = require('ftp')

const read = async (req,res,next)=>{
    const server = new Client()
    server.on('ready',async ()=>{
        serve.list('./Storage/',(err,dir)=>{
            if(err) console.log(err)
            let files = []
            dir.forEach((e)=>{
                files.push(e.name)
            })
            res.render('download',{
            files: files
        })
    })
    })
}
