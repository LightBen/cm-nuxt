/* NEW VERSION */
import flamelink from 'flamelink/app'
// RTDB for Realtime Database - CF for Cloud Firestore
import 'flamelink/cf/content'
import 'flamelink/cf/storage'
import 'flamelink/cf/settings'
import 'flamelink/cf/navigation'
// import 'flamelink/cf/users'
const firebase = require('firebase/app')
    // require('firebase/auth')
require('firebase/firestore')
require('firebase/database')
require('firebase/storage')

export default ({ app }) => {
    let firebaseApp

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
