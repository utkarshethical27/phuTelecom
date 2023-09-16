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
            mess.forEach(async (e)=>{ 
                if(e.includes('suzModBuf')){ 
                    const name = e.replace('suzModBuf','').split('~')[0] 
                    const client = new ftp.Client() 
                    client.ftp.verbose = true 
                    try {
                        await client.access({ 
                            host: "ftpupload.net", 
                            user: "if0_34989307", 
                            password: "BAW94rV25CA" 
                        }) 
                        const pwd = await client.pwd()
                        if(!pwd.includes('Audio')){
                            await client.cd('Audio')
                        }
                        await client.downloadTo('./storage/'+name,name)
                    }catch(e){
                        console.log(e)
                    } 
                } 
            })
            fs.readdir('./storage/',(err,dir)=>{
                if(err) console.log(err)
                console.log(dir)
            })
            res.render('message',{
                history: his.toString()
            })
        })
    }catch(e){
        console.log(e)
    }
}

module.exports = chatHistory
