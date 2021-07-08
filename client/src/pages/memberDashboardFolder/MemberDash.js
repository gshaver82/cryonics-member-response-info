import React, { useState, useEffect } from 'react';
import firebaseEnvConfigs from '../../firebase';
// import { Link } from 'react-router-dom';
import API from "../../utils/API";

const firebase = firebaseEnvConfigs.firebase_;

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
                    .sort((a, b) => (a.WebsiteCheckIn.dateCreated > b.WebsiteCheckIn.dateCreated) ? 1 : -1)
                    .map(user => {
                        return (
                            <li className="list-group-item dashboard-li" key={user._id}>
                                <p><strong>NAME: </strong>{user.name}</p>
                                <p>Web Check in DateTime: {user.WebsiteCheckIn.dateCreated}  </p>
                                <p>
                                    Web Check in GPS: [{user.WebsiteCheckIn.loc.coordinates[0]}]  [
                                    {user.WebsiteCheckIn.loc.coordinates[1]}]
                                </p>
                                {/* <button value={user._id} onClick={handleDeleteClick}>
                                    Delete Profile
                                </button> */}
                            </li>
                        );
                    })}
                </ul>
            }
        </div>


            {/* <button type="button" onClick={() => firebaseEnvConfigs.auth().signOut()}>
                Logout
            </button>
            <br></br>
            <div>
                <Link to="/publicHomePage" className="btn-secondary rb-btn">Go To publicHomePage</Link>
            </div> */}

        </>
    );
}

export default MemberDash;