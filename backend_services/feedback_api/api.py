from flask import request, jsonify, make_response
from app import app
from data.feedback_repository import FeedbackRepository
from model.feedback_model import feedback_model
import json
import requests

@app.route("/")
def hello():
    resp = make_response(f'This is Feedback API. I am alive.', 200)
    resp.set_cookie('feedbackapi', 'feedback api is working.', httponly=True)
    return resp

@app.route('/create', methods=['PUT'])
def create_feedback():
    #authentication eklenecek 
    feedback = json.loads(request.data)
    serviceid = feedback["serviceid"]
    userid = feedback["userid"]
    comment = feedback["comment"]
    rate = feedback["rate"]
    isgivenbyprovider = feedback["isgivenbyprovider"]
    provideruserid = feedback["provideruserid"]
    duration = feedback["duration"]
    
    feedbackcount = len(FeedbackRepository.getbyserviceid(int(serviceid)))
    if feedbackcount > 1:
        transactioninfo = {"userid": userid, "providerid":provideruserid, "duration":duration}
        providersinfo = requests.post("http://user-api/credittransaction", data = json.dumps(transactioninfo)).json()
    
    feedbackrepo = FeedbackRepository(serviceid, comment, rate, userid, provideruserid, False, isgivenbyprovider)
    newfeedback = feedbackrepo.add()
    result = feedback_model.dump(newfeedback)
    return jsonify({'issuccessful':'true', 'message':'Great! Thanks for your feedback.'})