const router = require('express').Router()
const path = require('path')



router.get('/login',(req,res)=>{
    res.render("login")
})

router.get("/sign-up",(req,res)=>{
    res.render("signup")
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