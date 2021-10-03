import React from "react";
import { Link, useLocation } from "react-router-dom";
import firebaseEnvConfigs from './../firebase';
const firebase = firebaseEnvConfigs.firebase_;

function NavTabs() {
  const location = useLocation();
  let firebaseUserID = "no user"
  if (firebase.auth().currentUser) {
    firebaseUserID = firebase.auth().currentUser.uid
  }



  return (
    <ul className="nav nav-tabs">
      <li className="nav-item display-4">
        <Link to="/publicHomePage" className={(location.pathname === "/" || location.pathname === "/publicHomePage") ? "nav-link active" : "nav-link"}>
          Home
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/AlcorPage"
          className={location.pathname === "/AlcorPage" ? "nav-link active" : "nav-link"}
        >
          Alcor
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/CIPage"
          className={location.pathname === "/CIPage" ? "nav-link active" : "nav-link"}
        >
          CI
        </Link>
      </li>
      {/* <li className="nav-item display-4">
        <Link
          to="/TOSPage"
          className={location.pathname === "/TOSPage" ? "nav-link active" : "nav-link"}
        >
          TOS
        </Link>
      </li> */}
      {/* <li className="nav-item display-4">
        <Link
          to="/PrivacyPolicyPage"
          className={location.pathname === "/PrivacyPolicyPage" ? "nav-link active" : "nav-link"}
        >
          PrivacyPol
        </Link>
      </li> */}
      <li className="nav-item display-4">
        <Link
          to="/privateHomePage"
          className={location.pathname === "/privateHomePage" ? "nav-link active" : "nav-link"}
        >
          Device Control
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/memberDashboard"
          className={location.pathname === "/memberDashboard" ? "nav-link active" : "nav-link"}
        >
          Member Dashboard
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "nav-link active" : "nav-link"}
        >
          Profile
        </Link>
      </li>
      {/* hardcode admin auth ids here */}
      {firebaseUserID === 'Ysgu9k3nXVTmBPWY2T6cZ0w7Jpw1'
        ? <li className="nav-item display-4">
          <Link
            to="/test"
            className={location.pathname === "/test" ? "nav-link active" : "nav-link"}
          >
            Admin
          </Link>
        </li>
        : <div></div>
      }

    </ul>
    //     <button type="button" onClick={() => firebaseEnvConfigs.auth().signOut()}>
    //     Logout
    // </button>
  );
}
export default NavTabs;