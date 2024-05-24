# Bad Bank Application Node.js, Express, MongoDB, and Firebase

## Description: 
This reposity contains files necessary to run the Bad Bank Express application. The application can be used to build the base of a banking application that allows users to create an account, login via authentication, and includes functionality to deposit and withdraw amounts. 

## Installation:
To get code: git clone
To update versions and package json data: npm install
To update mongodb version: npm install mongodb
Install all necessary Firebase dependencies: firebase-admin, firebase-auth, firebase-login
Install Google authentication packages: google-auth-library
To initialize server and application: node index.js
Please note: The repository does not contain the admin.js file necessary to authenticate administrator privilages with Firebase. You will need to create you own firebase project with Authentication functionality and replace all code where Firebase is initialized.

## Technology Used: 
This application uses Express and Node.js as the application code. A local instance of MongoDB is used as the database. Firebase is used to authenticate users and enable the Google Authentication functionality. The application uses Bootstrap for styling purposes.

## Features:
The code has functionally to create a user account, login via email/password and Google authentication, deposit/withdraw functions with balance amount automatic update, and user log out.  

## License Information: 
This project is based on MIT licenses.