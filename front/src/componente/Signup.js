import axios from "axios";
import React from "react";
import "../css/Login.css";

class Signup extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username : "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.username + "   " + this.state.password);

        //Request post pt inserat utilizator nou
        
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

        //Request post la api pentru adaugat utilizator nou
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

export default Signup;