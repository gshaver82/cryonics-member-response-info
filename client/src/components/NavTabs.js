import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavTabs() {
  const location = useLocation();

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item display-4">
        <Link to="/publicHomePage" className={(location.pathname === "/" || location.pathname === "/publicHomePage") ? "nav-link active" : "nav-link"}>
          publicHome
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
      <li className="nav-item display-4">
        <Link
          to="/TOSPage"
          className={location.pathname === "/TOSPage" ? "nav-link active" : "nav-link"}
        >
          TOS
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/PrivacyPolicyPage"
          className={location.pathname === "/PrivacyPolicyPage" ? "nav-link active" : "nav-link"}
        >
          PrivacyPol
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/privateHomePage"
          className={location.pathname === "/privateHomePage" ? "nav-link active" : "nav-link"}
        >
          prvtHomePage
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/memberDashboard"
          className={location.pathname === "/memberDashboard" ? "nav-link active" : "nav-link"}
        >
          memberDash
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "nav-link active" : "nav-link"}
        >
          profile
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/test"
          className={location.pathname === "/test" ? "nav-link active" : "nav-link"}
        >
          test
        </Link>
      </li>
    </ul>
    //     <button type="button" onClick={() => firebaseEnvConfigs.auth().signOut()}>
    //     Logout
    // </button>
  );
}
export default NavTabs;