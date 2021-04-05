import React,{useState} from 'react'

function Emoji() {
    const [open,setOpen] = useState(false)

    const handleOpen= (e)=>{
        let target = e.target
        if(target.classList.contains('fa-smile-beam')){
            setOpen(!open)
        }
    }

    const insertEmoji = (e)=>{
        let parent = document.querySelector('.message_chat_value')
        let textMessage = parent.children[1].children[0]
        let target = e.target
        if(target.classList.contains('emoji')){
            textMessage.value += target.innerHTML
        }
    }

    return (
        <i className="fas fa-smile-beam" onClick={handleOpen} style={{'position':"relative"}}>
             <div onClick={insertEmoji} className="emoji_container" style={{'display': open ? 'grid' :'none'}}>
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
