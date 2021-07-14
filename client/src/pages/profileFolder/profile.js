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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleadduserclick = async () => {
        setisLoading(true)
        const newUser = {
            firebaseAuthID: firebaseUserID,
            name: "Initialized user name",
            WebsiteCheckIn: {
                dateCreated: Date.now(),
            },
            dateCreated: Date.now(),
        }
        console.log("🚀 ~ file: test.js ~ line 40 ~ handleadduserclick ~ newUser", newUser)
        await API.adduser(newUser)
            .then(API.getOneUserByFirebaseID(firebaseUserID))
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
        setisLoading(false)
    };
    // console.log("auth Info", firebase.auth().currentUser.providerData[0]);
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


            {/* TODO make this not show the button when the page is still loading. only show button when page is loaded and user does not exist */}
            <div>
                {isLoading
                    ? <p>Loading Profile....</p>
                    : (!user
                        ? <p>if you would like to create a profile, click <button onClick={handleadduserclick} className="btn btn-info">
                            {" "}here{" "}
                        </button></p>
                        : <p>username is:  <span>{user.name}</span></p>
                    )
                }
            </div>

            <br></br>
            <button type="button" onClick={() => firebaseEnvConfigs.auth().signOut()}>
                Logout
            </button>
            <br></br>
            <div>
                <Link to="/publicHomePage" className="btn-secondary rb-btn">Go To publicHomePage</Link>
            </div>
            {/* <p>username is: {firebase.auth().currentUser.providerData[0].displayName}</p>
            <img src={firebase.auth().currentUser.providerData[0].photoURL} alt = 'default profile pic here'></img> */}
        </>
    );
}

export default Profile;