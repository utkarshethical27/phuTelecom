const fs = require('fs')
const Client = require('ftp')

const chatHistory = async (req,res)=>{
    const server = new Client()
    server.on('ready',()=>{
        server.append('The greatest one!','hello.txt',(err)=>{
            if (err) console.log(err)
        })
        server.get('chatHistory.txt',(err,stream)=>{
            if (err) console.log(err)
            stream.once('close', function() { server.end(); });

      stream.pipe(fs.createWriteStream('./src/chatHistory.txt'));
        })
    })
    server.connect({
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
