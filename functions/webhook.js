// webhook.js
const crypto = require('crypto');

exports.handler = async (event) => {
    const secret = process.env.RAZORPAY_SECRET;
    const payload = JSON.stringify(event.body);

    console.log('Payload for verification:', payload);
    console.log('Payload Length for verification:', payload.length);
    console.log('Secret Key:', secret);

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(payload);
    const digest = shasum.digest('hex');

    console.log('Computed Digest:', digest);

    if (digest === event.headers['x-razorpay-signature']) {
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

// For standalone testing
if (require.main === module) {
    const testEvent = {
        body: {
            event: 'payment.captured',
            payload: {
                payment: {
                    entity: {
                        email: 'test@example.com'
                    }
                }
            }
        },
        headers: {
            'x-razorpay-signature': 'eb1d2b864f56dbf8b69de329c10cdbf5c9f2e3272beed4c89f9d6fef98327edd'
        }
    };

    exports.handler(testEvent)
        .then(response => {
            console.log('Response:', response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
