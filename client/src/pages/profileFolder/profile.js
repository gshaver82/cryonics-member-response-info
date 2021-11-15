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
    const [photoURL, setPhotoURL] = useState('');
    const [isEditing, setisEditing] = useState(false);

    const [stage1AlertNum, setstage1AlertNum] = useState("none");
    const [stage1AlertMethod, setstage1AlertMethod] = useState("txt");
    const [stage2AlertNum, setstage2AlertNum] = useState("none");
    const [stage2AlertMethod, setstage2AlertMethod] = useState("txt");
    const [stage3AlertNum, setstage3AlertNum] = useState("none");
    const [stage3AlertMethod, setstage3AlertMethod] = useState("txt");
    const [stage4AlertNum, setstage4AlertNum] = useState("none");
    const [stage4AlertMethod, setstage4AlertMethod] = useState("txt");
    const [stage5AlertNum, setstage5AlertNum] = useState("none");
    const [stage5AlertMethod, setstage5AlertMethod] = useState("txt");
    const [stage6AlertNum, setstage6AlertNum] = useState("none");
    const [stage6AlertMethod, setstage7AlertMethod] = useState("txt");

    useEffect(() => {
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleadduserclick = () => {
        setisEditing(true)
        setUser("Your name here")
    };

    const handleEditProfile = () => {
        setstage1AlertNum(user.stage1AlertNum)
        setstage1AlertNum(user.stage2AlertNum)
        setstage1AlertNum(user.stage3AlertNum)
        setstage1AlertNum(user.stage4AlertNum)
        setstage1AlertNum(user.stage5AlertNum)
        setstage1AlertNum(user.stage6AlertNum)
        setname(user.name)
        setdescription(user.description)
        setcryonicsProvider(user.cryonicsProvider)
        setPhotoURL(user.photoURL)
        setisEditing(true)
    };

    const handleEditCancelProfile = () => {
        window.location.reload();
    };

    const handleSaveProfile = (e) => {
        // e.preventDefault();
        setisLoading(true)
        const editedUser = {
            firebaseAuthID: firebaseUserID,
            name: name,
            dateCreated: Date.now(),
            description: description,
            group: ["private"],
            cryonicsProvider: cryonicsProvider,
            photoURL: photoURL,
            signedUpForAlerts: false,
            textToUserDatecode: 0,
            textToEmerContactDatecode: 0,
            textToAdminDatecode: 0,
            stage1Alert: {
                num: stage1AlertNum,
                method: stage1AlertMethod
            },
            stage2Alert: {
                num: stage2AlertNum,
                method: stage2AlertMethod
            },
            stage3Alert: {
                num: stage3AlertNum,
                method: stage3AlertMethod
            },
            stage4Alert: {
                num: stage4AlertNum,
                method: stage4AlertMethod
            },
            stage5Alert: {
                num: stage5AlertNum,
                method: stage5AlertMethod
            },
            stage6Alert: {
                num: stage6AlertNum,
                method: stage6AlertMethod
            },
            checkinDevices: {
                WebsiteCheckIn: {
                    checkinArray: [
                        {
                            dateCreated: Date.now(),
                            loc: {
                                type: "Point",
                                coordinates: [0, 0],
                            }
                        }
                    ]
                },
            },
        }
        API.edituser(editedUser)
            .then(setisLoading(false))
            .catch(err => console.log(err));
        setisEditing(false)
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    };

    const handleLoadGoogleProviderInfo = () => {
        try {
            setname(firebase.auth().currentUser.providerData[0].displayName)
            setPhotoURL(firebase.auth().currentUser.providerData[0].photoURL)
        } catch (error) {
            console.log(error);
        }
    };
    // console.log("auth Info", firebase.auth().currentUser.providerData[0]);

    if (isLoading) {
        return (<p>Loading Profile....</p>)
    } else if (!user || user === "starting user condition") {
        return (
            <p>if you would like to create a profile, click <button onClick={handleadduserclick} className="btn btn-info">
                {" "}here{" "}
            </button></p>
        )
    } else if (isEditing) {
        return (
            <div>
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
                    <div>
                        <p>use format "-16125550101"</p>
                        <label>stage1Alert:</label>
                        <input
                            type="text"
                            required
                            value={stage1AlertNum}
                            onChange={(e) => setstage1AlertNum(e.target.value)}
                        />
                        <br></br>
                        <label>stage2Alert:</label>
                        <input
                            type="text"
                            required
                            value={stage2AlertNum}
                            onChange={(e) => setstage2AlertNum(e.target.value)}
                        />
                        <br></br>
                        <label>stage3Alert:</label>
                        <input
                            type="text"
                            required
                            value={stage3AlertNum}
                            onChange={(e) => setstage3AlertNum(e.target.value)}
                        />
                        <br></br>
                        <label>stage4Alert:</label>
                        <input
                            type="text"
                            required
                            value={stage4AlertNum}
                            onChange={(e) => setstage4AlertNum(e.target.value)}
                        />
                        <br></br>
                        <label>stage5Alert:</label>
                        <input
                            type="text"
                            required
                            value={stage5AlertNum}
                            onChange={(e) => setstage5AlertNum(e.target.value)}
                        />
                        <br></br>
                        <label>stage6Alert:</label>
                        <input
                            type="text"
                            required
                            value={stage6AlertNum}
                            onChange={(e) => setstage6AlertNum(e.target.value)}
                        />
                        <br></br>
                    </div>

                    <p>
                        Feature not yet coded: Group: Your profile will be private by default. Request approval from an admin to join a group
                    </p>
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
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                    >
                    </input>
                    <br></br>
                    <img src={photoURL} alt="photoURL" width="100" height="100"></img>
                    <br></br>
                    <p>upload files here??</p>
                    <button onClick={handleSaveProfile} className="btn btn-info">Save Profile</button>
                </form>
            </div>
        )
    } else if (!isEditing) {
        return (
            <div>
                <button onClick={handleEditProfile} className="btn btn-info">
                    {" "}Edit Profile{" "}
                </button>
                <p>username is:  <span>{user.name}</span></p>
                <p>stage1Alert number is:  <span>{user.stage1Alert.num}</span> Contact method is:<span>{user.stage1Alert.method}</span></p>
                <p>stage2Alert number is:  <span>{user.stage2Alert.num}</span> Contact method is:<span>{user.stage2Alert.method}</span></p>
                <p>stage3Alert number is:  <span>{user.stage3Alert.num}</span> Contact method is:<span>{user.stage3Alert.method}</span></p>
                <p>stage4Alert number is:  <span>{user.stage4Alert.num}</span> Contact method is:<span>{user.stage4Alert.method}</span></p>
                <p>stage5Alert number is:  <span>{user.stage5Alert.num}</span> Contact method is:<span>{user.stage5Alert.method}</span></p>
                <p>stage6Alert number is:  <span>{user.stage6Alert.num}</span> Contact method is:<span>{user.stage6Alert.method}</span></p>
                <p>group is:  {user.group}</p>
                <p>description: {user.description}</p>
                <p>cryonicsProvider: {user.cryonicsProvider}</p>
                <p>Picture:  <span><img src={user.photoURL} alt="photoURL" ></img></span></p>
                <p>uploaded file link here:</p>
            </div>
        )
    }
    else {
        return (<p>error loading page</p>)
    }
}
export default Profile;