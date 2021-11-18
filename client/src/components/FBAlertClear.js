import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import API from "../utils/API";

function ProfileDetails() {
  const { _id } = useParams()
  const [isLoading, setisLoading] = useState(true);
  const [AlertResponse, setAlertResponse] = useState(0);

  useEffect(() => {
    const response = API.putClearFBAlert(_id)
      .then(res => setAlertResponse(res.data))
      .then(setisLoading(false))
      .catch(err => console.log(err));
    console.log("response", response)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("AlertResponse", AlertResponse)
  return (

    <div>
      <h2>Profile Details{isLoading && <span>please wait, loading the data now.</span>}</h2>
      <p>Alert state cleared</p>
      <p>If it hasnt already, the Fitbit watch will automatically resume monitoring
        when it detects heart rate after it sent the alert</p>
    </div>
  );
}
export default ProfileDetails;