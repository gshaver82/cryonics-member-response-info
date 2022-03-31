import React, { useState, useEffect } from 'react';
import API from "../../utils/API";
// import "firebase/auth";
import firebaseEnvConfigs from '../../firebase';
const firebase = firebaseEnvConfigs.firebase_;


function Test() {
    const firebaseUserID = firebase.auth().currentUser.uid
    const [userList, setUsers] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        API.getOneUserByFirebaseID(firebaseUserID)
            .catch(err => console.log(err));
        API.getuserList()
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleDeleteClick = async (event) => {
        if (window.confirm("Are you sure you want to delete this user?") === true) {
            setisLoading(true)
            const deletedUser_id = event.target.value;
            await API.deleteUser(deletedUser_id)
                .catch(err => console.log(err));
            await API.getuserList()
                .then(res => setUsers(res.data))
                .then(setisLoading(false))
        } else {
            console.log('delete not confirmed')
        }
    }
    const handleShowCode = async (event) => {
        var element = document.getElementById(event.target.value);
        element.className = (element.className !== 'displayvisible' ? 'displayvisible' : 'displaynone');
    }
    const handleAlertsSignUp = async (event) => {
        console.log("inside handleAlertsSignUp")
        setisLoading(true)
        try {
            let firebaseUserID = event.target.value
            let UserID = event.target.secondvalue
            const editedUser = {
                firebaseAuthID: firebaseUserID,
                signedUpForAlerts: true,
            }
            const response = await API.edituser(editedUser)// eslint-disable-line no-unused-vars
                .catch(err => console.log(err));
            const response2 = await API.putClearFBAlert(UserID)// eslint-disable-line no-unused-vars
                .then(setisLoading(false))
                .catch(err => console.log(err));
            const response3 = await API.getuserList()// eslint-disable-line no-unused-vars
                .then(res => setUsers(res.data))
                .then(setisLoading(false))
                .catch(err => console.log(err));
            //this console log will expose the put URL. only use for testing purposes
            // console.log("api response", response)
        } catch (error) {
            console.error(error);
            setisLoading(false)
        }
    };

    const handleAlertsSignOff = async (event) => {
        console.log("inside handleAlertsSignOff")
        setisLoading(true)
        let firebaseUserID = event.target.value
        const editedUser = {
            firebaseAuthID: firebaseUserID,
            signedUpForAlerts: false,
        }
        const response = await API.edituser(editedUser)// eslint-disable-line no-unused-vars
            .catch(err => console.log(err));
        const response2 = await API.getuserList()// eslint-disable-line no-unused-vars
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    };

    if (firebaseUserID !== 'Ysgu9k3nXVTmBPWY2T6cZ0w7Jpw1') {
        return (
            <h3>You are not authorized to access this page</h3>
        )
    }


    return (
        <div>
            <h1>TESTING PAGE{isLoading && <span>please wait, loading the data now.</span>}</h1>
            <p>mapping through all users here</p>
            {userList &&
                <ul className="list-group">
                    {userList
                        .filter(user => user.name !== 'Initialized user name')
                        .map(user => {
                            return (
                                <li className="list-group-item dashboard-li" key={user._id}>
                                    <p><strong>NAME: </strong>{user.name}</p>
                                    {user.signedUpForAlerts ? <p>Alert txt/phone active</p> : <p>Alert txt/phone NOT active</p>}
                                    <button value={user.firebaseAuthID} onClick={handleAlertsSignUp}>
                                        sign up
                                    </button>
                                    <button value={user.firebaseAuthID} secondvalue={user._id} onClick={handleAlertsSignOff}>
                                        sign off
                                    </button>
                                    <button value={user._id} onClick={handleShowCode}>
                                        show/hide DB info
                                    </button>
                                    <br></br>
                                    <pre className="displaynone" id={user._id}>
                                        <code>{JSON.stringify(user, null, 4)}</code>
                                    </pre>
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