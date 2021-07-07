import './App.css';
import Home from './Home'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Switch> 
          <Route exact path="/get-repos">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
