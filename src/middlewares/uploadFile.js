const fileUpload = require('express-fileupload')
const path = require('path')
const Client = require('ftp')

const upload = async (req,res,next)=>{
    try{
        const name = req.body.name
        req.files.file.mv('./storage/'+name,(err)=>{
            if(err) throw err
        })
        const server = new Client()
        server.on('ready',async ()=>{
            await server.put('./storage/'+name,'./Storage/',(err)=>{
                if(err) throw err
                res.render('upload',{
                    message: 'File uploaded successfully'
                })
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
