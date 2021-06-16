import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingP from './components/LandingP';
import Home from './components/Home';
import SearchBar from './components/SearchBar'
import CreateVideogame from './components/CreateVideogame';
import VideogameDetail from './components/VideogameDetail'
{/* <BrowserRouter>
 

</BrowserRouter> */}



function App() {
  return (
    <div className="App">
      {/* <h1>Henry Videogames</h1> */}
      <Route path='/createvideogame' component={CreateVideogame}/>
      {/* <Route path='/home' component={SearchBar}/> */}
      <Route  path='/' exact component={LandingP}/>
      <Route exact path='/home' exact component={Home} />
      <Route path='/videogamedetail' component={VideogameDetail} />
    </div>
  );
}

export default App;
