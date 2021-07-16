import React, { useState, useEffect } from 'react';
import firebaseEnvConfigs from '../../firebase';
// import { Link } from 'react-router-dom';
import API from "../../utils/API";

const firebase = firebaseEnvConfigs.firebase_;

function Profile() {

    const firebaseUserID = firebase.auth().currentUser.uid
    //this loads a dummy user that later gets checked on. no user should ever have this value
    //this is because the use effect immediately tries to pull user date from database.
    //if the DB doesnt have the user, itll put NULL into the user
    //if it does have the user, then user info gets put in.
    //the reason to have this complex setup is to prevent the create profile button from flashing
    //across the screen as the web page waits for the DB to respond
    const [user, setUser] = useState("starting user condition");
    const [isLoading, setisLoading] = useState(true);
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [cryonicsProvider, setcryonicsProvider] = useState('None');
    const [PhotoURL, setPhotoURL] = useState('');
    const [isEditing, setisEditing] = useState(false);

    useEffect(() => {
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleadduserclick = () => {
        setisLoading(true)
        const newUser = {
            firebaseAuthID: firebaseUserID,
            name: "Initialized user name",
            WebsiteCheckIn: {
                dateCreated: Date.now(),
            },
            dateCreated: Date.now(),
        }
        API.adduser(newUser)
            .then(API.getOneUserByFirebaseID(firebaseUserID))
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
        setisLoading(false)
    };

    const handleEditProfile = () => {
        setisEditing(true)
    };

    const handleEditCancelProfile = () => {
        setisEditing(false)
    };

    const handleSaveProfile = () => {
        console.log("🚀 ~ file: profile.js ~ line 61 ~ handleSaveProfile ~ name", name)
        console.log("🚀 ~ file: profile.js ~ line 63 ~ handleSaveProfile ~ description", description)
        console.log("🚀 ~ file: profile.js ~ line 65 ~ handleSaveProfile ~ cryonicsProvider", cryonicsProvider)
        console.log("🚀 ~ file: profile.js ~ line 67 ~ handleSaveProfile ~ PhotoURL", PhotoURL)
    };

    const handleLoadGoogleProviderInfo = () => {
        setname(firebase.auth().currentUser.providerData[0].displayName)
        setPhotoURL(firebase.auth().currentUser.providerData[0].photoURL)
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
            <h2>Viewing Profile Details{isLoading && <span>please wait, loading the data now.</span>}</h2>
            {/* this will say LOADING if loading, and after loading is complete. if the set user has not yet completed then 
            user will equal "starting user condition" therefore it technically exists so it will not display the create a profile button
            when the API finally returns its value of NULL, then the create profile button will come up. if the profile exists, 
            then the user.name field etc will be populated.  */}
            <div>
                {isLoading
                    ? <p>Loading Profile....</p>
                    : (!user
                        ? <p>if you would like to create a profile, click <button onClick={handleadduserclick} className="btn btn-info">
                            {" "}here{" "}
                        </button></p>
                        : (isEditing
                            //is editing---------------------
                            ? <div>
                                <button onClick={handleEditCancelProfile} className="btn btn-info">
                                    {" "}cancel edits{" "}
                                </button>
                                <button onClick={handleLoadGoogleProviderInfo} className="btn btn-info">
                                    {" "}Autofill Google Info{" "}
                                </button>
                                <form>
                                    <label>name:</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                    <br></br>
                                    <label>description:</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setdescription(e.target.value)}
                                    ></textarea>
                                    <br></br>
                                    <label>cryonicsProvider:</label>
                                    <select
                                        value={cryonicsProvider}
                                        onChange={(e) => setcryonicsProvider(e.target.value)}
                                    >
                                        <option value="Alcor">Alcor</option>
                                        <option value="Cryonics Institute">Cryonics Institute</option>
                                        <option value="None">None</option>
                                    </select>
                                    <br></br>
                                    <label>PhotoURL:</label>
                                    <input
                                        value={PhotoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                    >
                                    </input>
                                    <br></br>
                                    <img src={PhotoURL} alt="PhotoURL" width="100" height="100"></img>

                                    <br></br>
                                    <button onClick={handleSaveProfile} className="btn btn-info">Save Profile</button>
                                </form>
                            </div>
                            //is not editing---------------------
                            : <div>
                                <button onClick={handleEditProfile} className="btn btn-info">
                                    {" "}Edit Profile{" "}
                                </button>
                                <p>username is:  <span>{user.name}</span></p>
                                <p>description: {user.description}</p>
                                <p>cryonicsProvider: {user.cryonicsProvider}</p>
                                <p>Picture:  <span>{user.photoURL}</span></p>
                            </div>

                        )
                    )
                }
            </div>








            <br></br>
            {/* <button type="button" onClick={() => firebaseEnvConfigs.auth().signOut()}>
                Logout
            </button>
            <br></br>
            <div>
                <Link to="/publicHomePage" className="btn-secondary rb-btn">Go To publicHomePage</Link>
            </div> */}
            {/* <p>username is: {firebase.auth().currentUser.providerData[0].displayName}</p>
            <img src={firebase.auth().currentUser.providerData[0].photoURL} alt = 'default profile pic here'></img> */}
        </>
    );
}

export default Profile;