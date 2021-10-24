import React from 'react';
import Notifications from './Notifications'
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import ContentPaste from '@mui/icons-material/ContentPaste';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import axios from 'axios'
import {Link} from 'react-router-dom'
function ControlTabs(props) {

   const logoutUser = ()=>{
      axios.get('/logout').then(()=> window.location.reload())
    }
  return (
    <Paper className="side-navigation">
      <MenuList>
        <MenuItem>
          <ListItemIcon >
            <EmojiPeopleIcon style={{color:"seagreen"}} fontSize="large"/>
          </ListItemIcon>
          <ListItemText>Followers</ListItemText>
        </MenuItem>
        <Notifications/>
        <Link onClick={() => props.getUserProfile(props.chat.user)} to="user-profile">
          <MenuItem>
            <ListItemIcon>
            <AccountCircleRoundedIcon style={{color:"coral"}} fontSize="large" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem>
          <ListItemIcon>
            <StorefrontRoundedIcon style={{color:"#0e81ea"}} fontSize="large" />
          </ListItemIcon>
          <ListItemText>Market</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
          <ContentPaste style={{color:"orange"}} fontSize="large" />
          </ListItemIcon>
          <ListItemText>Activity</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <EventAvailableRoundedIcon style={{color:"lightblue"}} fontSize="large" />
          </ListItemIcon>
          <ListItemText>Events</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HistoryRoundedIcon style={{color:"purple"}} fontSize="large" />
          </ListItemIcon>
          <ListItemText>Memories</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BookmarksIcon style={{color:"teal"}} fontSize="large" />
          </ListItemIcon>
          <ListItemText>Bookmarks</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <GroupRoundedIcon style={{color:"#f4a460"}} fontSize="large" />
          </ListItemIcon>
          <ListItemText>Groups</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LiveTvRoundedIcon style={{color:"darkslateblue"}} fontSize="large" />
          </ListItemIcon>
          <ListItemText>Watch Live</ListItemText>
        </MenuItem>

        <MenuItem onClick={()=>logoutUser()}>
          <ListItemIcon>
            <ExitToAppRoundedIcon style={{color:"crimson"}} fontSize="large" />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}


const mapDispatchToProps = dispatch =>{
   return {
      switchChats: (res)=> dispatch(ACTIONS.switchChats(res)),
      getUserProfile: (user)=> dispatch(ACTIONS.getUserProfile(user))
   }
}

const mapStateToProps = state=>{
   return {
      chat: state.chat
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(ControlTabs);
