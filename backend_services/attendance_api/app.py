from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import config
from flask_marshmallow import Marshmallow
from data.db_manager import db

app = Flask(__name__)
app_context = app.app_context()
app_context.push()
cors = CORS()

POSTGRES_URL = config.CONFIG['postgresUrl']
POSTGRES_USER = config.CONFIG['postgresUser']
POSTGRES_PASS = config.CONFIG['postgresPass']
POSTGRES_DB = config.CONFIG['postgresDb']
SECRET_KEY = config.CONFIG['secretKey']
DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER, pw=POSTGRES_PASS, url=POSTGRES_URL, db=POSTGRES_DB)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cors.init_app(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)

bcrypt = Bcrypt(app)
ma = Marshmallow(app)

from api import *

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=84)