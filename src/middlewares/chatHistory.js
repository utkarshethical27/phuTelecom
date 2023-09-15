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
        client.downloadTo('chatHistory.txt','chatHistory.txt')
        const his = fs.createReadStream('chatHistory.txt')
        his.on('data',async (his)=>{
            let mess = his 
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
                        await client.cd('Audio') 
                        await client.downloadTo('Storage/'+name,name) 
                    }catch(e){
                        res.send(e) 
                    } 
                } 
            })
            res.render('message',{
                history: his
            })
        })
    }catch(e){
        res.send(e)
    }
}

module.exports = chatHistory
