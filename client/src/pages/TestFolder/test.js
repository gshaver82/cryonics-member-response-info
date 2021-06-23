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

    const handleadduserclick = () => {
        const newUser =  {
            firebaseAuthID: firebaseUserID,
            name: "clicked user name",
            WebsiteCheckIn: {
                loc: {
                    type: "Point",
                    coordinates: [-2, 2],
                }
            }
        }
        console.log("🚀 ~ file: test.js ~ line 40 ~ handleadduserclick ~ newUser", newUser)
        API.adduser(newUser)
            .catch(err => console.log(err));
    };

    const handleDeleteClick = (event) => {
        console.log("🚀 ~ file: test.js ~ line 42 ~ handleDeleteClick ~ event", event.target.value)
        const deletedUser_id = event.target.value;
        API.deleteUser(deletedUser_id)
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>testing page</h1>
            <button onClick={handleadduserclick} className="btn btn-info">
                {" "}adduser{" "}
            </button>
            <p>mapping through all users here</p>
            {/* if isLoading or userList is false, then the data following && will not be displayed */}
            {isLoading && <h1>please wait, loading the data now.</h1>}
            {userList &&
                <ul className="list-group">
                    {userList.map(user => {
                        return (
                            <li className="list-group-item dashboard-li" key={user._id}>
                                <p><strong>NAME: </strong>{user.name}</p>
                                <p> _id: {user._id}</p>
                                <p>firebaseAuthID: {user.firebaseAuthID}</p>
                                <p>Web Check in DateTime: {user.WebsiteCheckIn.dateCreated}  </p>
                                <p>Web Check in GPS: {user.WebsiteCheckIn.loc.coordinates[0]}  {user.WebsiteCheckIn.loc.coordinates[1]}</p>
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