// netlify/functions/webhook.js
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    const secret = process.env.RAZORPAY_SECRET;
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(event.body);
    const digest = shasum.digest('hex');

    if (digest === event.headers['x-razorpay-signature']) {
        // Process payment and send email
        return {
            statusCode: 200,
            body: JSON.stringify({ success: 'Payment verified and email sent' })
        };
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid signature' })
        };
    }
};
