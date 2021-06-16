import React from 'react'
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'
// import { getVideogames } from '../actions/index'
// import { useEffect } from 'react';



export default function LandingP(){


  return(<div>

      <h1>VIDEOGAMES</h1>
      
      <Link to={'/home'}>
        <button>HOME</button> 
      </Link>
     

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



