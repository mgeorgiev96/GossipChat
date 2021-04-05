import React,{useEffect,useState} from 'react'
import ProfileDrawer from './ProfileDrawer'
import ProfileContent from './ProfileContent'
import {connect} from 'react-redux'
import axios from 'axios'
import * as ACTIONS from '../store/actions'

function Profile(props) {
    useEffect(()=>{
        if(props.chat.user.username){

        }else{
            axios.get('/info').then(res=>{
                props.getUserInfo(res.data)
                axios.post('/profile-info',{username:res.data.username}).then(res=>{
                    props.getUserProfile(res.data)
                })
            })
        }
    },[])
    return (
        <div className='profile_container'>
            <div></div>
            <div className='profile_section'>
                <ProfileDrawer/>
                <ProfileContent/>
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        chat: state.chat
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getUserInfo: (user)=> dispatch(ACTIONS.getUserInfo(user)),
        getUserProfile: (user)=>dispatch(ACTIONS.getUserProfile(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
