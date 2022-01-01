from app import db
import json

class UserRepository(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    surname = db.Column(db.String(120))
    nickname = db.Column(db.String(120), unique=True)
    email = db.Column(db.String(120), unique=True)
    phonenumber = db.Column(db.String(120), unique=True)
    profilepictureurl = db.Column(db.String(200))
    password = db.Column(db.String(200))
    timecredit = db.Column(db.Integer)
    isactive = db.Column(db.Boolean)

    def __init__(self, name, surname, nickname, email, phonenumber, profilepictureurl, password, timecredit, isactive):
        self.name = name
        self.surname = surname
        self.nickname = nickname
        self.email = email
        self.phonenumber = phonenumber
        self.profilepictureurl = profilepictureurl
        self.password = password
        self.timecredit = timecredit
        self.isactive = isactive
    
    def add(self):
        db.session.add(self)
        db.session.commit()
        db.session.flush()

        return self
    
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)