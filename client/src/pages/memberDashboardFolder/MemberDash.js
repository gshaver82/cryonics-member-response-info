import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import firebaseEnvConfigs from '../../firebase';
// import { Link } from 'react-router-dom';
import API from "../../utils/API";

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
                            .sort((a, b) => (a.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated > b.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated) ? 1 : -1)
                            .map(user => {
                                //this gets the milliseconds since checkin
                                const temptime = Date.now() - (new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime());
                                let minutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
                                let hours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
                                let days = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);
                                return (
                                    <li className="list-group-item list-group-item-action dashboard-li" key={user._id}>
                                        <Link className="dashboard-li" to={`MemberDashboard/${user._id}`}>
                                            <p><strong>NAME: </strong>{user.name}</p>
                                            <p>{days} d {hours} h {minutes} min since checkin</p>
                                            <p>Web Check in: {" "}
                                                {(new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).toDateString())} {" "}
                                                {(new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).toTimeString())}
                                            </p>
                                            {user.checkinDevices.fitbit.fitbitDeviceRegistered
                                                ? <div>
                                                    <p>Most recent fitbit Check in:
                                                    </p>
                                                    <p>
                                                        {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toDateString())} {" "}
                                                    </p>
                                                    <p>
                                                        {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toTimeString())}
                                                    </p>
                                                </div>
                                                : <p>fitbit device not registered</p>
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