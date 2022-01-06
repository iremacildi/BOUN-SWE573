from flask import request, jsonify, make_response
from app import app
from data.event_repository import EventRepository
from model.event_model import event_model
from model.event_detail import EventDetail, eventdetail_model
import json
import requests

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

@app.route('/searchevent', methods=['GET'])
def search_event():
    #authentication eklenecek 
    searchtext = request.args.get('searchtext')

    events = EventRepository.searchinname(searchtext)
    organizeruserids = [s.organizeruserid for s in events]

    events = [eventdetail_model.dump(x) for x in events]

    organizersinfo = requests.post("http://localhost/multipleuserinfo", data = json.dumps(organizeruserids)).json()

    for event in events:
        event['organizerusername'] = [organizer['username'] for organizer in organizersinfo if organizer['id'] == event['organizeruserid']][0]

    return jsonify(events)