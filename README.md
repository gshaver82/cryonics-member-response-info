# Fitbit HeartRate Alert
Once a user signs up and links to a fitbit device, this server will monitor heartrate and send alerts if HR is lost
# Screenshot
<br></br>
<p float="left">
      <img alt="19.png" src="/zgithubScreenshots/19.png" width="273" />
      <!-- <img alt="screenshot 16.png" src="/zgithubScreenshots/16.png" width="830" /> -->
      <img alt="17.png" src="/zgithubScreenshots/17.png" width="547" />
</p>

# Monitor your heartrate and motion.

<p><img align="left" alt="clockface_screenshot" src="/zgithubScreenshots/clockface_screenshot.png">
The watch or other device will monitor your heart rate. if no heart rate is detected, it will check the accelerometers for motion. If there is no HR or motion detected for 20 seconds it will send out alerts. Monitoring will be automatically paused while charging, and can be paused manually as well. Currently only working on fitbit sense. Accuracy is pretty good, but not perfect... see future plans below.
</p>

# Automatically send out alerts to those you choose.


<img align="left" alt="alertText2" src="/zgithubScreenshots/alertText2.png">
The alert generated from your watch will go to your phone.
Your phone will then attempt to get a GPS location and then send the alert via internet to this website.
This server will then text or call the numbers you put in your profile.
It will start with the first number, and then 60 seconds later, the next number and so on.
It is recommended to have the system text you first, then call you. After that it should be setup to call your emergency contacts.
You can clear an alert by clicking the link in the text message, or by pressing 1 during the automated phone call.
<br></br>

# Future plans.

<img align="left" alt="rawPPG" src="/zgithubScreenshots/rawPPG.jpg">
Future plans are centered around improving accuracy. Currently I am relying on these devices to tell me when there is no heart rate detected.
With motion detection I expect a false positive alert to happen once a year or less with proper use.
False negatives are much harder to test. All reflective PPG sensors are coded to prioritize returning a heart rate value quickly at the expense of accuracy.

The way these devices try to get a signal at all costs is to "turn up the volume" on the signal.
What can then happen is that the device will "turn up the volume" so much that the background signal noise gets interpreted as a heartrate signal.
I will get the raw PPG heart rate signal data from the sensor and look for a heart rate in the same manner, but without allowing too much signal amplification.
This might result in false positives when the user is exercising or otherwise in motion that results in poor signal quality.
In this case the motion detection will prevent the false positive.
While sleeping, motion detection wont be applicable, but the lack of motion means the PPG HR sensor will have a good signal.
<br></br>

# link to deployed app
<a href='https://cryonics-member-response-info.herokuapp.com/publicHomePage'>Deployed site </a>
link to setup instructions will be on the public home page

# License
All rights reserved. Contact me for usage. 
# Questions
 Questions may be forwarded to me at my 
<a href='https://github.com/gshaver82'>Github profile </a>
or at my 
<a href='https://www.linkedin.com/in/gene-shaver-7b574b1a4/'>linkedin</a>
<br></br>
<img src='https://avatars.githubusercontent.com/u/52022933?v=4' alt=Github profile picture width=100>