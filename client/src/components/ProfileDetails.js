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
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Profile Details{isLoading && <span>please wait, loading the data now.</span>}</h2>
      <p>username is: {user && <span>{user.name}</span>}</p>
      <p>userdate created is: {user && <span>{user.dateCreated}</span>}</p>
      <p>id is: {_id && <span>{_id}</span>}</p>
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