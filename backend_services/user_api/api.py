from flask import request, jsonify, make_response, Response
from app import app, guard
from data.user_repository import UserRepository
from model.user_model import user_model
from flask_cors import cross_origin
import json

@app.route("/")
def hello():
    resp = make_response(f'Hi', 200)
    resp.set_cookie('somecookiename', 'I am cookie', httponly=True)
    return resp

@app.route('/create', methods=['PUT'])
def create_user():
    user = json.loads(request.data)
    name = user["username"]
    surname = user["surname"]
    username = user["username"]
    email = user["email"]
    phonenumber = user["phonenumber"]
    profilepictureurl = user["profilepictureurl"]
    hashedpassword = guard.hash_password(user["password"])

    userrepo = UserRepository(name, surname, username, email, phonenumber, profilepictureurl, hashedpassword, 5, True)
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
    resp.set_cookie('access_token', guard.encode_jwt_token(user), httponly=True)
    return resp

#