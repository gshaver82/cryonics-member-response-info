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
    if (user?.checkinDevices?.WebsiteCheckIn?.checkinArray[0]?.loc?.coordinates[0] &&
      user?.checkinDevices?.WebsiteCheckIn?.checkinArray[0]?.loc?.coordinates[1]) {
      GoogleURL = "https://www.google.com/maps/place/" + [user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]] +
        "+" + [user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]]
    }
  }
  let GoogleAlertURL = "void";
  if (isLoading === false && user && user.name !== 'Initialized user name') {
    if (user?.checkinDevices?.fitbit?.alertArray[0]?.lat &&
      user?.checkinDevices?.fitbit?.alertArray[0]?.long) {
      GoogleAlertURL = "https://www.google.com/maps/place/" + user.checkinDevices.fitbit.alertArray[0].lat +
        "+" + user.checkinDevices.fitbit.alertArray[0].long
    }
  }
  //TODO error harden for [0].dateCreated. it somehow created a temporary error that was fixed with page refresh
  return (

    <div>
      <h2>Profile Details{isLoading && <span>please wait, loading the data now.</span>} for: {user && <span>{user?.name} </span>}</h2>
      <br></br>
      {user.photoURL && <img src={user?.photoURL} alt='default profile pic here'></img>}
      {/* <p>id is: {_id && <span>{_id}</span>}</p> */}
      {user && <div>
        {user?.checkinDevices?.fitbit?.alertArray[0]?.activeState
          ? <div>
            <p>active fitbit watch alert!</p>
            <p>link to GPS according to google maps: {GoogleAlertURL !== "void"
              ? <a href={GoogleURL} target="_blank" rel="noopener noreferrer">GoogleMaps</a>
              : <span>no GPS coordinates found</span>}
            </p>
          </div>
          : <p>No active fitbit watch alert</p>
        }
        {user?.checkinDevices?.fitbit?.syncAlertArray[0]?.activeState
          ? <div>
            <p>active sync alert!</p>
          </div>
          : <p>No active sync alert</p>
        }
        <p>description: {user?.description}</p>
        <p>cryonicsProvider: {user?.cryonicsProvider}</p>
        <p>userdate created is: {user && <span>{user?.dateCreated}</span>}</p>
        {/* <p>Current location according to web checkin: {GoogleURL !== "void"
          ? <a href={GoogleURL} target="_blank" rel="noopener noreferrer">GoogleMaps</a>
          : <span>no GPS coordinates found</span>}
        </p> */}

        {/* <p>Web Check in: {" "}
          {(new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).toDateString())} {" "}
        </p>
        <p>
          {(new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).toTimeString())}
        </p> */}
        {user.checkinDevices.fitbit.fitbitDeviceRegistered && user.checkinDevices.fitbit.checkinArray[0].dateCreated
          ? <div>
            <p>Most recent fitbit Check in:
            </p>
            <p>
              {(new Date(user?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated).toDateString())} {" "}
            </p>
            <p>
              {(new Date(user?.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated).toTimeString())}
            </p>
            {user?.checkinDevices?.fitbit?.fBDeviceName && user?.checkinDevices?.fitbit?.fBDeviceBat
              ? <Battery device={user.checkinDevices.fitbit.fBDeviceName} batlvl={user.checkinDevices.fitbit.fBDeviceBat} />
              : <p>Fitbit device name and battery level not yet loaded</p>
            }
          </div>
          : <p>fitbit device not registered</p>
        }

      </div>}

    </div>
  );
}
export default ProfileDetails;