import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {connect} from 'react-redux'
import uniqid from 'uniqid'
import defProfImage from '../images/defProf.jpg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import * as ACTIONS from '../store/actions'
import firebase from '../store/firebaseInit'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import Friend from './Friend'
import Suggestions from './Suggestions'
import SearchBar from './SearchBar'

const firestore = firebase.firestore()

function Friends(props) {
  const expandChat = async (username)=>{
    setChatWithUser(username)
    if(!props.chat.expand){
      await props.expandChat()
      let chatBottom = document.querySelector('.chat_window')
      chatBottom.scrollTop = chatBottom.scrollHeight
    }
  }
  const viewUserProfile = (username)=>{
    axios.post('/profile-info',{username}).then(res=>{
      props.getUserProfile(res.data)
    })
  }
  const setChatWithUser = (username)=>{
    axios.post('/profile-info',{username}).then(res=>{
      props.userChat(res.data)
      const senderRef = firestore.collection(props.chat.user.username).doc(res.data.username)
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
<Card className="friends-container">
      <SearchBar/>
      <h3 className="text-filler">Recent</h3>

      {!props.chat.switchChats ? (()=>{
      return   <List style={{ width: '100%',borderTop:'1px solid lightgrey'}}>
      {props.chat.user.friends ? props.chat.user.friends.map(friend=>{
        return <ListItem alignItems="center" key={uniqid()} style={{backgroundColor: props.chat.currentChat.username === friend.username ? 'lightgrey' : "" , width:"100%",borderBottom:"1px solid lightgrey"}}>
        <ListItemAvatar className="friend_avatar">
            <Link onClick={() => viewUserProfile(friend.username)} to="/user-profile"><Friend  src={friend.image ? friend.image : defProfImage}/></Link>
            <Typography className="user_name">{friend.name}</Typography>
        </ListItemAvatar>
        <div className="friend_chat_tab">
          <ChatBubbleRoundedIcon style={{cursor:"pointer"}} onClick={()=>expandChat(friend.username)}/>
        </div>
      </ListItem>

      }):""}
    </List>
    })():'' }
      <h4 className="text-filler">Suggested Followers</h4>
      <Suggestions/>
    </Card>
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
    getChat: (chat)=> dispatch(ACTIONS.getChat(chat)),
    expandChat: (friend)=> dispatch(ACTIONS.expandChat(friend))
  }
}


export default connect(mapStateToProps,mapStateToDispatch)(Friends);
