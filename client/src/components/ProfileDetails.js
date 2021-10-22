import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import API from "../utils/API";
import Battery from "../components/Battery";

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

  let GoogleURL = "void";
  if (isLoading === false && user && user.name !== 'Initialized user name') {
    if (user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0] &&
      user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]) {
      GoogleURL = "https://www.google.com/maps/place/" + [user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]] +
        "+" + [user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]]
    }
  }
  //TODO error harden for [0].dateCreated. it somehow created a temporary error that was fixed with page refresh
  return (

    <div>
      <h2>Profile Details{isLoading && <span>please wait, loading the data now.</span>}</h2>

      <p>username is: {user && <span>{user.name} </span>}{user.photoURL && <img src={user.photoURL} alt='default profile pic here'></img>}</p>
      <p>userdate created is: {user && <span>{user.dateCreated}</span>}</p>
      {/* <p>id is: {_id && <span>{_id}</span>}</p> */}
      {user && <div>
        <p>description: {user.description}</p>
        <p>cryonicsProvider: {user.cryonicsProvider}</p>
        <p>Current location according to web checkin: {GoogleURL !== "void"
          ? <a href={GoogleURL} target="_blank" rel="noopener noreferrer">GoogleMaps</a>
          : <span>no GPS coordinates found</span>}
        </p>

        <p>Web Check in: {" "}
          {(new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).toDateString())} {" "}
        </p>
        <p>
          {(new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).toTimeString())}
        </p>
        {user.checkinDevices.fitbit.fitbitDeviceRegistered
          ? <div>
            <p>Most recent fitbit Check in:
            </p>
            <p>
              {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toDateString())} {" "}
            </p>
            <p>
              {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toTimeString())}
            </p>
            {user.text1 && user.text2
              ? <Battery device={user.text1} batlvl={user.text2} />
              : <p>Unable to read device details</p>
            }
          </div>
          : <p>fitbit device not registered</p>
        }

      </div>}

    </div>
  );
}
export default ProfileDetails;