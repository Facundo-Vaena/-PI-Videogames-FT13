import { GET_VIDEOGAMES, GET_GENRES, GET_ID, EMPTY_VIDEOGAMES } from '../actions/index'

const initialState = {
    videogames: [],
    videogamesSearch: [],
    videogameDetail: {},
    genres: [],
    id: 3498
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
                // id: action.payload
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

        default:
            return state;
    }
}

// export default function rootReducer(state = initialState, action) {
//     switch (action.type) {

//         case ADD_MOVIE_FAVORITE:
//             return {
//                 ...state,
//                 moviesFavourites: [...state.moviesFavourites, action.payload]
//             };

//         case GET_MOVIES:
//             return {
//                 ...state,
//                 moviesLoaded: action.payload.Search
//             };

//         case GET_MOVIE_DETAIL:
//             return {
//                 ...state,
//                 movieDetail: action.payload 
//             };

//         case REMOVE_MOVIE_FAVORITE:
//             const newFavourite = state.moviesFavourites.filter((movie) => 
//             movie.imdbID !== action.payload.id)
//             return {
//                 ...state,
//                 moviesFavourites: newFavourite
//             };

//         default:
//             return state;
//     }
// }