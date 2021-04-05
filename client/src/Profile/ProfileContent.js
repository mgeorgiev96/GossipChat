import React,{useState} from 'react';
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import CreatePost from './CreatePost'
import uniqid from 'uniqid'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import defProfImg from '../images/defProf.jpg'
import * as ACTIONS from '../store/actions'



function ProfileContent(props) {

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
  const handleClick = (e) => {
    let target = e.target
    let container = target.parentElement.parentElement.children[6]

    if(!container.classList.contains('post_comments_container_visible')){
      container.classList.add('post_comments_container_visible')
    }else{
      container.classList.remove('post_comments_container_visible')
    }
  };

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
      <div className='profile_content_header'>
        <h2>Feed</h2>
        <div>
          <IconButton aria-label="add">
             <CreatePost/>
          </IconButton>
        </div>
      </div>
      <div className='post_container'>
        {props.chat.userProfile.posts? props.chat.userProfile.posts.map(post=>{
          if(post.image !== ''){
            return <><div className='post' key={uniqid()}>
                    <div className='post_image' style={{'backgroundImage':`url(${post.image})`}}></div>
                    <div className='post_content'>
                      <div className='post_description'>
                          <h3 style={{'position':'relative'}}>{post.postTitle}<span>{post.date}</span></h3>
                          <br></br>
                          <p>{post.postDesc}</p>
                          <div className='post_controls' style={{'width': '100%'}}>
                              <i onClick={handleClick} className="far fa-comment">{post.comments.length}</i>
                              <div>
                                  {post.likes.includes(props.chat.user.username) ?<i style={{'color':'green'}} className="far fa-thumbs-up">{post.likes.length}</i>  : <i onClick={likePost} className={`far fa-thumbs-up ${post.id}`}>{post.likes.length}</i> }
                              </div>
                          </div>
                          <br></br>
                          <div className='post_comments_field'>
                                <TextField label="Add Comment" />
                                <IconButton>
                                    <i onClick={leaveComment} className={`fas fa-share-square ${post.id}`}></i>
                                </IconButton>
                          </div>
                          <ul className='post_comments_container'>
                          <Divider></Divider>
                          {post.comments.map(comment=>{
                              return   <li key={uniqid()}>
                                        <div style={{
                                        'backgroundImage':comment.image ? `url(${comment.image})` : `url(${defProfImg})` ,
                                        }}
                                        ></div>
                                        <p><strong>{`${comment.name}: `}</strong>{`${comment.comment}`}</p>
                                      </li>
                            })}
                      </ul>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  </>
          }else{
            return <>
              <div key={uniqid()} className='post' style={{'height':'auto'}}>
                  <div className='post_content'>
                    <div className='post_description'>
                        <h3 style={{'position':'relative'}}>{post.postTitle}<span>{post.date}</span></h3>
                        <br></br>
                        <p>{post.postDesc}</p>
                        <div className='post_controls' style={{'width': '100%'}}>
                              <i onClick={handleClick} className="far fa-comment">{post.comments.length}</i>
                              <div>
                                  {post.likes.includes(props.chat.user.username) ?<i style={{'color':'green'}} className="far fa-thumbs-up">{post.likes.length}</i>  : <i onClick={likePost} className={`far fa-thumbs-up ${post.id}`}>{post.likes.length}</i> }
                              </div>
                          </div>
                        <br></br>
                        <div className='post_comments_field'>
                                <TextField label="Add Comment" />
                                <IconButton>
                                    <i onClick={leaveComment} className={`fas fa-share-square ${post.id}`}></i>
                                </IconButton>
                          </div>
                          <ul className='post_comments_container'>
                          <Divider></Divider>
                          {post.comments.map(comment=>{
                              return   <li key={uniqid()}>
                                        <div style={{
                                        'backgroundImage':comment.image ? `url(${comment.image})` : `url(${defProfImg})` ,
                                        }}
                                        ></div>
                                        <p><strong>{`${comment.name}: `}</strong>{`${comment.comment}`}</p>
                                      </li>
                            })}
                      </ul>
                    </div>
                  </div>
                </div>
                <br></br>
            </>
          }
        }): ''}

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

export default connect(mapStateToProps,mapDispatchToProps)(ProfileContent);
