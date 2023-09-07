const fs = require('fs')
const Client = require('ftp')

const chatHistory = async (req,res)=>{
    const server = new Client()
    server.on('ready',async ()=>{
        await server.get('chatHistory.txt',async (err,stream)=>{
            if (err) console.log(err)
            stream.once('close', function() { server.end(); });
            const data
            stream.pipe(data)
            res.render('message',{
                history: data
            })
        })
    })
    await server.connect({
        host: 'ftpupload.net',
        user: 'if0_34979074',
        password: 'mqwiH8x16sv'
    })
}

module.exports = chatHistory
