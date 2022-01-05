from data.db_manager import db

class ServiceRequestRepository(db.Model):
    __tablename__ = "servicerequest"
    id = db.Column(db.Integer, primary_key=True)
    serviceid = db.Column(db.Integer)
    userid = db.Column(db.Integer)
    isapproved = db.Column(db.Boolean)
    isanswered = db.Column(db.Boolean)
    isactive = db.Column(db.Boolean)

    def __init__(self, serviceid, userid, isapproved, isanswered, isactive):
        self.serviceid = serviceid
        self.userid = userid
        self.isapproved = isapproved
        self.isanswered = isanswered
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
    
    def getbyid(id):
        servicerequest = ServiceRequestRepository.query.filter_by(id=id).first()

        return servicerequest
    
    def getbyuserid(userid):
        servicerequests = ServiceRequestRepository.query.filter_by(userid=userid)

        return servicerequests

    def getbyserviceid(serviceid):
        servicerequests = ServiceRequestRepository.query.filter_by(serviceid=serviceid)

        return servicerequests