from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import config

cors = CORS()

def create_app():
    new_app = Flask(__name__)
    cors.init_app(new_app)
    return new_app

app = create_app()

POSTGRES_URL = config.CONFIG['postgresUrl']
POSTGRES_USER = config.CONFIG['postgresUser']
POSTGRES_PASS = config.CONFIG['postgresPass']
POSTGRES_DB = config.CONFIG['postgresDb']
DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER, pw=POSTGRES_PASS, url=POSTGRES_URL, db=POSTGRES_DB)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
ma = Marshmallow(app)

from api import *