import React from "react";
import firebaseEnvConfigs from '../../firebase';
import { Link } from 'react-router-dom';

function memberDashboard() {


    return (
        <>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <h3>
                        You are now logged in and viewing the cryonics member dashboard
        </h3>
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

export default memberDashboard;