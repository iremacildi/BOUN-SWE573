from flask import request, jsonify, make_response
from app import app
from data.service_repository import ServiceRepository
from model.service_model import service_model
from model.service_detail import ServiceDetail, servicedetail_model
import json
import requests

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

@app.route('/serviceinfo', methods=['GET'])
def service_info():
    #authentication eklenecek 
    id = request.args.get('id')

    service = ServiceRepository.getbyid(id)

    userinfo = requests.get("http://user-api/userinfo?id=" + str(service.provideruserid)).json()

    servicedetail = ServiceDetail(id, service.name, service.description, service.pictureurl, service.location, service.startdate,
    service.duration, service.capacity, service.provideruserid, userinfo['username'], service.isactive)

    result = servicedetail_model.dump(servicedetail)
    return jsonify(result)

@app.route('/multipleserviceinfo', methods=['POST'])
def serviceinfo_info():
    idlist = json.loads(request.data)

    services = ServiceRepository.getbyidlist(idlist)
    services = [service_model.dump(x) for x in services]
    resp = make_response(jsonify(services), 200)
    return resp

@app.route('/searchservice', methods=['GET'])
def search_service():
    #authentication eklenecek 
    searchtext = request.args.get('searchtext')

    services = ServiceRepository.searchinname(searchtext)
    provideruserids = [s.provideruserid for s in services]

    services = [servicedetail_model.dump(x) for x in services]

    providersinfo = requests.post("http://user-api/multipleuserinfo", data = json.dumps(provideruserids)).json()

    for service in services:
        service['providerusername'] = [provider['username'] for provider in providersinfo if provider['id'] == service['provideruserid']][0]

    return jsonify(services)

@app.route('/getservices', methods=['GET'])
def get_services():
    #authentication eklenecek 
    providerid = request.args.get('providerid')

    services = ServiceRepository.getbyprovideruserid(providerid)

    userinfo = requests.get("http://user-api/userinfo?id=" + str(providerid)).json()

    services = [servicedetail_model.dump(x) for x in services]

    for service in services:
        service['providerusername'] = userinfo['username']
        service['provideruserid'] = providerid

    return jsonify(services)

@app.route('/getallservices', methods=['GET'])
def get_allservices():
    #authentication eklenecek 
    services = ServiceRepository.getall()
    provideruserids = [s.provideruserid for s in services]

    services = [servicedetail_model.dump(x) for x in services]

    providersinfo = requests.post("http://user-api/multipleuserinfo", data = json.dumps(provideruserids)).json()

    for service in services:
        service['providerusername'] = [provider['username'] for provider in providersinfo if provider['id'] == service['provideruserid']][0]

    return jsonify(services)

@app.route('/updateservicestatus', methods=['POST'])
def update_servicestatus():
    #authentication eklenecek 
    servicestatus = json.loads(request.data)
    serviceid = servicestatus["serviceid"]
    isactive = servicestatus["isactive"]
    
    servicerepo = ServiceRepository.getbyid(int(serviceid))
    try:
        servicerepo.isactive = isactive
        updatedservice = servicerepo.update()
        result = service_model.dump(updatedservice)
        return jsonify({'issuccessful':'true', 'message':'Status of your service has been changed.'})
    except:
        return jsonify({'issuccessful':'false', 'message':'We could not update the status. Can you please try again?'})