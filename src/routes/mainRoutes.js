const express = require("express")
const router = express.Router()
const loginAuth = require('../middlewares/loginAuth')
const changePass = require('../middlewares/changePass')
const subPass = require('../middlewares/subPass')
const  logVerify = require('../middlewares/logVerify')
const uploadFile = require('../middlewares/uploadFile')

router.get("",(req,res)=>{
    res.render("index")
})
router.get("/about",(req,res)=>{
    res.render("about")
})
router.get("/contact",(req,res)=>{
    res.render("contact")
})
router.get("/login", logVerify, (req,res)=>{
    res.render("login")
})
router.post('/login', loginAuth, (req,res)=>{
    res.status(200)
})
router.post('/passchange', changePass, (req,res)=>{
    res.redirect('/phus/passchange')
})
router.post('/subpass',subPass,(req,res)=>{
    res.send('Success')
})

module.exports = router
