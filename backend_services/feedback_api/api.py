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
    
    try:
        serviceinfo = requests.get("http://localhost/service?id=" + str(serviceid)).json()

        feedbackrepo = FeedbackRepository(serviceid, comment, rate, userid, serviceinfo['provideruserid'], False)
        newfeedback = feedbackrepo.add()
        result = feedback_model.dump(newfeedback)
        return jsonify({'issuccessful':'true', 'message':'Great! Thanks for your feedback.'})
    except:
        return jsonify({'issuccessful':'false', 'message':'We couldn not get your feedback somehow. Please try again.'})