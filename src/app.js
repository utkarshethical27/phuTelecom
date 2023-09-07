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

app.use(express.static(pubPath))
app.set("view engine","hbs")
app.set("views",pubPath)
hbs.registerPartials(path.join(pubPath, "/components"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
/*app.use('/', mainRoutes)
app.use('/phus', phusRoutes)*/
app.get('',(req,res)=>{
    res.render('down')
})
require('dotenv').config()
app.use(fileUpload())

app.post('/phus/upload', uploadFile,(req,res)=>{
    res.status(200)
})

io.on('connection',(socket)=>{
    socket.on('message', async (param)=>{
        let user = await fetchUser.fetch(param.token)
        let history = param.msg+' ~ '+user.name+';'
        const s = new Client()
        await s.on('ready',()=>{
          await s.append(history,'chatHistory.txt',(err)=>{
            if (err) console.log(err)
          })
        })
        await server.connect({
          host: 'ftpupload.net',
          user: 'if0_34979074',
          password: 'mqwiH8x16sv'
        })
        io.emit('message',{
            msg: param.msg,
            name: user.name
        })
    })
})

server.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
