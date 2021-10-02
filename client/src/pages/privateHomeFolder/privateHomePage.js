import React, { useState, useEffect } from 'react';
import firebaseEnvConfigs from '../../firebase';
// import { Link } from 'react-router-dom';
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
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        geolocator()
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //defaults to 0 if lat and long are not detected
    async function newCheckinDataFunction(lat = 0, lng = 0) {
        // console.log("🚀 ~ newCheckinDataFunction ~ lat", lat)
        let newCheckinData = {
            dateCreated: Date.now(),
            loc: {
                type: "Point",
                coordinates: [lat, lng],
            }
        }
        return newCheckinData
    }

    const handleputWebcheckIn = async () => {
        setisLoading(true)
        //sends lat and lng to create a new object for the array. function will default to 0 
        let newCheckinData = await newCheckinDataFunction(lat, lng);
        let checkInData = {
            firebaseAuthID: firebaseUserID,
            newCheckinData
        }
        await API.putWebcheckIn(checkInData)
            .catch(err => console.log(err));
        await API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    };

    const handletest = async () => {
        console.log("inside handle test")
    };
    function geolocator() {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }

    let minutes = "Loading..."
    let hours = "Loading..."
    let days = "Loading..."

    if (isLoading === false && user !== "starting user condition" && user) {
        const temptime = Date.now() - (new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime());
        minutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
        hours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
        days = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);
    }

    let GoogleURL = "void";
    if (isLoading === false && user !== "starting user condition" && user) {
        if (user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]
            && user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]) {
            GoogleURL = "https://www.google.com/maps/place/" +
                [user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]] + "+" +
                [user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]]
        }
    }

    if (isLoading) {
        return (<h3>Loading Profile....</h3>)
    }
    else if (!user) {
        return (<div>
            <h3>No profile found, please create a profile to view the private home page. </h3>
        </div>)
    } else if (user !== "starting user condition") {
        return (<div>
            <h3>Welcome <span>{user.name}</span></h3>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <p>
                        this is where you will be able to view all of your active devices,
                        and what their status is according to this server
                    </p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>
                        better name for this page? "device control panel" ? "check in" ?
                    </p>
                </div>
            </div>
            <button type="button" onClick={handleputWebcheckIn}>
                Website Checkin
            </button>
            <p>{days} days {hours} hours {minutes} minutes since website checkin</p>
            <p>Click this button to check in and update your status. Make sure you allow GPS if you want to store your location information</p>
            {/* <h3>GPS Coordinates according to browser</h3>
            <p>{status}</p>
            {!lat && !lng &&
                <p>no lat or Longitude</p>
            }
            {lat && lng &&
                <p>Latitude: {lat} Longitude: {lng}</p>
            } */}

            <p>Database shows:</p>
            {GoogleURL !== "void"
                ? <a href={GoogleURL} target="_blank" rel="noopener noreferrer">GoogleMaps</a>
                : <p>no GPS coordinates found in database</p>}
            {!isLoading &&
                user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0] &&
                user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1] &&
                <p>Lat: {user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]}{"    "}
                    Long: {user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]}{"    "}</p>
            }
            <button type="button" onClick={handletest}>
                Fitbit Login
            </button>
            <p>
                the fitbit login code currently on the test page will be cleaned up and put here
            </p>
            {user.checkinDevices.fitbit.fitbitDeviceRegistered
                ? <div>
                    <p>Most recent fitbit Check in:
                    </p>
                    <p>
                        {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toDateString())} {" "}
                    </p>
                    <p>
                        {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toTimeString())}
                    </p>
                </div>
                : <p>fitbit device not registered</p>
            }
        </div>)
    } else {
        return (<h3>Loading Profile....</h3>)
    }
}

export default PrivateHomePage;