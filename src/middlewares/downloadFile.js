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
      await client.downloadTo(
}

module.exports = download
