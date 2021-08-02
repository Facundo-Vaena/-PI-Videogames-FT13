import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingP from './components/LandingP';
import Home from './components/Home';
import CreateVideogame from './components/CreateVideogame';
import VideogameDetail from './components/VideogameDetail'




function App() {
  return (
      <div className='App'>
      <BrowserRouter>
      <Route path='/createvideogame' component={CreateVideogame}/>
      {/* <Route path='/home' component={SearchBar}/> */}
      <Route  path='/' exact component={LandingP}/>
      <Route exact path='/home' component={Home} />
      <Route path='/videogamedetail' component={VideogameDetail} />
      </BrowserRouter>
      </div>)
  
}

export default App;
// {/* <h1>Henry Videogames</h1> */}
//       {/* <Router> */}
//       {/* </Router> */}