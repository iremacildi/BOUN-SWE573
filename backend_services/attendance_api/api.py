from flask import request, jsonify, make_response
from app import app
from data.service_request_repository import ServiceRequestRepository
from data.event_attendance_repository import EventAttendanceRepository
from model.service_request_model import service_request_model
from model.event_attendance_model import event_attendance_model
import json

@app.route("/")
def hello():
    resp = make_response(f'This is Attendance API. I am alive.', 200)
    resp.set_cookie('attendanceapi', 'attendance api is working.', httponly=True)
    return resp

@app.route('/requestservice', methods=['PUT'])
def request_service():
    #authentication eklenecek 
    servicerequest = json.loads(request.data)
    userid = servicerequest["userid"]
    serviceid = servicerequest["serviceid"]

    servicerequestrepo = ServiceRequestRepository(serviceid, userid, False, False, True)
    try:
        newservicerequest = servicerequestrepo.add()
        result = service_request_model.dump(newservicerequest)
        return jsonify({'issuccessful':'true', 'message':'Great! Your service request has been sent.'})
    except:
        return jsonify({'issuccessful':'false', 'message':'We couldn not send your request somehow. Sorry...'})

@app.route('/attendevent', methods=['PUT'])
def attend_event():
    #authentication eklenecek 
    eventattendance = json.loads(request.data)
    userid = eventattendance["userid"]
    eventid = eventattendance["eventid"]

    eventattendancerepo = EventAttendanceRepository(eventid, userid, True)
    try:
        neweventattendance = eventattendancerepo.add()
        result = event_attendance_model.dump(neweventattendance)
        return jsonify({'issuccessful':'true', 'message':'Great! Your event participation request has been received.'})
    except:
        return jsonify({'issuccessful':'false', 'message':'We couldn not get your participation request somehow. Sorry...'})