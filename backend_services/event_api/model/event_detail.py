import datetime
from app import ma

class EventDetail():
    id = 0
    name = ""
    description = ""
    pictureurl = ""
    location = ""
    startdate = datetime.datetime.now()
    duration = 0
    capacity = 0
    organizeruserid = 0
    organizerusername = 0
    isactive = True

    def __init__(self, id, name, description, pictureurl, location, startdate, duration, capacity, organizeruserid, organizerusername, isactive):
        self.id = id
        self.name = name
        self.description = description
        self.pictureurl = pictureurl
        self.location = location
        self.startdate = startdate
        self.duration = duration
        self.capacity = capacity
        self.organizeruserid = organizeruserid
        self.organizerusername = organizerusername
        self.isactive = isactive


class EventDetailModel(ma.Schema):    
    class Meta:
        model = EventDetail
        fields = ('id', 'name', 'description', 'pictureurl', 'location', 'startdate', 'duration', 'capacity', 'organizeruserid', 'organizerusername', 'isactive')

eventdetail_model = EventDetailModel()