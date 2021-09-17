import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
// export const GET_DETAILS = 'GET_DETAILS';
export const GET_ID = 'GET_ID';
export const EMPTY_VIDEOGAMES = 'EMPTY_VIDEOGAMES'
export const SET_RESULTS = 'SET_RESULTS'


export function getVideogames(order, filter) {
    return function (dispatch) {
        return axios.get('/videogames')
            // .then(res => res.json())
            .then(response => {
                let res = response.data
                if (filter && order) {
                    let filtered = filtering(res, filter);
                    let sorted = sorting(filtered, order)
                    dispatch({type: GET_VIDEOGAMES, payload: sorted})
                }
                if (filter && !order) {
                    let filtered = filtering(res, filter);
                    dispatch({type: GET_VIDEOGAMES, payload: filtered})

                }
                if (!filter && order) {
                    let sorted = sorting(res, order)
                    dispatch({type: GET_VIDEOGAMES, payload: sorted})

                }
                if (!filter && !order) {
                    dispatch({type: GET_VIDEOGAMES, payload: res})

                }
                
            })




    }
}

function filtering(videogames, filtering) {
    if (filtering !== 'onlyCreated' && filtering !== 'hideCreated' ) {
        // eslint-disable-next-line
        let info = videogames.filter(e => {
            for (var i = 0; i < e.genres.length; i++) {
               return e.genres[i] === filtering
            }
        })
        return info
        
        
    }
    if (filtering === 'onlyCreated') {
        return videogames.filter(e => {
            return e.created === true
        })
        
        
    }
    if (filtering === 'hideCreated') {
        return videogames.filter(e => {
            return !e.created
        })
        
    }
}
function sorting(videogames, order){
    if(order === 'aAsc'){
        return videogames.sort(function (a, b) {
            let nA = a.name;
            let nB = b.name;
            if (nA > nB) {
                return -1;
            }
            if (nA < nB) {
                return 1
            }
            return 0
        })
    }
    if(order === 'aDesc'){
        return videogames.sort(function (a, b) {
            let nA = a.name;
            let nB = b.name;
            if (nA < nB) {
                return -1;
            }
            if (nA > nB) {
                return 1
            }
            return 0
        })
    }
    if(order === 'rating'){
        return videogames.sort(function (a, b) {
            let nA = a.rating;
            let nB = b.rating;
            if (nA > nB) {
                return -1;
            }
            if (nA < nB) {
                return 1
            }
            return 0
        })
    }
}


export function getGenres() {
    return function (dispatch) {
        return axios.get('/genres')
            // .then(res => res.json())
            .then(response =>
                {
                    let res = response.data
                    dispatch({ type: GET_GENRES, payload: res })
                })
    }
}


export function getId(id) {
    return {
        type: GET_ID,
        payload: id
    }
}

export function setResults(num){
    return {
        type: SET_RESULTS,
        payload: num
    }
}

export function emptyVideogames() {
    return {
        type: EMPTY_VIDEOGAMES,
        payload: []
    }
}


