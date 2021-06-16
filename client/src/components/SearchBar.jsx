import React, { useState } from 'react';
import fetch from 'node-fetch';
import Videogame from './Videogame';
import { connect } from 'react-redux';
import { emptyVideogames } from '../actions';
import './SearchBar.css'

export function SearchBar({ videogames, emptyVideogames }) {
    const [games, setGames] = useState('');
    const [array, setArray] = useState([]);

    function search(name) {
        emptyVideogames()
        fetch(`http://localhost:3001/videogames?search=${name}`)
            .then(res => res.json())
            .then(res => {
                return setArray(res)
            })


    }
    function nada() {
        while (videogames.length) {
            videogames.pop()
        }
        return
    }


    return (<div className='searchContainer'>
        <div >
            <form onSubmit={e => {
                e.preventDefault();
                search(games);
                nada()
            }}

            >
                <input
                    type="search"
                    placeholder='Videogame...'
                    onChange={e => setGames(e.target.value)}
                />
                <input type='submit' value='search' />
            </form>
            <div>
                {
                    typeof (array[0]) !== 'string' ? array.map(e => {

                        if(e.genres){

                            return <Videogame name={e.name} img={e.img} genres={e.genres} idVideogame={e.id} />
                        } else{
                            return <Videogame name={e.name} img={e.img} idVideogame={e.id} />

                        }

                    }) : <h1>Videogame Not Found</h1>
                }

            </div>

        </div>



    </div>)
}


function mapStateToProps(state) {
    return {
        videogames: state.videogames
    }
}

function mapDispatchToProps(dispatch) {
    return {
        emptyVideogames: () => dispatch(emptyVideogames())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)


