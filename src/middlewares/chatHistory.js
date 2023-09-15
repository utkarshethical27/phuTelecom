const fs = require('fs')
const Client = require('ftp')
const ftp = require('basic-ftp')

const chatHistory = async (req,res)=>{
    const server = new Client()
    res.render('message')
    server.on('ready',async ()=>{
        await server.get('chatHistory.txt',async (err,stream)=>{
            res.send(stream)
            if (err) console.log(err)
            stream.once('close', function() { server.end(); });
            var readable = stream
            readable.on('data', async function(his) {
                res.render('message',{
                    history: his
                })
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
                        }
                        catch(e){
                          res.send(e)
                        }
                    }
                })
          })
    })
    await server.connect({
        host: 'ftpupload.net',
        user: 'if0_34989307',
        password: 'BAW94rV25CA'
    })
    })
}

module.exports = chatHistory
