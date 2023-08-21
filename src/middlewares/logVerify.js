require('dotenv').config()
const jwt = require('jsonwebtoken')
const fetchCookie = require('./fetchCookie')

const verify = async (req, res, next)=>{
    try{
        if (fetchCookie.token(req)) {
            res.redirect('/phus/home')
        }else{
           next() 
        }
    } catch(e) {
        console.log(e)
        next()
    }
}

module.exports =  verify
