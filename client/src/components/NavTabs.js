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
        {/* <li className="nav-item display-4">
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
      </li> */}
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
            Control Panel
          </Link>
        </li>
        <li className="nav-item display-4">
          <Link
            to="/memberDashboard"
            className={location.pathname === "/memberDashboard" ? "nav-link active" : "nav-link"}
          >
            Member List
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
        {/* <li className="nav-item display-4">
        <Link
          to="/ClockfaceCards"
          className={location.pathname === "/ClockfaceCards" ? "nav-link active" : "nav-link"}
        >
          FB Clockface
        </Link>
      </li> */}
        {/* hardcode admin auth ids here */}
        {/* paypal donation form goes here */}
        <li className="nav-item display-4">
          <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="hosted_button_id" value="9Z4VSWFMXB7TY" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
          </form>
        </li>
        {/* paypal donation form goes here */}
        {firebaseUserID === 'Ysgu9k3nXVTmBPWY2T6cZ0w7Jpw1' || firebaseUserID === "Cr0yqDpvgAcVcV2ijZlHBAcSKZf1"
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
        {/* <li className="nav-item display-4">
          <button type="button" onClick={() => firebaseEnvConfigs.auth().signOut()}>
            Logout
          </button>
        </li> */}
      </ul>
  );
}
export default NavTabs;