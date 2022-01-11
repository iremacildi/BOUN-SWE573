from data.service_repository import ServiceRepository
from app import ma

class ServiceModel(ma.Schema):    
    class Meta:
        model = ServiceRepository
        fields = ('id', 'name', 'description', 'pictureurl', 'location', 'startdate', 'duration', 'capacity', 'provideruserid', 'isactive', 'tag')

service_model = ServiceModel()