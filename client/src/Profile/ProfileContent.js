import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import defProfImg from '../images/defProf.jpg'
import * as ACTIONS from '../store/actions'
import SubmitPost from './SubmitPost';
import Posts from './Posts'



function ProfileContent(props) {
  useEffect(()=>{
    axios.get('/info').then(res=>{
        props.getUserInfo(res.data)
    })
},[])


  return (
    <div className='profile_content'>
     <SubmitPost/>
      <div className='post_container'>
        <Posts/>
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
    getUserInfo: (user)=> dispatch(ACTIONS.getUserInfo(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileContent);
