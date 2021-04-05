import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


function PersonalInfo(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  

  const countProfile = ()=>{
    let count = 0
    let userFriends = props.chat.userProfile.friends ? props.chat.userProfile.friends.map(i=>i.username) : []
    props.chat.user.friends.map(i=>userFriends.includes(i.username) ? count++ : '')

    return count
  }

  return (
    <div className='personal_info'>
          <div className={classes.demo}>
            <List dense={dense}>
            <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                       <i className="fas fa-users"></i>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Friends"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" style={{'fontSize':'1rem'}}>
                      {props.chat.userProfile.friends ? props.chat.userProfile.friends.length : 0 }
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                         <i className="fab fa-creative-commons-share"></i>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Posts"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" style={{'fontSize':'1rem'}}>
                      {props.chat.userProfile.posts ? props.chat.userProfile.posts.length : 0}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                  {props.chat.userProfile.username === props.chat.user.username ? "": (()=>{
                      return <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                              <i className="fas fa-handshake"></i>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Mutual"
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" style={{'fontSize':'1rem'}}>
                            {props.chat.userProfile.friends ? countProfile() : '0'}
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                  })()}
            </List>
          </div>
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    chat: state.chat
  }
}

export default connect(mapStateToProps)(PersonalInfo);
