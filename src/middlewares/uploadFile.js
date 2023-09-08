const fileUpload = require('express-fileupload')
const path = require('path')
const ftp = require('basic-ftp')
const fs = require('fs')

const upload = async (req,res,next)=>{
    try{
        const name = req.body.name
        await req.files.file.mv('./storage/'+name,()=>{
            console.log('File moved')
        })
        const file = path.join(__dirname,'../../storage/'+name)
        const client = new ftp.Client()
        client.ftp.verbose = true
        try {
            await client.access({
                host: "ftpupload.net",
                user: "if0_34989307",
                password: "BAW94rV25CA"
            })
        const result = await client.uploadFrom(file,name)
        res.send(result)
    }
    catch(err) {
        res.send(err)
    }
    }catch(e){
        res.render('upload',{
            message: 'File upload failed'
        })
        console.log(e)
    }
}

module.exports = upload
