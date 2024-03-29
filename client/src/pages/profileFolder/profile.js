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
    const [currentStatusNote, setcurrentStatusNote] = useState('');
    const [cryonicsProvider, setcryonicsProvider] = useState('None');
    const [photoURL, setPhotoURL] = useState('');
    const [signedUpForAlerts, setsignedUpForAlerts] = useState(false);
    const [dateCreated, setdateCreated] = useState('starting date value');
    const [checkinDevices, setcheckinDevices] = useState('starting checkinDevices value');
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
    const [stage6AlertMethod, setstage6AlertMethod] = useState("txt");

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
        setstage1AlertNum(user.alertStage[0].num.slice(2))
        setstage2AlertNum(user.alertStage[1].num.slice(2))
        setstage3AlertNum(user.alertStage[2].num.slice(2))
        setstage4AlertNum(user.alertStage[3].num.slice(2))
        setstage5AlertNum(user.alertStage[4].num.slice(2))
        setstage6AlertNum(user.alertStage[5].num.slice(2))

        setstage1AlertMethod(user.alertStage[0].method)
        setstage2AlertMethod(user.alertStage[1].method)
        setstage3AlertMethod(user.alertStage[2].method)
        setstage4AlertMethod(user.alertStage[3].method)
        setstage5AlertMethod(user.alertStage[4].method)
        setstage6AlertMethod(user.alertStage[5].method)
        setname(user.name)
        setdateCreated(user.dateCreated)
        setcheckinDevices(user.checkinDevices)
        setdescription(user.description)
        setcryonicsProvider(user.cryonicsProvider)
        setPhotoURL(user.photoURL)
        setsignedUpForAlerts(user.signedUpForAlerts)
        setisEditing(true)
    };

    const handleEditCancelProfile = () => {
        window.location.reload();
    };
    const handlesetcurrentStatusNote = () => {
        console.log("sending note")
        let currentStatusNoteObjectForDB = {
            firebaseAuthID: firebaseUserID,
            currentStatusNote
        }
        API.currentStatusNote(currentStatusNoteObjectForDB)
            .then(console.log("datecode sent to DB", currentStatusNoteObjectForDB))
            .catch(err => console.log(err));
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    };
    const handleSaveProfile = async (e) => {
        // e.preventDefault();
        setisLoading(true)
        const re = /^\d+$/;
        if (
            ((re.test(stage1AlertNum) && stage1AlertNum.length === 10) || stage1AlertNum === "none" || stage1AlertNum === "") &&
            ((re.test(stage2AlertNum) && stage2AlertNum.length === 10) || stage2AlertNum === "none" || stage2AlertNum === "") &&
            ((re.test(stage3AlertNum) && stage3AlertNum.length === 10) || stage3AlertNum === "none" || stage3AlertNum === "") &&
            ((re.test(stage4AlertNum) && stage4AlertNum.length === 10) || stage4AlertNum === "none" || stage4AlertNum === "") &&
            ((re.test(stage5AlertNum) && stage5AlertNum.length === 10) || stage5AlertNum === "none" || stage5AlertNum === "") &&
            ((re.test(stage6AlertNum) && stage6AlertNum.length === 10) || stage6AlertNum === "none" || stage6AlertNum === "")
        ) {

            const editedUser = {
                firebaseAuthID: firebaseUserID,
                name: name,
                dateCreated: Date.now(),
                description: description,
                group: ["private"],
                cryonicsProvider: cryonicsProvider,
                photoURL: photoURL,
                signedUpForAlerts: signedUpForAlerts,
                alertStage: [{
                    num: "-1" + stage1AlertNum,
                    method: stage1AlertMethod
                }, {
                    num: "-1" + stage2AlertNum,
                    method: stage2AlertMethod
                },
                {
                    num: "-1" + stage3AlertNum,
                    method: stage3AlertMethod
                }, {
                    num: "-1" + stage4AlertNum,
                    method: stage4AlertMethod
                }, {
                    num: "-1" + stage5AlertNum,
                    method: stage5AlertMethod
                }, {
                    num: "-1" + stage6AlertNum,
                    method: stage6AlertMethod
                }
                ],
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
            //this will put in the date profile was created if that is available from user state. otherwise defaults to date.now
            if (dateCreated !== 'starting date value') {
                editedUser.dateCreated = dateCreated
            }
            if (checkinDevices !== 'starting checkinDevices value') {
                editedUser.checkinDevices = checkinDevices
            }
            let foo = await API.edituser(editedUser).catch(error => console.error(error));
            setUser(foo.data)

            //this does not work I DONT KNOW WHY. user.stage1Alert is undefined
            // API.edituser(editedUser)
            //     .then(res => setUser(res.data))
            //     .catch(error => console.error(error));

            setisEditing(false)
            setisLoading(false)
        } else {
            setisLoading(false)
            alert("incorrect phone number format")

        }

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
                        <p>use format "6125550101"</p>
                        <p>Recommended for first number to TEXT your phone that is linked to the watch. Then, CALL that same number. This way you can cancel any false alerts. </p>
                        <label>First Number:</label>
                        <input
                            type="text"
                            required
                            value={stage1AlertNum}
                            onChange={(e) => setstage1AlertNum(e.target.value)}
                        />
                        <label>text or phone call?:</label>
                        <select
                            value={stage1AlertMethod}
                            onChange={(e) => setstage1AlertMethod(e.target.value)}
                        >
                            <option value="txt">Text</option>
                            <option value="call">Call and Text</option>
                        </select>
                        <br></br>
                        <label>2nd Number:</label>
                        <input
                            type="text"
                            required
                            value={stage2AlertNum}
                            onChange={(e) => setstage2AlertNum(e.target.value)}
                        />
                        <label>text or phone call?:</label>
                        <select
                            value={stage2AlertMethod}
                            onChange={(e) => setstage2AlertMethod(e.target.value)}
                        >
                            <option value="txt">Text</option>
                            <option value="call">Call and Text</option>
                        </select>
                        <br></br>
                        <label>3rd Number:</label>
                        <input
                            type="text"
                            required
                            value={stage3AlertNum}
                            onChange={(e) => setstage3AlertNum(e.target.value)}
                        />
                        <label>text or phone call?:</label>
                        <select
                            value={stage3AlertMethod}
                            onChange={(e) => setstage3AlertMethod(e.target.value)}
                        >
                            <option value="txt">Text</option>
                            <option value="call">Call and Text</option>
                        </select>
                        <br></br>
                        <label>4th Number:</label>
                        <input
                            type="text"
                            required
                            value={stage4AlertNum}
                            onChange={(e) => setstage4AlertNum(e.target.value)}
                        />
                        <label>text or phone call?:</label>
                        <select
                            value={stage4AlertMethod}
                            onChange={(e) => setstage4AlertMethod(e.target.value)}
                        >
                            <option value="txt">Text</option>
                            <option value="call">Call and Text</option>
                        </select>
                        <br></br>
                        <label>5th Number:</label>
                        <input
                            type="text"
                            required
                            value={stage5AlertNum}
                            onChange={(e) => setstage5AlertNum(e.target.value)}
                        />
                        <label>text or phone call?:</label>
                        <select
                            value={stage5AlertMethod}
                            onChange={(e) => setstage5AlertMethod(e.target.value)}
                        >
                            <option value="txt">Text</option>
                            <option value="call">Call and Text</option>
                        </select>
                        <br></br>
                        <label>6th Number:</label>
                        <input
                            type="text"
                            required
                            value={stage6AlertNum}
                            onChange={(e) => setstage6AlertNum(e.target.value)}
                        />
                        <label>text or phone call?:</label>
                        <select
                            value={stage6AlertMethod}
                            onChange={(e) => setstage6AlertMethod(e.target.value)}
                        >
                            <option value="txt">Text</option>
                            <option value="call">Call and Text</option>
                        </select>
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
                    <button onClick={handleSaveProfile} className="btn btn-info">Save Profile</button>
                </form>
            </div>
        )
    } else if (!isEditing) {
        return (
            <div>
                <div>
                    {/* notes here */}
                    {user?.pubNotes?.length > 0 ?
                        <div><p>Your most recent note is:  {user.pubNotes[0].date}</p>
                            <h4>{user.pubNotes[0].note} </h4> </div> :
                        <p>No notes yet.</p>}
                    <p>
                        Change or add a description of your location. If an alert is sent out for you, only GPS will be automatically attached. Make a note here for apartment number, or hotel number for faster response.
                    </p>
                    <p>
                        This can also be used to add in emergency contacts such as roommates, or significant others, who can check up on you if an alert is generated and you are not responding. 
                    </p>
                    <textarea
                        value={currentStatusNote}
                        onChange={(e) => setcurrentStatusNote(e.target.value)}
                    ></textarea>
                    <button onClick={handlesetcurrentStatusNote} className="btn btn-info">
                        {" "}Save Note{" "}
                    </button>
                </div>
                <button onClick={handleEditProfile} className="btn btn-info">
                    {" "}Edit Profile{" "}
                </button>
                <p>username is:  <span>{user.name}</span></p>
                {
                    user.alertStage[0] ? user.alertStage

                        .map((obj, index) => {
                            return (
                                <div>
                                    <p> {index} alertnum: {obj.num.slice(2)} alertmethod: {obj.method}</p>
                                </div>
                            )
                        })
                        : <p>no alert stages found</p>
                }
                <p>description: {user.description}</p>
                <p>group is:  {user.group}</p>
                <p>cryonicsProvider: {user.cryonicsProvider}</p>
                <p>Picture:  <span><img src={user.photoURL} alt="photoURL" ></img></span></p>
                <p>uploaded file link here:</p>
            </div >
        )
    }
    else {
        return (<p>error loading page</p>)
    }
}
export default Profile;