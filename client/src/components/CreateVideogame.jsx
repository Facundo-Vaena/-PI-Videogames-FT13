import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGenres } from '../actions/index'
import './CreateVideogame.css'




export function CreateVideogame({ genres, getGenres, videogames }) {

    const [newGame, setNewGame] = useState({ genres: [], platforms: [] })
    const [newGenre, setNewGenre] = useState([]);
    const [newPlatform, setNewPlatform] = useState([]);
    const [nameError, setNameError] = useState('');
    const [ratingError, setRatingError] = useState('');

    useEffect(() => {
        getGenres()
         // eslint-disable-next-line
    }, [])


    async function handleSubmit() {
        alert(`${newGame.name} Created!`)
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newGame)
            }
             await axios.get('/videogames', config)
            
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

    function validateName(value){
        var repetedName = videogames.filter(e =>{
            return e.name === value
        })
        if(repetedName.length){
            setNameError('This name already exists!')
        } else{
            setNameError('');
        }
        setNewGame({ ...newGame, name: value })

    }
    function validateRating(value){
        if(value > 5 || value < 0){
            setRatingError('Only numbers between 0 and 5!');
        } else{
            setRatingError('');
        }
        setNewGame({...newGame, rating: value})
    }

    
   



    let key = 0;



    return (<div className='creationContainer'>
        
        <Link to='/home'>
            <button className='creationHomeLink'>Home</button>
        </Link>
        <h1 className='creationTitle'>Create your own videogame</h1>
        <div className='creationSubcontainer'>

        <form className='form' id='form' onSubmit={e => {
            e.preventDefault();
            handleSubmit();
            // document.getElementById('form').reset();

        }} >
            <button className='submit' type='submit'>Create!</button>
            <div className='formTop'>
                <label for='Name'>Name: </label>
                <input type="text" name='Name' placeholder='Name...' onChange={e => validateName(e.target.value) } required />
                
                {nameError.length ? <span className='validationError'>{nameError}</span> : null}
                
                <label for='Description'>Description: </label>
                <input type="text" name='Description' placeholder='Description...' onChange={e => setNewGame({ ...newGame, description: e.target.value })} required />

                <label for='Released'>Released: </label>
                <input className='released' type="date" name='Released' placeholder='Released...' onChange={e => setNewGame({ ...newGame, released: e.target.value })} required />
                {/* <input type="date" name='Released' placeholder='Released...' onChange={e =>validateDate(e.target.value)} required /> */}

                <label for='Rating'>Rating: </label>
                <input className='rating' type="number" name='Rating' step="any" placeholder='Rating...' onChange={e => validateRating(e.target.value)} required />
                {ratingError.length ? <span className='validationError'>{ratingError}</span> : null}
            </div>
            <div className='formBottom'>

                <div className='platform'>
                    <label for='Platforms'>Platforms: </label>

                    <select className='select' name='platforms' onChange={e => setNewGame({ ...newGame, platforms: [...newGame.platforms, e.target.value] })} required>
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
                </div>
                <div className='genre'>
                    <label for='genres'>Genre: </label>
                </div>
                <select className='select' name='genres' onChange={(e) => setNewGame({ ...newGame, genres: [...newGame.genres, e.target.value] })}>
                    <option key={key++} value="" selected >Select a Genre---</option>
                    {genres.map(e => {
                        return (
                            <option key={e.id}>{e.name}</option>
                        )
                    })}


                </select>
            </div>

        </form>

        
        <div className='options'>
            
            <div className='platformsOptions'>
            {newPlatform.map(e => {
                return (
                    <div>
                        <select className='select' name='platforms' onChange={e => setNewGame({ ...newGame, platforms: [...newGame.platforms, e.target.value] })} >
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
                    </div>
                )
            })}
            </div>
            <div className='genresOptions'>
            {
                newGenre.map(e => {
                    return (

                        <select className='select' name='genres' onChange={(e) => setNewGame({ ...newGame, genres: [...newGame.genres, e.target.value] })}>
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
            </div>
            
        </div>
        <div className='addButtons'>
            <button className='addPlatform' onClick={() => setNewPlatform([...newPlatform, 'x'])}>Add Platform</button>
            <button className='addGenre' onClick={() => setNewGenre([...newGenre, 'x'])}>Add genre</button>
        </div>

        <div className='removeButtons'>
            {newPlatform.length ? <button className='removePlatform' onClick={() => deleteElement('platform')}>Remove Platform</button> : null}
            {newGenre.length ? (<button className='removeGenre' onClick={() => deleteElement('genre')} >Remove genre</button>) : null}
        </div>

        

        </div>


    </div>)
}

function mapStateToProps(state) {
    return {
        genres: state.genres,
        videogames: state.videogames
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getGenres: () => dispatch(getGenres())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateVideogame)








































