import React,{useEffect} from 'react'
import ChatDrawer from './ChatDrawer/ChatDrawer'
import ChatWindow from './Chat/ChatWindow'
import axios from 'axios'
import {connect} from 'react-redux'
import * as ACTIONS from './store/actions'
import Friends from './ChatDrawer/Friends'
import GroupChats from './ChatDrawer/GroupChats'
import ProfileContent from './Profile/ProfileContent'
import Navigation from './ChatDrawer/Navigation'


function ChatRoom(props) {

    return (
        <div className='chat_container'>
            <Navigation/>
            <div className='chat'>
                <ChatDrawer/>
                <ProfileContent/>
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
        getUserInfo: (user)=> dispatch(ACTIONS.getUserInfo(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom);
