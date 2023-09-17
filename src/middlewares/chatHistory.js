const fs = require('fs')
const ftp = require('basic-ftp')
const Client = require('ftp')

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
                    const name = e.replace('suzModBuf','').split('~')[0] 
                    const ft = new Client() 
                    try {
                        ft.on('ready',()=>{
                            ft.get(name,(err,stream)=>{
                                if(err) console.log(err)
                                if(stream) console.log(stream)
                            })
                        })
                        ft.connect({ 
                            host: "ftpupload.net", 
                            user: "if0_34989307", 
                            password: "BAW94rV25CA" 
                        })
                    }catch(e){
                        console.log(e)
                    } 
                } 
            })
            fs.readdir(path.join(''),async (err,dir)=>{
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
