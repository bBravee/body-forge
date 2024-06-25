
# Project Title

## Overview

Body Forge is an application designed to support and facilitate strength training. Built with Angular, it provides features to track workouts, monitor progress, and manage fitness goals

## Features

* User authentication and management
* Adding new workouts
* Adding exercises with sets, reps and weight to workouts
* Deleting specific exercises or sets from workouts
* Progress monitoring with generated charts

## Installation and configuration

Clone the repository

```
git clone https://github.com/bBravee/body-forge.git
cd body-forge
```

Install dependencies

```
npm install
```

## Firebase configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/),
2. Add a web application to your Firebase project
3. Copy Firebase configuration details
4. Update `src/environments/environment.development.ts` with your firebase configuration: 

```
export const environment = {
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DB_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagindSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};
```
## Realtime Database configuration
1. Go to the Realtime Database section in your Firebase project.
2. Create a node called exercises.
3. Add several exercises to the exercises node with the following structure:

```
{
  "exercises": {
    "exercise1": {
      "name": "Push-up",
      "muscle": "Chest"
    },
    "exercise2": {
      "name": "Squat",
      "muscle": "Legs"
    },
    "exercise3": {
      "name": "Deadlift",
      "muscle": "Back"
    }
  }
}
```

## Development Server

Run the development server:

```
ng serve

```

Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Feedback
Raising issues and giving feedback about the app are always welcome!







