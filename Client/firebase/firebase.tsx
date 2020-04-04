var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'macro-project.firebaseapp.com',
  databaseURL: 'https://macro-project.firebaseio.com',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: 'macro-project.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

export default firebaseConfig
