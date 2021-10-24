import React,{useEffect} from 'react'
import ChatDrawer from '../ChatDrawer/ChatDrawer'
import ChatWindow from '../Chat/ChatWindow'
import axios from 'axios'
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'
import Friends from '../ChatDrawer/Friends'
import GroupChats from '../ChatDrawer/GroupChats'
import Navigation from '../ChatDrawer/Navigation'
import UserInfo from './UserInfo'


function Profile(props) {
    return (
        <div className='chat_container'>
            <Navigation/>
            <div className='chat'>
                <ChatDrawer/>
                <UserInfo/>
                <div className='friends_container'>
                    <Friends/>
                    <GroupChats/>
                    <ChatWindow/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        chat: state.chat
    }
}
const mapDispatchToProps = dispatch=>{
    return {
        getUserProfile: (user)=> dispatch(ACTIONS.getUserProfile(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);

