import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import {ruteNotite} from '../ApiRoutes';
import { post, get, put,remove } from '../Calls';



class Notita extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            //notite: []
        };


        this.stergeNotita=this.stergeNotita.bind(this);

    }

    async stergeNotita(id, index){
        let res = await remove(ruteNotite, id);

        if (res.hasErrors){
            alert(res.message);
            return;
        }

        let notite = this.state.notite;
        notite.splice(index, 1);
        this.setState({notite: notite});
    }
    editeazaNotita(){
        window.location.href = "editarenotita";
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
                </div>
            </div>
        );
    }
}

//pentru a face clasa vizibila spre utilizare din alte fisiere
export default Notita;