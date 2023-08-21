require('dotenv').config()
const jwt = require('jsonwebtoken')
const database = require('../db.js')
const mailer = require('./mailer')
const otpGenerator = require('otp-generator')
const fetchCookie = require('./fetchCookie')
let user

const sendCode = async (req,res,next)=>{
    try{
        const token = await jwt.verify(fetchCookie.token(req),process.env.SECRET_KEY)
        const user = await database.fetch(token.email)
        const code = otpGenerator.generate(6,{
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })
        
        const html = 'Dear customer,<br>Your verification code to reset your PHU Telecom  password  is : <b>'+code+'</b><br>If not requested by you, kindly contact the customer care service to block your account.<br>Thank You'
        await mailer(user.email,'Confirm your email address',html)
        const result = await database.setCode(token.email,code)
        res.cookie('npass',req.body.newPass)
        res.render('otpverify')
            }catch(e){
        console.log(e)
    }
}

module.exports = sendCode
