from flask import Flask
from flask_cors import CORS
from flask import jsonify
cors = CORS()

def create_app():
    myapp = Flask(__name__)
    cors.init_app(myapp)
    return myapp

myapp = create_app()

@myapp.route("/")
def hello():
    return "Hello Flask, on Azure App Service for Linux"

@myapp.route("/test", methods=["GET"], strict_slashes=False)
def test():
    a = "React Test"
    return jsonify(a)