require('dotenv').config()
const jwt = require('jsonwebtoken')
const database = require('../db.js')
const fetchCookie = require('./fetchCookie')

const auth = async (req, res, next)=>{
    try{
        const pass = encodeURIComponent(req.body.pass)
        const result = await database.fetch(req.body.email)
    if (result.password==pass) {
        const token = await jwt.sign({
            email: result.email,
            name: result.name
        },process.env.SECRET_KEY)
        if(fetchCookie.token(req)) {
            res.redirect('/phus/home')
        }else{
            res.cookie('jwt',token)
            res.redirect('/phus/home')
        }
    }
    else{
       res.render('login',{
           message: 'Email or password are incorrect'
       })
    }
    } catch(e) {
        res.render('login',{
           message: 'Email or password are incorrect'
       })
        console.log(e)
    }
}

module.exports = auth
    
