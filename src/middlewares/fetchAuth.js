require('dotenv').config()
const jwt = require('jsonwebtoken')
const fetchCookie = require('./fetchCookie')

const fetch = (token)=>{
    const result = jwt.verify(token,process.env.SECRET_KEY)
    return result
}

module.exports = {
    fetch
}
