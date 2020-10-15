import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';

function header() {

    return(

        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">HomePage</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample01">
                <form action="" method="post">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        <button className="nav-link btn btn-primary" name="logout" type="submit ">logout </button>
                        </li>
                    </ul>
                </form>
            </div>

         </nav>

    );


}
export default header;
