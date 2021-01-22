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
           // idUtilizator:localStorage.id,
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
        axios.get('http://localhost:3000/formularnotita', {
            params: {
                Materie: this.state.materie,
                //UtilizatorId: this.state.idUtilizator,
                Continut: this.state.continut,
                DataNotita: this.state.dataNotita,
            }
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

                //Salvam id-ul contului in localStorage
                //aceasta operatie este ultila pentru a incarca in continuare notitele acestui utilizator in functie de id
                localStorage.setItem("id", response.data.id);
            }
            else
            {
                alert("Notita nu a fost adaugata!");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Notita nu a fost adaugata!");
        });
        
        event.preventDefault();
    }
    render() {
        return(
            <div>
                <div>
                    {/* formular notita */}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="materie" className="second" name="materie" placeholder="Materie" onChange={this.handleMaterieChange}/>
                        <input type="text" id="continut" className="third" name="continut" placeholder="Continut" onChange={this.handleContinutChange}/>
                        <input type="text" id="dataNotita" className="fourth" name="data" placeholder="Data notita" onChange={this.handleDataNotitaChange}/>
                        <input type="submit" className="fifth" value="Adauga"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default FormularNotita;