import { combineReducers } from 'redux'

const credentials = (state = {}, action) => {
    switch (action.type){
        case "CHANGE_TOKEN":
            return action.payload
        default:
            return state
    }
}

const colors = (state = {dominant: "#f1faee", secondary: "#1d3557", text: "white"}, action) => {
    switch (action.type){
        case "CHANGE_COLORS":
            return action.payload
        default:
            return state
    }
}

const currentSong = (state = {}, action) => {
    switch(action.type){
        case "FETCH_SONG":
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    credentials,
    currentSong,
    colors
})