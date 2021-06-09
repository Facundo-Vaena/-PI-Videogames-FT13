import React from 'react'
import { Link } from 'react-router-dom';


export default function LandingP(){


    return(<div>

        <h1>VIDEOGAMES</h1>
        <Link to={'/home'}>
          <button>HOME</button> 
        </Link>

    </div>)
}