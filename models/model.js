const mongoose = require('mongoose')
const Schema = mongoose.Schema


const User = new Schema({
    username: {
        required: true,
        type:String
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    friends: Array,
    groupChats: [],
    posts: Array,
    personalInfo: Object,
    profileImage: String,
    backgroundImage: String,
    notifications: Array,
    active: Boolean,
    lastActive: String

})

const UserModel  = mongoose.model('gossipUser',User)

module.exports = UserModel