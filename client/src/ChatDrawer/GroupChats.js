import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux'
import uniqid from 'uniqid'
import defUsers from '../images/defUsers.jpg'
import * as ACTIONS from '../store/actions'
import firebase from '../store/firebaseInit'
import CreateGroupChat from './CreateGroupChat'
import axios from 'axios'


const firestore = firebase.firestore()

function GroupChats(props) {

  const setChatWithUser = (group)=>{
      props.userChat(group)
      axios.post('/getGroupChat',{username:group.maker.email,name:group.name}).then(res=>{
        props.userChat(res.data)
        const senderRef = firestore.collection(group.maker.email).doc(group.name)
        senderRef.get().then(s=>{
          if(s.data()){
            props.getChat(s.data().message)
          }else{
            props.getChat([])
          }
          let conversation = document.querySelector(".conversation_window")
          conversation.scrollTop = conversation.scrollHeight
        })
      })
  }


  return (
    <>
    {props.chat.switchChats ? (()=>{
      return <><div style={{'display':'flex','justifyContent':'center','borderBottom':"1px solid lightgrey"}}>
      <h4>Create Group Chat  <IconButton aria-label="chats" style={{'color': '#1D976C'}}>
          <CreateGroupChat/>
      </IconButton></h4>
      </div>
      <ul className='group_chats'>
      {props.chat.user.groupChats ? props.chat.user.groupChats.map(group=>{
        return  <li key={uniqid()} style={{'backgroundColor': props.chat.currentChat.name === group.name ? 'lightgrey' : 'white'}}>
                <span style={{'margin':'0 10px'}}>
                  <img style={{'background':'white','borderRadius':'50%'}} src={defUsers}/>
                </span>
                <p style={{'marginTop':'15px'}}>{group.name}</p>
                <span className='options_c' style={{'float':'left','display':'flex','justifyContent':'center'}}>
                  <i style={{'cursor':'pointer'}} onClick={()=> setChatWithUser(group) } className="fas fa-comment-dots"></i>
                </span>
          </li>
      }):""}
    </ul></>
    })():'' }
    </>
  );
}

const mapStateToProps = state =>{
  return {
    chat: state.chat
  }
}

const mapStateToDispatch = dispatch =>{
  return {
    getUserProfile: (user)=> dispatch(ACTIONS.getUserProfile(user)),
    userChat: (user)=> dispatch(ACTIONS.userChat(user)),
    getChat: (chat)=> dispatch(ACTIONS.getChat(chat))
  }
}


export default connect(mapStateToProps,mapStateToDispatch)(GroupChats);
