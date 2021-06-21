import React, { useState } from 'react';
import fetch from 'node-fetch';
import Videogame from './Videogame';
import { connect } from 'react-redux';
import { emptyVideogames } from '../actions';
import { Link } from 'react-router-dom';
import './SearchBar.css'

export function SearchBar({ videogames, emptyVideogames }) {
    const [games, setGames] = useState('');
    const [array, setArray] = useState([]);

    function search(name) {
        emptyVideogames()
        fetch(`http://localhost:3001/videogames?search=${name}`)
            .then(res => res.json())
            .then(res => {
                 setArray(res)
                 document.getElementById('searchInputId').value = '';
            })


    }
    


    return (<div>


            {/* <button className='creationHomeLink' onClick={()=> window.history.back()} >Home</button> */}
        

        <div>
            <form onSubmit={e => {
                e.preventDefault();
                search(games);
                
            }}

            >
                <div >
                <input
                    className='searchInput'
                    id='searchInputId'
                    type="search"
                    placeholder='Videogame...'
                    onChange={e => setGames(e.target.value)}
                />
                <input className='searchSubmit' type='submit' value='search' />
                </div>
            </form>
            <div>
                {
                    typeof (array[0]) !== 'string' ? array.map(e => {

                        if(e.genres){

                            return <Videogame name={e.name} img={e.img} genres={e.genres} idVideogame={e.id} />
                        } else{
                            return <Videogame name={e.name} img={e.img} idVideogame={e.id} />

                        }

                    }) : <h1 className='notFound'>Videogame Not Found</h1>
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


