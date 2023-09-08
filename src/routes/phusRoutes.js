const express = require('express')
const router = express.Router()
const verifyAuth = require('../middlewares/verifyAuth')
const fetchUser = require('../middlewares/fetchAuth')
const fetchCookie = require('../middlewares/fetchCookie')
const readDir = require('../middlewares/readDir')
const chatHistory = require('../middlewares/chatHistory')
const chatHistory = require('../middlewares/downloadFile')

router.get("/home", verifyAuth,(req,res)=>{
        const token = fetchCookie.token(req)
        const result = fetchUser.fetch(token)
        res.render("welcome",{
            name: result.name
        })
})
router.get("/account", verifyAuth,(req,res)=>{
        res.render("account")
})
router.get("/message", verifyAuth, chatHistory)
router.get("/profile", verifyAuth, (req,res)=>{
        const token = fetchCookie.token(req)
        const result = fetchUser.fetch(token)
        res.render("profile",{
            name: result.name,
            email: result.email
        })
})
router.get("/logout", verifyAuth,(req,res)=>{
    res.clearCookie('jwt')
    res.redirect('/login')
})
router.get("/passchange", verifyAuth,(req,res)=>{
    res.render("passchange")
})
router.get('/upload', verifyAuth,(req,res)=>{
    res.render('upload')
})
router.get('/download', verifyAuth, readDir)
router.post('/download', downloadFile)

module.exports = router
