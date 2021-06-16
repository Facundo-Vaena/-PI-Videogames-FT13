import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { Link } from 'react-router-dom';

export function VideogameDetail({ id }) {

    const [details, setDetails] = useState({})

    // function det(id) {
    //     fetch(`http://localhost:3001/videogames/${id}`)
    //     .then(res => res.json())
    //         .then(res => {
    //             getDetails(res)

    //         })
    //         .catch( err => console.log(err))
    // }



    useEffect(() => {
        // det(3498) //id de GTA
        // det(id)
        fetch(`http://localhost:3001/videogames/${id}`)
            .then(res => res.json())
            .then(res => {
                setDetails(res)

            })
        //.catch( err => console.log(err))

    }, [])

    let key = 0

    return (
        <div>
            <Link to='/home'>
                <button>Home</button>
            </Link>

            <h1>{details.name}</h1>
            <img src={details.img} alt="" />

            <p>Description: {details.description}</p>
            <h3>Released: {details.released}</h3>
            <h4>Rating: {details.rating}</h4>

            {details.genres ? <h3>Genres: </h3> : null}
            <div>
            {details.genres ? details.genres.map((e) =>{
                return(<div key={key += 1}>{e}</div>)
            }) : null}
            </div>

            {details.platforms ? <h3>platforms: </h3> : null}
            <div>
                {details.platforms ? details.platforms.map( (e) =>{
                    return(<div key={key += 1}>{e}</div>)
                }) : null}
            </div>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        // videogameDetail: state.videogameDetail,
        id: state.id
    }
}
// function mapDispatchToProps(dispatch){
//     return {
//         getDetails : id => dispatch(getDetails(id))
//     }
// }

export default connect(mapStateToProps)(VideogameDetail)

