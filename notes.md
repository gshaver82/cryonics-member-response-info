
add this line to take out seed script
"start:prod": "node server.js",
add this line to add back seed script
"start:prod": "node scripts/seedDB.js && node server.js",

--------------
quickstart notes
heroku config vars
NODE_ENV
production

create new firebase project card

go to project settings and add app to project

register app
go to the app and CDN snippet and copy unique API KEY codes etc over to service account key

go to >> settings>> service accounts>> generate new private key
put that info into service acount key


put firebase database URL routes index if needed. 
 "databaseURL": "",

when setting up firebase auth
authentication >> sign in method

and enable google and add authorized domain of the host (example heroku)

------------------
add config vars for heroku authentication deployment


NODE_ENV
FIREBASE_PRIVATE_KEY

find and replace \n with nothing
recommend to copy and paste the key to a file thats in use, do the find and replace and 
DELETE the copied key. you will expose the key if not and its a bit of a pain to fix

FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_APP_ID
FIREBASE_DOMAIN
FIREBASE_KEY
FIREBASE_PROJECT_ID
FIREBASE_SENDER_ID
FIREBASE_STORAGE_BUCKET

possible problems and solutions

problem 1
ls: cannot access '/app/build/static/js/*.js': No such file or directory
2021-04-13T07:17:05.025894+00:00 app[web.1]: Error injecting runtime env: bundle not found '/app/build/static/js/*.js'. See: https://github.com/mars/create-react-app-buildpack/blob/master/README.md#user-content-custom-bundle-location

solution 1
entered in ALL config vars, uncommented service account in routes index, adjusted package json, reordered buildpacks order to have nodes buildpack AFTER react buildpack. 

--------------
fill out .env file

## Firebase
FIREBASE_KEY=""
FIREBASE_DOMAIN=""
-------
the below one line is optional if you have a firebase database or not
------
FIREBASE_DATABASE=""
FIREBASE_PROJECT_ID=""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_SENDER_ID=""
FIREBASE_APP_ID=""

--------------------
add sign in methods on firebase console under authentication > sign in method.

google, email/password etc

for facebook
https://developers.facebook.com/docs/facebook-login/web
look here and for a facebook developer account
not currently implemented in this quickstart

----------------
If global credentials are accidentaly exposed 
(for example, uploaded to github without gitignore blocking the upload)
then you will get angry emails from google letting you know that the key was exposed
you will be asked to correct the problem AND change keys.

first, correct the gitignore to exclude serviceAccountKey.json or find where the key is that is being uploaded and correct that. 

then go to firebase console > gear top left > project settings > service accounts > 
manage service account permissions

find compromised key > click the dot dot dot and manage keys and add a key. 
this should download a new json. copy that to to the service account key json. 

----------------

