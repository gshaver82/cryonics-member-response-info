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
                    <p>
                        This is where all the MN cryonics members info will be displayed.
                        it will be a full list of all member with abridged info.
                        abridged info will include date/time of last automated checkin.
                        Will show members in emergency state on top, followed by members in alert state
                        emergency state being a declared emergency by the user.
                        alert state being that the server has not gotten member state for a long time.

                        Can click on each members name to see thier full profile.
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

export default memberDashboard;