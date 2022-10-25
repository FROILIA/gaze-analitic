import firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/database";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBlTk7Sv4Vjx8dNacbpGm7RHtmygAzYhTA",
    authDomain: "gaze-analytic.firebaseapp.com",
    databaseURL: "https://gaze-analytic-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gaze-analytic",
    storageBucket: "gaze-analytic.appspot.com",
    messagingSenderId: "646497392377",
    appId: "1:646497392377:web:b109fd1cd87f634189f428",
    measurementId: "G-V7RWG0FV1Q",
});
const analytics = getAnalytics(app);

export default app;
export { analytics };
