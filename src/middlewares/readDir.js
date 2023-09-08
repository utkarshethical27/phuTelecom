const fs = require('fs')
const path = require('path')
const Client = require('ftp')

const read = async (req,res,next)=>{
    const server = new Client()
    server.on('ready',async ()=>{
        server.list('',(err,dir)=>{
            if(err) res.send(err)
            let files = []
            dir.shift()
            dir.shift()
            dir.splice(dir.indexOf('chatHistory.txt'),1)
            dir.forEach((e)=>{
                files.push(e.name)
            })
            res.render('download',{
                files: files
            })
        })
    })
    server.connect({
        host: 'ftpupload.net',
        user: 'if0_34989307',
        password: 'BAW94rV25CA'
    })
}

module.exports = read
