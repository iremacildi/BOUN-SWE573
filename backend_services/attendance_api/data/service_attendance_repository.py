from data.db_manager import db

class ServiceAttendanceRepository(db.Model):
    __tablename__ = "serviceattendance"
    id = db.Column(db.Integer, primary_key=True)
    serviceid = db.Column(db.Integer)
    userid = db.Column(db.Integer)
    isattended = db.Column(db.Boolean)
    isactive = db.Column(db.Boolean)
    isattendeecompleted = db.Column(db.Boolean)
    isprovidercompleted = db.Column(db.Boolean)

    def __init__(self, serviceid, userid, isattended, isactive, isattendeecompleted, isprovidercompleted):
        self.serviceid = serviceid
        self.userid = userid
        self.isattended = isattended
        self.isactive = isactive
        self.isattendeecompleted = isattendeecompleted
        self.isprovidercompleted = isprovidercompleted
    
    def add(self):
        db.session.add(self)
        db.session.commit()
        db.session.flush()

        return self
    
    def getbyid(id):
        serviceattendance = ServiceAttendanceRepository.query.filter_by(id=id)

        return serviceattendance
    
    def getbyuserid(userid):
        serviceattendances = ServiceAttendanceRepository.query.filter_by(userid=userid)

        return serviceattendances

    def getbyserviceid(id):
        serviceattendances = ServiceAttendanceRepository.query.filter_by(id=id).first()

        return serviceattendances