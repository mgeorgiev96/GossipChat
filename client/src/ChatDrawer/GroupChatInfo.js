import React,{useState} from 'react';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import axios from 'axios'
import uniqid from 'uniqid'




function GroupChatInfo(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeUser = (maker,user,chatName)=>{
    axios.post('/remove-groupMember',{maker,user,chatName}).then(res=>{
      props.userChat(res.data)
    })
  }


  const body = (

    <div className='friend_search_container'>
        {props.chat.switchChats ? (()=>{
            return <>
                <h4>{props.chat.currentChat.name}</h4>
                <h5>Members</h5>
            </>
        })():''}
        <List style={{'width':'80%','margin': '0 auto','overflow':'auto'}} >
        {props.chat.currentChat.maker ? (()=>{
            return <ListItem>
                            <ListItemText style={{'margin':'0 20px','fontWeight':'bold'}} primary={`${props.chat.currentChat.maker.name}(Owner)`} />
                    </ListItem>
        })():''}
        {props.chat.currentChat.users ? props.chat.currentChat.users.map(user=>{
          return  <ListItem key={uniqid()}>
                      <ListItemText style={{'margin':'0 20px'}} primary={user.name} />
                      <ListItemIcon>
                          {props.chat.currentChat.maker.email === props.chat.user.username || props.chat.user.username  === user.username ? <i onClick={()=>removeUser(props.chat.currentChat.maker.email,user.username,props.chat.currentChat.name)} className="fas fa-times-circle"></i> : ''}
                      </ListItemIcon>
                  </ListItem>
        }) : ''}
      </List>
    </div>
  );

  return (
    <div>
        <i style={{'marginRight':'10px','cursor':'pointer'}} onClick={handleOpen} class="fas fa-info-circle"></i>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    chat: state.chat
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    getUserInfo: (user)=> dispatch(ACTIONS.getUserInfo(user)),
    userChat: (user)=> dispatch(ACTIONS.userChat(user))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(GroupChatInfo);