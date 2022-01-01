from flask import request, jsonify
from app import app
import json
from db.user_repository import UserRepository
from model.user_model import user_model

@app.route("/")
def hello():
    return "Hi"

@app.route('/create', methods=['PUT'])
def create_user():
    user = json.loads(request.data)
    name = user["username"]
    surname = user["surname"]
    nickname = user["nickname"]
    email = user["email"]
    phonenumber = user["phonenumber"]
    profilepictureurl = user["profilepictureurl"]
    password = user["password"]

    userrepo = UserRepository(name, surname, nickname, email, phonenumber, profilepictureurl, password, 5, True)
    newuser = userrepo.add()
    result = user_model.dump(newuser)

    return jsonify(result)
