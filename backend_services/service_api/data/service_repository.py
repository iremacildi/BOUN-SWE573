from data.db_manager import db
from sqlalchemy import and_
import datetime

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
    
    def update(self):
        db.session.commit()
        db.session.flush()

        return self
    
    def getall():
        services = ServiceRepository.query.filter(and_(ServiceRepository.startdate>datetime.datetime.now(), ServiceRepository.isactive==True)).all()

        return services

    def getbyprovideruserid(provideruserid):
        services = ServiceRepository.query.filter_by(provideruserid=provideruserid).all()

        return services
     
    def getbyid(id):
        service = ServiceRepository.query.filter_by(id=id).first()

        return service
    
    def searchinname(text):
        services = ServiceRepository.query.filter(ServiceRepository.name.like('%' + str(text) + '%')).all()

        return services
    
    def searchindescription(text):
        services = ServiceRepository.query.filter(ServiceRepository.description.like('%' + str(text) + '%')).all()

        return services