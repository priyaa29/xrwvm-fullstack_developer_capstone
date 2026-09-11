import requests

backend_url = "http://localhost:3030"

def get_request(endpoint, **kwargs):
    request_url = backend_url + endpoint
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as e:
        print(f"Network exception occurred: {e}")
        return []
