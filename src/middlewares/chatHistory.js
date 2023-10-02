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
            res.render('message',{
                history: his.toString()
            })
        })
    }catch(e){
        console.log(e)
    }
}

module.exports = chatHistory
