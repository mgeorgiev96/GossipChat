import chatReducer from './chatReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    chat: chatReducer
})

export default rootReducer;