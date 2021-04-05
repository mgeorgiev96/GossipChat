import React,{useState} from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'


function CreateGroupChat(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const createGroupChat = (e)=>{
    let target=  e.target
    let name = target.value
    let filter = props.chat.user.groupChats.filter(i=> i.name === name)

    if(e.keyCode === 13 && filter.length === 0){
      axios.post('/create-groupChat',{name}).then(res=>{
          console.log(res.data)
        props.getUserInfo(res.data)
      })
    }else if(filter.length > 0){

    }
  }

  const body = (
    <form onSubmit={(e)=>e.preventDefault()} className='friend_search_container'>
      <h2 id="simple-modal-title">Create Group Chat</h2>
      <TextField onKeyDown={createGroupChat} style={{'width':'80%','margin': '10px auto'}} variant='outlined' label='Name of chat...'></TextField>
    </form>
  );

  return (
    <div>
        <i onClick={handleOpen} class="fas fa-plus-circle"></i>
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
    getUserInfo: (user)=> dispatch(ACTIONS.getUserInfo(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateGroupChat);