import React from 'react'
import fetch from 'node-fetch'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGenres } from '../actions/index'


export function CreateVideogame({ genres, getGenres }) {

    const [newGame, setNewGame] = useState({ genres: [], platforms: [] })
    const [newGenre, setNewGenre] = useState([]);
    const [newPlatform, setNewPlatform] = useState([]);


    useEffect(() => {
        getGenres()
    }, [])

    async function handleSubmit() {
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newGame)
            }
            let res = await fetch('http://localhost:3001/videogames', config)
            let json = await res.json()

            alert('Videogame Created!')
            // console.log(json);
        }
        catch (err) {
            console.log(err)
        }



    }

    function deleteElement(arg) {
        if (arg === 'genre') {


            var genres = newGenre;
            genres.pop();
            return setNewGenre([...genres])
        }
        if (arg === 'platform') {
            var platforms = newPlatform;
            platforms.pop();
            return setNewPlatform([...platforms])
        }
    }

    let key = 0;



    return (<div>

        <h1>Create Your Own Videogame</h1>
        <Link to='/home'>
            <button>Home</button>
        </Link>

        <form id='form' onSubmit={e => {
            e.preventDefault();
            handleSubmit()

        }} >
            <label for='Name'>Name: </label>
            <input type="text" name='Name' placeholder='Name...' onChange={e => setNewGame({ ...newGame, name: e.target.value })} required />

            <label for='Description'>Description: </label>
            <input type="text" name='Description' placeholder='Description...' onChange={e => setNewGame({ ...newGame, description: e.target.value })} required />

            <label for='Released'>Released: </label>
            <input type="date" name='Released' placeholder='Released...' onChange={e => setNewGame({ ...newGame, released: e.target.value })} required />

            <label for='Rating'>Rating: </label>
            <input type="number" name='Rating' step="any" placeholder='Rating...' onChange={e => setNewGame({ ...newGame, rating: e.target.value })} required />


            <label for='Platforms'>Platforms: </label>
            <select name='platforms' onChange={e => setNewGame({ ...newGame, platforms: [...newGame.platforms, e.target.value] })} required>
                <option key={key++} value="" selected >Select a Platform---</option>
                <option >Playstation 5</option>
                <option >Xbox-One</option>
                <option >Playstation 4</option>
                <option >Xbox-360</option>
                <option >PC</option>
                <option >MacOs</option>
                <option >Android</option>
                <option >Linux</option>

            </select>

            <label for='genres'>Genre: </label>
            <select name='genres' onChange={(e) => setNewGame({ ...newGame, genres: [...newGame.genres, e.target.value] })}>
                <option key={key++} value="" selected >Select a Genre---</option>
                {genres.map(e => {
                    return (
                        <option key={e.id}>{e.name}</option>
                    )
                })}


            </select>


            <input type="submit" value='Create!' />
            {/* <button onDoubleClick={}>X</button> */}
        </form>


        <button onClick={() => setNewGenre([...newGenre, 'x'])}>Add genre</button>

        {

            newGenre.map(e => {
                return (

                    <select name='genres' onChange={(e) => setNewGame({ ...newGame, genres: [...newGame.genres, e.target.value] })}>
                        <option key={key++} value="" selected >Select a Genre---</option>
                        {genres.map(e => {
                            return (
                                <option key={e.id}>{e.name}</option>
                            )
                        })}


                    </select>

                )
            })


        }
        {newGenre.length ? (<button onClick={() => deleteElement('genre')} >Remove genre</button>) : null}


        <button onClick={() => setNewPlatform([...newPlatform, 'x'])}>Add Platform</button>
        {newPlatform.length ? <button onClick={() => deleteElement('platform')}>Remove Platform</button> : null}

        {newPlatform.map(e => {
            return (
                <div>
                    <select name='platforms' onChange={e => setNewGame({ ...newGame, platforms: [...newGame.platforms, e.target.value] })} >
                        <option >Playstation 5</option>
                        <option >Xbox-One</option>
                        <option >Playstation 4</option>
                        <option >Xbox-360</option>
                        <option >PC</option>
                        <option >MacOs</option>
                        <option >Android</option>
                        <option >Linux</option>

                    </select>
                </div>
            )
        })}




    </div>)
}

function mapStateToProps(state) {
    return {
        genres: state.genres
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getGenres: () => dispatch(getGenres())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateVideogame)




//input platforms
{/* <input type="text" name='Platforms' onChange={e => setNewGame({ ...newGame, platforms: e.target.value })} required /> */ }




































