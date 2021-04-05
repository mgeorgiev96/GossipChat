import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux'
import uniqid from 'uniqid'
import defProfImage from '../images/defProf.jpg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import * as ACTIONS from '../store/actions'
import firebase from '../store/firebaseInit'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
const firestore = firebase.firestore()

function Friends(props) {
  const classes = useStyles();
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
    <>
    {!props.chat.switchChats ? (()=>{
      return   <List dense className={classes.root}>
      {props.chat.user.friends ? props.chat.user.friends.map(friend=>{
        return  <ListItem key={uniqid()} button style={{'backgroundColor': props.chat.currentChat.username === friend.username ? 'lightgrey' : 'white'}}>
            <ListItemAvatar>
              <div>
                <Link onClick={() => viewUserProfile(friend.username)} to='/user-profile'><img style={{'backgroundColor':'white'}} src={friend.profImage ? friend.profImage : defProfImage}/></Link>
              </div>
            </ListItemAvatar>
            <ListItemText primary={friend.name} />
            <ListItemSecondaryAction>
            <IconButton aria-label="chats">
                <i onClick={()=> setChatWithUser(friend.username) } className="fas fa-comment-dots"></i>
            </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
      }):""}
    </List>
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


export default connect(mapStateToProps,mapStateToDispatch)(Friends);
