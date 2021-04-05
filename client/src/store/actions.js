import * as ACTION_TYPES from './action_types'

export const getUserInfo = (user)=>{
    return {
        type: ACTION_TYPES.USER,
        payload: user
    }
}

export const getUserProfile = (user)=>{
    return {
        type: ACTION_TYPES.USER_PROFILE,
        payload: user
    }
}

export const userChat = (user)=>{
    return {
        type: ACTION_TYPES.USER_CHAT,
        payload: user
    }
}

export const searchCriteria = (result)=>{
    return {
        type: ACTION_TYPES.SEARCH_CRITERIA,
        payload: result
    }
}

export const getChat = (chat)=>{
    return {
        type: ACTION_TYPES.CHAT,
        payload: chat
    }
}

export const getVideoChat = (id)=>{
    return {
        type: ACTION_TYPES.VIDEO_CHAT,
        payload: id
    }
}

export const switchChats = (res)=>{
    return {
        type: ACTION_TYPES.SWITCH_CHATS,
        payload: res
    }
}