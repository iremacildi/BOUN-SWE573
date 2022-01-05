from data.db_manager import db

class ServiceRepository(db.Model):
    __tablename__ = "service"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    description = db.Column(db.String(500))
    pictureurl = db.Column(db.String(120))
    location = db.Column(db.String(120))
    startdate = db.Column(db.DateTime)
    duration = db.Column(db.Integer)
    capacity = db.Column(db.Integer)
    provideruserid = db.Column(db.Integer)
    isactive = db.Column(db.Boolean)

    def __init__(self, name, description, pictureurl, location, startdate, duration, capacity, provideruserid, isactive):
        self.name = name
        self.description = description
        self.pictureurl = pictureurl
        self.location = location
        self.startdate = startdate
        self.duration = duration
        self.capacity = capacity
        self.provideruserid = provideruserid
        self.isactive = isactive
    
    def add(self):
        db.session.add(self)
        db.session.commit()
        db.session.flush()

        return self
    
    def get(provideruserid):
        service = ServiceRepository.query.filter_by(provideruserid=provideruserid).first()

        return service
     
    def getbyid(id):
        service = ServiceRepository.query.filter_by(id=id).first()

        return service