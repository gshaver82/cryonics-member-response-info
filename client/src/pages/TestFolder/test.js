import React, { useState, useEffect } from 'react';
import API from "../../utils/API";
// import { ListItem, } from "../../components/List/index";
import firebaseEnvConfigs from '../../firebase';

const firebase = firebaseEnvConfigs.firebase_;

function Test() {

    const firebaseUserID = firebase.auth().currentUser.uid
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

    const handleadduserclick = async () => {
        setisLoading(true)
        const newUser = {
            firebaseAuthID: firebaseUserID,
            name: "Default user name",
            WebsiteCheckIn: {
                dateCreated: Date.now(),
                loc: {
                    type: "Point",
                    coordinates: [-2, 2],
                }
            },
            dateCreated: Date.now(),
        }
        console.log("🚀 ~ file: test.js ~ line 40 ~ handleadduserclick ~ newUser", newUser)
        await API.adduser(newUser)
            .catch(err => console.log(err));
        await API.getuserList()
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
    };

    const handleputcheckIn = async () => {
        setisLoading(true)
        const checkInData = {
            firebaseAuthID: firebaseUserID,
            WebsiteCheckIn: {
                dateCreated: Date.now(),
                loc: {
                    type: "Point",
                    coordinates: [-2, 2],
                }
            },
        }
        await API.putcheckIn(checkInData)
            .catch(err => console.log(err));
        await API.getuserList()
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
    };

    const handleDeleteClick = async (event) => {
        setisLoading(true)
        console.log("🚀 ~ file: test.js ~ line 42 ~ handleDeleteClick ~ event", event.target.value)
        const deletedUser_id = event.target.value;
        await API.deleteUser(deletedUser_id)
            .catch(err => console.log(err));
        await API.getuserList()
            .then(res => setUsers(res.data))
            .then(setisLoading(false))
    }

    return (
        <div>
            {/* if isLoading or userList is false, then the data following && will not be displayed */}
            <h1>testing page{isLoading && <span>please wait, loading the data now.</span>}</h1>
            <button onClick={handleadduserclick} className="btn btn-info">
                {" "}adduser{" "}
            </button>
            <button onClick={handleputcheckIn} className="btn btn-info">
                {" "}putcheckIn{" "}
            </button>
            <p>mapping through all users here</p>
            {userList &&
                <ul className="list-group">
                    {userList.map(user => {
                        return (
                            <li className="list-group-item dashboard-li" key={user._id}>
                                <p><strong>NAME: </strong>{user.name}</p>
                                <p> _id: {user._id}</p>
                                <p>Date Profile Created: {user.dateCreated} </p>
                                <p>firebaseAuthID: {user.firebaseAuthID}</p>
                                <p>Web Check in DateTime: {user.WebsiteCheckIn.dateCreated}  </p>
                                <p>
                                    Web Check in GPS: [{user.WebsiteCheckIn.loc.coordinates[0]}]  [
                                    {user.WebsiteCheckIn.loc.coordinates[1]}]
                                </p>
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
//TODO put google name on for the add user click
//TODO add a profile page to edit info

//TODO add a Check in button that
//TODO make check in button ask for GPS and then create a route to save that GPS data to DB
//TODO find a way to extrapolate generic info from a GPS... like a city name. 
//TODO create a link to google maps to the gps info. 
export default Test;