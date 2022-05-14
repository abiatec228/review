import {GET_EPISODES, SET_EPISODES, GET_EPISODES_CHARACTER, SET_EPISODES_CHARACTER, DELETE_EPISODES_CHARACTER} from '../actions';

const initialState = {
    episodes: [],
    episodesLoader: false,
    episodeImages: []
}

export const episodesReducer = (state = initialState, action: { type: string; payload: string; }) => {
    switch(action.type) {
        case GET_EPISODES:{
            return {
                ...state,
                episodesLoader: true
            }
        }
        case SET_EPISODES: {
            return {
                ...state,
                episodesLoader: false,
                episodes: action.payload,
            }
        }
        case GET_EPISODES_CHARACTER:{
            return {
                ...state,
                episodesLoader: true
            }
        }
        case SET_EPISODES_CHARACTER: {
            return {
                ...state,
                episodesLoader: false,
                episodeImages: action.payload,
            }
        }
        case DELETE_EPISODES_CHARACTER: {
            return {
                ...state,
                episodesLoader: false,
                episodeImages: []
            }
        }
        default:
            return state
    }
}

