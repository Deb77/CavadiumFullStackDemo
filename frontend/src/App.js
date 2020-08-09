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
      <div className="right">
      <img src="https://img.icons8.com/cotton/64/000000/conference-call.png" alt="logo"/>
        <h1>Users Log</h1>
        <br/>
        <li><img src="https://img.icons8.com/pastel-glyph/24/000000/plus.png" alt="plus"/><Link className="links" to="/">AddUser</Link></li>
        <br/>
          <li><img src="https://img.icons8.com/ios-glyphs/30/000000/contacts.png" alt="users"/><Link className="links" to="/users">ViewUsers</Link></li>
      </div>
      <div className="left">
        <Switch>
          <Route exact path="/">
            <Form/>
          </Route>
          <Route path="/users">
            <Users/>
          </Route>
        </Switch>     
      </div>
    </div>
    </Router>
    
  );
}

export default App;
