const ftp = require('basic-ftp')

const download = async (req,res)=>{
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "ftpupload.net",
            user: "if0_34989307",
            password: "BAW94rV25CA"
        })
      const name = Object.keys(req.body).toString()
      const file = './storage/'+name
      await client.downloadTo(file,name)
      res.download(file)
    }
    catch(e){
        res.send(e)
    }
}

module.exports = download
