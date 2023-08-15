import React from "react";

function AppPage() {
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.6,
            color: '#333',
            margin: '2em',
            padding: '1em',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        },
        header: {
            color: '#444',
        },
        paragraph: {
            marginBottom: '1em'
        },
        ulList: {
            paddingLeft: '20px',
            marginBottom: '1em'
        },
        olList: {
            paddingLeft: '20px',
            marginBottom: '1em'
        }
    };

    return (
        <div style={styles.container}>

            <h1 style={styles.header}>Autoheartwatch App</h1>
            <p style={styles.paragraph}>This phone app originally built for Minnesota Cryonics Rapid Response will alert your emergency contacts in the event you become nonresponsive</p>

            <h2 style={styles.header}>Features:</h2>
            <ul style={styles.ulList}>
                <li>Customizable alarm settings tailored to your daily routines.</li>
                <li>Efficient non-response mechanism that ensures your emergency contacts are informed in case you become nonresponsive.</li>
                <li>Cross-platform compatibility - designed for both Apple and Android devices.</li>
                <li>Intuitive interface for seamless setup and user experience.</li>
            </ul>

            <h2 style={styles.header}>Setup Procedure:</h2>
            <ol style={styles.olList}>
                <li>Enter your name and contact number.</li>
                <li>Request a verification code. This code will be promptly sent to your provided phone number for security verification.</li>
                <li>Enter the received verification code within the app to authenticate your identity.</li>
                <li>Navigate to the contacts section. Here, the app will display all the contacts saved on your phone.</li>
                <li>Select from this list, the individuals you trust to be your emergency contacts.</li>
            </ol>

            <h2 style={styles.header}>Operational Workflow:</h2>
            <p style={styles.paragraph}>When the set alarm time arrives, the app will sequentially:</p>
            <ol style={styles.olList}>
                <li>Push a notification to your phone screen.</li>
                <li>Send you a text message.</li>
                <li>Place a call to your number.</li>
            </ol>
            <p style={styles.paragraph}>If there's no acknowledgment from you via the "I am ok" button, all your designated emergency contacts will be alerted. They will receive both a text message and a phone call, ensuring that they are informed of your situation. Additionally, the app will provide them with your current GPS location, enabling them to take necessary action swiftly.</p>

        </div>
    );
}

export default AppPage;