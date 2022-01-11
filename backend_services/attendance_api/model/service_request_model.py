from data.service_request_repository import ServiceRequestRepository
from app import ma

class ServiceRequestModel(ma.Schema):    
    class Meta:
        model = ServiceRequestRepository
        fields = ('id', 'serviceid', 'userid', 'username', 'isapproved', 'isanswered', 'isactive', 'servicename', 'iscompleted', 'serviceduration' )

service_request_model = ServiceRequestModel()