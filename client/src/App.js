import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingP from './components/LandingP';
import Home from './components/Home';
{/* <BrowserRouter>
 

</BrowserRouter> */}



function App() {
  return (
    <div className="App">
      {/* <h1>Henry Videogames</h1> */}
      <Route  path='/' exact component={LandingP}/>
      <Route path='/home' exact component={Home} />
    </div>
  );
}

export default App;
