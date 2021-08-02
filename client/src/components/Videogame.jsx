import React from 'react';
import { connect } from 'react-redux';
import { getId } from '../actions'
import { Link } from 'react-router-dom';
import './Videogame.css';
//recibe x props img, name y genres y DEBERIA id
//debería ofrecer detalles (acceder a un metodo de las action creators que busque por id)

export function Videogame({ idVideogame, name, genres, img, getId,  }) {



    function handleClick(id) {
        getId(id)
    }

    let key = 0

    return (<div className='container'>
        <div className='card'>
            <img className='img' src={img} alt="" />
            <h3 className='videogameTitle'>{name}</h3>
            
            <div >
             {genres ? <p className='genres'>Genres: </p> : null}
            {genres ?
                genres.map(e => {
                    return (<p key={key++} className='genres'>{e}</p>)
                }) : null
            }
            </div>


            <Link to={'/videogamedetail'}>
                <button className='button' onClick={() => handleClick(idVideogame)}>Get Info</button>

            </Link>
        </div>
    </div>)
}




function mapDispatchToProps(dispatch) {
    return {
        getId: (id) => dispatch(getId(id))
    }
}
//mapState quizas no sea necesario
export default connect(null, mapDispatchToProps)(Videogame)
