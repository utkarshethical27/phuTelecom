require('dotenv').config()
const jwt = require('jsonwebtoken')
const fetchCookie = require('./fetchCookie')

const auth = async (req, res, next)=>{
    try{
        let token = fetchCookie.token(req)
        if(token.includes('pass')) {
            token = token.split(';')[1].trim().replace('jwt=','')
        }else{
           token = token.replace('jwt=','') 
        }
        const result = jwt.verify(token,process.env.SECRET_KEY)
        console.log()
        next()
    } catch(e) {
        res.redirect('/login')
    }
}

module.exports = auth
