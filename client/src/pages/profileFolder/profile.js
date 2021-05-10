import React from "react";
import firebaseEnvConfigs from '../../firebase';
import { Link } from 'react-router-dom';

function profile() {


    return (
        <>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <h3>
                        You are now logged in and viewing your profile!
                    </h3>
                    <p>
                        the profile is where all your information will live. 

                        if you are viewing the page you will be able to edit the information.

                        if someone else is viewing this page (coming in from the member dashboard)
                        they will be able to view, but not edit information
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

export default profile;