process.env.RAZORPAY_SECRET = 'uD6AlqlWDHu5VaR7pQula2ae';

const { handler } = require('./functions/webhook');

const event = {
    body: JSON.stringify({
        event: 'payment.captured',
        payload: {
            payment: {
                entity: {
                    email: 'test@example.com'
                }
            }
        }
    }),
    headers: {
        'x-razorpay-signature': 'eb1d2b864f56dbf8b69de329c10cdbf5c9f2e3272beed4c89f9d6fef98327edd'
    }
};

console.log('Event Payload:', event.body);
console.log('Secret Key:', process.env.RAZORPAY_SECRET);

handler(event)
    .then(response => {
        console.log('Response:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
