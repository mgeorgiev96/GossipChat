import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import EditPersonalInfo from './EditPersonalInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function UserInfo(props) {
  const classes = useStyles();
  const [openFirst, setOpenFirst] = React.useState(false);
  const handleClickFirst = () => {
    setOpenFirst(!openFirst);
  };

  return (
      <div className='user_info'>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClickFirst}>
      <ListItemAvatar>
            <Avatar>
                <i className="fas fa-user"></i>
            </Avatar>
       </ListItemAvatar>
        <ListItemText primary="Personal Info" />
        {openFirst ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openFirst} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{'height':'100px','overflow':'auto'}}>
          {props.chat.userProfile && props.chat.userProfile.username === props.chat.user.username ? (()=>{
              return <ListItem button className={classes.nested}>
                  <ListItemIcon>
                  </ListItemIcon>
                <ListItemText primary={<EditPersonalInfo/>}/>
              </ListItem>
          })() :  ""}
          <ListItem button className={classes.nested}>
            <ListItemIcon>
               <i className="fas fa-birthday-cake"></i>
            </ListItemIcon>
            <ListItemText primary={props.chat.userProfile.personalInfo ? props.chat.userProfile.personalInfo.date :"Date of birth - --/--/----"} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
               <i className="fas fa-volleyball-ball"></i>
            </ListItemIcon>
            <ListItemText primary={props.chat.userProfile.personalInfo ? props.chat.userProfile.personalInfo.interest:"Interests - ----"} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
                <i className="fas fa-home"></i>
            </ListItemIcon>
            <ListItemText primary={props.chat.userProfile.personalInfo ? props.chat.userProfile.personalInfo.residence :"Residence - ----"} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
                 <i className="fas fa-phone"></i>
            </ListItemIcon>
            <ListItemText primary={props.chat.userProfile.personalInfo ? props.chat.userProfile.personalInfo.phone :"Phone - ----"} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
                    <i className="fas fa-suitcase"></i>
            </ListItemIcon>
            <ListItemText primary={props.chat.userProfile.personalInfo ? props.chat.userProfile.personalInfo.prof:"Profession - ----"} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
                <i className="fas fa-envelope"></i>
            </ListItemIcon>
            <ListItemText primary={props.chat.userProfile.personalInfo ? props.chat.userProfile.personalInfo.email:"Email - ----"}  />
          </ListItem>

        </List>
      </Collapse>
      <ListItem button>
      <ListItemAvatar>
            <Avatar>
                <i className="fas fa-comments"></i>
            </Avatar>
       </ListItemAvatar>
       <Link to='/profile'><ListItemText primary="Conversations" /></Link>
      </ListItem>
    </List>
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    chat: state.chat
  }
}

export default connect(mapStateToProps)(UserInfo);
