import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import firebaseEnvConfigs from '../../firebase';
// import { Link } from 'react-router-dom';
import API from "../../utils/API";
import Battery from "./../../components/Battery";

const firebase = firebaseEnvConfigs.firebase_;

function MemberDash() {
    const firebaseUserID = firebase.auth().currentUser.uid

    // const firebaseUserID = firebase.auth().currentUser.uid
    //userList is the array of objects that this webpage will map through and display 
    //designed for the member dashboard. should only show public/MN cryo member info from profile

    const [userList, setUsers] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [LoggedInUser, setUser] = useState("starting user condition");
    const [group, setGroup] = useState("private");

    //use effect that runs once to pull the complete user list.  the  .[] at the end means
    // empty dependancy so it will only run ONCE after initial rerender
    //if there was something in there then the use effect runs any time that something runs.
    function setstartgroup() {
        // console.log("startgroup", LoggedInUser)
        //doing this to find out of the user is member of any created group.
        if (LoggedInUser !== "starting user condition") {
            const result = LoggedInUser?.group?.filter(group => group !== 'public' && group !== 'private' && group !== 'admin');
            if (result.length > 0) {
                setGroup(result[0])
            } else if (result.includes("public")) {
                setGroup("public")
            } else {
                setGroup("private")
            }
        }
    }

    useEffect(() => {
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
        API.getuserList()
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        setstartgroup()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [LoggedInUser]);

    const handleGroupButton = async (e) => {
        // console.log("group", e.target.textContent)
        // console.log('user stuff',LoggedInUser._id , userList)
        if (LoggedInUser.group.includes(e.target.textContent) || e.target.textContent === 'public') {
            setGroup(e.target.textContent)
        }
    };


    return (
        <>
            {/* <div className="mb-2">
                <div className="d-flex justify-content-between">
                </div>
            </div> */}
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select Group
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {LoggedInUser.group &&
                        <div>
                            <div className="dropdown-item" onClick={handleGroupButton} key="public" >public</div>
                            {LoggedInUser.group
                                .filter(groupfilter => groupfilter !== 'public')
                                .map(mappedgroup => {
                                    return (
                                        <div className="dropdown-item" onClick={handleGroupButton} key={mappedgroup} >{mappedgroup}</div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>

            <div>
                {/* if isLoading or userList is false, then the data following && will not be displayed */}
                {
                    group === "private"
                        ? <h3>Private group selected, just showing your information{isLoading && <span>please wait, loading the data now.</span>}</h3>
                        : <h3>Showing all {group} group users here{isLoading && <span>please wait, loading the data now.</span>}</h3>
                }

                <span>click on each members name to see thier full profile.</span>
                <div>
                    {userList &&
                        <ul className="list-group">
                            {/* so this filters by users with fitbit devices and selects people according to the group selected. IF PRIVATE only show the user matching the logged in user */}
                            {userList.filter(user => user.name !== 'Initialized user name' && user.checkinDevices?.fitbit?.fitbitDeviceRegistered &&
                                user.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated && user.signedUpForAlerts === true && user.group.includes(group) === true
                                && (
                                    (group === 'private' && user._id  === LoggedInUser._id)
                                    ||
                                    (group !== 'private')
                                    )
                                    )
                                .sort(function (a, b) {
                                    //this will sort each user and put the user with the longest time since checkin at top. 
                                    //TODO sort by signed up for alerts field and map another time for people not wanting alerts
                                    if (
                                        //this will check the max date of all device fields
                                        //max will get milliseconds since 1970 and the highest number is the most recent. 
                                        //website checkin is guarunteed so no need to error check that?
                                        //fitbit time or other devices is not guarunteed so check if its registered, and if not submit 0 to the max formula
                                        Math.max(new Date(a.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                            a.checkinDevices.fitbit.fitbitDeviceRegistered && a?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated
                                                ? new Date(a.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                        )
                                        >
                                        Math.max(new Date(b.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                            b.checkinDevices.fitbit.fitbitDeviceRegistered && b?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated
                                                ? new Date(b.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                        )
                                    )
                                        return 1;
                                    else if (
                                        Math.max(new Date(a.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                            a.checkinDevices.fitbit.fitbitDeviceRegistered && a?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated
                                                ? new Date(a.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                        )
                                        <
                                        Math.max(new Date(b.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                            b.checkinDevices.fitbit.fitbitDeviceRegistered && b?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated
                                                ? new Date(b.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                        )
                                    )
                                        return -1;
                                    else { return 0 }
                                })
                                .map(user => {
                                    let FBMinutes = "--"
                                    let FBHours = "--"
                                    let FBDays = "--"
                                    if (user?.checkinDevices?.fitbit?.fitbitDeviceRegistered && user?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated) {
                                        const temptime = Date.now() - (new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime());
                                        FBMinutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
                                        FBHours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
                                        FBDays = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);
                                        return (
                                            <li className="list-group-item list-group-item-action dashboard-li" key={user._id}>
                                                <Link className="dashboard-li" to={`MemberDashboard/${user._id}`}>
                                                    <p><strong>NAME: </strong>{user.name}</p>
                                                    <p>{user?.signedUpForAlerts ? "Alerts enabled" : "Alerts disabled"}</p>
                                                    <p>{user?.checkinDevices?.fitbit?.alertArray[0]?.activeState ? "active fitbit watch alert!" : "No active fitbit watch alert"}</p>
                                                    {/* {user?.checkinDevices?.fitbit?.syncAlertArray[0]?.activeState ? <p>active sync alert!</p>: <p>No active sync alert</p>} */}
                                                    <p>{FBDays} d {FBHours} h {FBMinutes} min since fitbit sync checkin</p>
                                                    {(user?.checkinDevices?.fitbit?.fbDeviceName && user?.checkinDevices?.fitbit?.fbDeviceBat)
                                                        ? <div><Battery device={user.checkinDevices.fitbit.fbDeviceName} batlvl={user.checkinDevices.fitbit.fbDeviceBat} /></div>
                                                        : <p>Device name and battery level not yet loaded</p>
                                                    }
                                                </Link>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li className="list-group-item list-group-item-action dashboard-li" key={user._id}>
                                                <Link className="dashboard-li" to={`MemberDashboard/${user._id}`}>
                                                    <p><strong>NAME: </strong>{user.name}</p>
                                                    <p>No active devices detected. Fitbit might not be setup, or has not completed syncing yet.</p>
                                                </Link>
                                            </li>
                                        );
                                    }

                                })}
                        </ul>
                    }
                </div>
                <h3>Users with alerts disabled</h3>
                <div>
                    {userList &&
                        <ul className="list-group">
                            {userList.filter(user => user.name !== 'Initialized user name' && user.checkinDevices?.fitbit?.fitbitDeviceRegistered &&
                                user.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated && user.signedUpForAlerts === false && user.group.includes(group) === true
                                && (
                                    (group === 'private' && user._id  === LoggedInUser._id)
                                    ||
                                    (group !== 'private')
                                    )
                                    )
                                .sort(function (a, b) {
                                    //this will sort each user and put the user with the longest time since checkin at top. 
                                    //TODO sort by signed up for alerts field and map another time for people not wanting alerts
                                    if (
                                        //this will check the max date of all device fields
                                        //max will get milliseconds since 1970 and the highest number is the most recent. 
                                        //website checkin is guarunteed so no need to error check that?
                                        //fitbit time or other devices is not guarunteed so check if its registered, and if not submit 0 to the max formula
                                        Math.max(new Date(a.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                            a.checkinDevices.fitbit.fitbitDeviceRegistered && a?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated
                                                ? new Date(a.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                        )
                                        >
                                        Math.max(new Date(b.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                            b.checkinDevices.fitbit.fitbitDeviceRegistered && b?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated
                                                ? new Date(b.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                        )
                                    )
                                        return 1;
                                    else if (
                                        Math.max(new Date(a.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                            a.checkinDevices.fitbit.fitbitDeviceRegistered && a?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated
                                                ? new Date(a.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                        )
                                        <
                                        Math.max(new Date(b.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                            b.checkinDevices.fitbit.fitbitDeviceRegistered && b?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated
                                                ? new Date(b.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                        )
                                    )
                                        return -1;
                                    else { return 0 }
                                })
                                .map(user => {
                                    let FBMinutes = "--"
                                    let FBHours = "--"
                                    let FBDays = "--"
                                    if (user?.checkinDevices?.fitbit?.fitbitDeviceRegistered && user?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated) {
                                        const temptime = Date.now() - (new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime());
                                        FBMinutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
                                        FBHours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
                                        FBDays = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);
                                        return (
                                            <li className="list-group-item list-group-item-action dashboard-li" key={user._id}>
                                                <Link className="dashboard-li" to={`MemberDashboard/${user._id}`}>
                                                    <p><strong>NAME: </strong>{user.name}</p>
                                                    <p>{user?.signedUpForAlerts ? "Alerts enabled" : "Alerts disabled"}</p>
                                                    <p>{user?.checkinDevices?.fitbit?.alertArray[0]?.activeState ? "active fitbit watch alert!" : "No active fitbit watch alert"}</p>
                                                    {/* {user?.checkinDevices?.fitbit?.syncAlertArray[0]?.activeState ? <p>active sync alert!</p>: <p>No active sync alert</p>} */}
                                                    <p>{FBDays} d {FBHours} h {FBMinutes} min since fitbit sync checkin</p>
                                                    {(user?.checkinDevices?.fitbit?.fbDeviceName && user?.checkinDevices?.fitbit?.fbDeviceBat)
                                                        ? <div><Battery device={user.checkinDevices.fitbit.fbDeviceName} batlvl={user.checkinDevices.fitbit.fbDeviceBat} /></div>
                                                        : <p>Device name and battery level not yet loaded</p>
                                                    }
                                                </Link>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li className="list-group-item list-group-item-action dashboard-li" key={user._id}>
                                                <Link className="dashboard-li" to={`MemberDashboard/${user._id}`}>
                                                    <p><strong>NAME: </strong>{user.name}</p>
                                                    <p>No active devices detected. Fitbit might not be setup, or has not completed syncing yet.</p>
                                                </Link>
                                            </li>
                                        );
                                    }

                                })}
                        </ul>
                    }
                </div>
            </div>
        </>
    );
}

export default MemberDash;