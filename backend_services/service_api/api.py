from flask import request, jsonify, make_response
from app import app
from data.service_repository import ServiceRepository
from model.service_model import service_model
import json

@app.route("/")
def hello():
    resp = make_response(f'This is Service API. I am alive.', 200)
    resp.set_cookie('serviceapi', 'service api is working.', httponly=True)
    return resp

@app.route('/create', methods=['PUT'])
def create_service():
    #authentication eklenecek 
    service = json.loads(request.data)
    name = service["servicename"]
    description = service["description"]
    pictureurl = service["pictureurl"]
    location = service["location"]
    startdate = service["startdate"]
    duration = service["duration"]
    capacity = service["capacity"]
    provideruserid = service["provideruserid"]

    servicerepo = ServiceRepository(name, description, pictureurl, location, startdate, duration, capacity, provideruserid, True)
    newservice = servicerepo.add()
    result = service_model.dump(newservice)

    return jsonify(result)