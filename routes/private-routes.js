const router = require('express').Router()
const path = require('path')
const bcrypt = require('bcrypt')
const User =  require('../models/model')
const uniqid = require('uniqid')
const passport = require('passport')
const suggestionData =  require("../data/suggestions")
const friendsData = require("../data/friends")


const userAuth = (req,res,next)=>{
    if(!req.session.user){
        res.redirect('/')
    }else{
        next()
    }
}


router.get('/profile',userAuth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../public/index.html'))
})

router.get('/user-profile',userAuth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../public/index.html'))
})

router.post('/update-background',(req,res)=>{
    User.update({username:req.body.username},{
        $set: {backgroundImage: req.body.image}
    }).then(()=> {
        User.findOne({username: req.body.username}).then(user=>{
            req.session.user = {
                username: user.username,
                name: user.name,
                friends: user.friends,
                suggestions: user.suggestions,
                posts: user.posts,
                personalInfo: user.personalInfo,
                profileImage: user.profileImage,
                backgroundImage: user.backgroundImage,
                notifications: user.notifications,
                active: user.active,
                lastActive: user.lastActive,
                groupChats: user.groupChats
            }
            res.send(req.session.user)
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

router.post('/update-profile',(req,res)=>{
    User.update({username:req.body.username},{
        $set: {profileImage: req.body.image}
    }).then(()=> {
        User.findOne({username: req.body.username}).then(user=>{
            req.session.user = {
                username: user.username,
                name: user.name,
                friends: user.friends,
                suggestions: user.suggestions,
                posts: user.posts,
                personalInfo: user.personalInfo,
                profileImage: user.profileImage,
                backgroundImage: user.backgroundImage,
                notifications: user.notifications,
                active: user.active,
                lastActive: user.lastActive,
                groupChats: user.groupChats
            }
            res.send(req.session.user)
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

router.post('/profile-info',(req,res)=>{
    User.findOne({username:req.body.username}).then(user=>{
        res.send({
            username: user.username,
            name: user.name,
            friends: user.friends,
            suggestions: user.suggestions,
            posts: user.posts,
            personalInfo: user.personalInfo,
            profileImage: user.profileImage,
            backgroundImage: user.backgroundImage,
            notifications: user.notifications,
            active: user.active,
            lastActive: user.lastActive,
            groupChats: user.groupChats
        })
    }).catch(err=>console.log(err))
})
router.get('/info',(req,res)=>{
    User.findOne({username:req.session.user.username}).then(user=>{
        res.send({
            username: user.username,
            name: user.name,
            friends: user.friends,
            suggestions: user.suggestions,
            posts: user.posts,
            personalInfo: user.personalInfo,
            profileImage: user.profileImage,
            backgroundImage: user.backgroundImage,
            notifications: user.notifications,
            active: user.active,
            lastActive: user.lastActive,
            groupChats: user.groupChats
        })
    }).catch(err=>console.log(err))
})
router.get('/logout',(req,res)=>{
    User.update({username:req.session.user.username},{
        $set: {active: false}
    }).then(()=>{
        User.update({username:req.session.user.username},{
            $set: {lastActive:Date.now()}
        }).then(()=>{
            if(req.user){
                req.logout()
            }
            req.session.user = null
            res.redirect('/')
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})
router.post('/login',(req,res)=>{
    User.findOne({username:req.body.username}).then(user=>{
        if(user){
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(result){
                    User.update({username:user.username},{
                        $set: {active:true}
                    }).then(()=>{
                        req.session.user = {
                            username: user.username,
                            name: user.name,
                            friends: user.friends,
                            suggestions: user.suggestions,
                            posts: user.posts,
                            personalInfo: user.personalInfo,
                            profileImage: user.profileImage,
                            backgroundImage: user.backgroundImage,
                            notifications: user.notifications,
                            active: user.active,
                            lastActive: user.lastActive,
                            groupChats: user.groupChats
                        }
                        res.redirect('/profile')
                    })
                }else{
                    res.redirect('/wrong-password')
                }
            })
        }else{
            res.redirect('/wrong-username')
        }
    })
})

router.post('/create-account',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        User.findOne({username:req.body.username}).then(user=>{
            if(user){
                res.redirect('/email-used')
            }else{
                new User({
                    username: req.body.username,
                    password: hash,
                    name: req.body.name,
                    suggestions: suggestionData,
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
                    profileImage: '',
                    backgroundImage: '',
                    notifications: [],
                    active: false,
                    lastActive: '',
                    groupChats: []
                }).save().then(()=>res.redirect("/")).catch(err=>console.log(err))
            }
        }).catch(err=>console.log(err))
    })
})

router.post('/save-personal',(req,res)=>{

    User.findOne({username:req.body.username}).then(user=>{
        User.update({username:req.body.username},{
            $set: {personalInfo:{
                date: req.body.date ? req.body.date : user.personalInfo.date,
                interest: req.body.interest ? req.body.interest : user.personalInfo.interest,
                residence: req.body.residence ? req.body.residence : user.personalInfo.residence,
                phone: req.body.phone ? req.body.phone : user.personalInfo.phone,
                prof: req.body.prof ? req.body.prof : user.personalInfo.prof,
                email: req.body.email ? req.body.email : user.personalInfo.email,
            }}
        }).then(()=>{
            User.findOne({username:req.body.username}).then(userA=>{
                res.send({
                    username: userA.username,
                    name: userA.name,
                    friends: userA.friends,
                    suggestions: userA.suggestions,
                    posts: userA.posts,
                    personalInfo: userA.personalInfo,
                    profileImage: userA.profileImage,
                    backgroundImage: userA.backgroundImage,
                    notifications: userA.notifications,
                    active: userA.active,
                    lastActive: userA.lastActive,
                    groupChats: userA.groupChats
                })
            }).catch(err=>console.log(err))
        })
    }).catch(err=>console.log(err))
})


router.post('/search-user',(req,res)=>{
    let relatedSearches = []
    let regex = new RegExp(req.body.criteria,'i')

    User.find({}).then(data=>{
        data.map(user=> user.name.match(regex) && user.username !== req.session.user.username ? relatedSearches.push({
            name: user.name,
            image: user.profileImage,
            username: user.username
        }) : '')
    }).then(()=>res.send(relatedSearches)).catch(err=>console.log(err))
})

router.post('/send-notification',(req,res)=>{
    User.findOne({username:req.body.sender}).then(user=>{
        User.findOne({username: req.body.receiver}).then(userA=>{
            let noRepeatNotif = userA.notifications.map(i=>i.username)
            if(noRepeatNotif.includes(req.body.sender)){

            }else{
                User.update({username: req.body.receiver},{
                    $push: {notifications: {id:uniqid(),notif: `${user.name} send you a friend request.`,image: user.profileImage,username: user.username}}
                }).then(()=>res.send('complete')).catch(err=>console.log(err))
            }
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

router.post('/handle-notification',(req,res)=>{
    if(req.body.receiver){
        if(req.body.response){
            User.findOne({username:req.body.sender}).then(user=>{
                User.update({username:req.body.receiver},{
                    $push: {friends: {username: user.username , name:user.name, image:user.profileImage}}
                }).then(()=>{
                    User.update({username:req.body.receiver},{
                        $push: {notifications:{notif: `${user.name} accepted your invitation.`,id: uniqid()}}
                    }).catch(err=>console.log(err))
                }).then(()=>{
                    User.findOne({username:req.body.receiver}).then(userA=>{
                        User.update({username:req.body.sender},{
                            $pull: {notifications: {id:req.body.notifID}},
                            $push: {friends: {username: userA.username , name:userA.name, image:userA.profileImage}}
                        }).then(()=>{
                            User.findOne({username: req.body.sender}).then(i=>{
                                req.session.user = {
                                    username: i.username,
                                    name: i.name,
                                    friends: i.friends,
                                    suggestions: i.suggestions,
                                    posts: i.posts,
                                    personalInfo: i.personalInfo,
                                    profileImage: i.profileImage,
                                    backgroundImage: i.backgroundImage,
                                    notifications: i.notifications,
                                    active: i.active,
                                    lastActive: i.lastActive,
                                    groupChats: i.groupChats
                                    
                                }
                                res.send(req.session.user)
                            }).catch(err=>console.log(err))
                        })
                    })
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }else{
            User.update({username: req.body.sender},{
                $pull: {notifications: {id:req.body.notifID}}
            }).then(()=>{
                User.findOne({username: req.body.sender}).then(i=>{
                    req.session.user = {
                        username: i.username,
                        name: i.name,
                        friends: i.friends,
                        suggestions: i.suggestions,
                        posts: i.posts,
                        personalInfo: i.personalInfo,
                        profileImage: i.profileImage,
                        backgroundImage: i.backgroundImage,
                        notifications: i.notifications,
                        active: i.active,
                        lastActive: i.lastActive,
                        groupChats: i.groupChats
                    }
                    res.send(req.session.user)
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
    }else{
        User.update({username: req.body.sender},{
            $pull: {notifications: {id:req.body.notifID}}
        }).then(()=>{
            User.findOne({username: req.body.sender}).then(user=>{
                req.session.user = {
                    username: user.username,
                    name: user.name,
                    friends: user.friends,
                    suggestions: user.suggestions,
                    posts: user.posts,
                    personalInfo: user.personalInfo,
                    profileImage: user.profileImage,
                    backgroundImage: user.backgroundImage,
                    notifications: user.notifications,
                    active: user.active,
                    lastActive: user.lastActive,
                    groupChats: user.groupChats
                }
                res.send(req.session.user)
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    }
})


router.post('/create-post',(req,res)=>{

    User.update({username:req.body.username},{
        $push: {posts: {id: uniqid(),
            postTitle: req.body.postTitle,
            postDesc: req.body.postDesc, image: req.body.image ? req.body.image : '' ,comments: [],likes:[],date:req.body.date,userImage:req.body.userImage,username:req.body.username,name:req.body.name}}
    }).then(()=>{
        User.findOne({username:req.body.username}).then(user=>{
            req.session.user = {
                username: user.username,
                name: user.name,
                friends: user.friends,
                suggestions: user.suggestions,
                posts: user.posts,
                personalInfo: user.personalInfo,
                profileImage: user.profileImage,
                backgroundImage: user.backgroundImage,
                notifications: user.notifications,
                active: user.active,
                lastActive: user.lastActive,
                groupChats: user.groupChats
            }
            res.send(req.session.user)
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

router.post('/leave-comment',(req,res)=>{

    let post = ''
    User.findOne({username:req.body.receiver}).then(user=>{
         user.posts.map(p=>p.id === req.body.postID ? post = p : '')
         post.comments.push({comment: req.body.comment,image:req.body.image,name:req.body.name})
    }).then(()=>{
        User.updateOne({username:req.body.receiver},{
            $pull: {posts:{id:req.body.postID}}
        }).then(()=>{
            User.updateOne({username:req.body.receiver},{
                $push: {posts:post}
            }).then(()=>{
                if(req.body.receiver !== req.body.sender){
                    User.updateOne({username:req.body.receiver},{
                        $push: {notifications:{id:uniqid(),notif:`${req.body.name} commented your post ${post.postTitle}.`}}
                    }).catch(err=>console.log(err))
                }
            }).then(()=>{
                User.findOne({username:req.body.receiver}).then(userA=>{
                    res.send({
                        username: userA.username,
                        name: userA.name,
                        friends: userA.friends,
                        suggestions: userA.suggestions,
                        posts: userA.posts,
                        personalInfo: userA.personalInfo,
                        profileImage: userA.profileImage,
                        backgroundImage: userA.backgroundImage,
                        notifications: userA.notifications,
                        active: userA.active,
                        lastActive: userA.lastActive,
                        groupChats: userA.groupChats
                    })
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        })
    }).catch(err=>console.log(err))
})

router.post('/like-post',(req,res)=>{
    let post = ''
    User.findOne({username:req.body.receiver}).then(user=>{
        user.posts.map(p=> p.id === req.body.postID ? post = p :'')
        post.likes.push(req.body.sender)
    }).then(()=>{
        User.update({username:req.body.receiver},{
            $pull: {posts:{id:req.body.postID}}
        }).catch(err=>console.log(err))
    }).then(()=>{
        User.update({username: req.body.receiver},{
            $push: {posts:post}
        }).catch(err=>console.log(err))
    }).then(()=>{
        if(req.body.receiver!== req.body.sender){
            User.update({username:req.body.receiver},{
                $push: {notifications: {id:uniqid(),notif:`${req.body.name} liked your post ${post.postTitle}.` }}
            }).catch(err=>console.log(err))
        }
    }).then(()=>{
        res.send(post)
    }).catch(err=>console.log(err))
})

router.post('/create-groupChat',(req,res)=>{
    User.update({username: req.session.user.username},{
        $push: {groupChats: {name:req.body.name,users:[],maker:{email: req.session.user.username,name:req.session.user.name}}}
    }).then(()=>{
        User.findOne({username:req.session.user.username}).then(user=>{
            res.send({
                username: user.username,
                name: user.name,
                friends: user.friends,
                suggestions: user.suggestions,
                posts: user.posts,
                personalInfo: user.personalInfo,
                profileImage: user.profileImage,
                backgroundImage: user.backgroundImage,
                notifications: user.notifications,
                active: user.active,
                lastActive: user.lastActive,
                groupChats: user.groupChats
            })
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

router.post('/add-groupMember',(req,res)=>{
    let users = []
    User.findOne({username:req.session.user.username}).then(user=>{
        user.groupChats.map(i=> i.name === req.body.chatName ? users = i : '')
        users.users.push({username:req.body.newUser,name:req.body.newUserName})
    }).then(()=>{
        User.update({username:req.session.user.username},{
            $pull: {groupChats: {name:req.body.chatName}}
        }).then(()=>{
            User.update({username:req.session.user.username},{
                $push: {groupChats: users}
            }).then(()=>{
                User.update({username:req.body.newUser},{
                    $push: {groupChats:users}
                }).then(()=>{
                    User.findOne({username:req.session.user.username}).then(userA=>{
                        let data  = ''
                        userA.groupChats.map(chat=>chat.name === req.body.chatName ? data = chat : '')
                        res.send(data)
                    }).catch(err=>console.log(err))
                })
            })
        })
    }).catch(err=>console.log(err))
})
router.post('/remove-groupMember',(req,res)=>{
    let chat = ''
    User.findOne({username:req.body.maker}).then(user=>{
        user.groupChats.map(group=>group.name === req.body.chatName ? chat = group :'')
        chat.users = chat.users.filter(user=>user.username !== req.body.user)
    }).then(()=>{
        User.update({username:req.body.maker},{
            $pull: {groupChats:{name:req.body.chatName}}
        }).then(()=>{
            User.update({username:req.body.maker},{
                $push: {groupChats:chat}
            }).then(()=>{
                User.update({username: req.body.user},{
                    $pull: {groupChats:{name:req.body.chatName}}
                }).then(()=>{
                    User.findOne({username:req.body.maker}).then(userA=>{
                        let data  = ''
                        userA.groupChats.map(chat=>chat.name === req.body.chatName ? data = chat : '')
                        res.send(data)
                    }).catch(err=>console.log(err))
                })
            })
        })
    }).catch(err=>console.log(err))
})

router.post('/getGroupChat',(req,res)=>{
    let chat = ''
    User.findOne({username:req.body.username}).then(user=>{
        user.groupChats.map(group=>group.name === req.body.name ? chat = group : '')
        res.send(chat)
    }).catch(err=>console.log(err))
})


router.get('/api/google',passport.authenticate('google',{
    scope: ['https://www.googleapis.com/auth/plus.login','email'],
    prompt: ['select_account']
}))

router.get('/api/google/redirect',passport.authenticate('google'),(req,res)=>{
    User.update({username:req.user.username},{
        $set: {active:true}
    }).then(()=>{
        req.session.user = req.user
        res.redirect('/profile')
    })
})

module.exports  = router