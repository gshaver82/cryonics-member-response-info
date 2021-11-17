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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (

    <div>
      <h2>Profile Details{isLoading && <span>please wait, loading the data now.</span>}</h2>

      <p>username is: {user && <span>{user.name} </span>}</p>
      <p>This page will eventualy clear the FB alert status. </p>
    </div>
  );
}
export default ProfileDetails;