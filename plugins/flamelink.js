
import Vue from 'vue'
/* NEW VERSION */
import flamelink from 'flamelink/app'
// RTDB for Realtime Database - CF for Cloud Firestore
import 'flamelink/cf/content'
import 'flamelink/cf/storage'
import 'flamelink/cf/settings'
import 'flamelink/cf/navigation'
import 'flamelink/cf/users'
const firebase = require('firebase/app')
    // require('firebase/auth')
require('firebase/firestore')
require('firebase/database')
require('firebase/storage')


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
  
  let firebaseApp
  
  if (!firebase.apps.length) {
    // firebaseApp = firebase.initializeApp({
    //   apiKey: process.env.FLAMELINK_API_KEY,
    //   authDomain: process.env.FLAMELINK_AUTH_DOMAIN,
    //   databaseURL: process.env.FLAMELINK_DB_URL,
    //   projectId: process.env.FLAMELINK_PROJECT_ID,
    //   storageBucket: process.env.FLAMELINK_STORAGE_BUCKET,
    //   messagingSenderId: process.env.FLAMELINK_MESSAGING_SENDER_ID
    // })
    firebaseApp = firebase.initializeApp(firebaseConfig)
  
  } else {
    firebaseApp = firebase.app()
  }
  


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
      Vue.use(flamelink(options))
    }
  };

Vue.use(FlamelinkPlugin, {
    firebaseApp,
    env: 'production',
    locale: 'fr', // fr, en-US, he
    dbType: 'cf'
  })

  


export default ({ app }) => {
    // let firebaseApp

    // if (!firebase.apps.length) {
    //     firebaseApp = firebase.initializeApp({
    //         apiKey: process.env.FLAMELINK_API_KEY,
    //         authDomain: process.env.FLAMELINK_AUTH_DOMAIN,
    //         databaseURL: process.env.FLAMELINK_DB_URL,
    //         projectId: process.env.FLAMELINK_PROJECT_ID,
    //         storageBucket: process.env.FLAMELINK_STORAGE_BUCKET,
    //         messagingSenderId: process.env.FLAMELINK_MESSAGING_SENDER_ID
    //     })
    // } else {
    //     firebaseApp = firebase.app()
    // }

    app.flamelink = flamelink({
        firebaseApp,
        env: 'production', // optional, defaults to `production`
        locale: 'fr', // optional, defaults to `en-US`
        dbType: 'cf' // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
    })
}
