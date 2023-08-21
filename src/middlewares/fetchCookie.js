const cookieParser = require('cookie-parser')

const token = (req)=>{
    try{
        if (!req.headers.cookie.includes('pass')) {
        return req.headers.cookie.replace('jwt=','')
    }else{
        let cookie = req.headers.cookie.split(';')
        if (cookie[0].includes('pass')) {
              return cookie[1].replace('jwt=','')
        }else{
           return cookie[0].replace('jwt=','')
        }
    }
    } catch(e) {
        return false
        console.log(e)
    }
}

const npass = (req)=>{
    try{
        if (!req.headers.cookie.includes('pass')) {
        return false
        }else{
           let cookie = req.headers.cookie.split(';')
           if (cookie[0].includes('pass')) {
               return cookie[0].replace('npass=','')
           }else{
               return cookie[1].replace('npass=','')
           }
    }
    } catch(e) {
        return false
        console.log(e)
    }
}

module.exports = {
    token,
    npass
}
