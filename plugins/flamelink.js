/* NEW VERSION */
import flamelink from 'flamelink/app'
// RTDB for Realtime Database - CF for Cloud Firestore
import 'flamelink/cf/content'
import 'flamelink/cf/storage'
import 'flamelink/cf/settings'
import 'flamelink/cf/navigation'
// import 'flamelink/cf/users'

export default ({app}) => {
  let firebaseApp

  const firebase = require('firebase/app')
  // require('firebase/auth')
  require('firebase/firestore')
  require('firebase/database')
  require('firebase/storage')

  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp({
      apiKey: process.env.FLAMELINK_API_KEY,
      authDomain: process.env.FLAMELINK_AUTH_DOMAIN,
      databaseURL: process.env.FLAMELINK_DB_URL,
      projectId: process.env.FLAMELINK_PROJECT_ID,
      storageBucket: process.env.FLAMELINK_STORAGE_BUCKET,
      messagingSenderId: process.env.FLAMELINK_MESSAGING_SENDER_ID
    })
  } else {
    firebaseApp = firebase.app()
  }

  app.flamelink = flamelink({
    firebaseApp,
    env: 'production', // optional, defaults to `production`
    locale: 'fr', // optional, defaults to `en-US`
    dbType: 'cf' // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
  })
}


/* END NEW VERSION */

/* meant to be better but doesn't work */
// export default ({app}) => {
//   let firebaseApp
//   if (process.server) {
//     const admin = require('firebase-admin')
//
//     if (!admin.apps.length) {
//       try {
//         const serviceAccount = require(process.env.FLAMELINK_PATH_TO_SERVICE_ACCOUNT)
//
//         firebaseApp = admin.initializeApp({
//           credential: admin.credential.cert(serviceAccount),
//           databaseURL: process.env.FLAMELINK_DB_URL,
//           storageBucket: process.env.FLAMELINK_STORAGE_BUCKET
//         })
//       } catch (e) {
//         console.log('Admin app already exists')
//       }
//     } else {
//       const firebase = require('firebase/app')
//       // require('firebase/auth')
//       require('firebase/firestore')
//       require('firebase/database')
//       require('firebase/storage')
//
//       if (!firebase.apps.length) {
//         firebaseApp = firebase.initializeApp({
//           apiKey: process.env.FLAMELINK_API_KEY,
//           authDomain: process.env.FLAMELINK_AUTH_DOMAIN,
//           databaseURL: process.env.FLAMELINK_DB_URL,
//           projectId: process.env.FLAMELINK_PROJECT_ID,
//           storageBucket: process.env.FLAMELINK_STORAGE_BUCKET,
//           messagingSenderId: process.env.FLAMELINK_MESSAGING_SENDER_ID
//         })
//       } else {
//         firebaseApp = firebase.app()
//       }
//     }
//
//     app.flamelink = flamelink({
//       firebaseApp,
//       env: 'production', // optional, defaults to `production`
//       locale: 'fr', // optional, defaults to `en-US`
//       dbType: 'cf' // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
//     })
//
//   }
// }
/* END meant to be better but doesn't work */


/* OLD VERSION

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

export default FlamelinkPlugin;


// import flamelink from 'flamelink'
//
// export default ({ app }) => {
//   let firebaseApp
//
//   if (process.server) {
//     const admin = require('firebase-admin')
//
//     if (!admin.apps.length) {
//       const serviceAccount = require(process.env
//         .FLAMELINK_PATH_TO_SERVICE_ACCOUNT)
//
//       firebaseApp = admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: process.env.FLAMELINK_DB_URL,
//         storageBucket: process.env.FLAMELINK_STORAGE_BUCKET
//       })
//     } else {
//       firebaseApp = admin.app()
//     }
//   } else {
//     const firebase = require('firebase/app')
//     require('firebase/auth')
//     require('firebase/database')
//     require('firebase/storage')
//
//     if (!firebase.apps.length) {
//       firebaseApp = firebase.initializeApp({
//         apiKey: process.env.FLAMELINK_API_KEY,
//         authDomain: process.env.FLAMELINK_AUTH_DOMAIN,
//         databaseURL: process.env.FLAMELINK_DB_URL,
//         projectId: process.env.FLAMELINK_PROJECT_ID,
//         storageBucket: process.env.FLAMELINK_STORAGE_BUCKET,
//         messagingSenderId: process.env.FLAMELINK_MESSAGING_SENDER_ID
//       })
//     } else {
//       firebaseApp = firebase.app()
//     }
//   }
//
//   app.flamelink = flamelink({ firebaseApp, isAdminApp: process.server })
// }
/* END OLD VERSION */
