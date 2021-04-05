import React,{useState} from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'
import uniqid from 'uniqid'


function AddGroupMember(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchUser = (e)=>{
    let matching = []
    let target=  e.target
    let criteria = target.value
    let regex = new RegExp(criteria,'i')
    if(e.keyCode === 13){
        props.chat.user.friends.map(friend=>friend.name.match(regex) ? matching.push(friend):'')
        props.searchCriteria(matching)
    }
  }

  const addGroupMember = (newUser,newUserName,chatName)=>{
      let chat = props.chat.user.groupChats.filter(chat=>chat.name === chatName)
      let users = chat[0].users.map(user=>user.username)
      if(!users.includes(newUser)){
        axios.post('/add-groupMember',{chatName,newUserName,newUser}).then(res=>props.userChat(res.data))
      }
  }
  

  const body = (
    <form onSubmit={(e)=>e.preventDefault()} className='friend_search_container'>
      <h2 id="simple-modal-title">Search User</h2>
      <TextField onKeyDown={searchUser} style={{'width':'80%','margin': '10px auto'}} variant='outlined' label='Name...'></TextField>
      <List style={{'width':'80%','margin': '0 auto','overflow':'auto'}} >
        {props.chat.searchCriteria ? props.chat.searchCriteria.map(item=>{
             return <ListItem key={uniqid()}>
             <Avatar style={{'border':'2px solid black'}} src={item.image} />
                 <ListItemText style={{'margin':'0 20px'}} primary={item.name}/>
                 <ListItemIcon>
                     <i onClick={()=>addGroupMember(item.username,item.name,props.chat.currentChat.name)} className="fas fa-user"></i>
                 </ListItemIcon>
             </ListItem>
        }): 'No results.'}
      </List>
    </form>
  );

  return (
    <div>
        <i style={{'cursor':'pointer'}} className="fas fa-user-plus" onClick={handleOpen}></i>
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
    searchCriteria: (result)=> dispatch(ACTIONS.searchCriteria(result)),
    getUserInfo: (user)=> dispatch(ACTIONS.getUserInfo(user)),
    userChat: (user)=> dispatch(ACTIONS.userChat(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddGroupMember);