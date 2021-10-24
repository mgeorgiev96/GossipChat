import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import {connect} from 'react-redux'
import Comment from './Comment'
import List from '@mui/material/List';
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import defProfImg from '../images/defProf.jpg'
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';

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
function Posts(props) {
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

    const likePost = (username,postID)=>{

      axios.post('/like-post',{
        receiver:username,
        sender:props.chat.user.username,
        postID,
        name: props.chat.user.name
      })
    }
    const leaveComment = (target,postID,receiver)=>{
      if(target.parentElement.children[0].children[1].children[0].value !== ""){
        axios.post('/leave-comment',{
          comment: target.parentElement.children[0].children[1].children[0].value,
          sender: props.chat.user.username,receiver ,postID,
          image: props.chat.user.profileImage,
          name:props.chat.user.name
        }).then(res=>{
  
          let image = res.data.profileImage ? res.data.profileImage : defProfImg
          target.parentElement.parentElement.children[1].innerHTML +=`<li class="MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiListItem-alignItemsFlexStart css-14owld3">
          <div class="MuiListItemAvatar-root MuiListItemAvatar-alignItemsFlexStart css-s1bfy">
            <div class="MuiAvatar-root MuiAvatar-circular css-3i9vrz">
              <img alt=${res.data.name} src=${image} class="MuiAvatar-img css-1hy9t21"></div>
              </div><div class="MuiListItemText-root MuiListItemText-multiline css-1xar93x">
                <span class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig">${res.data.name}</span>
                <p class="MuiTypography-root MuiTypography-body2 MuiListItemText-secondary css-mbfek">
          <span class="MuiTypography-root MuiTypography-body2 css-pg48dy"></span>${target.parentElement.children[0].children[1].children[0].value}</p></div></li>`
          target.parentElement.children[0].children[1].children[0].value = ''
        })
      }
    }
  return (
      <Card  className="post-container">
            <div className="post-content-container">
              {props.chat.user.posts ? props.chat.user.posts.map(post=>{
                let liked = post.likes.includes(props.chat.user.username)
                return <Card className="single-post" style={{height: post.image !== "" ? "500px" : "250px"}}>
                <CardHeader
                  avatar={
                  <Avatar src={post.userImage} aria-label="recipe" className={classes.avatar}>
                  </Avatar>
                  }
                  title={`${post.name} - ${post.postDesc} - ${post.date}`}
                  
              />

                  <Box className="post-image" style={{backgroundImage:`url(${post.image})`,border:"1px solid lightgrey" ,height: post.image!=="" ? "90%": "0"}}></Box>
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
      </Card>
  );
}

const mapStateToProps = state => {
  return {
    chat: state.chat
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);