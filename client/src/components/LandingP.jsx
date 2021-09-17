import React from 'react'
import { Link } from 'react-router-dom';
import './LangingP.css'

export default function LandingP(){


  return(<div >

      
      
      <div className='landingSubcontainer'>
      <h1 className='landingTitle'><sup>H</sup>enry Videogames</h1>

      <Link to={'/home'}>
        <button className='landingButton'>HOME</button> 
      </Link> 
      </div>
      
     

  </div>)
}