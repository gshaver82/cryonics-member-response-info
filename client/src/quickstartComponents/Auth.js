import React, { useEffect, useState } from "react";
import firebaseEnvConfigs from "../firebase";

const firebase = firebaseEnvConfigs.firebase_;

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                // console.log("current user set", user.uid);
            }

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