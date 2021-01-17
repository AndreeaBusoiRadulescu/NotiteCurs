import React from "react";
import Notita from "./Notita";
import axios from "axios";
import NotitaAdaugare from "./NotitaAdaugare";

class PaginaNotite extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            notite : []
        };

        this.preiaNotite = this.preiaNotite.bind(this);
    }

    componentDidMount()
    {
        if(localStorage.getItem('id') === null)
        {
            window.location.href="login";
            alert("Trebuie sa te loghezi pentru a vedea notitele!");
        }
        this.preiaNotite();
    }

    async preiaNotite()
    {
        console.log(this);
        const response = await axios.get('http://localhost:3000/utilizator/' + localStorage.getItem("id") + "/notite", {},
        {
            headers: {
                "Content-type": "application/json",
            }
        });

        if(response.status === 200 || response.status === 304) //OK
        {
            console.log("notite gasite!");
            this.setState({notite: response.data});
            console.log(this.state.notite);
        }
        else
        {
            alert("Utilizator negasit!");
        }
    }

    render() {
        return(
            localStorage.getItem('id') && //if inline (echivalent cu a testa cu if)
            <div className="d-flex wrap-content flex-wrap flex-row">
                <NotitaAdaugare />
                {
                    this.state.notite.map((notita, index) => {     
                        console.log("Entered");                 
                        // Return the element. Also pass key     
                        return (<Notita key={notita.IdNotita} notita={notita}/>) 
                    })
                } 
            </div>
        );
    }
}

export default PaginaNotite;