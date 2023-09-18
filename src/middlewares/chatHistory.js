const fs = require('fs')
const ftp = require('basic-ftp')

const chatHistory = async (req,res)=>{
    const client = new ftp.Client()
    client.ftp.verbose = true
    try{
        await client.access({
            host: "ftpupload.net",
            user: "if0_34989307",
            password: "BAW94rV25CA"
        })
        await client.downloadTo('chatHistory.txt','chatHistory.txt')
        const his = await fs.createReadStream('chatHistory.txt')
        his.on('data',async (his)=>{
            let mess = his.toString()
            mess = mess.split('¿')
            let stuff = []
            mess.forEach(async (e)=>{ 
                if(e.includes('suzModBuf')){ 
                    const name = e.replace('suzModBuf','').split('~')[0].trim() 
                    const ft = new ftp.Client()
                    ft.ftp.verbose = true
                    try {
                        await ft.access({ 
                            host: "ftpupload.net", 
                            user: "if0_34989307", 
                            password: "BAW94rV25CA" 
                        })
                        await ft.downloadTo('./storage/'+name,name)
                    }catch(e){
                        console.log(e)
                    } 
                } 
            })
            setTimeout(()=>{
                fs.readdir('./storage/',(err,res)=>{
                    console.log(res)
                })
                res.render('message',{
                    history: his.toString()
                })
            },5000)
        })
    }catch(e){
        console.log(e)
    }
}

module.exports = chatHistory
