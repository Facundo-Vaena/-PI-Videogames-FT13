import React, { useState } from 'react';
import fetch from 'node-fetch';


export default function Home() {
    const [game, setGame] = useState('');

    
    function search(name){
        fetch(`http://localhost:3001/videogames?search=${name}`)
        .then(res => {console.log(name)})
    }


    return (<div>

        <form onSubmit={ e =>{
            e.preventDefault();
            search(game)
        }}
        
        >
            <input
                type="search"
                placeholder='Videogame...'
                onChange={e => setGame(e.target.value)}
            />
            <input type='submit' value='search'/>
            </form>

    </div>)
}