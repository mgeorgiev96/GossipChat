import React,{useState} from 'react'

function Emoji(props) {
    const [open,setOpen] = useState(false)

    const insertEmoji = (e)=>{
        console.log("click")
        let target = e.target
        if(target.classList.contains("emoji")){
            if(props.location){
                let parent = document.querySelector('.message_chat_value')
                if(parent){
                    parent.value += target.innerHTML
                }
            }else{
                let parent = document.querySelector('.post_message_input')
                if(parent){
                    parent.value += target.innerHTML
                }
            }
        }
    }

    return (
        <i className="fas fa-smile-beam" onClick={(e)=> e.target.classList.contains("fa-smile-beam") ? setOpen(!open) : null} style={{position:"relative",fontSize:'1.2rem',alignSelf:"center",margin: "0 5px",color:props.color,cursor:'pointer',marginBottom: props.location ? "5px" : "0"}} style={{'position':"relative"}}>
             <div onClick={insertEmoji} className="emoji_container" style={{display: open ? 'grid' :'none',right:props.right,bottom:props.bottom}}>
                <p className="emoji">&#128540;</p>
                <p className="emoji">&#128512;</p>
                <p className="emoji">&#128513;</p>
                <p className="emoji">&#128514;</p>
                <p className="emoji">&#128515;</p>
                <p className="emoji">&#128516;</p>
                <p className="emoji">&#128517;</p>
                <p className="emoji">&#128518;</p>
                <p className="emoji">&#128519;</p>
                <p className="emoji">&#128520;</p>
                <p className="emoji">&#128521;</p>
                <p className="emoji">&#128522;</p>
                <p className="emoji">&#128523;</p>
                <p className="emoji">&#128524;</p>
                <p className="emoji">&#128525;</p>
                <p className="emoji">&#128526;</p>
                <p className="emoji">&#128527;</p>
                <p className="emoji">&#128528;</p>
                <p className="emoji">&#128529;</p>
                <p className="emoji">&#128530;</p>
                <p className="emoji">&#128526;</p>
                <p className="emoji">&#128527;</p>
                <p className="emoji">&#128528;</p>
                <p className="emoji">&#128529;</p>
                <p className="emoji">&#128530;</p>
                <p className="emoji">&#128531;</p>
                <p className="emoji">&#128536;</p>
                <p className="emoji">&#128533;</p>
                <p className="emoji">&#128538;</p>
                <p className="emoji">&#128552;</p>
                <p className="emoji">&#128557;</p>
                <p className="emoji">&#128564;</p>
                <p className="emoji">&#128567;</p>
                <p className="emoji">&#129297;</p>
                <p className="emoji">&#129488;</p>
      </div></i>
    )
}

export default Emoji;
