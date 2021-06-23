import React from "react";
import firebaseEnvConfigs from '../../firebase';
import { Link } from 'react-router-dom';
import API from "../../utils/API";

const firebase = firebaseEnvConfigs.firebase_;

function privateHomePage() {
    const firebaseUserID = firebase.auth().currentUser.uid

    const handlegetcheckIn = () => {
        API.getcheckIn()
            .catch(err => console.log(err));
    };

    const handleCheckIn = () => {
        console.log("inside handle check in");

        //GPSArray should either contain a gps coordinates or 
        //if GPS permission denied or unable to get GPS then it will be false.
        // let GPSArray = [1,2];
        let checkinObject = {
            firebaseAuthID: firebaseUserID,
            GPSArray: [1, 2]
        }
        console.log("🚀 ~ file: privateHomePage.js ~ line 21 ~ handleCheckIn ~ checkinObject", checkinObject)
        API.checkIn(checkinObject)
            .catch(err => console.log(err));
    };

    return (
        <>
            <button onClick={handlegetcheckIn} className="btn btn-info">
                {" "}getcheckIn{" "}
            </button>
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
            <button type="button" onClick={handleCheckIn}>
                Check in
            </button>
            <p>Click this button to check in and update your status. </p>
            <p>Click allow GPS if you want to store your location information</p>
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