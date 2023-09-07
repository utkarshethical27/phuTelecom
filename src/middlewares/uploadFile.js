const fileUpload = require('express-fileupload')
const path = require('path')
const Client = require('ftp')
const fs = require('fs')

const upload = async (req,res,next)=>{
    try{
        const name = req.body.name
        req.files.file.mv('./storage/'+name,(err)=>{
            if(err) throw err
        })
        fs.readFile(name,(err, data)=>{
            if(err) console.log(err)
            const server = new Client()
            server.on('ready',async ()=>{
                const file = path.join(__dirname,'../../storage/'+name)
                await server.put(data,'./Storage/',(err)=>{
                   if(err) console.log(err)
                    res.render('upload',{
                        message: 'File uploaded successfully'
                    })
                })
            })
            server.connect({
                host: 'ftpupload.net',
                user: 'if0_34979074',
                password: 'mqwiH8x16sv'
            })
        })
    }catch(e){
        res.render('upload',{
            message: 'File upload failed'
        })
        console.log(e)
    }
}

module.exports = upload
