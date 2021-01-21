import React from "react";
import {Link} from "react-router-dom";


class Meniu extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render() {
        return(
            <>
                <div>
                    <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading">Notite curs</div>
                        {/* Meniu lateral stanga */}
                        <div className="list-group list-group-flush">  
                            <Link to="/notite" className="list-group-item list-group-item-action bg-light">Notite</Link>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

//pentru a face clasa vizibila spre utilizare din alte fisiere
export default Meniu;