import * as ACTION_TYPES from './action_types'

const initialState = {
    user: {},
    userProfile: {},
    currentChat: {},
    searchCriteria: '',
    chat: [],
    videoChat: '',
    switchChats: false
}
const chatReducer = (state = initialState,action)=>{
    switch(action.type){
        case ACTION_TYPES.USER:
            return {
                ...state,
                user: action.payload
            }
        case ACTION_TYPES.USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload
            }
        case ACTION_TYPES.USER_CHAT:
            return {
                ...state,
                currentChat: action.payload
            }
        case ACTION_TYPES.SEARCH_CRITERIA:
            return {
                ...state,
                searchCriteria: action.payload
            }
        case ACTION_TYPES.CHAT:
            return {
                ...state,
                chat: action.payload
            }
        case ACTION_TYPES.VIDEO_CHAT:
            return {
                ...state,
                videoChat: action.payload
            }
        case ACTION_TYPES.SWITCH_CHATS:
            return {
                ...state,
                switchChats: action.payload
            }
        default:
            return state
    }
}

export default chatReducer;