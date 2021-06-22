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
        const newUser = {
            firebaseAuthID: firebaseUserID,
            name: "new user name2"
        }
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
export default Test;