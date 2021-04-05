import React,{useState} from 'react'
import DefBack from '../images/gossipBack.png'
import PersonalInfo from './PersonalInfo'
import Divider from '@material-ui/core/Divider'
import UserInfo from './UserInfo'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'
import defProfPic from '../images/defProf.jpg'
import $ from 'jquery';
import axios from 'axios'



function ProfileDrawer(props) {
    const [error,setError] = useState(null)
    const [errorProfile,setErrorProfile] = useState(null)


    const handleBackground = (e)=>{
      const target = e.target
      const ALLOWED_T = ['image/png','image/jpeg','image/jpg']
      let selected = target.files[0]

      if(selected && ALLOWED_T.includes(selected.type)){
          let form = new FormData();
          form.append("image", selected)
          
          let settings = {
            "url": process.env.REACT_APP_URL,
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
          };


          $.ajax(settings).done(function (response) {
            let jx = JSON.parse(response);
            console.log(jx.data.url);
            axios.post('/update-background',{image:jx.data.url,username: props.chat.user.username}).then(res=>{
              props.getUserProfile(res.data)
            })
          });
      }
    }
    const handleProfile = (e)=>{
      const target = e.target
      const ALLOWED_T = ['image/png','image/jpeg','image/jpg']
      let selected = target.files[0]

      if(selected && ALLOWED_T.includes(selected.type)){
          let form = new FormData();
          form.append("image", selected)
          
          let settings = {
            "url": process.env.REACT_APP_URL,
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
          };


          $.ajax(settings).done(function (response) {
            let jx = JSON.parse(response);
            console.log(jx.data.url);
            axios.post('/update-profile',{image:jx.data.url,username: props.chat.user.username}).then(res=>{
              props.getUserProfile(res.data)
            })
          });
      }
    }
    return (
        <div className='profile_drawer'>
          <div className='background_image' style={{'backgroundImage': props.chat.userProfile.backgroundImage ?  `url(${props.chat.userProfile.backgroundImage})`:`url(${DefBack})`}}>
            {props.chat.userProfile.username === props.chat.user.username && props.chat.userProfile.username ? (()=>{
                return  <div className='uploadIcon'>
                          <input
                              accept="image/*"
                              id="contained-button-file"
                              multiple
                              type="file"
                          />
                          <input accept="image/*" id="icon-button-file" type="file" onChange={(e)=>handleBackground(e)}/>
                          <label htmlFor="icon-button-file">
                              <IconButton color="primary" aria-label="upload picture">
                                <PhotoCamera/>
                              </IconButton>
                          </label>
                          {error ? <p style={{'color':'red','background':'white'}}>{error}</p> : ''}
                      </div>
            })() : (()=>{
              return <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" style={{'opacity':'0','cursor':'auto'}}>
                <PhotoCamera/>
              </IconButton>
          </label>
            })()}
            <div className='profile_image' style={{'backgroundImage': props.chat.userProfile.profileImage ?  `url(${props.chat.userProfile.profileImage})`: `url(${defProfPic})`}}>
              {props.chat.userProfile.username === props.chat.user.username && props.chat.userProfile.username ? (()=>{
                return     <div>
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <input accept="image/*" id="icon-button-file" type="file" onChange={handleProfile}/>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture">
                                <PhotoCamera/>
                                </IconButton>
                            </label>
                            {errorProfile ? <p style={{'color':'red','background':'white','width':'120%'}}>{errorProfile}</p> : ''}
                        </div>
              })() : ''}
            </div>
                <h3><i style={{'color': props.chat.userProfile.active ? 'green' : 'grey','backgroundColor':props.chat.userProfile.active ? 'green' : 'grey'}} className="fas fa-circle"></i> {props.chat.userProfile.name  ? props.chat.userProfile.name : ''} </h3>
                <Divider/>
                <PersonalInfo/>
                <Divider></Divider>
                <UserInfo/>
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
  return {
    chat: state.chat
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: (user)=> dispatch(ACTIONS.getUserProfile(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileDrawer);