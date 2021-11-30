import React from "react";
// import stepsJSON from "./stepsJSON.json";
import "./clockfaceStyle.css";
// import "./1.png";
import one from "./images/1.png";
import two from "./images/2.png";
import three from "./images/3.png";
import four from "./images/4.png";
import five from "./images/5.png";
import six from "./images/6.png";
import seven from "./images/7.png";
import eight from "./images/8.png";
import nine from "./images/9.png";
import ten from "./images/10.png";
import eleven from "./images/11.png";
import twelve from "./images/12.png";
import thirteen from "./images/13.png";
import fourteen from "./images/14.png";
import fifteen from "./images/15.png";
import sixteen from "./images/16.png";
import seventeen from "./images/17.png";

// const cache = {};
// function importAll(r) {
//     r.keys().forEach((key) => (cache[key] = r(key)));
// }
// // Note from the docs -> Warning: The arguments passed to require.context must be literals!
// importAll(require.context("./images", false, /\.(png|jpe?g|svg)$/));
// const images = Object.entries(cache).map(module => module[1].default);
// console.log("🚀 ~ images", images)



const descriptions = [
    "While using the phone you have the fitbit app on, click the link to the cryonics clockface, you should then see this",
    "click install",
    "click proceed",
    "select all permissions. everything asked for here is needed. ",
    "Clockface should now be installed, click settings here",
    "click login and authenticate again with fitbit",
    "This is the main screen you see when opening fitbit mobile app. click gold circle at top right to get to your account",
    "this is your account page, you should see your fitbit watch here, fitbit Sense in this pic. click that ",
    "this is the sense page. click sync now to manually sync. click gallery to view the clockface apps",
    "this is the gallery, Nav tabs at the top show sense - clocks - apps.  selecting clocks and apps will show publicly available things. on the sense tab are the clockfaces that are currently installed. click the picture of the clockface to go into its page",
    "now that i am in the cryonics clock face i can go to settings to relog if needed. notice how 'selected' is greyed out. if you want to uninstall the clock face click on another clockface app ",
    "here is another clockface app. since it is  not selected, it can be removed.  if you want to remove the cryonics clockface, select a new clockface, then go back to cryonics clockface and remove that",
    "go to your phones settings and 'allow all the time' for the fitbit app. this is what it looks like for android pixel 6. look for something similar in your phone",
    "click on the fitbit app in your phone and make sure battery usage is unrestricted this is what it looks like for android pixel 6. look for something similar in your phone",
    "On this webpage, go to the home page and login. easiest method is to log in via google if you have a google account. Email and password login work as well",
    "go to the profile tab and create a profile. enter the numbers you want called in the stage alerts. if an alert is triggered, the server will text/call the numbers, starting with 1, and then a minute later 2 etc.  if you select phone call, you will get a call AND a text. the calls and text do NOT accept any responses. to cancel the alert and prevent numbers further down the line from being notified, click the link in the text message",
    "go to the device control panel and select alerts on. if alerts is off, everything still runs in the background, but the texts/calls are prevented. IMPORTANT click fitbit login on this page, then enter your fitbit credentials after redirected. ",
]
const images = [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen,
    seventeen
]
function PortfolioPage() {
    return (

        <>
            <div className="clockfaceStyles">
                <p>Fitbit clockface Setup walkthrough</p>
                {descriptions
                    .map((description, index) => (
                        <div className="card2">
                            <div className="content">
                                <div className="projecttitle">
                                    <strong>Step {index +1}</strong>
                                </div>
                                <br />
                                <div className="descriptions">{descriptions[index]}</div>
                                <br />
                            </div>
                            <p >click image to see bigger image</p>
                            <div className="img-container">
                                <a href={images[index]}>
                                    <img src={images[index]} alt="screenshot" />
                                </a>
                            </div>
                        </div>
                    ))}
            </div>
        </>


        // <>
        //     <div className="clockfaceStyles">
        //         <p>Fitbit clockface Setup walkthrough</p>
        //         {images
        //         .sort((a, b) => a - b)

        //         .map((image, index) => (
        //             <div className="card2">
        //                 <div className="content">
        //                     <div className="projecttitle">
        //                         <strong>Step {index}</strong>
        //                     </div>
        //                     <br />
        //                     <div className="descriptions">{descriptions[index]}</div>
        //                     <br />
        //                 </div>
        //                 <p >click image to see bigger image</p>
        //                 <div className="img-container">
        //                     <a href={image}>
        //                         <img src={image} alt="screenshot" />
        //                     </a>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </>

        // <>
        //     <p>Media Page..</p>

        //     {Object.entries(cache)
        //     .sort((a, b) => a - b)
        //     .map(module => {
        //         const image = module[1].default;
        //         const name = module[0].replace("./", "");
        //         return (
        //             <div style={{ float: 'left', padding: 10, margin: 10, border: '2px solid white' }}>
        //                 <img style={{ width: 100, margin: 'auto', display: 'block' }} src={image} />
        //                 <p>{name}</p>
        //             </div>
        //         )
        //     })}
        // </>
    );
}

export default PortfolioPage;

