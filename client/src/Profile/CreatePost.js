import React,{useState} from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios'
import {connect} from 'react-redux'
import $ from 'jquery'
import * as ACTIONS from '../store/actions'
import moment from 'moment'
import Spinner from '../Chat/Spinner'

function CreatePost(props) {
  const [open, setOpen] = useState(false);
  const [error,setError] = useState(null)
  const [file,setFile]  = useState(null)
  const [imgPreview,setImgPreview] = useState(null)
  const [spinner,setSpinner] = useState(false)



  const handleImage = (e)=>{
    const target = e.target
    var selected = target.files[0]
    const ALLOWED_T = ['image/png','image/jpeg','image/jpg']
    if(selected && ALLOWED_T.includes(selected.type)){
      setFile(selected)
      let reader = new FileReader()
      reader.onloadend = ()=>{
        setImgPreview(reader.result)
      }
      reader.readAsDataURL(selected)

    }else{
      setImgPreview(null)
      setError('File not supported (select a image).')
    }
  }

  const submitPost = ()=>{
    let postTitle = document.querySelector(".post_title")
    let postDesc = document.querySelector('.post_desc')
    if(imgPreview){
      const ALLOWED_T = ['image/png','image/jpeg','image/jpg']

      if(file && ALLOWED_T.includes(file.type)){
          let form = new FormData();
          form.append("image", file)
          setSpinner(true)
          
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

            axios.post('/create-post',{
              image:jx.data.url,
              postTitle:postTitle.children[1].children[0].value,
              postDesc:postDesc.value,
              username:props.chat.user.username,
              date: moment(Date.now()).format('LL')}).then(res=>{
              window.location.reload()
            }).then(()=>setSpinner(false))
          });
      }
    }else{
      setSpinner(true)
      axios.post('/create-post',{
        postTitle:postTitle.children[1].children[0].value,
        postDesc:postDesc.value,
        username:props.chat.user.username,
        date: moment(Date.now()).format('LL')}).then(res=>{
        window.location.reload()
      }).then(()=>{
        setSpinner(false)
      })
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
      <div className='post_modal'>
          <form className='newPost' noValidate autoComplete="off">
                <h2>Create Post</h2>
                {spinner ? <Spinner action='Posting...' /> : ''}
                <TextField disabled={spinner? true:false} className='post_title' label="Title..." variant="outlined" />
                <br></br>
                <textarea disabled={spinner? true:false} className='post_desc' placeholder='Description...'></textarea>
                <IconButton style={{'color':'#1D976C'}}>
                    <div className='uploadIcon'>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <input accept="image/*" id="icon-button-file" type="file" onChange={handleImage} />
                    <label htmlFor="icon-button-file">
                      <IconButton  color="primary" aria-label="upload picture" component="span">
                         <i className="fas fa-image"></i>
                      </IconButton>
                    </label>
                  </div>
                </IconButton>
                <div className={imgPreview? 'image_preview':''} style={{'background': imgPreview ? `url(${imgPreview}) no-repeat center/cover`:''}}>
                  {imgPreview ? <i onClick={()=> {
                    setImgPreview(null)
                    setError(null)
                  }} className="fas fa-times-circle"></i> : ""}
                  {error && !imgPreview ? <p style={{'color':'red'}}>{error}</p> : ''}
                </div>
                <Button disabled={spinner? true:false} onClick={submitPost} style={{'background':'#1D976C','color':"white"}} variant='outlined'>POST</Button>
        </form>
      </div>
  );

  return (
    <div>
      {props.chat.userProfile.username && props.chat.user.username === props.chat.userProfile.username ? (()=>{
        return  <><i onClick={handleOpen} className="fas fa-plus-circle"></i>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal></>
      })():''}
    </div>
  );
}


const mapStateToProps = state =>{
  return {
    chat: state.chat
  }
}
const mapDispatchToProps = dispatch=>{
  return {
    getUserInfo: (user)=>  dispatch(ACTIONS.getUserInfo(user))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CreatePost);
