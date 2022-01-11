from flask import request, jsonify, make_response
from app import app, guard
from data.user_repository import UserRepository
from model.user_model import user_model
from flask_praetorian import auth_required, current_user
import json

@app.after_request
def middleware_for_response(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route("/")
def hello():
    resp = make_response(f'This is User API. I am alive.', 200)
    resp.set_cookie('userapi', 'user api is working.', httponly=True)
    return resp

@app.route("/verify")
@auth_required
def verify():
    try:
        currentuser = user_model.dump(current_user())
        return make_response(jsonify(currentuser), 200)
    except:
        return make_response(jsonify({'message': 'Error occured during verification process.'}), 401 )

@app.route('/create', methods=['PUT'])
def create_user():
    user = json.loads(request.data)
    name = user["username"]
    surname = user["surname"]
    username = user["username"]
    about = user["about"]
    email = user["email"]
    phonenumber = user["phonenumber"]
    profilepictureurl = user["profilepictureurl"]
    hashedpassword = guard.hash_password(user["password"])

    userrepo = UserRepository(name, surname, username, about, email, phonenumber, profilepictureurl, hashedpassword, 5, 0, True)
    newuser = userrepo.add()
    result = user_model.dump(newuser)

    return jsonify(result)

@app.route('/login', methods=['POST'])
def login_user():
    credentials = json.loads(request.data)
    email = credentials["email"]
    password = credentials["password"]

    user = guard.authenticate(email, password)
    token = guard.encode_jwt_token(user)
    result = {'access_token': token}
    resp = make_response(jsonify(result), 200)
    resp.set_cookie('access_token', guard.encode_jwt_token(user))
    return resp

@app.route('/logout', methods=['POST'])
def logout_user():
    resp = make_response(jsonify({'message': 'Successfully logged out.'}), 200)
    resp.delete_cookie('access_token')
    return resp

@app.route('/userinfo', methods=['GET'])
def user_info():
    id = request.args.get('id', type=int)
    userrepo = UserRepository.getbyid(id)
    result = user_model.dump(userrepo)
    
    resp = make_response(jsonify(result), 200)
    return resp

@app.route('/multipleuserinfo', methods=['POST'])
def multipleuser_info():
    idlist = json.loads(request.data)

    users = UserRepository.getbyidlist(idlist)
    users = [user_model.dump(x) for x in users]
    resp = make_response(jsonify(users), 200)
    return resp

@app.route('/holdcredits', methods=['GET'])
def hold_credits():
    timecredit = request.args.get('timecredit', type=int)
    userid = request.args.get('userid', type=int)

    user = UserRepository.getbyid(userid)
    user.timecreditonhold = int(timecredit)

    try:
        updateduser = user.update()
        result = user_model.dump(updateduser)
        return make_response(jsonify({'issuccessful':'true', 'message':'Successful.'}), 200)
    except:
        return make_response(jsonify({'issuccessful':'false', 'message':'Error.'}), 500)

@app.route('/releasecredits', methods=['GET'])
def release_credits():
    timecredit = request.args.get('timecredit', type=int)
    userid = request.args.get('userid', type=int)

    user = UserRepository.getbyid(userid)
    user.timecreditonhold = user.timecreditonhold - int(timecredit)

    try:
        updateduser = user.update()
        result = user_model.dump(updateduser)
        return make_response(jsonify({'issuccessful':'true', 'message':'Successful.'}), 200)
    except:
        return make_response(jsonify({'issuccessful':'false', 'message':'Error.'}), 500)

@app.route('/credittransaction', methods=['POST'])
def credit_transaction():
    transactioninfo = json.loads(request.data)
    userid = transactioninfo["userid"]
    providerid = transactioninfo["providerid"]
    duration = transactioninfo["duration"]

    user = UserRepository.getbyid(userid)
    user.timecreditonhold = user.timecreditonhold - int(duration)
    user.timecredit = user.timecredit - int(duration)
    user.update()

    provider = UserRepository.getbyid(providerid)
    provider.timecredit = provider.timecredit + int(duration)
    provider.update()
    return make_response(jsonify({'issuccessful':'true', 'message':'Successful.'}), 200)
    
