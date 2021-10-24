import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageIcon from '@mui/icons-material/Image';
import Emoji from '../Chat/Emoji'
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'
import moment from 'moment'
import Spinner from '../Chat/Spinner'
import axios from 'axios'
import $ from 'jquery'

function SubmitPost(props) {
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
      let postDesc = document.querySelector('.post_message_input')
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
                name: props.chat.user.name,
                postTitle: props.chat.user.username,
                postDesc:postDesc.value,
                username:props.chat.user.username,
                userImage: props.chat.user.profileImage,
                date: moment(Date.now()).format('LL')}).then(res=>{
                window.location.reload()
              }).then(()=>setSpinner(false))
            });
        }
      }else{
        setSpinner(true)
        axios.post('/create-post',{
          postTitle:props.chat.user.username,
          name: props.chat.user.name,
          postDesc:postDesc.value,
          username:props.chat.user.username,
          userImage: props.chat.user.profileImage,
          date: moment(Date.now()).format('LL')}).then(res=>{
          window.location.reload()
        }).then(()=>{
          setSpinner(false)
        })
      }
    }
    return (
        <Box component="span" m={1} className="submit-post-container" style={{gridTemplateColumns:imgPreview ?  "1fr 1fr" : "1fr",height : imgPreview? "17vh" : "10vh"}}>
            <div className="post_options" >
                {spinner ? <Spinner action='Posting...' /> : ''}
                <div style={{display:"flex",justifyContent:"center",alignItems:'center',width:'100%'}}>
                <input disabled={spinner? true:false} className="post_message_input"  placeholder="What is on your mind?" style={{marginRight: '10px'}} />
                    <div style={{position: "relative",marginTop: "5px"}}>
                            <Emoji bottom="-25vh" right="100%" location={false}/>
                        </div>
                        <div style={{position: "relative",margin:"0 10px"}}>
                            <ImageIcon className="option_icon"/>
                            <input className="input_file" accept="*" type="file" onChange={handleImage} />
                        </div>
                        <Button disabled={spinner? true:false} onClick={submitPost} variant="contained" color="primary" style={{color:'white',backgroundColor:"#1976d2",padding:"6px 16px",borderRadius:"5px"}}>POST</Button>
                </div>
            </div>
            <div className="post_image" style={{display: imgPreview ? "block" : "none",background:`url(${imgPreview}) no-repeat center/contain`}}>
                {imgPreview ?  <CancelIcon onClick={()=> {
                    setImgPreview(null)
                    setError(null)
                  }} className="post_close" style={{float:'right'}}/> : ""}
                {error && !imgPreview ? <p style={{'color':'red'}}>{error}</p> : ''}
            </div>
        </Box>
    );
}

const mapStateToProps = state =>{
    return {
        chat: state.chat
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        previewImage: (image)=> dispatch(ACTIONS.previewImage(image))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SubmitPost);