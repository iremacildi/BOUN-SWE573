from flask import request, jsonify, make_response
from app import app
from data.event_repository import EventRepository
from model.event_model import event_model
import json

@app.route("/")
def hello():
    resp = make_response(f'This is Event API. I am alive.', 200)
    resp.set_cookie('eventapi', 'event api is working.', httponly=True)
    return resp

@app.route('/create', methods=['PUT'])
def create_event():
    #authentication eklenecek 
    event = json.loads(request.data)
    name = event["eventname"]
    description = event["description"]
    pictureurl = event["pictureurl"]
    location = event["location"]
    startdate = event["startdate"]
    duration = event["duration"]
    capacity = event["capacity"]
    organizeruserid = event["organizeruserid"]

    eventrepo = EventRepository(name, description, pictureurl, location, startdate, duration, capacity, organizeruserid, True)
    newevent = eventrepo.add()
    result = event_model.dump(newevent)

    return jsonify(result)