import axios from "axios";
import React from "react";

class FormularNotita extends React.Component
{
    constructor(props)
    {
        super(props);

        //initializare
        this.state = {
            materie : "",
            continut : "",
            dataNotita : ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMaterieChange = this.handleMaterieChange.bind(this);
        this.handleContinutChange = this.handleContinutChange.bind(this);
        this.handleDataNotitaChange = this.handleDataNotitaChange.bind(this);
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

    handleSubmit(event) {

        //Request get la api pentru preluare valori
        axios.post('http://localhost:3000/notita/' + localStorage.getItem("id") + "/formular", {
                Materie: this.state.materie,
                UtilizatorId: localStorage.getItem("id"),
                Continut: this.state.continut,
                DataNotita: this.state.dataNotita
        },
        {
            headers: {
                "Content-type": "application/json",
            }
        })
        .then(function (response) {
            if(response.status === 201) //OK
            {
                alert("A fost adaugata o notita!");

                //redirectionare catre pagina de notite
                window.location.href = "notite";
            }
            else
            {
                alert("Notita nu a fost adaugata! ");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Notita nu a fost adaugata! " + error.response.data.message);
        });
        
        event.preventDefault();
    }
    render() {
        return(
            <div>
                <div>
                    {/* formular notita */}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="materie" className="second mt-5" name="materie" placeholder="Materie" onChange={this.handleMaterieChange}/>
                        {/* <input type="text" id="continut" className="third" name="continut" placeholder="Continut" onChange={this.handleContinutChange}/> */}
                        <input type="text" id="dataNotita" className="fourth" name="data" placeholder="Data notita" onChange={this.handleDataNotitaChange}/>
                        <textarea name="textarea" className="form-control mt-3 mb-3" placeholder="Continut" cols="40" rows="5" onChange={this.handleContinutChange}/>
                        <input type="submit" className="fifth" value="Adauga"/>
                        <p>*Atentie! Data trebuie sa respecte formatul YYYY-MM-DD. Exemplu: 2020-08-30</p>
                    </form>
                </div>
            </div>
        );
    }
}

export default FormularNotita;