import React,{useEffect,useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import Avatar from '@mui/material/Avatar';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import GamesIcon from '@mui/icons-material/Games';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import * as ACTIONS from '../store/actions'

function Navigation(props) {
  const [value, setValue] = useState(window.location.pathname === "/user-profile" ? 1 : 0);

  useEffect(()=>{
    axios.get('/info').then(res=>{
        props.getUserInfo(res.data)
    })
},[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card  className="navigation-container">
    <Box className='logo-sign'>
        <Avatar style={{'backgroundColor':'lightseagreen',transform: 'scale(1.3)'}}>
          <DeviceHubIcon/>
      </Avatar>
      <h2>Gossip</h2>
    </Box>

    <Tabs TabIndicatorProps={{style: {backgroundColor: "lightseagreen"}}} value={value} onChange={handleChange} aria-label="icon label tabs example">
       <Tab icon={<Link className="nav-tab" to="/profile"><HomeRoundedIcon className="icon_tabs" /></Link>} />
      <Tab icon={<Link className="nav-tab" to="/user-profile"><AccountCircleRoundedIcon className="icon_tabs"/></Link>} />
      <Tab icon={<Link className="nav-tab" to="/profile"><StorefrontRoundedIcon className="icon_tabs"/></Link>} />
      <Tab icon={<Link className="nav-tab" to="/profile"><SupervisedUserCircleRoundedIcon className="icon_tabs"/></Link>} />
      <Tab icon={<Link className="nav-tab" to="/profile"><OndemandVideoRoundedIcon className="icon_tabs"/></Link>} />
      <Tab icon={<Link className="nav-tab" to="/profile"><GamesIcon className="icon_tabs"/></Link>} />
    </Tabs>
    <div className="right-side">
      
      <Avatar
        alt="Remy Sharp"
        src={props.chat.user.profileImage}
        style={{width:'60px',height:"60px",border:"2px solid lightgrey",margin:'5px 0'}}
      />
      <p>{props.chat.user.name}</p>
    </div>
    </Card>
  );
}

const mapStateToProps = state =>{
  return {
    chat: state.chat
  }
}
const mapDispatchToProps = dispatch=>{
  return {
      getUserInfo: (user)=> dispatch(ACTIONS.getUserInfo(user))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Navigation);