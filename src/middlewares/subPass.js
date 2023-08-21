const jwt = require('jsonwebtoken')
const database = require('../db.js')
require('dotenv').config()
const fetchCookie = require('./fetchCookie')
const mailer = require('./mailer')

const subPass = async (req,res,next)=>{
    try{
        const otp = req.body.d1+req.body.d2+req.body.d3+req.body.d4+req.body.d5+req.body.d6 
        const token = fetchCookie.token(req)
        const mail = jwt.verify(token,process.env.SECRET_KEY)
        const user = await database.fetch(mail.email)
        if (otp == user.otp) {
            const npass = fetchCookie.npass(req)
            await database.changePass(user.email,npass.trim())
            const html = 'Dear customer,<br>Your PHU Telecom password has been successfully changed on <b>'+Date(Date.now()).replace(' GMT+0530 (India Standard Time)','')+'</b><br>If not changed by you, immediately contact the customer care service as soon as possible.<br>Thank You.'
            await mailer(user.email,'Your password has been changed.',html)
            res.clearCookie('jwt','npass')
            res.redirect('/login')
        }else{
            res.clearCookie('npass')
            res.render('otpverify',{
                message: 'Entered code is wrong'
            })
        }
    }catch(e) {
        console.log(e)
    }
}

module.exports = subPass

