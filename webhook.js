const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Log the path where 'nodemailer' is resolved
console.log(require.resolve('nodemailer'));

exports.handler = async (event) => {
    const secret = process.env.RAZORPAY_SECRET;

    // Ensure the request body is a string
    const payload = JSON.stringify(event.body);

    // Generate the HMAC SHA256 signature
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(payload);
    const digest = shasum.digest('hex');

    // Compare the generated signature with the one received in the headers
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
