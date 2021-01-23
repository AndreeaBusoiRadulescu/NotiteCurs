import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import EditareNotita from './EditareNotita';
import {Route} from 'react-router';

class Notita extends React.Component
{
    constructor(props)
    {
        super(props);
        console.log(this.props);

        this.state = {
            //notite: []
        };

        this.stergeNotita=this.stergeNotita.bind(this);
        this.editeazaNotita = this.editeazaNotita.bind(this);
    }

    stergeNotita(){
        //key = id din baza de date
        console.log(this.props);
        axios.delete('http://localhost:3000/notita/' + this.props.notita.IdNotita , {},
        {
            headers: {
                "Content-type": "application/json",
            }
        })
        .then(function (response) {
            if(response.status === 200) //OK
            {
                alert("Notita stearsa!");

                //redirectionare catre pagina de notite
                window.location.href = "notite";
            }
            else
            {
                alert("Eroare!");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Eroare! " + error.response.data.message);
        });
        
    }
    
    editeazaNotita(){
        window.location.href = "editarenotita/" + this.props.notita.IdNotita;
    }

    render() {

        return(
            // structura unui element de tip notita
            <div className="card ml-3 mt-3" style={
                {width: '18rem'}
                }>
                <div className="card-body">
                <a href="#" id="editareNotita" onClick={this.editeazaNotita}>           
                          <FontAwesomeIcon icon={faPencilAlt} size='1x' color="black"/>
                       </a>
                <a href="#" id="stergeNotita" onClick={this.stergeNotita}>           
                          <FontAwesomeIcon icon={faTrashAlt} size='1x' color="black"/>
                       </a>
                    <h5 className="card-title">{this.props.notita.Materie} </h5>
                    <p className="card-text">{this.props.notita.Continut}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{this.props.notita.DataNotita}</small>
                    {
                        this.props.notita.Atasamente.map((atasament, index) => {     
                            // returneaza elementul si paseaza cheia    
                            return (
                            <div key={index}>
                                <a key={index} href={atasament.SursaAtasament}>{"Atasament " + (index + 1)}
                                </a>
                            </div>
                            ) 
                        })
                    }
                </div>

                

            </div>
        );
    }
}

//pentru a face clasa vizibila spre utilizare din alte fisiere
export default Notita;