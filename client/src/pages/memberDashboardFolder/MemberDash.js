import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import firebaseEnvConfigs from '../../firebase';
// import { Link } from 'react-router-dom';
import API from "../../utils/API";
import Battery from "./../../components/Battery";

// const firebase = firebaseEnvConfigs.firebase_;

function MemberDash() {

    // const firebaseUserID = firebase.auth().currentUser.uid
    //userList is the array of objects that this webpage will map through and display 
    //designed for the member dashboard. should only show public/MN cryo member info from profile

    const [userList, setUsers] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    //use effect that runs once to pull the complete user list.  the  .[] at the end means
    // empty dependancy so it will only run ONCE after initial rerender
    //if there was something in there then the use effect runs any time that something runs.
    useEffect(() => {
        API.getuserList()
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    }, []);

    console.log("fitbit", userList?.user?.checkinDevices?.fitbit, userList[0]?.user?.checkinDevices?.fitbit)
    console.log("device details", userList?.user?.checkinDevices?.fitbit?.fBDeviceName, userList[0]?.user?.checkinDevices?.fitbit?.fBDeviceBat)

    return (
        <>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <p>
                        This is where you will see all the info about your group members.
                        group functionality not yet added.
                        Will add options to sort or search.
                        currently sorts by longest time since webcheckin.
                    </p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>
                        will have highlighted section at top of members who have signed up for checkins, and who havent checked in in a while
                        will have another highlighted section of members in declared emergency state.
                        should private members get revealed here if they are in declared emergency state?
                        Can click on each members name to see thier full profile.
                    </p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>
                        Can click on each members name to see thier full profile.
                    </p>
                </div>
            </div>
            <div>
                {/* if isLoading or userList is false, then the data following && will not be displayed */}
                <h3>Showing all users here{isLoading && <span>please wait, loading the data now.</span>}</h3>
                {userList &&
                    <ul className="list-group">
                        {userList
                            //this will sort by website checkin date. putting the oldest at the top
                            //to verify this sort works, change to < and you should see newest at top.
                            //this should work because ISO dates can be compared lexicographically
                            //TODO create a highlighted section of longest checkin 
                            //(some people may want shorter warning periods that others?)
                            //TODO create another section for those that opt out of checkins 
                            //and just want to use the site for information
                            .filter(user => user.name !== 'Initialized user name')
                            // a.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated 
                            .sort(function (a, b) {
                                //this will sort each user and put the user with the longest time since checkin at top. 
                                //TODO sort by signed up for alerts field and map another time for people not wanting alerts
                                if (
                                    //this will check the max date of all device fields
                                    //max will get milliseconds since 1970 and the highest number is the most recent. 
                                    //website checkin is guarunteed so no need to error check that?
                                    //fitbit time or other devices is not guarunteed so check if its registered, and if not submit 0 to the max formula
                                    Math.max(new Date(a.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                        a.checkinDevices.fitbit.fitbitDeviceRegistered && a.checkinDevices.fitbit.checkinArray[0].dateCreated
                                            ? new Date(a.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                    )
                                    >
                                    Math.max(new Date(b.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                        b.checkinDevices.fitbit.fitbitDeviceRegistered && b.checkinDevices.fitbit.checkinArray[0].dateCreated
                                            ? new Date(b.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                    )
                                )
                                    return 1;
                                else if (
                                    Math.max(new Date(a.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                        a.checkinDevices.fitbit.fitbitDeviceRegistered && a.checkinDevices.fitbit.checkinArray[0].dateCreated
                                            ? new Date(a.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                    )
                                    <
                                    Math.max(new Date(b.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime(),
                                        b.checkinDevices.fitbit.fitbitDeviceRegistered && b.checkinDevices.fitbit.checkinArray[0].dateCreated
                                            ? new Date(b.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime() : 0
                                    )
                                )
                                    return -1;
                                else { return 0 }
                            })
                            .map(user => {
                                //this gets the milliseconds since checkin
                                const temptime = Date.now() - (new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime());
                                let webMinutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
                                let webHours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
                                let webDays = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);

                                let FBMinutes = "--"
                                let FBHours = "--"
                                let FBDays = "--"
                                if (user?.checkinDevices?.fitbit?.fitbitDeviceRegistered && user?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated) {
                                    const temptime = Date.now() - (new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).getTime());
                                    FBMinutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
                                    FBHours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
                                    FBDays = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);
                                }

                                return (
                                    <li className="list-group-item list-group-item-action dashboard-li" key={user._id}>
                                        <Link className="dashboard-li" to={`MemberDashboard/${user._id}`}>
                                            <p><strong>NAME: </strong>{user.name}</p>
                                            {user?.checkinDevices?.fitbit?.alertArray[0]?.activeState
                                                ? <p>active fitbit watch alert!</p>
                                                : <p>No active fitbit watch alert</p>
                                            }
                                            {user?.checkinDevices?.fitbit?.syncAlertArray[0]?.activeState
                                                ? <p>active sync alert!</p>
                                                : <p>No active sync alert</p>
                                            }
                                            <p>{FBDays} d {FBHours} h {FBMinutes} min since fitbit sync checkin</p>
                                            {(user?.checkinDevices?.fitbit)
                                                ? <Battery device="test" batlvl='94' />
                                                : <p>fitbit</p>
                                            }
                                            {(user?.checkinDevices?.fitbit?.fBDeviceBat)
                                                ? <Battery device="test" batlvl={user.checkinDevices.fitbit.fBDeviceBat} />
                                                : <p>fBDeviceBat</p>
                                            }
                                            {(user?.checkinDevices?.fitbit?.fBDeviceName)
                                                ? <Battery device={user.checkinDevices.fitbit.fBDeviceName} batlvl='94' />
                                                : <p>fBDeviceName</p>
                                            }
                                            {(user?.checkinDevices?.fitbit?.fBDeviceName && user?.checkinDevices?.fitbit?.fBDeviceBat)
                                                ? <Battery device={user.checkinDevices.fitbit.fBDeviceName} batlvl={user.checkinDevices.fitbit.fBDeviceBat} />
                                                : <p>Unable to read device details</p>
                                            }
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                }
            </div>
        </>
    );
}

export default MemberDash;