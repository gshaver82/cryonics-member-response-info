import React, { useEffect, useState } from "react";
import firebaseEnvConfigs from "../firebase";
import API from "../utils/API";

const firebase = firebaseEnvConfigs.firebase_;

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                console.log("current user set");
                console.log(user.uid);
            }


            //DO a route here to create user record IF not already created
            // API.findOneAndUpdate(user.uid)
            // .then(res => {
            //     console.log("res.data");
            //     console.log(res.data);
            // })
            // .catch(err => console.log(err));


            setPending(false)
        });
    }, []);

    if (pending) {
        // This needs to be replaced with some kind of white fade in.
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}