import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchFriend from './SearchFriend'
import Notifications from './Notifications'
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'


function ControlTabs(props) {

  return (
    <>
      <IconButton aria-label="add">
         <SearchFriend/>
      </IconButton>
      <IconButton aria-label="chats">
          <i className="fas fa-comments" onClick={()=> props.switchChats(false)}></i>
      </IconButton>
      <IconButton aria-label="group">
         <i className="fas fa-users" onClick={()=> props.switchChats(true)}></i>
      </IconButton>
      <IconButton aria-label="notification">
         <Notifications/>
      </IconButton>
      <IconButton aria-label="logout">
         <a href='/logout'><i className="fas fa-sign-out-alt"></i></a>
      </IconButton>
    </>
  );
}

const mapDispatchToProps = dispatch =>{
   return {
      switchChats: (res)=> dispatch(ACTIONS.switchChats(res))
   }
}

const mapStateToProps = state=>{
   return {
      chat: state.chat
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(ControlTabs);
