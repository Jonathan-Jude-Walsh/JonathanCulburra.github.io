import requests

def verify_hcaptcha(response_token):
    secret_key = "ES_84fe5b84d1b74882b021cd9390b89672"
    verify_url = "https://hcaptcha.com/siteverify"
    data = {
        'secret': secret_key,
        'response': response_token
    }
    response = requests.post(verify_url, data=data)
    return response.json()

# Example of usage:
response_token = "the_token_from_form"
verification_result = verify_hcaptcha(response_token)

if verification_result['success']:
    # Return or display the email
    email = "contact@jonowalsh.net"
else:
    # Handle failure (e.g., reload form, show error message)
    print("Verification failed.")
