const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51HQGOJKyZxcFQuZqZZ5ytYdHWG9zgk9W9hffUR0wu9wYUw0Q4RcUJpFzFI4bYp0XDtkA8zl7UFB72i0boect1gIm00xIl11n5A');

//to set up an API - get the backend running on a cloud function

//App config
const app = express();

//Middlewares (cors is like a security)
app.use(cors({ origin: true }));
app.use(express.json());

//API routes (first one is dummy route)
app.get('/', (request, response) => response.status(200).send ('hello world'))

//API takes a request and response
app.post('/payments/create', async (request, response) => {
    //amount in sub units
    const total = request.query.total;


    //debug reference
    console.log('Payment Request Received BOOM for this amount >>', total)

    //takes object amount and usd
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });


    //201: Ok - something created (payment created). send back the response (clientSecret)
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command (where the cloud functions come in)
exports.api = functions.https.onRequest(app)

//Example endpoint
// http://localhost:5001/clone-82b31/us-central1/api