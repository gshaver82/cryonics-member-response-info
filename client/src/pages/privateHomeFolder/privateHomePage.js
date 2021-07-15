import React, { useState, useEffect } from 'react';
import firebaseEnvConfigs from '../../firebase';
import { Link } from 'react-router-dom';
import API from "../../utils/API";

const firebase = firebaseEnvConfigs.firebase_;

function PrivateHomePage() {
    const firebaseUserID = firebase.auth().currentUser.uid
    //this loads a dummy user that later gets checked on. no user should ever have this value
    //this is because the use effect immediately tries to pull user date from database.
    //if the DB doesnt have the user, itll put NULL into the user
    //if it does have the user, then user info gets put in.
    //the reason to have this complex setup is to prevent the create profile button from flashing
    //across the screen as the web page waits for the DB to respond
    const [user, setUser] = useState("starting user condition");
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleputcheckIn = () => {
        setisLoading(true)
        const checkInData = {
            firebaseAuthID: firebaseUserID,
            WebsiteCheckIn: {
                dateCreated: Date.now(),
                loc: {
                    type: "Point",
                    coordinates: [-2, 2],
                }
            },
        }
        API.putcheckIn(checkInData)
            .catch(err => console.log(err));
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    };
    let minutes = "Loading..."
    let hours = "Loading..."
    let days = "Loading..."
    if (isLoading === false && user !== "starting user condition" && user) {
        const temptime = Date.now() - (new Date(user.WebsiteCheckIn.dateCreated).getTime());
        minutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
        hours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
        days = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);
    }


    if (isLoading) {
        return (<h3>Loading Profile....</h3>)
    }
    else if (!user) {
        return (<div>
            <h3>No profile found, please create a profile to view the private home page. </h3>
            <p>
                this is where you will be able to view all of your active devices,
                and what their status is according to this server
            </p>
        </div>)
    } else if (user !== "starting user condition") {
        return (<div>
            <h3>Welcome <span>{user.name}</span></h3>
            <h3>
                You are now logged in and viewing your private home page!
            </h3>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <p>
                        this is where you will be able to view all of your active devices,
                        and what their status is according to this server
                    </p>
                </div>
            </div>
            <p>{days} days {hours} hours {minutes} minutes since checkin</p>
            <button type="button" onClick={handleputcheckIn}>
                Website Checkin
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
        </div>)
    } else {
        return (<h3>Loading Profile....</h3>)
    }
}

export default PrivateHomePage;