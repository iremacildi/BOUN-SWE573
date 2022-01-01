from db.user_repository import UserRepository
from app import ma

class UserModel(ma.Schema):    
    class Meta:
        model = UserRepository
        fields = ('id', 'name', 'surname', 'nickname', 'email', 'phonenumber', 'profilepictureurl', 'password', 'timecredit', 'isactive')

user_model = UserModel()