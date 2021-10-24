import React,{useState} from 'react';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import {connect} from 'react-redux'
import defProfPic from '../images/defProf.jpg'
import * as ACTIONS from '../store/actions'
import axios from 'axios'
import MailIcon from '@mui/icons-material/Mail';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';




function Notification(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotification = (response,sender,receiver,notifID)=>{
    axios.post('/handle-notification',{response,sender,receiver,notifID}).then(res=>{
      props.getUserInfo(res.data)
    })
  }

  const body = (
    <div className='friend_search_container'>
      <h2 id="simple-modal-title">Notifications</h2>
      <List style={{'width':'80%','margin': '0 auto','overflow':'auto'}} >
        {props.chat.user.notifications ? props.chat.user.notifications.map(notif=>{
          return  <ListItem key={notif.id}>
                  <Avatar style={{'border':'2px solid black'}} alt="Remy Sharp" src={notif.image!=="" ? notif.image : defProfPic} />
                      <ListItemText style={{'margin':'0 20px'}} primary={notif.notif} />
                      <ListItemIcon>
                          <i onClick={()=> handleNotification(true,props.chat.user.username,notif.username,notif.id)} className="fas fa-check-circle"></i>
                          <i onClick={()=> handleNotification(false,props.chat.user.username,notif.username,notif.id)} className="fas fa-times-circle"></i>
                      </ListItemIcon>
                  </ListItem>
        }) : ''}
      </List>
    </div>
  );

  return (
    <div>        
    <MenuItem onClick={handleOpen}> 
          <ListItemIcon>
            <Badge badgeContent={props.chat.user.notifications ? props.chat.user.notifications.length : 0} color="error" style={{marginLeft: "0"}}>
              <MailIcon style={{color:"grey"}} className="fas fa-envelope"  fontSize="large"></MailIcon>
            </Badge>
          </ListItemIcon>
        <ListItemText>Notifications</ListItemText>
    </MenuItem>
      
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
    getUserInfo: (user)=> dispatch(ACTIONS.getUserInfo(user))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Notification);