const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.testkey)

// const charge = await stripe.charges.create({
//         amount: 999,
//         currency: 'usd',
//         description: 'PLEASE WORK STRIPE =D',
//         source: data.card.id,
//         capture: false
// })
exports.stripeCharge = functions.firestore.document('orderTokens/token').onUpdate(event => {
    const userId = Object.keys(event.after.data())[0]
    const data = event.after.data()[userId]
    console.log('*****************', userId)
    console.log('IAMDATA', data.card.id)
    })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
