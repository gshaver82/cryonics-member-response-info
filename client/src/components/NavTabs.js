import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavTabs() {
  const location = useLocation();

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item display-4">
        <Link to="/publicHomePage" className={(location.pathname === "/" ||location.pathname === "/publicHomePage" ) ? "nav-link active" : "nav-link"}>
        publicHomePage
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/TOSPage"
          className={location.pathname === "/portfolio" ? "nav-link active" : "nav-link"}
        >
          TOSPage
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/PrivacyPolicyPage"
          className={location.pathname === "/PrivacyPolicyPage" ? "nav-link active" : "nav-link"}
        >
          PrivacyPolicyPage
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/privateHomePage"
          className={location.pathname === "/privateHomePage" ? "nav-link active" : "nav-link"}
        >
          privateHomePage
        </Link>
      </li>
      <li className="nav-item display-4">
        <Link
          to="/memberDashboard"
          className={location.pathname === "/memberDashboard" ? "nav-link active" : "nav-link"}
        >
          memberDashboard
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
  );
}
export default NavTabs;