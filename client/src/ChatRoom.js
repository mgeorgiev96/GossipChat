import React,{useEffect} from 'react'
import ChatDrawer from './ChatDrawer/ChatDrawer'
import ChatWindow from './Chat/ChatWindow'
import axios from 'axios'
import {connect} from 'react-redux'
import * as ACTIONS from './store/actions'


function ChatRoom(props) {
    useEffect(()=>{
        axios.get('/info').then(res=>{
            props.getUserInfo(res.data)
        })
    },[])
    return (
        <div className='chat_container'>
            <div className='chat'>
                <ChatDrawer/>
                <ChatWindow/>
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
