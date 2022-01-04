from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import config
from flask_marshmallow import Marshmallow
from flask_praetorian import Praetorian
from data.db_manager import db
from data.user_repository import UserRepository 

app = Flask(__name__)
app_context = app.app_context()
app_context.push()
cors = CORS()
guard = Praetorian()

POSTGRES_URL = config.CONFIG['postgresUrl']
POSTGRES_USER = config.CONFIG['postgresUser']
POSTGRES_PASS = config.CONFIG['postgresPass']
POSTGRES_DB = config.CONFIG['postgresDb']
SECRET_KEY = config.CONFIG['secretKey']
JWT_ACCESS_LIFESPAN = config.CONFIG['jwtAccessLifespan']
JWT_REFRESH_LIFESPAN = config.CONFIG['jwtRefreshLifespan']
DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER, pw=POSTGRES_PASS, url=POSTGRES_URL, db=POSTGRES_DB)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SECRET_KEY'] = SECRET_KEY
app.config['JWT_ACCESS_LIFESPAN'] = JWT_ACCESS_LIFESPAN
app.config['JWT_REFRESH_LIFESPAN'] = JWT_REFRESH_LIFESPAN

cors.init_app(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)
guard.init_app(app, UserRepository)

bcrypt = Bcrypt(app)
ma = Marshmallow(app)

from api import *