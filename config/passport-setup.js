const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/model')
const friendsData  = require('../data/friends')
const suggestionsData = require("../data/suggestions")

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user)
    })
})



passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/api/google/redirect'
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({username:profile._json.email}).then(user=>{
        if(user){
            done(null,user)
        }else{
            new User({
                username: profile._json.email,
                password: profile.id,
                name: profile._json.name,
                suggestions: suggestionsData,
                friends: friendsData,
                posts: [],
                personalInfo: {
                    date: '--/--/--',
                    interest: 'Interests',
                    residence: 'Residence',
                    phone: 'Phone',
                    prof: 'Profession',
                    email: 'Email'
                },
                profileImage: profile._json.picture,
                backgroundImage: '',
                notifications: [],
                active: false,
                lastActive: '',
                groupChats: []
            }).save().then(()=>done(null,user)).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))
}))

