import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import firebaseEnvConfigs from '../../firebase';
import AuthCard from "../../quickstartComponents/AuthCard"
import { AuthContext } from "../../quickstartComponents/Auth";

function PublicHomePage() {
    const app = firebaseEnvConfigs.firebase_;
    const { currentUser } = useContext(AuthContext);
    // const [display, setDisplay] = useState(false);

    return (
        <div>
            <AuthCard>
                <section className="text-center">
                    <p className="divider font-script">Public Home page</p>
                </section>
                <section className="d-flex justify-content-center my-4">
                    {!!currentUser ? (
                        <>
                            <Link to="/privateHomePage" className="btn-secondary rb-btn mr-4">Control Panel</Link>
                            <button className="rb-btn btn-info" onClick={() => app.auth().signOut()}>Sign Out</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-secondary rb-btn">Sign In</Link>
                    )}

                </section>
            </AuthCard>
            <div className="container">

                <div className="row justify-content-center recipe-border-2">
                    <div className="col justify-content-center">
                        <h2>
                            Monitor your heartrate and motion.
                        </h2>
                        <p>
                            The watch or other device will monitor your heart rate. if no heart rate is detected, it will check the accelerometers for motion.
                            If there is no HR or motion detected for 20 seconds it will send out alerts. Monitoring will be automatically paused while charging,
                            and can be paused manually as well. Accuracy is pretty good, but not perfect... see future plans below. 
                        </p>
                        <a href="/clockfacecards" class="btn btn-primary">Setup</a>

                    </div>
                    <div className="col-auto ">
                        <img className="img-responsive frontimg" src='./images/clockface_screenshot.png' alt="clockface screenshot" ></img>
                    </div>
                </div>

                <div className="row justify-content-center recipe-border-2">
                    <div className="col-auto  order-2 order-md-1">
                        <img className="img-responsive frontimg" src='./images/alertText2.png' alt="clockface screenshot" ></img>
                    </div>
                    <div className="col order-1 order-md-2 justify-content-center">
                        <h2>
                            Automatically send out alerts to those you choose.
                        </h2>
                        <p>
                            The alert generated from your watch will go to your phone.
                            Your phone will then attempt to get a GPS location and then send the alert via internet to this website.
                            This server will then text or call the numbers you put in your profile.
                            It will start with the first number, and then 60 seconds later, the next number and so on.
                            It is recommended to have the system text you first, then call you. After that it should be setup to call your emergency contacts.
                            You can clear an alert by clicking the link in the text message, or by pressing 1 during the automated phone call. 

                        </p>
                    </div>
                </div>

                <div className="row justify-content-center recipe-border-2">
                    <div className="col justify-content-center">
                        <h2>
                            Future plans.
                        </h2>
                        <p>
                            Future plans are centered around improving accuracy. Currently I am relying on these devices to tell me when there is no heart rate detected.
                            With motion detection I expect a false positive alert to happen once a year or less with proper use.
                            False negatives are much harder to test. All reflective PPG sensors are coded to prioritize returning a heart rate value quickly at the expense of accuracy. 
                        </p>
                        <p>
                            The way these devices try to get a signal at all costs is to "turn up the volume" on the signal.
                            What can then happen is that the device will "turn up the volume" so much that the background signal noise gets interpreted as a heartrate signal.
                            I will get the raw PPG heart rate signal data from the sensor and look for a heart rate in the same manner, but without allowing too much signal amplification.
                            This might result in false positives when the user is exercising or otherwise in motion that results in poor signal quality. 
                            In this case the motion detection will prevent the false positive.
                            While sleeping, motion detection wont be applicable, but the lack of motion means the PPG HR sensor will have a good signal. 
                        </p>
                    </div>
                    <div className="col-auto ">
                        <img className="img-responsive frontimg" src='./images/rawPPG.jpg' alt="raw PPG" ></img>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default PublicHomePage;
