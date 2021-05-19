import React, { useState, useEffect } from 'react';
import API from "../../utils/API";
import { ListItem, } from "../../components/List/index";
import firebaseEnvConfigs from '../../firebase';

const firebase = firebaseEnvConfigs.firebase_;

function Test() {
    const firebaseUserID = firebase.auth().currentUser.uid
    //userList is the array of objects that this webpage will map through and display 
    //designed for the member dashboard. should only show public/MN cryo member info from profile

    //setUsers is the thing that will grab user list from the mongo database 

    //use effect here?

    const [userList, setUsers] = useState([]);
    console.log("[test] get user list")
    //this runnings in an endless loop



    const getalluserstest = event => {
        event.preventDefault();
        API.getuserList()
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    };
    const adduser = event => {
        event.preventDefault();
        const newUser = {
            firebaseAuthID: firebaseUserID,
            name: "new user name2"
        }
        console.log("inside button, new user is " + newUser)
        console.log(newUser)
        API.adduser(newUser)
            .catch(err => console.log(err));
    };
    //this will be for new info?
    // let [newRecipe, setNewRecipe] = useState([
    //     {
    //         firebaseUserID: firebaseUserID,
    //         name: "default Name",
    //     },
    // ]);

    // const createRecipeSubmit = event => {
    //     event.preventDefault();
    //     console.log('creating dummy object');
    //     setNewRecipe({
    //         firebaseUserID: firebaseUserID,
    //         name: "created name",
    //     })
    //     API.createRecipe(newRecipe)
    //         .catch(err => console.log(err));
    // };

    return (
        <div>
            <h1>testing page</h1>


            <button onClick={getalluserstest} className="btn btn-info">
                {" "}getalluserstest{" "}
            </button>
            <button onClick={adduser} className="btn btn-info">
                {" "}adduser{" "}
            </button>

            <p>mapping through all users here</p>
            <ul>
                {userList.map(user => {
                    return (
                        // <ListItem
                        //     _id={user._id}
                        //     firebaseAuthID={user.firebaseAuthID}
                        //     name={user.name}
                        // />
                        <li className="list-group-item" key={user._id}>
                            name: {user.name}
                            _id: {user._id}
                            firebaseAuthID: {user.firebaseAuthID}
                        </li>
                    );
                })}

            </ul>
        </div>
    );
}
export default Test;