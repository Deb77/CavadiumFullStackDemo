import React from 'react';
import Form from './components/Form/Form';
import Users  from './components/Users/Users';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
      <div className="right"></div>
      <div className="left">
        <Switch>
          <Route exact path="/">
            <Form/>
          </Route>
          <Route path="/users">
            <Users/>
          </Route>
        </Switch>     
        <div className="footer">
          <li><Link to="/">AddUser</Link></li>
          <li><Link to="/users">ViewUsers</Link></li>
        </div>
      </div>
    </div>
    </Router>
    
  );
}

export default App;
