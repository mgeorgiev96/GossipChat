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


function SearchFriend(props) {
  const [open, setOpen] = useState(false);
  let filtered = props.chat.user.friends ? props.chat.user.friends.map(i=>i.username) : []
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sendNotification = (sender,receiver)=>{
    axios.post('/send-notification',{sender,receiver}).then(res=>console.log(res))
  }
  const searchUser = (e)=>{
    let target=  e.target
    let criteria = target.value
    if(e.keyCode === 13){
      axios.post('/search-user',{criteria}).then(res=>props.searchCriteria(res.data))
    }
  }

  const body = (
    <form onSubmit={(e)=>e.preventDefault()} className='friend_search_container'>
      <h2 id="simple-modal-title">Search User</h2>
      <TextField onKeyDown={searchUser} style={{'width':'80%','margin': '10px auto'}} variant='outlined' label='Name...'></TextField>
      <List style={{'width':'80%','margin': '0 auto','overflow':'auto'}} >
        {props.chat.searchCriteria ? props.chat.searchCriteria.map(item=>{
           if (filtered.includes(item.username)){

           }else{
             return <ListItem key={uniqid()}>
             <Avatar style={{'border':'2px solid black'}} src={item.image} />
                 <ListItemText style={{'margin':'0 20px'}} primary={item.name}/>
                 <ListItemIcon>
                     <i onClick={()=> sendNotification(props.chat.user.username,item.username)} className="fas fa-user-plus"></i>
                 </ListItemIcon>
             </ListItem>
           }
        }): 'No results.'}
      </List>
    </form>
  );

  return (
    <div>
        <i className="fas fa-user-plus" onClick={handleOpen}></i>
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
    searchCriteria: (result)=> dispatch(ACTIONS.searchCriteria(result))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchFriend);
