import { GET_VIDEOGAMES, GET_GENRES, GET_ID, EMPTY_VIDEOGAMES, SET_RESULTS } from '../actions/index'

const initialState = {
    videogames: [],
    videogameDetail: {},
    genres: [],
    id: 3498,
    results: undefined
};


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:

            return {
                ...state,
                videogames: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case 'GET_DETAILS':
            return {
                ...state,
                videogameDetail: action.payload
            }
        case GET_ID:
            return {
                ...state,
                id: action.payload
            }
        case EMPTY_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload
            }
        case SET_RESULTS: return {
            ...state,
            results: action.payload
        }  

        default:
            return state;
    }
}

