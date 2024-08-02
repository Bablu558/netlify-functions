// generate_signature.js
const crypto = require('crypto');
const secret = 'uD6AlqlWDHu5VaR7pQula2ae';

const payload = JSON.stringify({
    event: 'payment.captured',
    payload: {
        payment: {
            entity: {
                email: 'test@example.com'
            }
        }
    }
});

console.log('Payload for signature generation:', payload);
console.log('Payload Length for signature generation:', payload.length);

const shasum = crypto.createHmac('sha256', secret);
shasum.update(payload);
const signature = shasum.digest('hex');

console.log('Generated Signature:', signature);
