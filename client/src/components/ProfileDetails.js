import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import API from "../utils/API";

function ProfileDetails() {
  const { _id } = useParams()

  const [user, setUser] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    API.getOneUser(_id)
      .then(res => setUser(res.data))
      .then(setisLoading(false))
      .then(console.log("user here"))
      .then(console.log(user))
      .catch(err => console.log(err));
  }, []);
  // console.log("user" + user);


  //TODO {user &&  BEFORE EVERYTHING


  return (
    <div>
      <h2>Profile Details{isLoading && <span>please wait, loading the data now.</span>}</h2>
      <p>username is: {user.name}</p>


    

      <p>userdate created is: {user.dateCreated}</p>
      <p>id is: {_id}</p>
      {/* <p>user.WebsiteCheckIn is: {(user.WebsiteCheckIn.dateCreated)}</p> */}
      {user &&   <div>
        <p>Web Check in: {" "}
            {(new Date(user.WebsiteCheckIn.dateCreated).toDateString())} {" "}
          </p>
          <p>
            {(new Date(user.WebsiteCheckIn.dateCreated).toTimeString())}
          </p>
      
      </div>}

    </div>
  );
}
export default ProfileDetails;