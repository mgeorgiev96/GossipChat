const router = require('express').Router()
const path = require('path')



router.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../public/index.html'))
})

router.get('/wrong-password',(req,res)=>{
    res.render('wrong-password')
})

router.get('/wrong-username',(req,res)=>{
    res.render('wrong-username')
})

router.get('/email-used',(req,res)=>{
    res.render('invalid')
})


module.exports = router