import React from "react";
import firebaseEnvConfigs from '../../firebase';
import { Link } from 'react-router-dom';

function privateHomePage() {


    return (
        <>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <h3>
                        You are now logged in and viewing your private home page!
                    </h3>
                </div>
            </div>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <p>
                        this is where you will be able to view all of your active devices,
                        and what their status is according to this server
                    </p>
                </div>
            </div>
            <button type="button" onClick={() => firebaseEnvConfigs.auth().signOut()}>
                Logout
    </button>
            <br></br>
            <div>
                <Link to="/publicHomePage" className="btn-secondary rb-btn">Go To publicHomePage</Link>
            </div>

        </>
    );
}

export default privateHomePage;