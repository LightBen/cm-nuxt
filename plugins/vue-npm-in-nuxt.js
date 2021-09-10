import Vue from 'vue'


import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"

import flamelink from 'flamelink/app'
import 'flamelink/content'
import 'flamelink/storage'
import 'flamelink/navigation'
import 'flamelink/settings'

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
    apiKey: "AIzaSyBrcRfVgYgMsno3CJTDRM40FIqYjdeJfD8", //process.env.NUXT_APP_FLAMELINK_API_KEY,
    authDomain: "constantine-minhagim.firebaseapp.com", //process.env.NUXT_APP_FLAMELINK_AUTH_DOMAIN,
    databaseURL: "https://constantine-minhagim.firebaseio.com", //process.env.NUXT_APP_FLAMELINK_DB_URL,
    projectId: "constantine-minhagim", //process.env.NUXT_APP_FLAMELINK_PROJECT_ID,
    storageBucket: "constantine-minhagim.appspot.com", //process.env.NUXT_APP_FLAMELINK_STORAGE_BUCKET,
    messagingSenderId: "710107902876", //process.env.NUXT_APP_FLAMELINK_MESSAGING_SENDER_ID,
    appId: "1:710107902876:web:5367581c2fd3cc500f0e59", //process.env.NUXT_APP_FLAMELINK_APP_ID,
    measurementId: "G-Y2V9JBDVXG", //process.env.NUXT_APP_FLAMELINK_MEASUREMENT_ID
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

Vue.use(FlamelinkPlugin, {
    firebaseApp,
    env: 'production',
    locale: 'fr', // fr, en-US, he
    dbType: 'cf'
})