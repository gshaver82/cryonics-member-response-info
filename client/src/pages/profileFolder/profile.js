import React, { useState, useEffect } from 'react';
import firebaseEnvConfigs from '../../firebase';
import { Link } from 'react-router-dom';
import API from "../../utils/API";

const firebase = firebaseEnvConfigs.firebase_;

function Profile() {

    const firebaseUserID = firebase.auth().currentUser.uid

    const [user, setUser] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    }, []);


    return (
        <>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <h3>
                        You are now logged in and viewing your profile!
                    </h3>
                </div>
            </div>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <p>
                        the profile is where all your profile information will live.
                    </p>
                </div>
            </div>
            <h2>Profile Details{isLoading && <span>please wait, loading the data now.</span>}</h2>
            <p>username is: {user && <span>{user.name}</span>}</p>
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

export default Profile;