from data.db_manager import db

class UserRepository(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    surname = db.Column(db.String(120))
    username = db.Column(db.String(120), unique=True)
    email = db.Column(db.String(120), unique=True)
    phonenumber = db.Column(db.String(120), unique=True)
    profilepictureurl = db.Column(db.String(200))
    hashedpassword = db.Column(db.String(200))
    timecredit = db.Column(db.Integer)
    isactive = db.Column(db.Boolean)

    def __init__(self, name, surname, username, email, phonenumber, profilepictureurl, hashedpassword, timecredit, isactive):
        self.name = name
        self.surname = surname
        self.username = username
        self.email = email
        self.phonenumber = phonenumber
        self.profilepictureurl = profilepictureurl
        self.hashedpassword = hashedpassword
        self.timecredit = timecredit
        self.isactive = isactive
    
    def add(self):
        db.session.add(self)
        db.session.commit()
        db.session.flush()

        return self
    
    def get(email):
        user = UserRepository.query.filter_by(email=email).first()

        return user

    def getbyid(id):
        user = UserRepository.query.filter_by(id=id).first()

        return user
    
    def getbyidlist(idlist):
        users = UserRepository.query.with_entities(UserRepository.id, UserRepository.username).filter(UserRepository.id.in_(idlist)).all()

        return users       

    @property
    def identity(self):

        return self.id

    @property
    def rolenames(self):
        return 'role'
        # try:
        #     return self.roles.split(",")
        # except Exception:
        #     return []

    @property
    def password(self):

        return self.hashedpassword

    @classmethod
    def lookup(cls, username):
        
        return cls.query.filter_by(email=username).one_or_none()

    @classmethod
    def identify(cls, id):

        return cls.query.get(id)