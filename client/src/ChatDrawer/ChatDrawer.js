import React from 'react'
import Divider from '@material-ui/core/Divider'
import ControlTabs from './ControlTabs'
import Friends from './Friends'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import defProfPic from '../images/defProf.jpg'
import axios from 'axios'
import * as ACTIONS from '../store/actions'
import GroupChats from './GroupChats'

function ChatDrawer(props) {
    const getProfileData = (username)=>{
        axios.post('/profile-info',{username}).then(res=>{
            props.getUserProfile(res.data)
        })
    }
    return (
        <div className='drawer_container'>
                <div className='profile_summary'>
                <Link onClick={()=>getProfileData(props.chat.user.username)} to='/user-profile'><div className='profile_img' style={{'backgroundImage': props.chat.user.profileImage? `url(${props.chat.user.profileImage})` : `url(${defProfPic})` }}></div></Link>
                <h3>{props.chat.user ? props.chat.user.name : '' }</h3>
                </div>
                <Divider></Divider>
                <div className='friends_container'>
                    <Friends/>
                    <GroupChats/>
                </div>
                <Divider></Divider>
                <div className='control_tabs'>
                    <ControlTabs/>
                </div>
        </div>
    )
}

const mapStateToProps = state=>{
    return {
        chat: state.chat
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        getUserProfile: (user) => dispatch(ACTIONS.getUserProfile(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatDrawer);
