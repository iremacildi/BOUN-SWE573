from data.db_manager import db

class EventAttendanceRepository(db.Model):
    __tablename__ = "eventattendance"
    id = db.Column(db.Integer, primary_key=True)
    eventid = db.Column(db.Integer)
    userid = db.Column(db.Integer)
    isactive = db.Column(db.Boolean)

    def __init__(self, eventid, userid, isactive):
        self.eventid = eventid
        self.userid = userid
        self.isactive = isactive
    
    def add(self):
        db.session.add(self)
        db.session.commit()
        db.session.flush()

        return self
    
    def getbyid(id):
        eventattendance = EventAttendanceRepository.query.filter_by(id=id)

        return eventattendance
    
    def getbyuserid(userid):
        eventattendances = EventAttendanceRepository.query.filter_by(userid=userid)

        return eventattendances

    def getbyserviceid(id):
        eventattendances = EventAttendanceRepository.query.filter_by(id=id).first()

        return eventattendances