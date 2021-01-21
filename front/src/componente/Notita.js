import React from "react";

class Notita extends React.Component
{
    constructor(props)
    {
        super(props);

    }

    render() {

        return(
            // structura unui element de tip notita
            <div className="card ml-3 mt-3" style={
                {width: '18rem'}
                }>
                <div className="card-body">
                    <h5 className="card-title">{this.props.notita.Materie}</h5>
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