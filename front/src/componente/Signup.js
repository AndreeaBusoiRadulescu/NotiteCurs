import axios from "axios";
import React from "react";
import "../css/Login.css";

class Signup extends React.Component
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

    //la apasare pe butonul de inregistrare
    handleSubmit(event) {

        //verificari pentru campurile introduse de utilizator
        if(this.state.username.length === 0)
        {
            alert("Email-ul nu poate fi gol!");
            return;
        }
        
        if(this.state.password.length < 3)
        {
            alert("Parola trebuie sa aiba cel putin 4 caractere!");
            return;
        }

        if(!this.state.username.endsWith("@stud.ase.ro"))
        {
            alert("Sunt permise doar email-urile institutionale (email@stud.ase.ro)!");
            return;
        }

        //Request post la api pentru inserare utilizator nou
        axios.post('http://localhost:3000/utilizator', {
            EmailAddress: this.state.username,
            Parola: this.state.password
        },
        {
            headers: {
                "Content-type": "application/json",
            }
        })
        .then(function (response) {
            if(response.status === 201) //CREATED
            {
                alert("Contul a fost creat!");
                //redirectionare utilizator catre pagina de notite
                window.location.href = "notite";
            }
            else
            {
                alert("Eroare la introducerea contului!");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Eroare la introducerea contului!");
        });
        

        event.preventDefault();
    }

    render() {
        return(
            <div>
                <div>
                    {/* Formular Sign Up */}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="login" className="second" name="login" placeholder="email" onChange={this.handleUsernameChange}/>
                        <input type="password" id="password" className="third" name="login" placeholder="password" onChange={this.handlePasswordChange}/>
                        <input type="submit" className="fourth" value="Sign Up"/>
                    </form>
                </div>
            </div>
        );
    }
}

//pentru a face clasa vizibila spre utilizare din alte fisiere
export default Signup;