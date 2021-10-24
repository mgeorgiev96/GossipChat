import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonAddIcon from  '@mui/icons-material/PersonAdd'
import {connect} from 'react-redux'

function Suggestions(props) {
  return (
    <List sx={{ width: '100%', maxWidth: 360}} style={{borderBottom: '1px solid lightgrey'}}>
      {props.chat.user.suggestions ? props.chat.user.suggestions.map(sug=>{
        return <ListItem alignItems="center" style={{display:'flex',justifyContent:"space-between"}}>
              <ListItemAvatar className="itemAvatar">
                <Avatar alt="Remy Sharp" src={sug.image} style={{border:"2px solid lightgrey"}}/>
                <Typography className="user_name">{sug.name}</Typography>
              </ListItemAvatar>
                <div className="friend_chat_tab">
                  <PersonAddIcon className="icon_add" style={{margin: "0 10px",cursor:"pointer"}} fontSize="medium"/>
                </div>
            </ListItem>


      }):""}
    </List>
  );
}

const mapStateToProps = state =>{
  return {
    chat: state.chat
  }
}

export default connect(mapStateToProps)(Suggestions);