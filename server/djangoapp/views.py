import json
import requests
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from .restapis import get_request

def logout_request(request):
    logout(request)
    return JsonResponse({"userName": ""})

def get_dealerships(request, state="All"):
    if state == "All":
        endpoint = "/fetchDealers"
    else:
        endpoint = "/fetchDealers/" + state
    
    dealerships = get_request(endpoint)
    if isinstance(dealerships, dict):
        dealers_list = dealerships.get("dealers", [])
    elif isinstance(dealerships, list):
        dealers_list = dealerships
    else:
        dealers_list = []
    return JsonResponse({"status": 200, "dealers": dealers_list})

def get_dealer_details(request, dealer_id):
    endpoint = f"/fetchDealer/{dealer_id}"
    dealer = get_request(endpoint)
    return JsonResponse({"status": 200, "dealer": dealer})

def get_dealer_reviews(request, dealer_id):
    endpoint = f"/fetchReviews/dealer/{dealer_id}"
    reviews = get_request(endpoint)
    return JsonResponse({"status": 200, "reviews": reviews})

@csrf_exempt
def add_review(request):
    if request.method == "POST":
        data = json.loads(request.body)
        endpoint = "/insert_review"
        res = requests.post("http://localhost:3030" + endpoint, json=data)
        return JsonResponse({"status": 200, "message": "Review added successfully"})
    return JsonResponse({"status": 400, "message": "Bad request"})
