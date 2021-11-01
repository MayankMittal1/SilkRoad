import React  from "react";
import { 
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateNFT from './pages/CreateNFT/CreateNFT';
import Explore from "./pages/Explore/Explore";
import Navbar from "./components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
const App = () => {
  return (
    <Router>
      <Navbar/>
      <main>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/explore" exact>
            <Explore/>
          </Route>
          <Route path="/createnft" exact>
            <CreateNFT/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
