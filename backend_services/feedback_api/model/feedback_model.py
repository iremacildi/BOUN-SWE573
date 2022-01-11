from data.feedback_repository import FeedbackRepository
from app import ma

class FeedbackModel(ma.Schema):    
    class Meta:
        model = FeedbackRepository
        fields = ('id', 'serviceid', 'comment', 'rate', 'userid', 'provideruserid', 'isdeleted', 'isgivenbyprovider')
        
feedback_model = FeedbackModel()