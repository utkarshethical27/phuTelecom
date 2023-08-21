const fileUpload = require('express-fileupload')
const path = require('path')

const upload = async (req,res,next)=>{
    try{
        const name = req.body.name
        req.files.file.mv('./storage/'+name,()=>{
            res.render('upload',{
            message: 'File uploaded successfully'
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
