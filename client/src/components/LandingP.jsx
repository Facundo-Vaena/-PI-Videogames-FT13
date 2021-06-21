import React from 'react'
import { Link } from 'react-router-dom';
import './LangingP.css'
// import { connect } from 'react-redux'
// import { getVideogames } from '../actions/index'
// import { useEffect } from 'react';



export default function LandingP(){


  return(<div >

      {/* <div className='landingSubcontainer'>
    
    { <img className='landingImg' src="https://s1.1zoom.me/big3/916/348823-blackangel.jpg" alt="" />}
    
      </div> */}

      {/* <img src="https://k60.kn3.net/taringa/3/D/3/E/D/A/FGF98/65C.jpg" className='langinImg' alt="" /> */} 
      
      <div className='landingSubcontainer'>
      <h1 className='landingTitle'><sup>H</sup>enry Videogames</h1>
       {/* <img className='landingImg' src="https://s1.1zoom.me/big3/916/348823-blackangel.jpg" alt="" /> */}


      <Link to={'/home'}>
        <button className='landingButton'>HOME</button> 
      </Link> 
      </div>
      
     

  </div>)
}

































// export function LandingP(){

 
    

//     return(<div>

//         <h1>VIDEOGAMES</h1>
//         {/* <form onSubmit={e =>{
//           e.preventDefault()
//           getVideogames()
//         }}> */}
//         <Link to={'/home'}>
//           <button>HOME</button>
//           {/* <input type='submit' value='HOME' onSubmit={(e) => {e.preventDefault(); getVideogames()}} /> */}
//         </Link>
//         {/* </form> */}

//     </div>)
// }



// function mapDispatchToProps(dispatch) {
//   return {
//       getVideogames: () => dispatch(getVideogames())
//   }
// }

// export default connect(null, mapDispatchToProps)(LandingP)



