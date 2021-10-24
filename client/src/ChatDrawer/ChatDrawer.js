import React from 'react'
import Divider from '@material-ui/core/Divider'
import ControlTabs from './ControlTabs'
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions'


function ChatDrawer(props) {

    return (
        <div className='drawer_container'>
                <div className='control_tabs'>
                    <ControlTabs/>
                </div>
        </div>
    )
}

const mapStateToProps = state=>{
    return {
        chat: state.chat
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        getUserProfile: (user) => dispatch(ACTIONS.getUserProfile(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatDrawer);
