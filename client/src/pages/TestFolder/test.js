import React, { useState, useEffect } from 'react';
import API from "../../utils/API";
// import "firebase/auth";
import firebaseEnvConfigs from '../../firebase';
import { useHistory } from "react-router-dom";
const firebase = firebaseEnvConfigs.firebase_;


function Test() {
    const firebaseUserID = firebase.auth().currentUser.uid
    let history = useHistory();
    const [userList, setUsers] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [fitbitObject, setfitbitObject] = useState(false);
    const [fitbitFULLURL, setfitbitFULLURL] = useState(false);
    const [fitbitUserHRDataResponse, setfitbitUserHRDataResponse] = useState(false);
    const [fitbitNewestTime, setfitbitNewestTime] = useState(false);
    const [user, setUser] = useState("starting user condition");

    useEffect(() => {
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //TODO get the individual user so we can later allow access only to users within the admin group
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
        //----------
        //this block creates the fitbit URL for the login link
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
        //----------
        if (window.location.search.substring(0, 6) === "?code=") {
            fitbitGetAuthToken(fitbitURLredirect_uri)
        }
    };
    async function fitbitGetAuthToken(fitbitURLredirect_uri) {
        const fitbitAuthTokenNeededData = {
            Authorization: "Basic " + process.env.REACT_APP_ENCODEDBASE,
            clientId: process.env.REACT_APP_CLIENT_ID,
            grant_type: 'authorization_code',
            redirect_uri: fitbitURLredirect_uri,
            code: window.location.search.substring(6),
        }
        let url = "https://api.fitbit.com/oauth2/token" + "?clientId=" + fitbitAuthTokenNeededData.clientId
            + "&grant_type=" + fitbitAuthTokenNeededData.grant_type + "&redirect_uri=" + fitbitAuthTokenNeededData.redirect_uri
            + "&code=" + fitbitAuthTokenNeededData.code;
        let fitbitData = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': fitbitAuthTokenNeededData.Authorization
            },
            referrerPolicy: 'no-referrer',
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error:', error);
            });
        //fitbitdata is stored fitbitobject for display on webpage
        setfitbitObject(fitbitData)
        const fitbitObjectForDB = {
            firebaseAuthID: firebaseUserID,
            checkinDevices: {
                fitbit: {
                    fitbitDeviceRegistered: true,
                    authToken: fitbitData.access_token,
                    refreshToken: fitbitData.refresh_token
                },
            }
        }
        console.log("🚀 ~ fitbitGetAuthToken ~ fitbitObjectForDB", fitbitObjectForDB)
        API.putFitBitTokens(fitbitObjectForDB)
            .then(console.log("tokens sent to DB", fitbitObjectForDB))
            .then(history.push("/test"))
            .catch(err => console.log(err));
    }

    const handleGetHeartrate = async () => {
        let fitBitDataJSON = 'starting value'
        let authTokens = 'starting value'
        authTokens = await API.fitbitGetDBAuthToken(firebaseUserID)
            .then(res => res.data)
            .catch(err => console.log(err))
        if (!authTokens) {
            console.log("!authtokens")
            return
        } else {
            console.log("🚀 ~ handleGetHeartrate ~ authTokens", authTokens)
            fitBitDataJSON = await getFitBitData(authTokens)
        }

        if (!fitBitDataJSON) {
            console.log("!fitBitDataJSON")
            return
        } else if (fitBitDataJSON.success === false) {
            console.log("failure to retrieve fitbit data", fitBitDataJSON.errors[0])
            return
        } else {
            console.log("no errors")
        }

        fitBitDataJSON = JSON.stringify(fitBitDataJSON);
        fitBitDataJSON = fitBitDataJSON.replaceAll('-', '');
        fitBitDataJSON = JSON.parse(fitBitDataJSON);
        const heartRate = fitBitDataJSON.activitiesheart[0].value.restingHeartRate;
        setfitbitUserHRDataResponse(heartRate)

        //getting the most recent time from the fitbitdatajson
        //if the current days entry does not exist then skip
        if (fitBitDataJSON.activitiesheartintraday.dataset) {
            setisLoading(true)
            let YoungestFitbitHR = fitBitDataJSON.activitiesheartintraday.dataset.pop();
            YoungestFitbitHR = YoungestFitbitHR.time;
            console.log("🚀 TIME ~ handleGetHeartrate ~ YoungestFitbitHR", YoungestFitbitHR)
            YoungestFitbitHR = YoungestFitbitHR.replaceAll(':', '')
            YoungestFitbitHR = YoungestFitbitHR.slice(0, 4)
            setfitbitNewestTime(YoungestFitbitHR)

            //convert to current date code
            //this will take todays date and then put in the hours and minutes that was retrieved from fitbit
            const CurrentDate = new Date();
            console.log("🚀 ~ handleGetHeartrate ~ CurrentDate", CurrentDate)
            let hours = YoungestFitbitHR.slice(0, 2)
            console.log("🚀 ~ handleGetHeartrate ~ hours", hours)
            let minutes = YoungestFitbitHR.slice(2, 4)
            console.log("🚀 ~ handleGetHeartrate ~ minutes", minutes)
            const FBcheckinDateCode = new Date(new Date().setHours(hours, minutes, '00'));
            console.log("🚀 ~ handleGetHeartrate ~ FBcheckinDateCode", FBcheckinDateCode)
            //then putfitbit checkin
            const newArrayEntry =
            {
                dateCreated: FBcheckinDateCode
            }
            let fitbitCheckinObjectForDB = {
                firebaseAuthID: firebaseUserID,
                newArrayEntry
            }
            console.log("🚀 ~ handleGetHeartrate ~ fitbitCheckinObjectForDB", fitbitCheckinObjectForDB)

            API.putFitBitManualCheckin(fitbitCheckinObjectForDB)
                .then(console.log("datecode sent to DB", fitbitCheckinObjectForDB))
                .catch(err => console.log(err));
            API.getuserList()
                .then(res => setUsers(res.data))
                .then(setisLoading(false))
                .catch(err => console.log(err));
        }
    }

    async function getFitBitData(authTokens) {
        if (authTokens) {
            let url = "https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min.json"
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + authTokens.authToken
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'
            });
            return response.json(); // parses JSON response into native JavaScript objects
        } else {
            console.log("no auth tokens")
        }
    }

    const handleDeleteClick = async (event) => {
        setisLoading(true)
        const deletedUser_id = event.target.value;
        await API.deleteUser(deletedUser_id)
            .catch(err => console.log(err));
        await API.getuserList()
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
    }
    const handletestTxt = async () => {
        console.log("process env", process.env.TWILIO_ACCOUNT_SID)
        console.log("server startup")
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: 'client side test text',
                from: process.env.TWILIO_PHONE_NUMBER,
                to: '+16126421533'
            })
            .then(message => console.log(message.sid));
        console.log("server message sent")
    }
    //TODO take the individual user and deny access if not a member of admin group
    if (firebaseUserID !== 'Ysgu9k3nXVTmBPWY2T6cZ0w7Jpw1') {
        return (
            <h3>You are not authorized to access this page</h3>
        )
    }

    return (
        <div>
            <h1>TESTING PAGE{isLoading && <span>please wait, loading the data now.</span>}</h1>
            <button onClick={handletestTxt}>
                testTxt
            </button>

            <h3>Fitbit testing area here: </h3>

            <p>Fitbit object is {fitbitObject && <span> valid and user id is: {fitbitObject.user_id}</span>}
                {!fitbitObject && <span> not valid</span>}</p>

            {fitbitFULLURL && <a target="_blank" href={fitbitFULLURL}>FITBIT LOGIN</a>}
            <br></br>
            <button onClick={handleGetHeartrate}>
                Get Heartrate Time Series info
            </button>
            <p>generic Data from fitbit
                {fitbitUserHRDataResponse &&
                    <span> is loaded and your resting heart rate is:
                        {fitbitUserHRDataResponse}</span>}
                {!fitbitUserHRDataResponse && <span> has not yet loaded</span>}</p>

            <p>Fitbit Intra day data
                {fitbitNewestTime &&
                    <span> is loaded and your most recent time according to the fitbit server is:
                        {fitbitNewestTime}</span>}
                {!fitbitNewestTime && <span> has not yet loaded</span>}</p>

            <p>mapping through all users here</p>
            {userList &&
                <ul className="list-group">
                    {userList
                        .filter(user => user.name !== 'Initialized user name')
                        .map(user => {
                            return (
                                <li className="list-group-item test-li" key={user._id}>
                                    <p><strong>NAME: </strong>{user.name}</p>
                                    <p> _id: {user._id}</p>
                                    <p>Date Profile Created: {user.dateCreated} </p>
                                    <p>firebaseAuthID: {user.firebaseAuthID}</p>
                                    <p>description: {user.description}</p>
                                    <p>cryonicsProvider: {user.cryonicsProvider}</p>
                                    <p>photoURL: {user.photoURL}</p>

                                    <p>Web Check in(most recent): return {" "}
                                        {new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).toDateString() || <p>checkin data not found</p>} {" "}
                                    </p>
                                    <p>
                                        {new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).toTimeString() || <p>checkin data not found</p>}
                                    </p>
                                    <p>
                                        Web Check in GPS: [{user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]}]  [
                                        {user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]}]
                                    </p>
                                    <p>
                                        fitbit logs here:
                                    </p>
                                    {user.checkinDevices.fitbit.checkinArray &&
                                        <div>
                                            {user.checkinDevices.fitbit.checkinArray.map(array => {
                                                return (
                                                    <div key={array._id}>
                                                        <p>{new Date(array.dateCreated).toDateString()}
                                                            {"----"} {new Date(array.dateCreated).toTimeString()}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    }

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