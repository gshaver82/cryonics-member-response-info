import React from "react";

function AppPage() {

    return (
        <div>

            <h1 >Autoheartwatch App</h1>
            <p >This phone app originally built for Minnesota Cryonics Rapid Response will alert your emergency contacts in the event you become nonresponsive</p>

            <h2>Features:</h2>
            <ul>
                <li>Customizable alarm settings tailored to your daily routines.</li>
                <li>Efficient non-response mechanism that ensures your emergency contacts are informed in case you become nonresponsive.</li>
                <li>Cross-platform compatibility - designed for both Apple and Android devices.</li>
                <li>Intuitive interface for seamless setup and user experience.</li>
            </ul>

            <h2>Setup Procedure:</h2>
            <ol>
                <li>Enter your name and contact number.</li>
                <li>Request a verification code. This code will be promptly sent to your provided phone number for security verification.</li>
                <li>Enter the received verification code within the app to authenticate your identity.</li>
                <li>Navigate to the contacts section. Here, the app will display all the contacts saved on your phone.</li>
                <li>Select from this list, the individuals you trust to be your emergency contacts.</li>
            </ol>

            <h2>Operational Workflow:</h2>
            <p>When the set alarm time arrives, the app will sequentially:</p>
            <ol>
                <li>Push a notification to your phone screen.</li>
                <li>Send you a text message.</li>
                <li>Place a call to your number.</li>
            </ol>
            <p>If there's no acknowledgment from you via the "I am ok" button, all your designated emergency contacts will be alerted. They will receive both a text message and a phone call, ensuring that they are informed of your situation. Additionally, the app will provide them with your current GPS location, enabling them to take necessary action swiftly.</p>

        </div>
    );
}

export default AppPage;