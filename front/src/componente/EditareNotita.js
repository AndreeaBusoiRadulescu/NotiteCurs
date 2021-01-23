import axios from "axios";
import React from "react";
import { useParams } from 'react-router-dom';

class EditareNotita extends React.Component
{
    constructor(props)
    {
        super(props);

        console.log(window.location);

        //initializare
        this.state = {
            materie : "",
            continut : "",
            dataNotita : "",
            atasamente: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMaterieChange = this.handleMaterieChange.bind(this);
        this.handleContinutChange = this.handleContinutChange.bind(this);
        this.handleDataNotitaChange = this.handleDataNotitaChange.bind(this);
        this.handleAtasamenteChange = this.handleAtasamenteChange.bind(this);

        //Preluam id-ul notitei pe care o editam din URL (.../editeazanotita/IdNotita)
        this.IdNotita = window.location.pathname.split("/")[2];
    }

    populareInitiala()
    {
        const elemMaterie = document.getElementById("materie");
        const elemDataNotita = document.getElementById("dataNotita");
        const elemContinut = document.getElementById("continut");
        const elemAtasamente = document.getElementById("atasamente");

        elemMaterie.value = this.state.materie;
        
        console.log("data notita: ");
        console.log(this.state.dataNotita);

        if(!this.state.dataNotita)
        {
            elemDataNotita.value = this.state.dataNotita;
        }
        else 
        {
            elemDataNotita.value = "";
        }
    
        elemContinut.value = this.state.continut;

        elemAtasamente.value = this.state.atasamente;
    }

    componentDidMount()
    {
        // De facut get pt luat entitate din baza de date
        // + populat campuri 
        // + update
        let IdNotita = this.IdNotita;
        let context = this;

        //Facem request get pentru luat entitatea cu id IdNotita
        axios.get('http://localhost:3000/notita/' + IdNotita, {},
        {
            headers: {
                "Content-type": "application/json",
            }
        })
        .then(function (response) {
            console.log(response.status);
            if(response.status === 200 || response.status === 304) //OK
            {
                console.log("[EDITARE] Notita " + IdNotita + " a fost gasita!");
                
                //Populare state cu valorile vechi
                context.setState(
                    {
                        materie: response.data.Materie,
                        continut: response.data.Continut,
                        dataNotita: response.data.DataNotita,
                    }
                );

                let atasamenteString = "";
                for(let atasament of response.data.Atasamente)
                {
                    atasamenteString += atasament.SursaAtasament + "\n\n";
                }

                context.setState({atasamente: atasamenteString});
                context.populareInitiala();
            }
            else
            {
                alert("Notita invalida!");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Notita invalida! " + error.response.data.message);
        });
    }

    handleMaterieChange(event){
        this.setState({materie: event.target.value});
    }

    handleContinutChange(event){
        this.setState({continut: event.target.value});
    }

    handleDataNotitaChange(event){
        this.setState({dataNotita: event.target.value});
    }

    handleAtasamenteChange(event){
        this.setState({atasamente: event.target.value});
    }

    convertAtasamenteStringToArray(atasamenteString)
    {
        let surseAtasamente = atasamenteString.split('http');
        let atasamenteArray = [];

        for(let sursaAtasament of surseAtasamente)
        {
            if(sursaAtasament !== "")
                atasamenteArray.push("http" + sursaAtasament.trim());
        }
        return atasamenteArray;
    }

    handleSubmit(event) {

        let IdNotita = this.IdNotita;
        let context = this;

        //Request get la api pentru preluare valori
        axios.put('http://localhost:3000/editarenotita/' + IdNotita, {
                IdNotita : parseInt(IdNotita),
                Materie: this.state.materie,
                UtilizatorId: localStorage.getItem("id"),
                Continut: this.state.continut,
                DataNotita: this.state.dataNotita,
                Atasamente: JSON.stringify(context.convertAtasamenteStringToArray(this.state.atasamente))
        },
        {
            headers: {
                "Content-type": "application/json",
            }
        })
        .then(function (response) {
            if(response.status === 200) //OK
            {
                alert("Notita a fost modificata!");

                //redirectionare catre pagina de notite
                window.location.href = "http://localhost:3000/notite";
            }
            else
            {
                alert("Notita nu a fost modificata!");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Notita nu a fost modificata! " + error.response.data.message);
        });
        
        event.preventDefault();
    }
    render() {
        return(
            <div>
                <div>
                    {/* formular notita */}
                    <form>
                        <input type="text" id="materie" className="second mt-5" name="materie" placeholder="Materie" onChange={this.handleMaterieChange}/>
                        {/* <input type="text" id="continut" className="third" name="continut" placeholder="Continut" onChange={this.handleContinutChange}/> */}
                        <input type="text" id="dataNotita" className="fourth" name="data" placeholder="Data notita" onChange={this.handleDataNotitaChange}/>
                        <textarea name="textarea" id="continut" className="form-control mt-3 mb-3" placeholder="Continut" cols="40" rows="5" onChange={this.handleContinutChange}/>
                        <textarea name="textarea" id="atasamente" className="form-control mt-3 mb-3" placeholder="Atasamente" cols="40" rows="5" onChange={this.handleAtasamenteChange}/>
                        <input className="fifth" defaultValue="Editeaza" onClick={this.handleSubmit}/>
                        <p>*Atentie! Data trebuie sa respecte formatul YYYY-MM-DD. Exemplu: 2020-08-30</p>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditareNotita;