const fs = require('fs')
const Client = require('ftp')

const chatHistory = async (req,res)=>{
    const server = new Client()
    server.on('ready',async ()=>{
        await server.get('chatHistory.txt',async (err,stream)=>{
            if (err) console.log(err)
            stream.once('close', function() { server.end(); });
            var readable = stream
            readable.on('data', function(his) {
                his.split('¿')
                his.forEach((e)=>{
                    if(e.includes('suzModBuf')){
                    const name = e.replace('suzModBuf','').split('~')[0]
                        await server.get('./Audio/'+name,async (err,stream)=>{
                            if (err) console.log(err)
                            stream.once('close', function() { server.end(); });
                            var audio = stream
                            audio.on('data', function(his) {
                                
                            })
                        })
                    }
                })
          })
    })
    await server.connect({
        host: 'ftpupload.net',
        user: 'if0_34989307',
        password: 'BAW94rV25CA'
    })
}

module.exports = chatHistory
