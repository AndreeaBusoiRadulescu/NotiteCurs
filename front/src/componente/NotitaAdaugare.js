import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import FormularNotita from '../componente/FormularNotita';

class NotitaAdaugare extends React.Component
{
    constructor(props)
    {
        super(props);
    }
  
    handleClick(){
        window.location.href = "formularnotita";
    }

    render() {
        return(
            //structura elementului pentru adaugare o notita noua
            <div className="card ml-3 mt-3" style={
                    {width: '18rem'}}>   
                <div className="card-body text-center">
                    <h5 className="card-title">Adaugare notita noua</h5>
                    <a href="#" id="addNotita" onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faPlusCircle} size='3x'/>
                     </a> 
                </div>
            </div>
        );
    }
}

//pentru a face clasa vizibila spre utilizare din alte fisiere
export default NotitaAdaugare;