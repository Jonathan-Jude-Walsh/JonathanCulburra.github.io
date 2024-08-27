from flask import Flask, request, render_template, jsonify
import requests

app = Flask(__name__)

# Your private key for hCaptcha
HCAPTCHA_SECRET_KEY = 'ES_84fe5b84d1b74882b021cd9390b89672'

@app.route('/submit', methods=['POST'])
def submit():
    email = request.form['email']
    h_captcha_response = request.form['h-captcha-response']

    # Verify the hCaptcha response
    response = requests.post(
        'https://hcaptcha.com/siteverify',
        data={
            'secret': HCAPTCHA_SECRET_KEY,
            'response': h_captcha_response
        }
    )

    result = response.json()
    if result['success']:
        # hCaptcha verification passed
        return jsonify({"message": "hCaptcha passed, email hidden."})
    else:
        # hCaptcha verification failed
        return jsonify({"message": "hCaptcha failed."}), 403

if __name__ == '__main__':
    app.run(debug=True)
