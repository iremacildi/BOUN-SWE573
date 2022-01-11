from data.event_attendance_repository import EventAttendanceRepository
from app import ma

class EventAttendanceModel(ma.Schema):    
    class Meta:
        model = EventAttendanceRepository
        fields = ('id', 'eventid', 'userid', 'isactive')

event_attendance_model = EventAttendanceModel()