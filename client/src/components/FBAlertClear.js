import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import API from "../utils/API";

// FBAlertClear


function ProfileDetails() {
  const { _id } = useParams()
  const [isLoading, setisLoading] = useState(true);
  const [AlertResponse, setAlertResponse] = useState(0);
  const [syncAlertResponse, setsyncAlertResponse] = useState(0);

  useEffect(() => {

    const response = API.putClearFBAlert(_id)
      .then(res => setAlertResponse(res.data))
      .then(setisLoading(false))
      .catch(err => console.log(err));
    console.log("api response", response)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("state AlertResponse 0 for not mod, 1 for mod", AlertResponse)
  console.log("state syncAlertResponse 0 for not mod, 1 for mod", syncAlertResponse)
  return (

    <div>
      <h2>Profile Details{isLoading && <span>please wait, loading the data now.</span>}</h2>
      <p>This page will attempt to clear alerts from either fitbit watch notifications, or fitbit heart rate sync info going dark</p>
      <p>If it hasnt already, the Fitbit watch will automatically resume monitoring
        when it detects heart rate after it sent the alert</p>
      {AlertResponse === 0
        ?
        <p>Alert not yet cleared</p>
        : <p>Alert cleared</p>
      }
      {syncAlertResponse === 0
        ? <p>Alert not yet cleared</p>
        : <p>Alert cleared</p>
      }
    </div>
  );
}
export default ProfileDetails;