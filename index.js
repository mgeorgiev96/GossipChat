const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')
const publicRouter =  require('./routes/public-routes.js')
const privateRouter = require('./routes/private-routes.js')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

mongoose.connect(process.env.MONGO_DB,{ useNewUrlParser: true ,useUnifiedTopology: true})



app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' ,extended:false }));
app.set('view engine','ejs')
app.use(express.static(path.resolve('./public')))
app.use(express.static(path.resolve('./static')))


app.use(cookieSession({
    keys: [process.env.SECRET_KEY],
    maxAge: 24*60*60*1000
}))

app.use(publicRouter)

app.use(passport.initialize())
app.use(passport.session())

app.use(privateRouter)


app.listen(PORT,()=>console.log(`Running on PORT:${PORT}.`))





