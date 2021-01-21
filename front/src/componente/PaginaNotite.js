import React from "react";
import Notita from "./Notita";
import axios from "axios";
import NotitaAdaugare from "./NotitaAdaugare";

class PaginaNotite extends React.Component
{
    constructor(props)
    {
        super(props);

        //initializare
        this.state = {
            notite : []
        };

        this.preiaNotite = this.preiaNotite.bind(this);
    }

    //verificam deca exista un id in local storage
    //daca nu exista dorim sa nu incarcam utilizatorului pagina de notite
    //se va afisa un mesaj de tip alert care il va sugera utilizatorului sa se conecteze
    //se va realiza redirectionarea automata spre pagina de "Log In"
    componentDidMount()
    {
        if(localStorage.getItem('id') === null)
        {
            window.location.href="login";
            alert("Trebuie sa te loghezi pentru a vedea notitele!");
        }
        this.preiaNotite();
    }

    //Request get la api pentru preluare notite in functie de id-ul utilizatorului
    async preiaNotite()
    {
        const response = await axios.get('http://localhost:3000/utilizator/' + localStorage.getItem("id") + "/notite", {},
        {
            headers: {
                "Content-type": "application/json",
            }
        });

        if(response.status === 200 || response.status === 304) //OK
        {
            //populam notite din constructor cu notitele returnate
            this.setState({notite: response.data});
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
                    //mapare elemente
                    this.state.notite.map((notita, index) => {     
                        // returneaza elementul si paseaza cheia    
                        return (<Notita key={notita.IdNotita} notita={notita}/>) 
                    })
                } 
            </div>
        );
    }
}

//pentru a face clasa vizibila spre utilizare din alte fisiere
export default PaginaNotite;