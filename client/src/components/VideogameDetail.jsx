import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './VideogameDetail.css';
import { CircularProgress } from '@material-ui/core';

export function VideogameDetail({ id }) {

    const [details, setDetails] = useState({})

    useEffect(() => {
        axios.get(`/videogames/${id}`)
            // .then(res => res.json())
            .then(response => {
                let res = response.data
                setDetails(res)
               
            })
        //.catch( err => console.log(err))
             // eslint-disable-next-line
    }, [])

    let key = 0

    return (
        <div className='detailContainer'>
            <Link to='/home'>
                <button className='detailHomeLink'>Home</button>
            </Link>
            {!details.name ? <div className='detailLoadingContainer'><CircularProgress className='detailLoading'/></div> : <div className='detailContent'>

                 

                <img src={details.img} alt="" />

                <h1 className='font'>{details.name}</h1>

                {details.description ? <p className='detailDescription'>{details.description.replace(/(<([^>]+)>)/ig, '')}</p> : null}

                <div className='detailGenresRating'>

                <div className='detailGenres'>
                    {details.genres ? <h4 className='font'>Genres: </h4> : null}
                    {details.genres ? details.genres.map((e) => {
                        return (<p className='detailGenre' key={key += 1}>{e}</p>)
                    }) : null}
                </div>

                <div className='detailRating font'>
                   <h4>Rating:</h4> <span>{details.rating}</span>
                </div>
                <div className='detailReleased'>
                    <h4 className='font'>Released: <span>{details.released}</span></h4>
                    </div>
                </div>



                <div className='detailPlatforms'>
                {details.platforms ? <h4 className='font'>platforms: </h4> : null}
                    {details.platforms ? details.platforms.map((e) => {
                        return (<div className='detailPlatform' key={key += 1}>{e}</div>)
                    }) : null}
                </div>
            </div>}

        </div>
    )
}

function mapStateToProps(state) {
    return {
        id: state.id
    }
}


export default connect(mapStateToProps)(VideogameDetail)

