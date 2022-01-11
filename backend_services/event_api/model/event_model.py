from data.event_repository import EventRepository
from app import ma

class EventModel(ma.Schema):    
    class Meta:
        model = EventRepository
        fields = ('id', 'name', 'description', 'pictureurl', 'location', 'startdate', 'duration', 'capacity', 'organizeruserid', 'isactive')

event_model = EventModel()