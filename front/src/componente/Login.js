import axios from "axios";
import React from "react";
import "../css/Login.css";

class Login extends React.Component
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

        //Request get la api pentru adaugat utilizator nou
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

                window.location.href = "notite";

                //Salvam id-ul contului in localStorage
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

export default Login;