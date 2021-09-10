import Vue from 'vue'


// import firebase from "firebase/app"
// import "firebase/storage"
// import "firebase/firestore"

import flamelink from 'flamelink/app'
import 'flamelink/content'
import 'flamelink/storage'
import 'flamelink/navigation'
import 'flamelink/settings'

const firebase = require('firebase/app')
// require('firebase/auth')
require('firebase/firestore')
require('firebase/database')
require('firebase/storage')



const FlamelinkPlugin = {
  install(Vue, options) {
    if (!options) {
      throw new Error("Please specify the Flamelink config options");
    }

    const app = flamelink(options);

    // Ensure app is available on all vue instances
    Vue.prototype.$flamelinkApp = app;

    // Ensure app is available globally - useful for querying data not used in a view (eg. router setup, etc)
    Vue.flamelinkApp = app;
  }
};


const firebaseConfig = {
    apiKey: "AIzaSyBrcRfVgYgMsno3CJTDRM40FIqYjdeJfD8", 
    authDomain: "constantine-minhagim.firebaseapp.com",
    databaseURL: "https://constantine-minhagim.firebaseio.com", 
    projectId: "constantine-minhagim", 
    storageBucket: "constantine-minhagim.appspot.com", 
    messagingSenderId: "710107902876", 
    appId: "1:710107902876:web:5367581c2fd3cc500f0e59", 
    measurementId: "G-Y2V9JBDVXG", //process.env.NUXT_APP_FLAMELINK_MEASUREMENT_ID
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

Vue.use(FlamelinkPlugin, {
    firebaseApp,
    env: 'production',
    locale: 'fr', // fr, en-US, he
    dbType: 'cf'
})