require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const app = express();

app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(require('body-parser').json());

app.post('/stripe', (req, res) => {
    const { token: source, amount, currency, description } = req.body;

    stripe.charges.create({
        amount,
        currency,
        description,
        source
    }).then(charge => {
        console.log('Charge: ' + JSON.stringify(charge));
        res.status(200).json(charge);
    }).catch(error => {
        res.status(500).json(error);
    });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});