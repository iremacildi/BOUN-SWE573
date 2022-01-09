from data.db_manager import db

class FeedbackRepository(db.Model):
    __tablename__ = "feedback"
    id = db.Column(db.Integer, primary_key=True)
    serviceid = db.Column(db.Integer)
    comment = db.Column(db.String(200))
    rate = db.Column(db.Integer)
    userid = db.Column(db.Integer)
    provideruserid = db.Column(db.Integer)
    isdeleted = db.Column(db.Boolean)
    isgivenbyprovider = db.Column(db.Boolean)

    def __init__(self, serviceid, comment, rate, userid, provideruserid, isdeleted, isgivenbyprovider):
        self.serviceid = serviceid
        self.comment = comment
        self.rate = rate
        self.userid = userid
        self.provideruserid = provideruserid
        self.isdeleted = isdeleted
        self.isgivenbyprovider = isgivenbyprovider
    
    def add(self):
        db.session.add(self)
        db.session.commit()
        db.session.flush()

        return self

    def update(self):
        db.session.commit()
        db.session.flush()

        return self
    
    def getbyserviceid(serviceid):
        feedbacks = FeedbackRepository.query.with_entities(FeedbackRepository.id).filter_by(serviceid=serviceid).all()

        return feedbacks