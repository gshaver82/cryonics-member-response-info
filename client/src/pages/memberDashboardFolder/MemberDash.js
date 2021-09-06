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
                    <h3>
                        You are now logged in and viewing the cryonics member dashboard
                    </h3>
                </div>
            </div>
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <p>
                        This is where all the MN cryonics members info will be displayed.
                        it will be a full list of all member with abridged info.
                        abridged info will include date/time of last automated checkin.
                        Will show members in emergency state on top, followed by members in alert state
                        emergency state being a declared emergency by the user.
                        alert state being that the server has not gotten member state for a long time.

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
                            .sort((a, b) => (a.checkinDevices.WebsiteCheckIn.dateCreated > b.checkinDevices.WebsiteCheckIn.dateCreated) ? 1 : -1)
                            .map(user => {
                                //this gets the milliseconds since checkin
                                const temptime = Date.now() - (new Date(user.checkinDevices.WebsiteCheckIn.dateCreated).getTime());
                                let minutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
                                let hours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
                                let days = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);


                                return (
                                    <Link className="dashboard-li" to={`MemberDashboard/${user._id}` } key={user._id}>
                                        <li className="list-group-item list-group-item-action dashboard-li" >
                                            <p><strong>NAME: </strong>{user.name}</p>
                                            <p>Web Check in: {" "}
                                                {(new Date(user.checkinDevices.WebsiteCheckIn.dateCreated).toDateString())} {" "}
                                            </p>
                                            <p>
                                                {(new Date(user.checkinDevices.WebsiteCheckIn.dateCreated).toTimeString())}
                                            </p>
                                            <p>{days} days {hours} hours {minutes} minutes since checkin</p>
                                            {/*
                                        <p>
                                            Web Check in GPS: [{user.WebsiteCheckIn.loc.coordinates[0]}]  [
                                            {user.WebsiteCheckIn.loc.coordinates[1]}]
                                        </p>
                                        {/* <button value={user._id} onClick={handleDeleteClick}>
                                    Delete Profile
                                </button> */}
                                        </li>
                                    </Link>
                                );
                            })}
                    </ul>
                }
            </div>
        </>
    );
}

export default MemberDash;