const fetch = require('node-fetch');

const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
        secret: 'ES_84fe5b84d1b74882b021cd9390b89672',
        response: inputData.h_captcha_response
    })
});

const result = await response.json();

if (result.success) {
    return { success: true };
} else {
    return { success: false };
}
