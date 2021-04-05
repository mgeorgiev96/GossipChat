import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import {connect} from 'react-redux'
import moment from 'moment'
import uniqid from 'uniqid'
import * as ACTIONS from '../store/actions'
import $ from 'jquery'
import firebase from '../store/firebaseInit'
import 'firebase/firestore'
import { saveAs } from 'file-saver';
import Emoji from './Emoji'
import GroupChatInfo from '../ChatDrawer/GroupChatInfo'
import AddGroupMember from '../ChatDrawer/AddGroupMember'
import Spinner from './Spinner'



const firestore = firebase.firestore()
const arrayUnion = firebase.firestore.FieldValue.arrayUnion

function ChatWindow(props) {
  const [spinner,setSpinner] = useState(false)
  const [error,setError] = useState(null)
    const sendMessage = (type,value)=>{
        let sender = props.chat.user ? props.chat.user.username : ''
        let receiver = props.chat.currentChat ? props.chat.currentChat.username : ''
        let parent = document.querySelector('.message_chat_value')
        let textMessage = parent.children[1].children[0]
        let conversation = document.querySelector(".conversation_window")

        if(sender && receiver && !props.chat.switchChats){
          if(type==='message'){
            value = textMessage.value
          }
           //Check if collection exists
          const senderRef = firestore.collection(sender).doc(receiver)
          senderRef.get().then(s=>{
            if(s.data()){
                    //Update conversation between the users
                const docReceiver  = firestore.doc(`${receiver}/${sender}`)
                const docSender = firestore.doc(`${sender}/${receiver}`)

                docReceiver.update({
                  message: arrayUnion({id:sender,value,type})
                })
                docSender.update({
                  message: arrayUnion({id:sender,value,type})
                })
                props.getChat([...s.data().message,{id:sender,value,type}])
            }else{
              firestore.collection(receiver).doc(sender).set({
                message: [{id:sender,value,type}]
              })
              firestore.collection(sender).doc(receiver).set({
                message: [{id:sender,value,type}]
              })
              props.getChat([{id:sender,value,type}])
            }
            textMessage.value = ''
            conversation.scrollTop = conversation.scrollHeight
          })
        }else if(props.chat.switchChats){
             let maker = props.chat.currentChat ? props.chat.currentChat.maker.email : ''
             let name = props.chat.currentChat ? props.chat.currentChat.name : ''

             if(type==='message'){
              value = textMessage.value
            }
             //Check if collection exists
            const senderRef = firestore.collection(maker).doc(name)
            senderRef.get().then(s=>{
              if(s.data()){
                      //Update conversation between the users
                  const docReceiver  = firestore.doc(`${maker}/${name}`)
                  docReceiver.update({
                    message: arrayUnion({id:sender,value,type})
                  })
                  props.getChat([...s.data().message,{id:sender,value,type}])

              }else{
                firestore.collection(maker).doc(name).set({
                  message: [{id:sender,value,type}]
                })
                props.getChat([{id:sender,value,type}])
              }
              conversation.scrollTop = conversation.scrollHeight
              textMessage.value = ''
              conversation.scrollTop = conversation.scrollHeight

            })
        }
      }
      const sendImage = (e)=>{
          const ALLOWED_T = ['image/png','image/jpeg','image/jpg']
          let file = e.target.files[0]
          if(file && ALLOWED_T.includes(file.type)){
              let form = new FormData();
              form.append("image", file)
              
              let settings = {
                "url": process.env.REACT_APP_URL,
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": form
              };
              setSpinner(true)
    
              $.ajax(settings).done(function (response) {
                let jx = JSON.parse(response);
                setError(null)
                sendMessage('image',jx.data.url)
            }).then(()=>setSpinner(false));
        }else{
          setError('File not supported (select a image).')
        }
      }

      const sendFile = (e)=>{
        let file = e.target.files[0]
        let id = uniqid()
        let storageRef = firebase.storage().ref(`${props.chat.user.username}/${file.name}${id}`)
        let conversation = document.querySelector(".conversation_window")
        setSpinner(true)
        let uploadFile = storageRef.put(file).then(i=>{
          let storage = firebase.storage().ref()

          let url = storage.child(`${props.chat.user.username}/${file.name}${id}`).getDownloadURL().then(res=>{
            let sender = props.chat.user ? props.chat.user.username : ''
            let receiver = props.chat.currentChat ? props.chat.currentChat.username : ''
            let parent = document.querySelector('.message_chat_value')
            let textMessage = parent.children[1].children[0]
            let value = res
            let type = 'file'



            if(sender && receiver && !props.chat.switchChats){
               //Check if collection exists
              const senderRef = firestore.collection(sender).doc(receiver)
              senderRef.get().then(s=>{
                if(s.data()){
                    //Update conversation between the users
                    const docReceiver  = firestore.doc(`${receiver}/${sender}`)
                    const docSender = firestore.doc(`${sender}/${receiver}`)
                    docReceiver.update({
                      message: arrayUnion({id:sender,value,type,fileName: file.name})
                    })
                    docSender.update({
                      message: arrayUnion({id:sender,value,type,fileName: file.name})
                    })
                    props.getChat([...s.data().message,{id:sender,value,type}])
                }else{
                  firestore.collection(receiver).doc(sender).set({
                    message: [{id:sender,value,type,fileName: file.name}]
                  })
                  firestore.collection(sender).doc(receiver).set({
                    message: [{id:sender,value,type,fileName: file.name}]
                  })
                  props.getChat([{id:sender,value,type}])
                }
                setSpinner(false)
                textMessage.value = ''
                conversation.scrollTop = conversation.scrollHeight

              })
            }else if(props.chat.switchChats){
              let maker = props.chat.currentChat ? props.chat.currentChat.maker.email : ''
              let name = props.chat.currentChat ? props.chat.currentChat.name : ''

              const senderRef = firestore.collection(maker).doc(name)
              senderRef.get().then(s=>{
                if(s.data()){
                    //Update conversation between the users
                    const docReceiver  = firestore.doc(`${maker}/${name}`)
                    docReceiver.update({
                      message: arrayUnion({id:sender,value,type,fileName: file.name})
                    })
                    props.getChat([...s.data().message,{id:sender,value,type}])
                }else{
                  firestore.collection(maker).doc(name).set({
                    message: [{id:sender,value,type,fileName: file.name}]
                  })
                  props.getChat([{id:sender,value,type}])
                  
                }
              })
              setSpinner(false)
              textMessage.value = ''
              conversation.scrollTop = conversation.scrollHeight
         }
          })
        })
      }

      const downloadFile = (download,href)=>{
        saveAs(href,download)
      }

    return (
        <div className='chat_window'>
          {spinner ? <Spinner action='Sending...' /> : ''}
            <div className='connection_container'>
                <div className='user_chat'>
                    <h3>{props.chat.currentChat.name  ? props.chat.currentChat.name.length <= 30 ? props.chat.currentChat.name : props.chat.currentChat.name.substring(0,30) + "...":""}</h3>
                    <span>{props.chat.currentChat.lastActive ?'Last online: ' + moment(parseInt(props.chat.currentChat.lastActive)).format('LLL') : '' }</span>
                    <div className='group_options'>
                      {props.chat.currentChat.maker ? <GroupChatInfo/> : ''}
                      {props.chat.currentChat.maker && props.chat.currentChat.maker.email === props.chat.user.username ? <AddGroupMember/>:''}
                    </div>
                    {error ? <p style={{'color':'red','position':'absolute','bottom':'0','left':'43%'}}>{error}</p> : ''}
                </div>
            </div>
            <div className='conversation_window'>
              {props.chat.chat.map((msg,i)=>{

                if(i===props.chat.chat.length - 1){
                  if(msg.type==='message'){
                    if(props.chat.currentChat.maker){
                      return <span style={{'animation':'visibility 300ms linear'}} className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                      <span><strong>{msg.id}:</strong><br></br>{msg.value}</span>
                      </span>
                    }else{
                      return <span style={{'animation':'visibility 300ms linear'}} className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                      <span>{msg.value}</span>
                      </span>
                    }
                  }else if(msg.type === 'image'){
                    if(props.chat.currentChat.maker){
                      return <span style={{'animation':'visibility 300ms linear'}} className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                      <p>
                          <a target='_blank' href={msg.value}><strong>{msg.id}:</strong><br></br><div style={{'backgroundImage': `url(${msg.value})` }}></div></a>
                      </p>
                    </span>
                    }else{
                      return <span style={{'animation':'visibility 300ms linear'}} className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                      <p>
                          <a target='_blank' href={msg.value}><div style={{'backgroundImage': `url(${msg.value})` }}></div></a>
                      </p>
                    </span>
                    }
                  }else if(msg.type==='file'){
                    if(props.chat.currentChat.maker){
                      return <span style={{'animation':'visibility 300ms linear','margin':'8px 0'}} className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                      <a onClick={()=> downloadFile(msg.fileName,msg.value)}><i style={{'color':'black'}} className="fas fa-file"></i><strong>{msg.id}:</strong><br></br>{msg.fileName}</a>
                      </span>
                    }else{
                      return <span style={{'animation':'visibility 300ms linear','margin':'8px 0'}} className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                      <a onClick={()=> downloadFile(msg.fileName,msg.value)}><i style={{'color':'black'}} className="fas fa-file"></i>{msg.fileName}</a>
                     </span>
                    }
                  }
                }



                    if(msg.type==='message'){
                      if(props.chat.currentChat.maker){
                        return <span  className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                        <span><strong>{msg.id}:</strong><br></br>{msg.value}</span>
                        </span>
                      }else{
                        return <span className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                        <span>{msg.value}</span>
                        </span>
                      }
                    }else if(msg.type === 'image'){
                      if(props.chat.currentChat.maker){
                        return <span className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                        <p>
                            <a target='_blank' href={msg.value}><strong>{msg.id}:</strong><br></br><div style={{'backgroundImage': `url(${msg.value})` }}></div></a>
                        </p>
                      </span>
                      }else{
                        return <span className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                        <p>
                            <a target='_blank' href={msg.value}><div style={{'backgroundImage': `url(${msg.value})` }}></div></a>
                        </p>
                      </span>
                      }
                    }else if(msg.type==='file'){
                      if(props.chat.currentChat.maker){
                        return <span style={{'margin':'8px 0'}} className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                        <a onClick={()=> downloadFile(msg.fileName,msg.value)}><i style={{'color':'black'}} className="fas fa-file"></i><strong>{msg.id}:<br></br>{msg.fileName}</strong> {msg.fileName}</a>
                        </span>
                      }else{
                        return <span style={{'margin':'8px 0'}} className={msg.id === props.chat.user.username ? 'user_sender':'user_receiver'} key={uniqid()}>
                        <a onClick={()=> downloadFile(msg.fileName,msg.value)}><i style={{'color':'black'}} className="fas fa-file"></i>{msg.fileName}</a>
                       </span>
                      }
                    }
              })}
            </div>
            <Divider></Divider>
            <div className='controls'>
                <TextField disabled={spinner? true:false} onKeyDown={(e)=>e.keyCode === 13 ? sendMessage('message','') : ''} className='message_chat_value' id="outlined-basic" label="Message..." variant="outlined" />
                <div className='chat_icons'>
                <IconButton disabled={spinner? true:false} aria-label="add">
                    <i onClick={()=>sendMessage('message','')} className="fas fa-reply"></i>
                </IconButton>
                <IconButton disabled={spinner? true:false} aria-label="add">
                    <Emoji/>
                </IconButton>
                <IconButton disabled={spinner? true:false} aria-label="add">
                    <div className='uploadIcon'>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <input onChange={sendImage} accept="image/*" id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                            <i className="fas fa-image"></i>
                            </IconButton>
                        </label>
                    </div>
                </IconButton>
                <IconButton aria-label="add" disabled={spinner? true:false}>
                <div className='uploadIcon'>
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                    <input onChange={sendFile} accept="*" id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <i className="fas fa-paperclip"></i>
                        </IconButton>
                    </label>
                </div>
                </IconButton>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state=>{
    return{
        chat: state.chat
    }
}

const mapDispatchToProps = dispatch =>{
  return {
    getChat: (user)=> dispatch(ACTIONS.getChat(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatWindow);
