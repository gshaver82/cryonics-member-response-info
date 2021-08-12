import React, { useState, useEffect } from 'react';
import API from "../../utils/API";
import "firebase/auth";
import * as firebase from 'firebase/app';

function Test() {
    const [userList, setUsers] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [fitbitObject, setfitbitObject] = useState(false);
    const [fitbitFULLURL, setfitbitFULLURL] = useState(false);

    //use effect that runs once to pull the complete user list.  the  .[] at the end means
    // empty dependancy so it will only run ONCE after initial rerender
    //if there was something in there then the use effect runs any time that something runs.
    useEffect(() => {
        API.getuserList()
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        startupcode();
    }, []);
    function startupcode() {
        let basefitbitURL = "https://www.fitbit.com/oauth2/authorize?response_type=code"
        let fitbitURLclientid = "&client_id=" + process.env.REACT_APP_CLIENT_ID
        //this should be test or privateHomePage
        let fitbitURLredirect_uriNavPage = "test";
        let fitbitURLredirect_uri = ""

        window.location.hostname === "localhost"
            ? fitbitURLredirect_uri = "https%3A%2F%2F" + window.location.hostname + "%3A3000%2F" + fitbitURLredirect_uriNavPage
            : fitbitURLredirect_uri = "https%3A%2F%2F" + window.location.hostname + "%2F" + fitbitURLredirect_uriNavPage

        let fitbitURLscope = "&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&"
        let fitbitURLexpires_in = "expires_in=604800"
        setfitbitFULLURL(basefitbitURL + fitbitURLclientid + "&redirect_uri=" + fitbitURLredirect_uri + fitbitURLscope + fitbitURLexpires_in);

        if (window.location.search.substring(0, 6) === "?code=") {
            fitbitGetAuthToken(fitbitURLredirect_uri)
        }
    };
    function fitbitGetAuthToken(fitbitURLredirect_uri) {
        const fitbitAuthTokenNeededData = {
            Authorization: "Basic " + process.env.REACT_APP_ENCODEDBASE,
            clientId: process.env.REACT_APP_CLIENT_ID,
            grant_type: 'authorization_code',
            redirect_uri: fitbitURLredirect_uri,
            code: window.location.search.substring(6),
        }
        console.log("fitbitAuthTokenNeededData", fitbitAuthTokenNeededData)
        let url = "https://api.fitbit.com/oauth2/token" + "?clientId=" + fitbitAuthTokenNeededData.clientId
            + "&grant_type=" + fitbitAuthTokenNeededData.grant_type + "&redirect_uri=" + fitbitAuthTokenNeededData.redirect_uri
            + "&code=" + fitbitAuthTokenNeededData.code;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': fitbitAuthTokenNeededData.Authorization
            },
            referrerPolicy: 'no-referrer',           
        }).then(response => response.json())
            .then(result => {
                //access token is in here
                console.log('result:', result);
                setfitbitObject(result)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleDeleteClick = async (event) => {
        setisLoading(true)
        // console.log("🚀 ~ file: test.js ~ line 42 ~ handleDeleteClick ~ event", event.target.value)
        const deletedUser_id = event.target.value;
        await API.deleteUser(deletedUser_id)
            .catch(err => console.log(err));
        await API.getuserList()
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
    }

    return (
        <div>
            <h1>TESTING PAGE{isLoading && <span>please wait, loading the data now.</span>}</h1>
            <h3>Fitbit testing area here: </h3>
            
            <p>Fitbit object is {fitbitObject && <span> valid and user id is: {fitbitObject.user_id}</span>}
            {!fitbitObject && <span> not valid</span>}</p>

            {fitbitFULLURL && <a target="_blank" href={fitbitFULLURL}>FITBIT LOGIN</a>}

            <p>-------------------------</p>
            <p>mapping through all users here</p>
            {userList &&
                <ul className="list-group">
                    {userList.map(user => {
                        return (
                            <li className="list-group-item test-li" key={user._id}>
                                <p><strong>NAME: </strong>{user.name}</p>
                                <p> _id: {user._id}</p>
                                <p>Date Profile Created: {user.dateCreated} </p>
                                <p>firebaseAuthID: {user.firebaseAuthID}</p>
                                <p>description: {user.description}</p>
                                <p>cryonicsProvider: {user.cryonicsProvider}</p>
                                <p>photoURL: {user.photoURL}</p>
                                <p>Web Check in: {" "}
                                    {(new Date(user.WebsiteCheckIn.dateCreated).toDateString())} {" "}
                                </p>
                                <p>
                                    {(new Date(user.WebsiteCheckIn.dateCreated).toTimeString())}
                                </p>
                                <p>
                                    Web Check in GPS: [{user.WebsiteCheckIn.loc.coordinates[0]}]  [
                                    {user.WebsiteCheckIn.loc.coordinates[1]}]
                                </p>
                                <button value={user._id} onClick={handleDeleteClick}>
                                    Delete Profile
                                </button>
                            </li>
                        );
                    })}
                </ul>
            }
        </div>
    );
}

export default Test;