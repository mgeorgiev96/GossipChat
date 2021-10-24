import React,{useState} from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/SearchOutlined';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'
import uniqid from 'uniqid'
import PersonAddIcon from '@mui/icons-material/PersonAdd';


function SearchBar(props) {

  let filtered = props.chat.user.friends ? props.chat.user.friends.map(i=>i.username) : []

  const sendNotification = (sender,receiver)=>{
    axios.post('/send-notification',{sender,receiver}).then(res=>console.log(res))
  }
  const searchUser = ()=>{
    let target = document.querySelector(".search-value")
    axios.post('/search-user',{criteria:target.value}).then(res=>props.searchCriteria(res.data))
  }
  return (
    <>
    <Input
    onKeyDown={(e)=> e.keyCode === 13 ? searchUser() : null}
    inputProps={{className:"search-value"}}
    className="search-field-user"
    id="input-with-icon-adornment"
    placeholder="Search"
    startAdornment={
      <InputAdornment position="start">
        <SearchIcon style={{color:"grey"}} />
      </InputAdornment>
    }
/>
<List style={{'width':'80%','margin': '0 auto','overflow':'auto'}} >
        {props.chat.searchCriteria ? props.chat.searchCriteria.map(item=>{
           if (filtered.includes(item.username)){

           }else{
             return <ListItem key={uniqid()}>
             <Avatar style={{width:'40px',height:"40px",padding:"0!important",border:"1px solid lightgrey"}} src={item.image} />
                 <ListItemText style={{margin:'0 20px'}} primary={item.name}/>
                 <PersonAddIcon className="user-plus" style={{color:"none"}} onClick={()=> sendNotification(props.chat.user.username,item.username)} />
             </ListItem>
           }
        }): <span style={{fontFamily: "'Ruda', sans-serif"}}>No results.</span>}
      </List>
</>
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

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)