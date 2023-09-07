const fs = require('fs')
const path = require('path')
const Client = require('ftp')

const read = async (req,res,next)=>{
    const server = new Client()
    server.on('ready',async ()=>{
        server.list('./Storage',(err,dir)=>{
            if(err) res.send(err)
            let files = []
            dir.forEach((e)=>{
                files.push(e.name)
            }
            res.render('download',{
                files: files
            })
        })
    })
    server.connect({
        host: 'ftpupload.net',
        user: 'if0_34979074',
        password: 'mqwiH8x16sv'
    })
}

module.exports = read
