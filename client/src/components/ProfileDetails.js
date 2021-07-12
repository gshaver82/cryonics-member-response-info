import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import API from "../utils/API";

function ProfileDetails() {
  const { _id } = useParams()

  const [user, setUser] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    API.getOneUser(_id)
      .then(res => setUser(res.data))
      .then(setisLoading(false))
      .catch(err => console.log(err));
  }, [_id]);
  console.log("user" + user);

  return (
    <div>
      <h2>Profile Details</h2>
      <p>id is: {_id}</p>
      <p>username is: {user.name}</p>
      <p>userdate created is: {user.dateCreated}</p>

    </div>
  );
}
export default ProfileDetails;