const fs = require('fs')
const path = require('path')
const ftp = require('basic-ftp')

const read = async (req,res,next)=>{
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "ftpupload.net",
            user: "if0_34989307",
            password: "BAW94rV25CA"
        })
    await client.list('',(err,dir)=>{
        if(err) res.send(err)
        let files = []
        dir.splice(dir.indexOf('chatHistory.txt'),1)
        dir.forEach((e)=>{
            files.push(e.name)
        })
        res.render('download',{
            files: files
        })
    })
  }
  catch(e){
      res.send(e)
  }
}

module.exports = read
