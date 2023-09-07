const fs = require('fs')
const Client = require('ftp')

const chatHistory = async (req,res)=>{
    const server = new Client()
    server.on('ready',async ()=>{
        await server.get('chatHistory.txt',async (err,stream)=>{
            if (err) console.log(err)
            stream.once('close', function() { server.end(); });

      await stream.pipe(fs.createWriteStream('./src/chatHistory.txt'));
        })
    })
    await server.connect({
        host: 'ftpupload.net',
        user: 'if0_34979074',
        password: 'mqwiH8x16sv'
    })
    fs.readFile('./src/chatHistory.txt','utf-8',(err,data)=>{
        res.render('message',{
            history: data
        })
    })
}

module.exports = chatHistory
