const fileUpload = require('express-fileupload')
const path = require('path')
const Client = require('ftp')
const fs = require('fs')

const upload = async (req,res,next)=>{
    try{
        const name = req.body.name
        await req.files.file.mv('./storage/'+name,()=>{
            console.log('File moved')
        })
        const file = path.join(__dirname,'../../storage/'+name)
        const server = new Client()
        server.on('ready',async ()=>{
            await server.put(file,'/storage/',(err)=>{
                if(err) res.send(err)
                else{
                    res.render('upload',{
                        message: 'File uploaded successfully'
                    })
                }
            })
        })
        server.connect({
            host: 'ftpupload.net',
            user: 'if0_34989307',
            password: 'BAW94rV25CA'
        })
    }catch(e){
        res.render('upload',{
            message: 'File upload failed'
        })
        console.log(e)
    }
}

module.exports = upload
