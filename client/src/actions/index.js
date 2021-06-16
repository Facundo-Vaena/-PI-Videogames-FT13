import fetch from 'node-fetch';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
// export const GET_DETAILS = 'GET_DETAILS';
export const GET_ID = 'GET_ID';
export const EMPTY_VIDEOGAMES = 'EMPTY_VIDEOGAMES'

export function getVideogames(order, filter) {
    return function (dispatch) {
        return fetch('http://localhost:3001/videogames')
            .then(res => res.json())
            .then(res => {
                if (filter && order) {
                    var filtered = filtering(res, filter);
                    var sorted = sorting(filtered, order)
                    dispatch({type: GET_VIDEOGAMES, payload: sorted})
                }
                if (filter && !order) {
                    var filtered = filtering(res, filter);
                    dispatch({type: GET_VIDEOGAMES, payload: filtered})

                }
                if (!filter && order) {
                    var sorted = sorting(res, order)
                    dispatch({type: GET_VIDEOGAMES, payload: sorted})

                }
                if (!filter && !order) {
                    dispatch({type: GET_VIDEOGAMES, payload: res})

                }
                
            })




    }
}

function filtering(videogames, filter) {
    if (filter !== 'onlyCreated' && filter !== 'hideCreated' ) {
        return videogames.filter(e => {
            for (var i = 0; i < e.genres.length; i++) {
                return e.genres[i] === filter
            }
        })
    }
    if (filter === 'onlyCreated') {
        return videogames.filter(e => {
            return e.created === true
        })
    }
    if (filter === 'hideCreated') {
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




//getVideogames que funciona bien. Con filtros y ordenamiento (NO anidados)
// export function getVideogames(order, genre, creation) {
//     return function (dispatch) {
//         return fetch('http://localhost:3001/videogames')
//             .then(res => res.json())
//             .then(res => {




//                 if(creation){
//                     if(creation === 'show'){
//                     let filtered = res.filter(e =>{
//                         return e.created === true 
//                     })
//                     dispatch({ type: GET_VIDEOGAMES, payload: filtered })
//                 }
//                     if(creation === 'hide'){
//                         let filtered = res.filter(e =>{
//                             return !e.created  
//                         })
//                         dispatch({ type: GET_VIDEOGAMES, payload: filtered })
//                     }
//                 }               

//                 if (genre) {
//                     var filtered = res.filter(e =>{
//                         for(var i = 0; i < e.genres.length; i++){
//                             return e.genres[i] === genre
//                         }
//                     })

//                     dispatch({ type: GET_VIDEOGAMES, payload: filtered })
//                 }


//                 if (order === 'desc') {
//                     let alpha = res.sort(function (a, b) {
//                         let nA = a.name;
//                         let nB = b.name;
//                         if (nA < nB) {
//                             return -1;
//                         }
//                         if (nA > nB) {
//                             return 1
//                         }
//                         return 0
//                     })
//                     dispatch({ type: GET_VIDEOGAMES, payload: alpha })
//                 }
//                 if (order === 'asc') {
//                     let alpha = res.sort(function (a, b) {
//                         let nA = a.name;
//                         let nB = b.name;
//                         if (nA > nB) {
//                             return -1;
//                         }
//                         if (nA < nB) {
//                             return 1
//                         }
//                         return 0
//                     })
//                     dispatch({ type: GET_VIDEOGAMES, payload: alpha })
//                 }
//                 if (order === 'rAsc') {
//                     let ratingSort = res.sort(function (a, b) {
//                         let nA = a.rating;
//                         let nB = b.rating;
//                         if (nA > nB) {
//                             return -1;
//                         }
//                         if (nA < nB) {
//                             return 1
//                         }
//                         return 0
//                     })
//                     dispatch({ type: GET_VIDEOGAMES, payload: ratingSort })

//                 }

//                 if (  !order && !genre && !creation) {
//                     dispatch({ type: GET_VIDEOGAMES, payload: res })
//                 }
//             })




//     }
// }




export function getGenres() {
    return function (dispatch) {
        return fetch('http://localhost:3001/genres')
            .then(res => res.json())
            .then(res => dispatch({ type: GET_GENRES, payload: res }))
    }
}

// export function getDetails(details) {
//     return function (dispatch) {
//         return fetch(`http://localhost:3001/videogames/${details}`)
//             .then(res => res.json())
//             .then(res => {
//                 dispatch({type: GET_DETAILS, payload: res})

//             })
//             .catch(err => console.log(err))
//     }
// }

export function getId(id) {
    return {
        type: GET_ID,
        payload: id
    }
}



export function emptyVideogames() {
    return {
        type: EMPTY_VIDEOGAMES,
        payload: []
    }
}




// export function getDetails(id){
//     return {
//         type: GET_DETAILS,
//         payload: id
//     }
// }


// export function getVideogames(payload) {

//             return {
//                 type: GET_VIDEOGAMES,
//                 payload
//             }

// }



// export function getVideogames(){
//     return function(dispatch){
//         return fetch('http://localhost:3001/videogames')
//         .then(resp => resp.json() )
//         .then(res => {
//             // !res.length ? dispatch({type:'GET_VIDEOGAMES', payload: ['no hay juegos']}) : 
//             dispatch({
//             type: GET_VIDEOGAMES,
//             payload: [...res]
//         })})


//     }
// }