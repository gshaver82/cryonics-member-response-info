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
        let newCheckinArray = user.checkinDevices.WebsiteCheckIn.checkinArray
        //this will add the array object to the front
        newCheckinArray.splice(0, 0, newCheckinData)
        //after {first num} it will delete up to {second num}
        newCheckinArray.splice(30, 542);
        let checkInData = {
            firebaseAuthID: firebaseUserID,
            checkinDevices: {
                WebsiteCheckIn: {
                    checkinArray: newCheckinArray
                },
            }
        }
        await API.putWebcheckIn(checkInData)
            .catch(err => console.log(err));

        await API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
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
    // if (isLoading === false && user !== "starting user condition" && user) {
    //     console.log("--------------user.checkinDevices.WebsiteCheckIn")
    //     console.log(user.checkinDevices.WebsiteCheckIn)
    // }

    if (isLoading === false && user !== "starting user condition" && user) {
        const temptime = Date.now() - (new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime());
        minutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
        hours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
        days = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);
    }


    // let GoogleURL = "void";
    // if (isLoading === false && user !== "starting user condition" && user) {
    //     if (user.WebsiteCheckIn.loc.coordinates[0] && user.WebsiteCheckIn.loc.coordinates[1]) {
    //         GoogleURL = "https://www.google.com/maps/place/" + [user.WebsiteCheckIn.loc.coordinates[0]] + "+" + [user.WebsiteCheckIn.loc.coordinates[1]]
    //     }
    // }

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
            {!isLoading && <p>This page has loaded</p>}
            {isLoading && <p>This page is loading</p>}
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <p>
                        this is where you will be able to view all of your active devices,
                        and what their status is according to this server
                    </p>
                </div>
            </div>
            <p>{days} days {hours} hours {minutes} minutes since website checkin</p>
            <button type="button" onClick={handleputWebcheckIn}>
                Website Checkin
            </button>
            <p>Click this button to check in and update your status. Make sure you allow GPS if you want to store your location information</p>
            <h3>GPS Coordinates according to browser</h3>
            <p>{status}</p>
            {!lat && !lng &&
                <p>no lat or Longitude</p>
            }
            {lat && lng &&
                <p>Latitude: {lat} Longitude: {lng}</p>
            }

            <p>Database shows:</p>
            {!isLoading &&
                user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0] &&
                user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1] &&
                <p>Lat: {user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]}
                    Long: {user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]}</p>
            }




            {/* {GoogleURL !== "void"
                ? <a href={GoogleURL} target="_blank" rel="noopener noreferrer">GoogleMaps</a>
                : <p>no GPS coordinates found in database</p>} */}
            <br></br>
            {/* <button type="button" onClick={() => firebaseEnvConfigs.auth().signOut()}>
                Logout
            </button>
            <br></br>
            <div>
                <Link to="/publicHomePage" className="btn-secondary rb-btn">Go To publicHomePage</Link>
            </div> */}
        </div>)
    } else {
        return (<h3>Loading Profile....</h3>)
    }
}

export default PrivateHomePage;