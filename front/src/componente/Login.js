import axios from "axios";
import React from "react";
import "../css/Login.css";

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        
        //initializare
        this.state = {
            username : "",
            password: ""
        };

        // aceste bind-uri sunt necesare pentru a face `this` vizibil in callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    //pentru a sesiza schimbarile din campul Username realizate de utilizator
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    //pentru a sesiza schimbarile din campul Password realizate de utilizator
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    //la apasare pe butonul de conectare
    handleSubmit(event) {

        //Request get la api pentru preluare valori
        axios.get('http://localhost:3000/login', {
            params: {
                'email': this.state.username,
                'password': this.state.password
            }
        },
        {
            headers: {
                "Content-type": "application/json",
            }
        })
        .then(function (response) {
            if(response.status === 200) //OK
            {
                alert("Contul a fost gasit!");

                //redirectionare catre pagina de notite
                window.location.href = "notite";

                //Salvam id-ul contului in localStorage
                //aceasta operatie este ultila pentru a incarca in continuare notitele acestui utilizator in functie de id
                localStorage.setItem("id", response.data.id);
            }
            else
            {
                alert("Email si/sau parola gresite!");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Email si/sau parola gresite!");
        });
        
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <div>
                    {/* formular Log In */}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="login" className="second" name="login" placeholder="email" onChange={this.handleUsernameChange}/>
                        <input type="password" id="password" className="third" name="login" placeholder="password" onChange={this.handlePasswordChange}/>
                        <input type="submit" className="fourth" value="Log in"/>
                    </form>
                </div>
            </div>
        );
    }
}

//pentru a face clasa vizibila spre utilizare din alte fisiere
export default Login;