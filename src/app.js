const express = require("express")
const app = express()
const path = require("path")
const pubPath = path.join(__dirname,"../public")
const hbs = require("hbs")
const mainRoutes = require('./routes/mainRoutes')
const phusRoutes = require('./routes/phusRoutes')
const fileUpload = require('express-fileupload')
const uploadFile = require('./middlewares/uploadFile')
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const fetchUser = require('./middlewares/fetchAuth')
const fs = require('fs')
const port = process.env.PORT || 80
const Client = require('ftp')
const mailer = require('./middlewares/mailer')
const users = ['utkarshethical27@gmail.com','babyv0688@gmail.com','harshyadav16124phu@gmail.com']

app.use(express.static(pubPath))
app.set("view engine","hbs")
app.set("views",pubPath)
hbs.registerPartials(path.join(pubPath, "/components"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', mainRoutes)
app.use('/phus', phusRoutes)
require('dotenv').config()
app.use(fileUpload())

app.post('/phus/upload', uploadFile,(req,res)=>{
    res.status(200)
})

io.on('connection',async (socket)=>{
    socket.on('message', async (param)=>{
        let user = await fetchUser.fetch(param.token)
        users.forEach((e)=>{
            mailer(e,'New Message!',`Hello user, You have received a message from <b>${user.name}</b> :<br><b>${param.msg}</b><br>You can reply here https://phutelecom.onrender.com/phus/message`)
        })
        let history = param.msg+' ~ '+user.name+'¿'
        const s = new Client()
        await s.on('ready',async ()=>{
          await s.append(history,'chatHistory.txt',(err)=>{
            if (err) console.log(err)
          })
        })
        await s.connect({
            host: 'ftpupload.net',
            user: 'if0_34989307',
            password: 'BAW94rV25CA'
        })
        io.emit('message',{
            msg: param.msg,
            name: user.name
        })
    })
    socket.on('audio', async (param)=>{
        let user = await fetchUser.fetch(param.token)
        /*users.forEach((e)=>{
            mailer(e,'New Message!',`Hello user, You have received an audio from <b>${user.name}</b><br>You can reply here https://phutelecom.onrender.com/phus/message`)
        })*/
        console.log(param.audio)
        let name
        const s = new Client()
        await s.on('ready',async ()=>{
            await s.cd('Audio')
            name = await s.uploadFrom(param.audio,'audio.mp3')
            let history = name+' ~ '+user.name+'¿'
            await s.cd('../')
            await s.append(history,'chatHistory.txt',(err)=>{
                if (err) console.log(err)
            })
        })
        await s.connect({
            host: 'ftpupload.net',
            user: 'if0_34989307',
            password: 'BAW94rV25CA'
        })
        io.emit('audio',{
            audio: name,
            name: user.name
        })
    })
})

server.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
