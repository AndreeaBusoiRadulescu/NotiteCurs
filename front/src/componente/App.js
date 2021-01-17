import '../css/App.css';
import Meniu from '../componente/Meniu';
import Login from '../componente/Login';
import Notita from '../componente/Notita';
import Signup from '../componente/Signup';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PaginaNotite from './PaginaNotite';

class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {isToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {

    e.preventDefault();
    const element = document.getElementById("wrapper");

    this.setState(state =>
      {
        if(state.isToggleOn === false)
        {
          element.classList.add("toggled");
          return {isToggleOn: true};
        }
        else 
        {
          element.classList.remove("toggled");
          return {isToggleOn: false};
        }
      }
    );
  }

  logoutClick(e)
  {
      localStorage.removeItem('id');
      window.location.href="login";
  }

  render(){

    let elementeMeniuDeSus = undefined;

    if(localStorage.getItem('id') === null)
    {
      elementeMeniuDeSus = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/login" className="nav-link">Log In</Link>
            </li>
            <li className="nav-item active">
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
        </ul>);
    }
    else {
      elementeMeniuDeSus = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="" onClick={this.logoutClick}>Log out</a>
          </li>
    </ul>);
    }
                               
    return (
      <div>
        <div className="d-flex" id="wrapper">
          <Router>
            <Meniu />
            <div id="page-content-wrapper">

              <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <button className="btn btn-dark" id="menu-toggle" onClick={this.handleClick}>
                  <FontAwesomeIcon icon={faBars}/>
                </button>  
                {elementeMeniuDeSus}
              </nav>

              <div className="container-fluid">
              <Switch>
                  <Route path="/login">
                    <div className="text-center m-auto"  style={
                      {width : '30%'}
                    }>
                    <Login />
                    </div>
                  </Route>
                  <Route path="/signup">
                    <div className="text-center m-auto"  style={
                      {width : '30%'}
                      }>
                      <Signup />
                    </div>
                  </Route>
                  <Route path="/notite">
                      <PaginaNotite />
                  </Route>
                  <Route path="/users">
                      {/* <Users /> */}
                  </Route>
                  <Route path="/">
                      {/* <Home /> */}
                  </Route>
              </Switch> 
              </div>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
