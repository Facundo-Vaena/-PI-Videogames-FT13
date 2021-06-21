import React from 'react'
import fetch from 'node-fetch'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGenres } from '../actions/index'
import './CreateVideogame.css'




export function CreateVideogame({ genres, getGenres, videogames }) {

    const [newGame, setNewGame] = useState({ genres: [], platforms: [] })
    const [newGenre, setNewGenre] = useState([]);
    const [newPlatform, setNewPlatform] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        getGenres()
    }, [])

    async function handleSubmit() {
        alert('Videogame Created!')
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

    function validateName(value){
        var repetedName = videogames.filter(e =>{
            return e.name === value
        })
        if(repetedName.length){
            setError('This name already exists!')
        } else{
            setError('');
        }
        setNewGame({ ...newGame, name: value })

    }
    // function validateDate(value){
    //     var dateReg = new RegExp(['^(?:(?:(?:0?[13578]|1[02])(\\/|-|\\.)31)',             '\\1|(?:(?:0?[1,3-9]|1[0-2])(\\/|-|\\.)(?:29|30)',             '\\2))(?:(?:1[6-9]|[2-9]\\d)?\d{2})$|^(?:0?2(\\/|-|\\.)',             '29\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|',             '[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))',             '$|^(?:(?:0?[1-9])|(?:1[0-2]))(\\/|-|\\.)',             '(?:0?[1-9]|1\\d|2[0-8])\\4',             '(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$'].join(''),"g");
    //     if(!dateReg.test(value)){
    //         setError('Non valid date!')
    //     } else{
    //         setError('');
    //     }
    //     setNewGame({ ...newGame, released: value });

    // }



    let key = 0;



    return (<div className='creationContainer'>
        
        <Link to='/home'>
            <button className='creationHomeLink'>Home</button>
        </Link>
        <h1 className='creationTitle'>Create your own videogame</h1>
        <div className='creationSubcontainer'>

        <form className='form' id='form' onSubmit={e => {
            e.preventDefault();
            handleSubmit()

        }} >
            <button className='submit' type='submit'>Create!</button>
            <div className='formTop'>
                <label for='Name'>Name: </label>
                <input type="text" name='Name' placeholder='Name...' onChange={e => validateName(e.target.value) } required />
                
                {error.length ? <span className='validationError'>{error}</span> : null}
                
                <label for='Description'>Description: </label>
                <input type="text" name='Description' placeholder='Description...' onChange={e => setNewGame({ ...newGame, description: e.target.value })} required />

                <label for='Released'>Released: </label>
                <input className='released' type="date" name='Released' placeholder='Released...' onChange={e => setNewGame({ ...newGame, released: e.target.value })} required />
                {/* <input type="date" name='Released' placeholder='Released...' onChange={e =>validateDate(e.target.value)} required /> */}

                <label for='Rating'>Rating: </label>
                <input className='rating' type="number" name='Rating' step="any" placeholder='Rating...' onChange={e => setNewGame({ ...newGame, rating: e.target.value })} required />
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

            {/* <input type="submit" value='Create!' /> */}
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




//input platforms
{/* <input type="text" name='Platforms' onChange={e => setNewGame({ ...newGame, platforms: e.target.value })} required /> */ }




































