const mailer = require('nodemailer')
const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS
    }
})

const sendMail = async (to,sub,html)=>{
    await transporter.sendMail({
        from: process.env.GMAIL,
        to: to,
        subject: sub,
        html: html
    })
}

module.exports = sendMail
