import React,{useState} from 'react';
import {connect} from 'react-redux'
import defProfImg from '../images/defProf.jpg'
import defBackground from '../images/defBackground.jpg'
import $ from 'jquery';
import axios from 'axios'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@material-ui/core/Avatar';
import * as ACTIONS from '../store/actions'

function UserProfile(props) {
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
            axios.post('/update-profile',{image:jx.data.url,username: props.chat.user.username}).then(res=>{
              props.getUserProfile(res.data)
            })
          });
      }
    }
    return (
        <div className="profile_header">
            <div className="user_profile_back" style={{backgroundImage:`url(${props.chat.userProfile.backgroundImage ? props.chat.userProfile.backgroundImage : defBackground})`}}>
                    <Avatar style={{backgroundColor:"white",border:"1px solid lightgrey",top:"10px",left:"10px",position:"absolute",cursor:"pointer",display: props.chat.userProfile.username === props.chat.user.username ? "" : "none"}}>
                        <CameraAltIcon style={{color:"black"}}/>
                        <input accept="*" className="input_file" type="file" onChange={(e)=>handleBackground(e)} />
                    </Avatar>
                <div className="user_profile_image" style={{backgroundImage:`url(${props.chat.userProfile.profileImage ? props.chat.userProfile.profileImage : defProfImg})`}}>
                <Avatar style={{backgroundColor:"white",border:"1px solid lightgrey",cursor:"pointer",display: props.chat.userProfile.username === props.chat.user.username ? "" : "none"}}>
                          <CameraAltIcon style={{color:"black"}}/>
                          <input accept="*" className="input_file" type="file" onChange={(e)=>handleProfile(e)} />
                        </Avatar>
                </div>
            </div>
            <h2>{props.chat.userProfile.name}</h2>
        </div>
    );
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

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);