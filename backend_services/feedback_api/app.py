from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import config
from flask_marshmallow import Marshmallow
from data.db_manager import db
import os

app = Flask(__name__)
app_context = app.app_context()
app_context.push()
cors = CORS()

POSTGRES_URL = os.environ['POSTGRESURL']
POSTGRES_USER = os.environ['POSTGRESUSER']
POSTGRES_PASS = os.environ['POSTGRESPASS']
POSTGRES_DB = os.environ['POSTGRESDB']
USER_API = os.environ['USERAPIURL']
SECRET_KEY = config.CONFIG['secretKey']
DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER, pw=POSTGRES_PASS, url=POSTGRES_URL, db=POSTGRES_DB)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['USER_API'] = USER_API

cors.init_app(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)

bcrypt = Bcrypt(app)
ma = Marshmallow(app)

from api import *

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=83)