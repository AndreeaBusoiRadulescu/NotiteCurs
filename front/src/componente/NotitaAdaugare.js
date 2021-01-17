import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

class NotitaAdaugare extends React.Component
{
    constructor(props)
    {
        super(props);
    }
  

    render() {
        return(
            <div className="card ml-3 mt-3" style={
                    {width: '18rem'}}>   
                <div className="card-body text-center">
                    <h5 className="card-title">Adaugare notita noua</h5>
                    <FontAwesomeIcon icon={faPlusCircle} size='3x'/>
                </div>
            </div>
        );
    }
}

export default NotitaAdaugare;