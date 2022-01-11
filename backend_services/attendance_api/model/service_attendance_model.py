from data.service_attendance_repository import ServiceAttendanceRepository
from app import ma

class ServiceAttendanceModel(ma.Schema):    
    class Meta:
        model = ServiceAttendanceRepository
        fields = ('id', 'serviceid', 'userid', 'isattended', 'isactive', 'isattendeecompleted', 'isprovidercompleted')

service_attendance_model = ServiceAttendanceModel()