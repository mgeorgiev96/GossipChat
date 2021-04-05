import React,{useState} from 'react';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'
import axios from 'axios'



function EditPersonalInfo(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitPersonal = (e)=>{
      let parent = e.target.parentElement.children[0]
      console.log(parent)
      axios.post('/save-personal',{
        date: parent.children[0].value,
        interest: parent.children[1].value,
        residence: parent.children[2].value,
        phone: parent.children[3].value,
        prof: parent.children[4].value,
        email: parent.children[5].value,
        username: props.chat.user.username
      }).then(res=>{
          props.getUserProfile(res.data)
      })
  }

  const body = (
    <div className='friend_search_container'>
      <h2 id="simple-modal-title">Personal Info</h2>
      <form className='edit_personal_info' action='/save-personal' method='POST' onSubmit={(e)=>e.preventDefault()}>
          <div>
                <input className='input_style' name='date' type='date' placeholder={props.chat.user.personalInfo ? `Date of birth: ${props.chat.user.personalInfo.date}` : ''}></input>
                <input className='input_style' name='interest' type='text' placeholder={props.chat.user.personalInfo?`Interest: ${props.chat.user.personalInfo.interest}` : ''}></input>
                <input className='input_style' name='residence' type='text' placeholder={props.chat.user.personalInfo?`Residence: ${props.chat.user.personalInfo.residence}` : ''}></input>
                <input className='input_style' name='phone' type='text' placeholder={props.chat.user.personalInfo?`Phone: ${props.chat.user.personalInfo.phone}` : ''}></input>
                <input className='input_style' name='prof' type='text' placeholder={props.chat.user.personalInfo?`Profession: ${props.chat.user.personalInfo.prof}` : ''}></input>
                <input className='input_style' name='email' type='text' placeholder={props.chat.user.personalInfo?`Email: ${props.chat.user.personalInfo.email}` : ''}></input>
          </div>
          <br></br>
      <button onClick={submitPersonal} style={{'color':'white','backgroundColor':'black','padding': '10px 20px','borderRadius':'10px'}}>SAVE</button>
      </form>
    </div>
  );

  return (
    <div>
        <i style={{'color':'black'}} onClick={handleOpen} className="fas fa-edit">Edit..</i>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
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
    getUserInfo: (user)=> dispatch(ACTIONS.getUserInfo(user)),
    getUserProfile: (user)=> dispatch(ACTIONS.getUserProfile(user))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(EditPersonalInfo);