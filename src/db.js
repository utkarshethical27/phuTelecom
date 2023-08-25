const db = require('mongoose')
let uri = "mongodb+srv://utkarshethical27:UTKARSH%40db27@phutelecom.gwbwooi.mongodb.net/?retryWrites=true&w=majority"

const connect = async ()=>{
    try{
        await db.connect(uri)
        console.log('Successfully connected to the database')
    }catch(e) {
        console.log('Connection unsuccessful')
        console.log(e )
    }
}
connect()

const phusSchema = db.Schema(
    {
    name: 'String',
    email: 'String',
    password: 'String',
    otp: 'String'
    }
)

const PHU = db.model('PHU',phusSchema)

async function fetch(mail) {
    try{
        const result  = await PHU.findOne({email: mail})
        return result
    }catch(e) {
        return false
    }
}

async function setCode(mail,code) {
    try{
        const result  = await PHU.findOneAndUpdate({email: mail},{
            otp: code
        })
        return result
    }catch(e) {
        return e
    }
}

async function changePass(mail,pass) {
    try{
        pass = decodeURI(pass)
        await PHU.findOneAndUpdate({email: mail},{password: pass})
    } catch(e) {
        console.log(e)
        return null
    }
}

module.exports  = {
    fetch,
    setCode,
    changePass
}
