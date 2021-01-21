import '../css/App.css';
import Meniu from '../componente/Meniu';
import Login from '../componente/Login';
import Signup from '../componente/Signup';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PaginaNotite from './PaginaNotite';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FormularNotita from './FormularNotita';


class App extends React.Component {

  constructor(props)
  {
    super(props);

    //pentru butonul de afisare/ascundere meniu lateral
    //stare initiala -> se afiseaza meniul
    this.state = {isToggleOn: false};

    // acest bind este necesar pentru a face `this` vizibil in callback
    this.handleClick = this.handleClick.bind(this);
  }

  //handleClick pentru butonul de afisare/ascundere meniu lateral
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

  //evenimentul de logout
  logoutClick(e)
  {
      //se sterge id-ul utilizatorului logat din localstorage
      localStorage.removeItem('id');
      //se incarca pagina de login 
      window.location.href="login";
  }

  render(){

    let elementeMeniuDeSus = undefined;

    //verificam daca un utilizator este logat
    //adica daca exista un id in local storage
    if(localStorage.getItem('id') === null)
    {
      //daca nu exista id in local storage pentru utilizator
      //afisam ca si elemente pentru bara de sus optiunile de "Log In" si "Sign Up"
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
      //daca exista id in local storage pentru utilizator
      //afisam ca si element pentru bara de sus optiunea de "Log Out"
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

              {/* bara de navigare sus, care contine butonul de afisare/ascundere meniu lateral si elementele de logare*/}
              <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <button className="btn btn-dark" id="menu-toggle" onClick={this.handleClick}>
                  <FontAwesomeIcon icon={faBars}/>
                </button>  
                {elementeMeniuDeSus}
              </nav>


              <div className="container-fluid">
                <Switch>
                  {/*Pagina Log In */}
                  <Route path="/login">
                    <div className="text-center m-auto"  style={
                      {width : '30%'}
                      }>
                      <Login />
                    </div>
                  </Route>

                  {/*Pagina Sign Up */}
                  <Route path="/signup">
                  <div className="text-center m-auto"  style={
                    {width : '30%'}
                    }>
                    <Signup />
                  </div>

                  {/* Pagina Notite */}
                  </Route>
                    <Route path="/notite">
                    <PaginaNotite />
                  </Route>

                  {/*Pagina formular notita*/}
                  <Route path="/formularnotita">
                  <div className="text-center m-auto"  style={
                    {width : '30%'}
                    }>
                      <FormularNotita/>
                  </div>
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

//pentru a face clasa vizibila spre utilizare din alte fisiere
export default App;
