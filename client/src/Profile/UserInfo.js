
import React from 'react';
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import defProfImg from '../images/defProf.jpg'
import * as ACTIONS from '../store/actions'
import UserProfile from './UserProfile'
import Comment from './Comment'
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import Collapse from '@material-ui/core/Collapse';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function UserInfo(props) {



  const classes = useStyles();
  const expandSinglePanel =  (e)=>{
    let element = e.target.parentElement.parentElement.parentElement.children[3]
    if(element && element.classList){
      if(element.classList.contains("closed")){
        element.classList.remove("closed")
        element.classList.add("open")
        element.style.height = "100%"
      }else{
        element.classList.remove("open")
        element.classList.add("closed")
        element.style.height = "25%"
      }
    }
  }

  const leaveComment = (e)=>{
    let target = e.target

    axios.post('/leave-comment',{
      comment: target.parentElement.parentElement.parentElement.children[0].children[1].children[0].value,
      sender: props.chat.user.username,receiver : props.chat.userProfile.username ,postID:target.classList[2],
      image: props.chat.user.profileImage,
      name:props.chat.user.name
    }).then(res=>{
      let image = props.chat.userProfile.profileImage ? props.chat.userProfile.profileImage : defProfImg
      target.parentElement.parentElement.parentElement.parentElement.children[6].innerHTML += `<li>
      <div style="background-image: url(${image})"></div>
      <p><strong>${props.chat.userProfile.name}:</strong>  ${target.parentElement.parentElement.parentElement.children[0].children[1].children[0].value}</p>
    </li>`
    target.parentElement.parentElement.parentElement.children[0].children[1].children[0].value = ''
    })
  }

  const likePost = (e)=>{
    let target = e.target
    axios.post('/like-post',{
      receiver:props.chat.userProfile.username,
      sender:props.chat.user.username,
      postID:target.classList[2],
      name: props.chat.user.name
    }).then(res=>{
      let parent  = target.parentElement
      parent.innerHTML = `<i style="color:green;" class="far fa-thumbs-up">${res.data.likes.length}</i>`
    })
  }

  return (
    <div className='profile_content'>
      <UserProfile/>
      <div  className="post-container">
            <div className="post-content-container" style={{height: "45vh"}}>
              {props.chat.userProfile.posts ? props.chat.userProfile.posts.map(post=>{
                let liked = post.likes.includes(props.chat.user.username)
                return <Card className="single-post" style={{height: post.image !== "" ? "500px" : "250px"}}>
                <CardHeader
                  avatar={
                  <Avatar src={post.userImage} aria-label="recipe" className={classes.avatar}>
                  </Avatar>
                  }
                  title={`${post.name} - ${post.postDesc} - ${post.date}`}
              />

                  <Box className="post-image" style={{backgroundImage:`url(${post.image})`,border:"1px solid lightgrey",height: post.image!=="" ? "90%": "0"}}></Box>
                  <CardActions disableSpacing>
                      <FavoriteIcon onClick={!liked ? async (e)=>{
                        await likePost(post.username,post.id)
                        e.target.style.color = "red"
                      }:null} className="post_icon" style={{color: liked ? "red" : "",cursor:"pointer"}}/>
                      <ArrowDropDownCircleIcon  onClick={(e)=>expandSinglePanel(e)} className="post_icon" style={{cursor:"pointer"}} />
                  </CardActions>
                  <Collapse className="closed" in={true} timeout="auto" unmountOnExit style={{overflow:"auto",height:"25%"}}>
                      <CardContent>
                      <div className='post_comments_field'>
                                <TextField label="Add Comment" style={{background: "white",padding:"3px 10px",borderRadius:"5px"}}/>
                                <AddCommentRoundedIcon onClick={(e)=> e.target.classList.contains("MuiSvgIcon-root") ?  leaveComment(e.target,post.id,post.username):null} style={{cursor:"pointer",marginLeft:"5px"}}/>
                      </div>
                      <List style={{width:'100%'}} className={post.id}>
                        {post.comments.map(comment=>{
                          return <Comment image={comment.image} name={comment.name} description={comment.comment}/>
                        })}
                      </List>
                      </CardContent>
                  </Collapse>
              </Card>
              }):""}
            </div>
      </div>
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
    getUserProfile: (user)=> dispatch(ACTIONS.getUserProfile(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfo);