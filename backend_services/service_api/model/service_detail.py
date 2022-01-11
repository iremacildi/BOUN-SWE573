import datetime
from app import ma

class ServiceDetail():
    id = 0
    name = ""
    description = ""
    pictureurl = ""
    location = ""
    startdate = datetime.datetime.now()
    duration = 0
    capacity = 0
    provideruserid = 0
    providerusername = 0
    isactive = True
    tag = ""
    tagInfo = ""

    def __init__(self, id, name, description, pictureurl, location, startdate, duration, capacity, provideruserid, providerusername, isactive, tag, tagInfo):
        self.id = id
        self.name = name
        self.description = description
        self.pictureurl = pictureurl
        self.location = location
        self.startdate = startdate
        self.duration = duration
        self.capacity = capacity
        self.provideruserid = provideruserid
        self.providerusername = providerusername
        self.isactive = isactive
        self.tag = tag
        self.tagInfo = tagInfo


class ServiceDetailModel(ma.Schema):    
    class Meta:
        model = ServiceDetail
        fields = ('id', 'name', 'description', 'pictureurl', 'location', 'startdate', 'duration', 'capacity', 'provideruserid', 'providerusername', 'isactive', 'tag', 'tagInfo')

servicedetail_model = ServiceDetailModel()