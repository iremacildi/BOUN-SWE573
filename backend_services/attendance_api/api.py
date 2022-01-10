from flask import request, jsonify, make_response
from app import app
from data.service_request_repository import ServiceRequestRepository
from data.event_attendance_repository import EventAttendanceRepository
from model.service_request_model import service_request_model
from model.event_attendance_model import event_attendance_model
import json
import requests
import datetime

@app.route("/")
def hello():
    resp = make_response(f'This is Attendance API. I am alive.', 200)
    resp.set_cookie('attendanceapi', 'attendance api is working.', httponly=True)
    return resp

@app.route('/requestservice', methods=['PUT'])
def request_service():
    servicerequest = json.loads(request.data)
    userid = servicerequest["userid"]
    serviceid = servicerequest["serviceid"]
    providerid = servicerequest["providerid"]
    servicetimecredit = servicerequest["servicetimecredit"]

    userinfo = requests.get("http://user-api/userinfo?id=" + str(userid)).json()

    if (int(userinfo['timecredit']) - int(userinfo['timecreditonhold'])) < int(servicetimecredit):
        return jsonify({'issuccessful':'false', 'message':'You need more time credit for this service.'})

    servicerequestrepo = ServiceRequestRepository(serviceid, userid, providerid, False, False, True, False)
    try:
        iscreditholded = requests.get("http://user-api/holdcredits?timecredit=" + str(servicetimecredit) + "&userid=" + str(userid)).status_code == 200

        if iscreditholded:
            newservicerequest = servicerequestrepo.add()
            result = service_request_model.dump(newservicerequest)
            return jsonify({'issuccessful':'true', 'message':'Great! Your service request has been sent.'})
        else:
            return jsonify({'issuccessful':'false', 'message':'We could not send your request. Please try again.'})
    except:
        return jsonify({'issuccessful':'false', 'message':'We could not send your request somehow. Sorry...'})

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

@app.route('/answerrequest', methods=['POST'])
def answer_request():
    #authentication eklenecek 
    requestanswer = json.loads(request.data)
    servicerequestid = requestanswer["servicerequestid"]
    isapproved = requestanswer["isapproved"]
    
    servicerequestrepo = ServiceRequestRepository.getbyid(int(servicerequestid))
    try:
        servicerequestrepo.isanswered = True
        servicerequestrepo.isapproved = isapproved
        updatedrequest = servicerequestrepo.update()
        result = service_request_model.dump(updatedrequest)
        return jsonify({'issuccessful':'true', 'message':'Great! Your event participation request has been received.'})
    except:
        return jsonify({'issuccessful':'false', 'message':'We couldn not get your participation request somehow. Sorry...'})

@app.route('/unansweredrequests', methods=['GET'])
def unanswered_requests():
    providerid = request.args.get('providerid', type=int)
    
    servicerequestrepo = ServiceRequestRepository.getbyproviderid(int(providerid))

    result = service_request_model.dump(servicerequestrepo)
    return jsonify(result)

@app.route('/usersrequests', methods=['GET'])
def users_requests():
    userid = request.args.get('userid', type=int)
    
    servicerequests = ServiceRequestRepository.getbyuserid(int(userid))
    serviceids = [s.serviceid for s in servicerequests]
    
    servicerequests = [service_request_model.dump(x) for x in servicerequests]
        
    servicesinfo = requests.post("http://service-api:81/multipleserviceinfo", data = json.dumps(serviceids)).json()

    for servicerequest in servicerequests:
        servicerequest['service'] = [service for service in servicesinfo if service['id'] == servicerequest['serviceid']][0]

    return jsonify(servicerequests)

@app.route('/servicesrequests', methods=['GET'])
def services_requests():
    serviceid = request.args.get('serviceid', type=int)
    
    servicerequests = ServiceRequestRepository.getbyserviceid(int(serviceid))
    userids = [s.userid for s in servicerequests]

    servicerequests = [service_request_model.dump(x) for x in servicerequests]

    usersinfo = requests.post("http://user-api/multipleuserinfo", data = json.dumps(userids)).json()

    for servicerequest in servicerequests:
        servicerequest['username'] = [user['username'] for user in usersinfo if user['id'] == servicerequest['userid']][0]

    return jsonify(servicerequests)